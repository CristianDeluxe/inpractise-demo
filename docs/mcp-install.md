# Install the In Practise Demo MCP server

The local server ID is `inpractise-demo`. It provides **two read-only tools**,
`search_research` and `fetch_passage`, over stdio. It is an independent
engineering demo over public filings and synthetic interviews, not an In
Practise product or connection to its private library. Authorization belongs to
the database, not the agent client; neither tool accepts a user, organization or
role override.

## Prerequisites and member access

Complete [local dependency installation](../README.md#run-locally) first. There
is no published package to install by server name. Use Node 24.20.0 and this
checkout's installed `tsx` 4.23.13. The examples use absolute paths so a desktop
client's working directory does not affect module resolution. The installed
`tsx/package.json` exports `dist/loader.mjs` as its Node import hook; the
absolute launch paths below were exercised from another working directory.

Obtain an existing member login and project public configuration privately from
the demo owner. Public signup is disabled. An Auth user must also have an active
`memberships` row in an active organization; a successful password login alone
is insufficient. [scripts/db/personas.ts](../scripts/db/personas.ts) defines the
primary `demo` reviewer plus the `basic`, dedicated `mcp`, and
other-organization test fixtures; [seed.ts](../scripts/db/seed.ts) associates
them with memberships. The MCP server uses `me+mcp@cristiandeluxe.dev`, a
separate basic-tier, test-only member in the reviewer's organization. These are
provisioning sources, not installation steps to rerun.

| Required variable          | Value supplied by the owner                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEARCH_URL`             | Supabase project base URL, such as `https://PROJECT_REF.supabase.co`, with no trailing slash. Do not use the demo website or append `/functions/v1/research`. |
| `RESEARCH_PUBLISHABLE_KEY` | Publishable key for that same Supabase project; never a service-role/secret key.                                                                              |
| `DEMO_MCP_PASSWORD`        | Dedicated MCP member password, stored privately by the demo owner in ignored `.env.remote`.                                                                   |

The bundled server accepts those three names directly: it selects the fixed
dedicated member email and uses `DEMO_MCP_PASSWORD` when its resolved
counterpart is absent. Generic clients may instead set `RESEARCH_EMAIL` and
`RESEARCH_PASSWORD`; those explicit values take precedence. Client JSON may map
the three direct names into the resolved names, as the examples below do. The
server reads only its **process environment**; it does not automatically load
`.env.local` or `.env.remote`. Supply values through private client settings or
an existing secret loader before launch. Do not put credentials in tool
arguments, command-line flags, tracked files or logs. Browser `VITE_` variables
are separate configuration.

`RESEARCH_HANDSHAKE_LOG` is optional. Leave it unset or empty unless a new local
session log is wanted; use an ignored path, never the retained
`docs/mcp-handshake.jsonl`.

## Claude Code: project configuration

The repository's [.mcp.json](../.mcp.json) works when Claude Code is launched
from this repository with `RESEARCH_URL`, `RESEARCH_PUBLISHABLE_KEY` and
`DEMO_MCP_PASSWORD` available. It uses `node --import tsx mcp/start.ts`; Node
and the checkout must therefore be resolvable from that launch environment. For
installation into another project, merge this entry into that project's
`.mcp.json`, replacing every `/ABSOLUTE/PATH/inpractise-demo` with the installed
checkout path:

```json
{
  "mcpServers": {
    "inpractise-demo": {
      "type": "stdio",
      "command": "/ABSOLUTE/PATH/inpractise-demo/node_modules/node/bin/node",
      "args": [
        "--import",
        "/ABSOLUTE/PATH/inpractise-demo/node_modules/tsx/dist/loader.mjs",
        "/ABSOLUTE/PATH/inpractise-demo/mcp/start.ts"
      ],
      "env": {
        "RESEARCH_URL": "${RESEARCH_URL}",
        "RESEARCH_PUBLISHABLE_KEY": "${RESEARCH_PUBLISHABLE_KEY}",
        "RESEARCH_EMAIL": "me+mcp@cristiandeluxe.dev",
        "RESEARCH_PASSWORD": "${DEMO_MCP_PASSWORD}"
      }
    }
  }
}
```

Claude Code expands these `${VARIABLE}` references. Project-scoped servers
require the client's trust/approval step; a config file alone is not a connected
session. See
[Claude Code MCP configuration](https://code.claude.com/docs/en/mcp).

## Claude Code: CLI registration

As an alternative to manually merging JSON, set `INPRACTISE_DEMO_DIR` to the
checkout's absolute path in your shell and enter the project where you want the
registration. `RESEARCH_URL`, `RESEARCH_PUBLISHABLE_KEY` and `DEMO_MCP_PASSWORD`
must be available to Claude Code when it launches the server. Run:

```sh
claude mcp add --transport stdio --scope project inpractise-demo -- "$INPRACTISE_DEMO_DIR/node_modules/node/bin/node" --import "$INPRACTISE_DEMO_DIR/node_modules/tsx/dist/loader.mjs" "$INPRACTISE_DEMO_DIR/mcp/start.ts"
```

This writes `.mcp.json` in that project; it does not store password flags. Use
either CLI registration or manual configuration for a given server ID. The
command was exercised in an isolated project directory on 2026-09-14; it does
not mean your own client has connected.

## Claude Desktop

Merge the entry below into `mcpServers` in your private Desktop config. On macOS
the file is `~/Library/Application Support/Claude/claude_desktop_config.json`;
on Windows it is `%APPDATA%\Claude\claude_desktop_config.json`. Open it through
Desktop's developer settings and restart Desktop after saving, as described in
the
[official local-server guide](https://modelcontextprotocol.io/docs/develop/connect-local-servers).

Replace the absolute paths and the three `OWNER_SUPPLIED_...` placeholders
locally. They are literal placeholders, not a supported environment-expansion
syntax. Keep the resulting credential-bearing config private. The launch paths
below are for macOS/Linux; Windows requires an installed Node executable path
and escaped backslashes in JSON, and was not tested in this pass.

```json
{
  "mcpServers": {
    "inpractise-demo": {
      "command": "/ABSOLUTE/PATH/inpractise-demo/node_modules/node/bin/node",
      "args": [
        "--import",
        "/ABSOLUTE/PATH/inpractise-demo/node_modules/tsx/dist/loader.mjs",
        "/ABSOLUTE/PATH/inpractise-demo/mcp/start.ts"
      ],
      "env": {
        "RESEARCH_URL": "OWNER_SUPPLIED_PROJECT_URL",
        "RESEARCH_PUBLISHABLE_KEY": "OWNER_SUPPLIED_PUBLISHABLE_KEY",
        "RESEARCH_EMAIL": "me+mcp@cristiandeluxe.dev",
        "RESEARCH_PASSWORD": "OWNER_SUPPLIED_MCP_MEMBER_PASSWORD"
      }
    }
  }
}
```

## Cursor

Merge the following into `.cursor/mcp.json` for one project or
`~/.cursor/mcp.json` for your user. Replace the absolute checkout paths and
launch Cursor with the three variables available. Cursor's environment
interpolation is `${env:NAME}`, unlike Claude Code's syntax. Enable the server
in Cursor's MCP settings. See
[Cursor's MCP reference](https://cursor.com/docs/mcp).

```json
{
  "mcpServers": {
    "inpractise-demo": {
      "type": "stdio",
      "command": "/ABSOLUTE/PATH/inpractise-demo/node_modules/node/bin/node",
      "args": [
        "--import",
        "/ABSOLUTE/PATH/inpractise-demo/node_modules/tsx/dist/loader.mjs",
        "/ABSOLUTE/PATH/inpractise-demo/mcp/start.ts"
      ],
      "env": {
        "RESEARCH_URL": "${env:RESEARCH_URL}",
        "RESEARCH_PUBLISHABLE_KEY": "${env:RESEARCH_PUBLISHABLE_KEY}",
        "RESEARCH_EMAIL": "me+mcp@cristiandeluxe.dev",
        "RESEARCH_PASSWORD": "${env:DEMO_MCP_PASSWORD}"
      }
    }
  }
}
```

## Generic stdio client

Use the Desktop example's executable, argument array and resolved environment
values in your client's stdio transport configuration. The `mcpServers` wrapper
is a client convention, not the protocol. Launch the process with stdin/stdout
pipes, send MCP `initialize`, complete initialization and request `tools/list`.
Do not configure the research HTTP URL as an MCP HTTP endpoint: it speaks the
application's eight-action JSON contract, not MCP.

## Verify the connection

For a terminal startup check, from the checkout with `RESEARCH_URL`,
`RESEARCH_PUBLISHABLE_KEY` and `DEMO_MCP_PASSWORD` loaded:

```sh
pnpm mcp
```

After successful member sign-in, stderr prints
`inpractise-demo MCP server ready`. Stop the terminal check with Ctrl-C. That
line proves startup and login, not a negotiated session or evidence entitlement.
Configure agent clients with the direct Node executable shown above; `pnpm mcp`
prints package-script banners on stdout and is intended here as a terminal
check.

In the client, confirm that initialization reports server name
`inpractise-demo`, version `0.1.0`, and that tool discovery lists exactly:

| Tool              | Arguments                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `search_research` | `query` (1–2000 characters), optional `company` (at most 80 characters), optional `limit` (integer 1–10). |
| `fetch_passage`   | `documentId`, `revisionId`, `passageId` (each 1–200 characters).                                          |

A handshake emits a `handshake` diagnostic with the negotiated protocol version
on stderr. The retained 2026-09-13 client negotiated `2025-11-25`; negotiation
is a session result, not a version to force into your configuration. To verify
ordinary basic-member access without generation, call `fetch_passage` with this
accepted synthetic source reference:

```json
{
  "documentId": "s1",
  "revisionId": "ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94",
  "passageId": "P2"
}
```

Expect a citation for those exact IDs, synthetic provenance, the complete quote
and neighboring IDs. A different organization's member may legitimately have
different visibility. A missing/withdrawn revision must fail rather than
redirect to a newer quote. Search is read-only for evidence but requests a query
embedding; it is not a zero-provider-work check. MCP has no answer-generation
tool.

The JSON configurations were parsed and their substituted launch commands
exercised through an SDK stdio client on 2026-09-14. This does not establish
that Desktop or Cursor UI configuration was tested. [MCP evidence](mcp.md)
separates the historical Claude session, integration tests and this startup
verification.

## Troubleshooting

| Symptom                                                                                  | Check and smallest next step                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Set RESEARCH_URL, RESEARCH_PUBLISHABLE_KEY and DEMO_MCP_PASSWORD, or RESEARCH_PASSWORD` | The URL, publishable key or both accepted password names are absent or empty. Supply the documented three variables, or a resolved password for a generic client, to the child process rather than Vite. Check variable names/presence without printing values. |
| `RESEARCH_URL is not a URL`, sign-in failure or non-JSON response                        | Use the owner's Supabase base URL and matching publishable key, not the website or function URL. A syntactically valid wrong URL can pass startup validation and fail at sign-in.                                                                               |
| `Research sign-in failed`                                                                | Have the owner verify the provisioned member login and project pairing. Do not enable public signup or substitute a service key.                                                                                                                                |
| Ready line appears, but a tool reports `forbidden: No active membership`                 | Auth accepted the password; the database has no visible active membership. The owner must check the seeded user/membership and active organization. Startup does not perform this check.                                                                        |
| `not_found` from `fetch_passage`                                                         | Check all three exact IDs and the member's organization/tier. Missing and inaccessible sources intentionally share this error; no title hint is expected.                                                                                                       |
| Module/executable not found                                                              | Complete installation, replace every absolute path, and verify the Node executable and `tsx` loader exist. Desktop clients may not inherit terminal PATH.                                                                                                       |
| Protocol parse error                                                                     | Use direct Node, keep stdout exclusively for MCP, and send diagnostics to stderr. Do not put the pnpm banner in a client's protocol stream.                                                                                                                     |
| A later session fails to renew                                                           | One 401 triggers a password sign-in retry. A second failure becomes a tool error; restore the member session rather than retrying in a loop.                                                                                                                    |

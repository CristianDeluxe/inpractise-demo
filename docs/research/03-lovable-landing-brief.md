# In Practise demo: Lovable landing brief

Status: build-ready specification, 2026-09-13. No UI has been implemented or measured. This is an independent hiring concept; its corpus, accounts and integrations are separate from In Practise. All performance numbers below are acceptance targets, not results. Actual In Practise packaging, private UI and API contracts remain UNVERIFIED.

## 1. Decision and evidence

Build an evidence-led editorial page with the information density of an analyst workspace. Show a question, two differing accounts and a paragraph link before asking the visitor to enter the workspace. This follows [01, sections 3–4](01-market-and-landing-research.md): improve the public demonstration of existing Ask IP and MCP capabilities, preserve editorial differentiation, and avoid fake terminal charts or invented pricing. The terminal influence is typography, navigation and source density; it is not a market-data product claim.

This demo intentionally adapts 01's public-excerpt example to original fictional interviews so that the landing, member reader, askbot and MCP all use the same evidence. Do not import Sezzle/Zip excerpts into a synthetic transcript or invent the surrounding text. [05, section 2](05-askbot-and-mcp-spec.md) is the canonical fixture definition. Actual In Practise launched its MCP/API offering and Ask IP, as recorded in [01, sections 1.4–1.5](01-market-and-landing-research.md); this project does not claim to invent either product. Carlos's preference for purpose-built interfaces and inspectable task state is an inference from [research dossier, sections 1–2](../research-dossier.md), not a confirmed hiring rubric.

Three possible directions were considered: evidence-first editorial page (selected); connector-first page (use inside the MCP section); numerical terminal (excluded because this demo has no market feed). The first makes a useful analyst action visible while keeping the build small.

## 2. Design direction

| Element     | Build specification                                                                                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canvas      | Warm paper `#F7F6F2`; surface `#FFFFFF`; ink `#17212B`; secondary text `#465362`; borders `#D8DDE2`.                                                                                                                                                    |
| Accent      | Blue `#244C66`, white text on filled primary buttons. Warning text `#744A12` on `#FFF2D6`. Status always includes words/icons. Verify rendered contrast; these are proposed tokens, not a conformance claim.                                            |
| Type        | Self-hosted Source Serif 4 for headings and quotations; system sans for controls/body; system monospace for paragraph IDs and dates. Retain font license. Body 17px/1.6; source text 18px/1.65; metadata 13px/1.5; never shrink transcript text to fit. |
| Scale       | H1 `clamp(2.5rem, 5vw, 4.25rem)`, H2 `clamp(1.75rem, 3vw, 2.75rem)`. Maximum prose width 68ch; page width 1200px. Desktop gutters 40px, tablet 24px, mobile 16px.                                                                                       |
| Composition | 12-column desktop; two-column hero 5/7; single column below 900px. Sections separated by fine rules and 64px vertical space, 40px mobile. Three-column card groups collapse to one below 640px.                                                         |
| Controls    | shadcn/Radix Button, Sheet, Dialog, Accordion, Tabs and Input where appropriate; semantic HTML lists and tables. Radius 4px, no pill-shaped marketing badges except small source-type labels.                                                           |
| Tone        | Precise, calm, skeptical of unsupported conclusions. No superlatives, testimonials, trading animations, AUM, invented logos, counters, certifications or promised productivity gains.                                                                   |
| Motion      | Opacity/transform transitions 120–180ms on deliberate interaction only. No scroll-reveal hiding initial text, autoplay, typewriter effect or parallax. `prefers-reduced-motion` removes movement and smooth scrolling.                                  |

Persistent demo notice above navigation and in every member/admin view: **“Independent demo. Public and synthetic sources; no private In Practise research.”** Label every fictional source **“Synthetic interview · fictional company and speaker.”** Use a text wordmark “In Practise / independent concept”; do not redraw or appropriate a logo. This prototype has no sales form and collects no lead details.

## 3. Shared interaction and analytics rules

The landing works before sign-in. Its example is a local, explicitly labeled fixture. `/app` requires authentication and an explicit organization choice when more than one membership exists. No silent first-organization selection. The public fixture contains no member data. Copying a source link must preserve document and revision IDs plus `#p-<paragraph-id>`; authenticated readers reauthorize on open.

All event names below are proposed, and are sent to a local development event sink by default. Remote analytics is off. Event properties are restricted to `{section, action, fixtureId?, publicDocumentId?, resultCountBucket?, deviceClass}`; enum values only. Do not include raw queries, quotes, email, tokens, organization names or private IDs. A click is not successful sign-in or research completion. Failures in analytics must not block navigation.

Every section supports static/ready, loading only when a request actually runs, empty when applicable, and error with a recovery action. Never simulate progress or delay. Global offline message: “The connection is unavailable. You can still read the sample below.” Use accessible text, preserve focus and keep static content available.

## 4. Section-by-section build contract

### S01 — Navigation and disclosure

Purpose: identify the concept and provide analyst and developer routes.

```text
Independent demo. Public and synthetic sources; no private In Practise research.
Research | Ask IP demo | API & MCP | Method | Access
Open demo workspace
```

Layout/components: notice, text wordmark, anchor navigation, one filled button. Mobile: menu button opens a Sheet with the same links, `aria-expanded`, focus containment and return. Close after anchor selection; selected anchor is visible without color alone. Desktop header may be sticky with `scroll-margin-top: 112px` on targets; at 400% zoom use normal flow if it obscures content. Proof: all destinations resolve. CTA `/app`; event `research_sample_click`, section `navigation`. Motion: menu transition only. Loading/error: navigation itself remains functional; `/app` owns its auth failure state.

### S02 — Hero and immediately inspectable evidence

Purpose: explain the analyst's task and demonstrate the value without a sales claim.

```text
Understand the business behind the numbers.

Read operating perspectives, compare their limits, and follow every answer back to its source.

Explore the evidence
Open demo workspace

A working concept for In Practise, using public and synthetic material.
```

Right panel heading: “What makes Northstar difficult to replace?” Label: “Curated synthetic example · not a live answer.” Show the two exact quotes below, taken from 05's S1/P2 and S2/P2:

```text
For complex installations, migration requires rebuilding integrations and retraining teams.

Our small deployment moved in six weeks because we used only standard connectors.
```

Below quotes: “The accounts describe different installation sizes. They do not establish a universal switching cost.” This is fixture interpretation, not a real-company claim. Metadata: S1, interview 2026-08-04, fictional former implementation lead; S2, interview 2026-08-12, fictional small-business customer. Buttons “Read paragraph S1/P2” and “Read paragraph S2/P2” open the local evidence panel. Proof: exact paragraph match and full surrounding synthetic context. Events `demo_source_open` and `research_sample_click`. Primary anchor `#evidence`; workspace is secondary. Mobile: copy, CTAs, question, quotes in that order. No auto-rotating sources. Source error: “This sample is unavailable. Try again.” Never replace a quote silently. Motion: source selection 120ms.

### S03 — Research relevance

Purpose: explain why multiple kinds of evidence belong together.

```text
A filing gives one view. An operating account adds another.

Start with the reported facts. Add the experience of people who used the product. Keep the date, context and limits of each account visible.

Company filings
Reported figures and disclosures, linked to their origin.

Synthetic interviews
Fictional operating accounts designed to test source comparison.

Research questions
A place to keep what is supported, disputed and still unanswered.

Read the sample interviews
```

Components: three editorial rows with small source-type icons, no numeric proof tiles. Proof: badges link to the corpus manifest and actual fixture reader. CTA `#library`, `research_sample_click`. At narrow widths stack rows; icons decorative. States: static content; missing manifest link reports unavailable, does not imply licensed documents exist. Motion: none.

### S04 — Ask IP-style evidence demonstration

Purpose: make answering, inspecting and abstaining observable.

```text
Ask a question. Examine the evidence.

This example compares two fictional accounts of switching software. Open a citation to see who said it, when, and in what context.

Run the live demo
View the curated example

An answer can be incomplete. A source can disagree. Missing evidence should remain visible.
```

Two explicitly selected tabs: “Supported question” and “Insufficient evidence.” Curated answer uses S02 text and two source buttons. Insufficient-evidence question: “What will Northstar's retention rate be next year?” Answer: “These sources do not establish next year's retention rate.” Suggested follow-up: “Which migration constraints do the interviews describe?” No fake streaming in the curated tab. “Run the live demo” goes to `/app/ask?example=northstar-switching`, with a visible confirmation to submit after sign-in; no auto-spend on page load.

Desktop answer/source split 55/45; mobile source appears in an accessible full-screen Dialog. Source body remains selectable. Full-text paragraph IDs are visible; highlighted paragraph receives focus without moving on each streamed token. States: curated ready, live pending, live provisional, complete, partial, conflicting, insufficient evidence, cancelled, unavailable. Error copy: “The search could not finish. Try again.” This is distinct from a completed no-evidence result. Proof: source span from 05. Events `demo_example_start`, `demo_source_open`, `demo_example_complete` only when a user reaches the final curated step, and `research_sample_click` for live route. Motion: only source/tab transitions, reduced-motion respected.

### S05 — API & MCP workflow

Purpose: show the same evidence through an agent interface.

```text
Take the evidence into your research workflow.

The demo MCP server gives an authorized agent access to the same documents and paragraph links as the workspace.

Search the corpus. Read the passage. Keep the citation.

See the connector walkthrough

This is an independent demo server. It does not connect to In Practise's private MCP service.
```

Components: three-step sequence and an expandable, selectable text transcript from 05, not a screenshot. CTA `/demo/mcp`; event `integration_interest`. That static route contains the worked transcript and implementation-status label; connection controls appear only when the selected build tier actually supports them. No API-key input on the public landing. Mobile sequence vertical; long code scrolls within its own region. Proof: when implemented, an integration-test run ID and source IDs shared with the reader; until then “Walkthrough specification.” Loading/error: connector status unavailable is shown as unavailable, not connected. Motion: disclosure only.

### S06 — Library preview

Purpose: show a small usable corpus and its provenance.

```text
Start with a company. Keep following the question.

Search the demo's fictional companies and public-source records. Every item identifies its source type and date.

Search demo companies
Browse all demo research
```

Show Northstar Workflow, Harbor Components and Meridian Payments as **fictional company** labels; names are never customer endorsements. Cards: title, document type, interview date, publication date, provenance label, access badge. Initial preview contains only the synthetic sources defined in 05. Public filing cards appear only after manifest validation and ingestion succeed. No fabricated cover image or dynamic corpus total.

Use Input with explicit Search button, filter chips with clear controls and result list. Empty: “No matching company in this demo. Clear the search to see the sample corpus.” Loading: reserved list skeleton with one polite announcement. Error: “Research could not be loaded. Retry.” CTA `/app/library`; event `coverage_result_open` on result, `coverage_search` with count bucket only. Mobile single column; preserve search and scroll on back navigation. Motion: none.

### S07 — Method and trust

Purpose: expose how evidence is handled in this implementation.

```text
Keep the source in view.

Preserve the original passage.
Show the speaker, date and document version.
Separate an account from a verified fact.
Say when the available evidence cannot answer.

Review the demo's sources and limits
```

Components: four numbered rows plus disclosure link `/demo/method`. That page summarizes 05's provenance, evidence validation and refusal states. Proof: original paragraph, immutable revision identifier and an actual failed-evidence example. These are requirements until built; status label “Implementation specification” must remain until verified. Optional outbound link label: “Read In Practise's published compliance policy (external)” to `https://inpractise.com/about/compliance`; event `compliance_document_open`. Do not reproduce a compliance certification or an expert-vetting promise for fictional interviews. Responsive: one column throughout. Motion: none. Unavailable policy link does not block method content.

### S08 — Access routes

Purpose: explain what this demo allows and distinguish real subscription enquiries.

```text
Choose what to explore.

Sample evidence
Read the curated synthetic example without signing in.
Explore the sample

Demo workspace
Browse research, inspect citations and try the assistant with a demo account.
Open workspace

Agent walkthrough
See how a read-only MCP session retrieves the same evidence.
View walkthrough

For actual In Practise subscriptions, visit the official website. This concept has no pricing or subscription checkout.
```

Three cards are navigation routes, not commercial plans. CTAs `#evidence`, `/app`, `/demo/mcp`; event `access_option_select`, action `sample|workspace|agent`. A separate plain external link to `https://inpractise.com/sales` says “Official In Practise sales page (external)”; event `official_site_open`. No fabricated offer, free trial duration, security promise or connected sales form. Mobile stack; static states; motion hover/focus only.

### S09 — FAQ

Purpose: resolve the difference between real product, proposed concept and fixture.

```text
Is this In Practise's production product?
No. It is an independent code-project demo prepared for In Practise.

What does the assistant search?
Only the documents loaded into this demo and available to your selected organization. Each source is labeled public or synthetic.

Are the expert interviews real?
No. The demo interviews use fictional companies and speakers. They test retrieval and source inspection; they are not investment evidence.

Can I open the source behind an answer?
Yes, in the implemented reader. A citation identifies an immutable document revision and paragraph. Access is checked again when it opens.

Does the demo connect to In Practise's MCP server?
No. The demo defines its own read-only MCP server over the stand-in corpus.

Does it take payments or send alerts?
Billing is simulated. Alerts are in-app only in the target build. Email delivery and production subscriptions are outside this demo.
```

Use semantic Accordion with Enter/Space and focus outline; do not auto-open items on scroll. Until reader implementation passes, fourth answer ends “The reader specification requires this; see implementation status.” Proof: runtime capability manifest controls that sentence. CTA “Review implementation status” → `/demo/status`, event `demo_status_open`. Mobile full width. No loading except status page; errors show unknown capability, never a positive checkmark. Motion 150ms, disabled under reduced motion.

### S10 — Final CTA and footer

Purpose: lead into the one workflow being demonstrated.

```text
Bring a question. Leave with the evidence and its limits.

Open the demo workspace
Read the source example

Independent concept prepared by Cristian Quintanilla for In Practise. Public and synthetic corpus only. No private In Practise content, customer accounts or subscription services are connected.
```

CTA `/app` and `#evidence`, event `research_sample_click`. Footer: source manifest, method, implementation status, official In Practise site (external). Do not invent a privacy policy; show actual demo retention on `/demo/method` from 05. Static states; wrapping links on mobile; no motion. No company logo wall or backer relationship attributed to this demo.

## 5. SEO block

Private preview: return `X-Robots-Tag: noindex, nofollow` on every route, omit from sitemaps, and set the following metadata in delivered HTML. Noindex is indexing guidance, not authentication. Use the deployed demo origin for absolute URLs; `https://demo.example.invalid` below is a reserved placeholder, explicitly UNVERIFIED and blocked by the build check until replaced. Do not canonicalize this independent app to inpractise.com.

```html
<html lang="en">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>In Practise Research Demo | Independent Concept</title>
  <meta
    name="description"
    content="Explore an independent research demo with public and synthetic sources, paragraph citations, a members workspace and a read-only MCP workflow."
  />
  <meta name="robots" content="noindex, nofollow" />
  <link rel="canonical" href="https://demo.example.invalid/" />
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    content="Research evidence, with its context | Independent demo"
  />
  <meta
    property="og:description"
    content="A code-project concept for In Practise. Public and synthetic corpus; no private In Practise research."
  />
  <meta property="og:url" content="https://demo.example.invalid/" />
  <meta
    property="og:image"
    content="https://demo.example.invalid/og-demo.png"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="Independent research demo showing a question and two synthetic source passages"
  />
  <meta name="twitter:card" content="summary_large_image" />
</html>
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://demo.example.invalid/#website",
  "url": "https://demo.example.invalid/",
  "name": "In Practise Research Demo — Independent Concept",
  "description": "Independent code-project demo using public and synthetic evidence.",
  "inLanguage": "en"
}
```

Generate the OG image from the actual implemented source panel, with the disclosure baked into the image. Do not use a screenshot of private research. Root metadata must be prerendered; client-only head mutation is insufficient for social crawlers. A later authorized production landing would use 01's production title/description/canonical and owner-approved Organization schema. That is a separate publication decision. Structured data must match visible content; see [Google's guidance](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), supplied in 01.

## 6. Performance and accessibility acceptance

Targets: landing initial JavaScript ≤150 KB gzip, critical CSS ≤35 KB gzip, initial total transfer ≤500 KB, initial fonts ≤80 KB combined, optional hero media ≤120 KB. Split member/admin/chat bundles; do not import PDF readers, charts, Supabase client or assistant runtime into the static hero. Load enhanced source panels on demand. Reserve media and loading-state dimensions. No third-party tracker, calendar or chat widget on the critical path.

Record three cold-load Lighthouse mobile runs with Chrome/runtime version, network/CPU profile and median LCP/CLS; target LCP ≤2.5s and CLS ≤0.1. Report laboratory results as laboratory results. Field INP ≤200ms and good Core Web Vitals at p75 require sufficient real traffic and remain UNVERIFIED on a hiring demo. Threshold reference: [Web Vitals](https://web.dev/articles/vitals), supplied in 01. Reject a payload regression even if the Lighthouse score stays high.

Accessibility floor: WCAG 2.2 AA, semantic landmarks, one H1, skip link, keyboard-only completion, accessible dialogs, non-color status, normal text contrast ≥4.5:1, large text ≥3:1, UI/focus contrast ≥3:1 where applicable, visible focus never obscured, preferred 44×44px targets, 200% text zoom and 400% page zoom with reflow at 320 CSS pixels. Allow pinch zoom. Announce only meaningful async transitions. Verify keyboard and VoiceOver reading order at 390×844 and desktop; run axe with zero serious/critical violations. Automated success alone is not conformance. Reference: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), supplied in 01.

## 7. Verification and completion boundary

Specification verification command, from `code-project`: `python3 verify_specs.py --document 03`. The supporting verifier is delivered with 06; it checks the prompt word limit, sections, links, fixtures and input integrity. It does not verify a rendered site. Future implementation commands and exact tests are defined in 06; their status is NOT RUN until an application exists.

## 8. Ready-to-paste Lovable prompt

<!-- LOVABLE_PROMPT_START -->

```text
Build an independent In Practise hiring-demo landing in React, Vite, Tailwind and shadcn/ui. Follow 03-lovable-landing-brief.md as the copy and interaction authority. Use an editorial research style: warm paper #F7F6F2, ink #17212B, muted blue #244C66, Source Serif 4 headings/quotes, system sans controls, fine rules and compact metadata. No market charts, gradients, animated counters, customer logos, invented metrics or pricing.

Keep a persistent notice: “Independent demo. Public and synthetic sources; no private In Practise research.” Use a text wordmark identifying the concept. Build S01–S10 in order: navigation, hero with evidence, research relevance, Ask IP-style example, MCP workflow, library preview, method, access routes, FAQ, final CTA/footer. Use the exact English copy in the brief.

The hero asks “What makes Northstar difficult to replace?” Show two selectable synthetic passages: “For complex installations, migration requires rebuilding integrations and retraining teams.” and “Our small deployment moved in six weeks because we used only standard connectors.” Label this a curated example, not a live answer. Source buttons open exact paragraph context. The no-evidence example asks about next year's retention and says the sources do not establish it.

Use desktop answer/source columns and an accessible mobile source dialog. Provide meaningful empty, loading, cancelled and error states; do not fake streaming or progress. Preserve keyboard navigation, visible focus, text selection, zoom and reduced motion. Keep initial JavaScript under 150 KB gzip by deferring workspace and chat code.

Link workspace buttons to /app and connector explanation to /demo/mcp. Create static /demo/method and /demo/status pages with truthful unimplemented states. Do not wire payments, email, external analytics or sales forms. Add noindex metadata and JSON-LD from the brief; deployment must replace the reserved example origin. Use local fixtures and a typed API adapter so the backend contracts in 04 and 05 can replace fixtures without redesigning the UI. Generate the UI only; privileged authorization, ingestion, evidence validation and MCP require reviewed server implementations.
```

<!-- LOVABLE_PROMPT_END -->

## 9. Follow-up prompts, one per section

Paste each paragraph independently after providing this brief as context.

```text
S01: Implement the exact navigation/disclosure contract. Check every anchor, mobile focus trap and return focus. Ensure workspace navigation requires explicit organization selection when needed. Log only the specified local events.
```

```text
S02: Build the hero using the exact S1/P2 and S2/P2 synthetic quotes, dates and roles. Make both sources keyboard-selectable and open the paragraph context. Keep the curated-example label visible at every width.
```

```text
S03: Build the three research-relevance rows with the supplied copy. Link to the actual source manifest and fixture reader. Do not show public filing cards before ingestion is verified.
```

```text
S04: Implement supported and insufficient-evidence tabs, source panel and live-demo navigation. Do not auto-submit a paid model request. Treat cancelled, malformed and failed streams separately from a valid no-evidence answer.
```

```text
S05: Build the MCP workflow section and static walkthrough route from 05. Clearly identify the independent demo server. Hide connection controls until runtime capability status confirms implementation; no credential field belongs on this landing.
```

```text
S06: Implement explicit search, clear filters and preview cards for the three fictional companies. Use the specified loading/empty/error text and privacy-safe local events. Preserve search state on back navigation.
```

```text
S07: Implement the four method rows, source/limits page and clearly external policy link. Show implementation status honestly. Do not claim compliance certification or real expert vetting for synthetic interviews.
```

```text
S08: Implement three access-route cards with exact destinations and copy. They are not pricing plans. There is no checkout, lead form or simulated successful sale.
```

```text
S09: Use all six FAQ questions and answers. Gate the reader-capability sentence on verified implementation status. Test keyboard operation and reduced motion; unavailable capability status must read unknown.
```

```text
S10: Build the final CTA/footer and finish preview metadata. Preserve disclosure in the OG image and every route. Run the landing tests specified in 06 and report measured results, remaining failures and any reserved deployment URLs.
```

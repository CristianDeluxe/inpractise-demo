# In Practise: market research and landing-page brief

Research date: 2026-09-13. Audience: In Practise product and engineering; input for a separate Lovable build. Status: completed public-source research and build brief. Authenticated product checks and owner-supplied terms remain explicitly unverified.

## Evidence rules and scope

This report audits the public, logged-out surface. It does not test a paid account, submit forms, or call authenticated APIs. VERIFIED means a public first-party page explicitly documents the capability; it does not mean the capability was exercised. OBSERVED means the fetched public surface exposed the element. UNKNOWN / UNVERIFIED means this research did not establish it. A product not exposing something publicly is not proof that it lacks it. Marketing claims remain vendor claims, not independently measured outcomes. All linked external sources were accessed on 2026-09-13 unless stated otherwise. Publication dates are recorded separately when available. Prices are quoted only with a public source and billing basis.

The brief supplies draft copy, not approved production claims. Effort and commercial impact are author estimates and hypotheses. No conversion lift, ROI, customer count, security certification, or legal assurance is inferred. Sources are paraphrased; exact quotations are intentionally short.

## Executive findings

The two launch dates in the briefing are supported by first-party announcements: Ask IP on June 22, 2026, and the MCP launch/API upgrade on May 5, 2026. Ask IP already positions retrieval around source quotations and abstention; an AI assistant or MCP server should therefore not be listed as a missing feature. Sources: [Ask IP announcement](https://inpractise.com/articles/ask-ip-ai-search), [MCP/API announcement](https://inpractise.com/articles/ip-library-mcp-and-api), accessed 2026-09-13.

The central research question is how well the public buying journey demonstrates these existing capabilities, and which adjacent workflows are actually evidenced at competitors.

- **First priority:** demonstrate the existing research and Ask IP evidence workflow before asking for a sales conversation.
- **Distribution:** make API/MCP access a visible product path. It is strategically important but not exclusive: multiple competitors already document connectors (section 2.1).
- **Product restraint:** validate shared projects, quote bundles and alerts in a member account before calling them absent; existing notes, follows and watchlists already have public controls.
- **Market correction:** Fintool is acquired, while Stream and Sentieo belong in the AlphaSense family; do not treat these as independent current offers.
- **Build scope:** use the supplied copy and labelled two-source demo. No invented prices, customers, endpoints, private transcripts or production performance claims.

## 1. Current public surface

### 1.1 Homepage: what a prospective subscriber encounters

Observed order: hero and two CTAs; three quality pillars (company selection, executive sourcing, interview craft); library explanation separating staff-led research and partner interviews; podcast links; institutional-customer/AUM assertion; MITIMCo backing; account, compliance, service and company footer links. Exact hero: “Primary Research for Long-Term Investors.” CTAs: “Contact Sales” and “Explore the library.” Supporting copy identifies fundamental equity investors. There is no price card, named customer testimonial, Ask IP demonstration, or MCP section in the fetched homepage body. The AUM language is a vendor assertion, not audited proof. MITIMCo is identified as a backer; do not present it as a customer. [Homepage](https://inpractise.com/), accessed 2026-09-13.

**Interpretation:** the positioning is coherent but abstract. The page makes visitors leave to assess the research itself. Move an actual research question, its source evidence, and access choices into the buying journey. Preserve the selective editorial identity; a generic financial-terminal dashboard would obscure it.

### 1.2 SEO and HTML-level technical audit

A direct `curl -L -A 'Mozilla/5.0' https://inpractise.com/` fetch succeeded with HTTP 200 after a default Python request returned 403. The inspected response contained 142,551 HTML bytes, 43 script elements, 38 external-script references, three stylesheet links, and two JSON-LD blocks. These are response observations, not compressed transfer size, executed JavaScript size, request-waterfall timings, or Core Web Vitals. [Live HTML](https://inpractise.com/), accessed 2026-09-13.

| Element              | Observation                                                                                                                        | Implication / proposed action                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Title                | `Primary Research for Long-Term Investors \| Explore the library \| In Practise`                                                   | Clear audience; length and repeated navigation language leave room for a tighter title.                 |
| Description          | Present; describes primary interviews, analysis and an investor community.                                                         | Does not explain evidence retrieval or agent access. Rewrite around the actual research workflow.       |
| Canonical and robots | Canonical points to `https://inpractise.com`; indexing and following allowed.                                                      | Preserve a single canonical URL.                                                                        |
| Social metadata      | OG title, description, site name and website type present; Twitter summary card. No `og:image` or `og:url` found in this response. | Supply a deliberate preview image and URL. Absence is limited to this HTML snapshot.                    |
| Structured data      | Validly parseable WebSite and Organization objects; organization logo and social identities included.                              | Schema already exists. Extend only when content warrants it; do not call this a missing-schema problem. |
| Heading structure    | One H1; several H2/H3 groups; footer uses an H2.                                                                                   | Semantic structure exists. A screen-reader review should decide whether footer headings are useful.     |
| Zoom                 | Viewport includes `maximum-scale=1, user-scalable=no`.                                                                             | Remove zoom restrictions in the new brief; verify actual pinch and browser zoom behavior separately.    |
| Image delivery       | Responsive image candidates, decorative empty alt text, eager hero-background preload and lazy later backgrounds.                  | Positive responsive/lazy patterns; verify whether the decorative hero image deserves preload priority.  |
| Script surface       | Many Next.js chunk references for a comparatively short marketing page.                                                            | Investigate route-level payload and hydration cost; script count alone does not establish slowness.     |

The table records measurements from the same [homepage HTML](https://inpractise.com/), accessed 2026-09-13. Screenshot layout, responsive menu expansion, LCP, INP, CLS, contrast, keyboard behavior and third-party runtime calls were not measured: **UNVERIFIED**. Technical measurements were locally parsed from the response; they are not a Lighthouse score.

### 1.3 Product and content map

| Surface                                                                                                            | Logged-out evidence                                                                                                                                                                | Access boundary / implication                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Explore](https://inpractise.com/explore)                                                                          | Keyword field; company, business-model, moat, GICS, country and market-cap filters; dated cards; load-more control. Snapshot said 20 of 3,599 results.                             | That is a displayed result count, not a verified count of unique interviews or total contracted inventory. Search execution was not exercised.   |
| [Company learning journeys](https://inpractise.com/explore/companies)                                              | Company cards distinguish research pieces from interviews and expose watchlist controls. Staff coverage is distinguished from broader partner coverage.                            | Watchlists already have a public UI presence. Persistence, notifications and paid entitlements are UNVERIFIED.                                   |
| [IP Research](https://inpractise.com/explore/enterprise)                                                           | Separate value-chain, company-profile and research-analysis categories; recent examples include Perimeter Solutions and CCC; Deere software coverage appears as a company profile. | Opened CCC and Deere pages expose contents/introductory material and a sales gate. These are existing assets to surface, not features to invent. |
| [Workday interview sample](https://inpractise.com/articles/workday-api-strategy-and-internal-ai-agent-development) | Publication and interview dates, company tags, PDF control, hidden executive profile, summary gate, transcript excerpt and sales route.                                            | Public excerpt differs from the full interview. A visible PDF button is not proof that a visitor can download the full document.                 |
| [Sezzle interview sample](https://inpractise.com/articles/sezzle-subscription-led-bnpl-and-dollar0-mdr-model)      | Excerpt, email form and advertised access to 50+ sample interviews.                                                                                                                | This is a sample-library offer, not proof of a timed unrestricted trial.                                                                         |
| [Weekly updates](https://inpractise.com/explore/weekly-updates)                                                    | Dated newsletter archive; research commentary and product announcements.                                                                                                           | A useful discoverable acquisition surface, also where major product news currently lives.                                                        |
| [Feed and podcast setup](https://inpractise.com/feed)                                                              | Distinct paid-interview and free-Fieldwork feeds; on-site audio, Spotify linking and RSS instructions.                                                                             | Third-party listening is not evidence of a native In Practise mobile app. Account-specific setup was not performed.                              |
| [Ownership tracker](https://inpractise.com/insider)                                                                | Landing copy describes tracking CEO share transactions and comparing purchases with existing holdings.                                                                             | Do not claim IP lacks all ownership/monitoring tools. Actual tracker dataset, freshness and authenticated behavior remain UNVERIFIED here.       |
| [IP References example](https://inpractise.com/checks/sap-christian-kleins-leadership-culture-and-ai-strategy)     | Management-reference product describes founding membership, credit packages and single reports; separate from the core library.                                                    | No current numeric customer price verified. Production-cost estimates in the article are not subscription prices.                                |

Article-level checks: [CCC value chain](https://inpractise.com/articles/ccc-apd-unit-flow-process), published 2026-07-30, and [Deere profile](https://inpractise.com/articles/deere-and-co-software-portfolio), published 2026-01-06. All sources in this table accessed 2026-09-13. Public article chrome also exposes highlights/notes on the [Ask IP announcement](https://inpractise.com/articles/ask-ip-ai-search). This establishes a control, not tested saved notes, collaborative research or quote-sharing permissions.

### 1.4 Ask IP: documented promise and remaining questions

The June 22 launch describes proprietary-library retrieval, original quotations, links to evidence, and ranking informed by company characteristics. Its clearest constraint is “No data = no answer.” Results are intended to open the underlying interview alongside the answer; reference articles appear in a side column. The announcement places the tool on the homepage and within individual interviews, initially for subscribers. The fetched logged-out homepage does not expose that experience, so the member homepage and public landing page must not be conflated. [Ask IP announcement](https://inpractise.com/articles/ask-ip-ai-search), published 2026-06-22, accessed 2026-09-13.

**UNVERIFIED:** current model, retrieval evaluation, abstention frequency, answer latency, corpus entitlements by plan, coverage of IP References, prompt retention, training usage, export behavior and member navigation labels. A documented refusal principle is not a measured refusal guarantee. The redesign should demonstrate the existing evidence interaction, then link to a concise account of its limits.

### 1.5 MCP server and API: shipped, but insufficient public buying detail

The May 5 announcement explicitly describes an MCP launch and an upgraded API, institutional access through internal systems and external assistants, and research alongside a firm's other material. It describes quote retrieval and comparisons with management statements. This supports a shipped offering, not a speculative roadmap. [MCP/API announcement](https://inpractise.com/articles/ip-library-mcp-and-api), published 2026-05-05, accessed 2026-09-13.

| Buyer/developer question | Verified public answer                                                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Availability             | Announced as launched; access inquiry is sales-led.                                                                                                      |
| Authentication           | **UNKNOWN:** OAuth, API keys, service accounts, token rotation and scopes not established.                                                               |
| Endpoint and transport   | **UNKNOWN:** no verified base URL, MCP endpoint or transport specification found.                                                                        |
| Exact tool surface       | **UNKNOWN:** no verified `tools/list`, tool names, argument schemas or response examples. Describe supported use cases, never fabricated function names. |
| Pricing and limits       | **UNKNOWN:** minimum contract, seat inclusion, usage charges, rate limits, query caps and API/MCP surcharge not verified.                                |
| Data rights              | **UNKNOWN:** redistribution, storage, caching, model-training rights and per-product coverage require the actual agreement.                              |
| Operations               | **UNKNOWN:** versioning, SLA, uptime, support and deprecation policy.                                                                                    |

The announcement, navigation and targeted searches for In Practise API/MCP documentation did not establish a public technical reference. That is a **documentation-discoverability gap**, not evidence that private docs do not exist. Do not confuse IP Transcribe's separate product and prices with the investment library.

### 1.6 Conversion and onboarding

[Sales](https://inpractise.com/sales) offers a personal demo and promises contact within 24 business hours. It explicitly addresses professional investors. The fetched form requires business email, company, name, international phone, interest selection and role selection; an additional-comment field is optional. Its submit label is generic. No form was sent; confirmation, routing, calendar availability, qualification logic and actual response time are **UNVERIFIED**. Accessed 2026-09-13.

[Signup](https://inpractise.com/signup) says “Access our Free Plan and Preview our Paid Service.” It offers Google/Microsoft sign-in and email; password is optional, with an emailed sign-in link as the alternative. Registration references terms and privacy. Completion and email delivery were not tested. Accessed 2026-09-13.

**Recommendation:** preserve self-service sampling and institutional sales as distinct paths. Explain what the sample unlocks beside the CTA; explain what a demo covers before asking for a phone number. Test making phone optional if the sales team does not require it. Avoid promising instant paid access, a trial duration or no-card terms that were not verified. Current numeric core-library price is **UNKNOWN**. A [2022 newsletter](https://inpractise.com/articles/newsletter-20220627) contains an old annual offer; it is historical and must not populate a 2026 pricing card. Accessed 2026-09-13.

### 1.7 Trust and sourcing

The published [compliance policy](https://inpractise.com/about/compliance) describes identity/experience vetting, restrictions on current target-company employees and recently departed executives, engagement attestations, transcript review, escalation and recordkeeping. It includes a six-month departure restriction. This is the company's stated process, not a legal opinion or independent certification. Accessed 2026-09-13.

**Needs clarification before new copy:** the same policy mentions distribution after three to five business days and a later ten-day client review period; explain which workflow each applies to. Do not promise a publication SLA from those statements. The [executive page](https://inpractise.com/executives) describes paid participation and optional anonymity. The correct marketing treatment is to explain relevant experience, conflicts and review, while acknowledging the limits of an individual's perspective. Accessed 2026-09-13.

## 2. Competitive landscape as of 2026-09-13

### 2.1 Market boundaries and changes that matter

This is a set of overlapping research jobs, not 21 interchangeable subscriptions. Expert networks supply interviews; AI workbenches turn heterogeneous evidence into deliverables; financial-data products support models and monitoring. IP can be a distinctive input to the latter two categories as well as a destination itself.

**Do not count acquired brands as independent competitors.** AlphaSense's own acquisition material identifies Stream by Mosaic and Sentieo; Tegus and BamSEC sit in its expanded offering. Fintool's app now displays an acquisition announcement and its main domain redirects to Microsoft 365. Microsoft's acquisition history dates Fintool to April 18, 2026. These are current ownership checks; old feature descriptions do not establish a separately purchasable 2026 product. [AS2][AS3][AS4][FI1][FI2]

**MCP is a distribution opportunity, not an exclusive moat.** Third Bridge, GLG, Guidepoint, AlphaSense, Aiera, Quartr, Daloopa and Fiscal.ai publicly document MCP access. AlphaSense labels its connector beta and requires account enablement. The strongest IP proposition is therefore selective proprietary evidence, faithful source retrieval and convenient delivery through the analyst's existing tools. The protocol alone is replicable. [TB2][GL2][GP2][AS5][AI1][QU2][DA1][FS1]

All reference identifiers below resolve to first-party URLs in the source register; each was accessed 2026-09-13. Product observations are based on fetched text, documentation and explicitly identified search-cache fallbacks. No paid competitor account was exercised.

### 2.2 Expert networks and primary research

| Competitor                       | Positioning, AI and trust                                                                                                                                                                                                                                                      | Public pricing / purchase                                                                                                     | Landing-page structure and evidenced advantage over IP's public story                                                                                                                                                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AlphaSense, including Tegus**  | Broad research platform spanning expert transcripts, filings, broker material, financial data and internal knowledge. Generative Search and Deep Research produce cited synthesis; source snippets are linked.                                                                 | Sales/trial motion; numeric current platform price **UNKNOWN**. MCP beta requires a subscription and account-team enablement. | Platform promise → workflow modules → data breadth → customer proof → resources → trial. Public developer reference covers tools, limits and entitlement exclusions. Clearer multi-source workflow and technical evaluation surface; not proof IP lacks private equivalents. [AS1][AS2][AS5]                             |
| **Third Bridge Forum / Library** | Human-led research plus custom expert calls, surveys, library and data delivery. AI search/summarization and MCP retrieval; MCP page promises citation-backed context.                                                                                                         | Trial request / consultation; numeric price **UNKNOWN**.                                                                      | Audience and service navigation → expert-quality/service explanation → library → testimonials → service/audience pathways. Dedicated MCP navigation, landing page and trial route make integration immediately discoverable. Survey and call-service breadth exceeds what this IP crawl establishes. [TB1][TB2]          |
| **GLG**                          | Expert calls, expert content, surveys and advisory access; myGLG, AI-moderated calls and MCP. MCP combines the customer's call transcripts with GLG content and links to underlying conversations.                                                                             | Contact-led; numeric price **UNKNOWN**.                                                                                       | Platform hero → timely product announcements → services → experts → compliance/social proof → persona-specific inquiry. Publicly describes a route from a research question to a new expert engagement, with both client and expert portals. IP's equivalent end-to-end request workflow was not established. [GL1][GL2] |
| **Guidepoint**                   | Expert network plus Guidepoint360 library and AskGP. Describes passage-linked synthesis, agreement/disagreement across interviews and transition to live expert access.                                                                                                        | Trial request; numeric price **UNKNOWN**.                                                                                     | Research promise → transcript/network/AI modules → platform explanation → trial. The library product page walks through question, synthesis, source inspection and next engagement. Better public demonstration of the analyst's full task; MCP/API and mobile delivery are documented separately. [GP1][GP2][GP3]       |
| **Stream by Mosaic**             | Historical expert-transcript business acquired by AlphaSense; its call-service page connects existing transcripts with follow-up expert calls. Treat present capabilities through the parent, not a separate vendor.                                                           | Independent 2026 price **UNKNOWN**; historical call bundles are not a current price quote.                                    | No independently verified current standalone landing funnel. Historical transcript-to-expert CTA is the useful design precedent: turn an unanswered question into a specific follow-up. Current Stream-specific availability and branding require confirmation. [AS3][AS4]                                               |
| **Atheneum**                     | Expert matching, interviews, surveys and centralized client project management. Its expert Hub app handles engagement logistics. Current public generative-answer model, citation granularity and MCP are **UNVERIFIED**. The `.ai` domain is not evidence of an AI assistant. | Inquiry-led; numeric price **UNKNOWN**.                                                                                       | Expert-network hero → service formats → delivery principles → testimonials → digital products → industry content. Explicit engagement management and client/expert role separation are stronger than IP's observed public explanation. Expert Hub is an expert-side app, not a verified analyst-reading app. [AT1][AT2]  |

### 2.3 AI research agents and financial workbenches

| Competitor                        | Positioning, AI and citation/trust model                                                                                                                                                                                                                                                  | Public pricing / status                                                                                                             | Landing-page structure and opportunity for IP                                                                                                                                                                                                                                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Hebbia**                        | Finance-oriented institutional AI. Matrix supports repeatable analysis across many documents; Max is surfaced prominently on the current homepage. Product documentation describes citations throughout a workflow and source previews.                                                   | Pricing page is demo-led; numeric price **UNKNOWN**.                                                                                | Institutional promise → customer logos → substantial product/workspace examples → data connections → security/demo. Demonstrates actual team work and outputs. IP should show one source-grounded research task with comparable specificity, without copying the scale or productivity claims. [HE1][HE2][HE3]                                               |
| **Rogo**                          | Finance-specific agents connected to firm systems and financial sources. Documents in-cell spreadsheet citations, SharePoint sourcing, rich exports and Projects/Deal Room development.                                                                                                   | Bespoke enterprise deployment; numeric price **UNKNOWN**.                                                                           | Institutional positioning → client testimony → domain fit → agent execution/data integration → enterprise security → inquiry. Shows a path to usable financial deliverables, beyond retrieval. Acquisition-driven extensions announced in August should not all be assumed available to every account. [RO1][RO2][RO3]                                       |
| **Brightwave**                    | Project-based research agents for reports, grids, presentations and spreadsheets, using uploaded and connected sources. Documents passage/cell citations, preserved export references and a citation-audit classification. Audit is model evaluation, not an independent truth guarantee. | Current numeric price **UNKNOWN**. An older blog advertised a seven-day trial; current terms were not established.                  | Root-page extraction yielded insufficient content to audit visual section order. Public docs provide an unusually concrete create-project → add-sources → research → review/export journey. Sharing, revisions and citation-aware outputs are valuable product precedents. [BW1][BW2][BW3][BW4][BW5]                                                         |
| **Fintool**                       | **Acquired by Microsoft.** Founder announcement describes its pre-acquisition agents producing Excel models, PowerPoint decks and Word memos from financial research. Current independent service, citation UX and feature availability are **UNVERIFIED**.                               | No current standalone price verified. Main-domain redirect and app acquisition notice replace an ordinary buying funnel.            | A historical workflow precedent, not a live independent landing-page benchmark. The strategic implication is that analysts' document/spreadsheet tools are becoming research destinations. Do not promise that every historical Fintool feature already exists inside Microsoft 365. [FI1][FI2]                                                              |
| **Aiera**                         | Permissioned financial-content access layer with enterprise APIs/MCP, enrichment, embeddable components and desktop/mobile products. Emphasizes provenance, entitlement governance and auditability. Exact answer-to-passage UX varies by delivery surface and is **UNVERIFIED** here.    | Demo / enterprise inquiry; numeric price **UNKNOWN**.                                                                               | Governed-content promise → integration routes → coverage → governance → updates → demo. Strong precedent for explaining content rights and delivery options alongside the API, not relegating integration to a news post. [AI1]                                                                                                                              |
| **Perplexity Finance**            | Finance search over market data, filings and earnings material inside a broader cited-answer product. May 2026 developer changelog documents `finance_search` in its Agent API. A general API and a public Finance-page endpoint are different claims.                                    | Core search free; Pro $20/month or $200/year. Not a separate Finance license or API-price quote.                                    | Live Finance route returned an uninformative shell, so its current visual order is **UNVERIFIED**. First-party release notes describe company financial pages, historical data, filings and research Spaces. Low-friction discovery and saved research are relevant; open-web synthesis is not equivalent to proprietary executive evidence. [PE1][PE2][PE3] |
| **OpenAI financial offerings**    | ChatGPT for Financial Services announced September 10, 2026: financial data, research/model/artifact creation and granular source review. Enterprise-based workspace administration. Some third-party entitlement integrations are described as work underway, not all shipped.           | Separate sales-led plan for eligible financial institutions; numeric price **UNKNOWN**. Do not substitute a consumer ChatGPT price. | Announcement/product journey: institutional purpose → data partners → source review → analysis → firm-template outputs → governance → availability/sales. Puts entitlement and adoption questions in the buyer's path. General OpenAI APIs are separate from bundled financial-data rights. [OA1][OA2]                                                       |
| **Anthropic financial offerings** | May 5 announcement documents finance-agent templates, Office add-ins and financial-data connectors/MCP apps; the earlier Excel update describes navigable cell references. Some integrations are previews or forthcoming.                                                                 | Bespoke financial-services costs, partner-data charges and all-in institutional price **UNKNOWN** in reviewed sources.              | Task examples → templates → Office workflow → data partners → access. Useful benchmark for a concrete connector task and contextual workflow, rather than a list of model logos. Do not conflate an MCP client/ecosystem with a vendor publishing its own proprietary research server. [AN1][AN2]                                                            |

### 2.4 Data products and research surfaces with useful UX

| Competitor                       | Positioning, AI and trust                                                                                                                                                                                                        | Public pricing                                                                                                                                                                                                                                                                                                                   | Landing structure / distinctive capability                                                                                                                                                                                                                                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Quartr**                       | Public-company IR content structured for AI; Pro, API, MCP and mobile. AI chat, live transcripts, search and alerts are separately explained. It constrains its MCP corpus to company-published IR material.                     | Pro and API sales-led; multi-seat/bundle options. Numeric price **UNKNOWN**.                                                                                                                                                                                                                                                     | Data-infrastructure hero → delivery products → proof/use cases → feature and dataset detail → demo. Strong developer-doc/status navigation and detailed feature pages. Earnings/IR streaming and transcript/audio integration complement IP's operator perspective. [QU1][QU2][QU3][QU4]                                                   |
| **Koyfin**                       | Financial-data terminal for investors/advisors: dashboards, screeners, portfolios and research. Its own transcript article documents AI summaries and a route to full transcripts; exact claim-level citations **UNVERIFIED**.   | Free $0; fetched page displays Plus $39/month, Premium $79/month, Advisor Core $209/month and Advisor Pro $299/month. Annual toggle exists; extracted text did not prove its selected state, so total annual billing is **UNKNOWN**. Teams custom.                                                                               | Investor/advisor hero → product/audience explanation → coverage/features → free signup; dedicated comparative pricing and team page. Saved dashboards, shared watchlists and configurable monitoring are clearer than IP's public description. “Ask ChatGPT” marketing links are not evidence of a Koyfin MCP server. [KO1][KO2][KO3][KO4] |
| **Fiscal.ai (formerly FinChat)** | Financial statements, segments/KPIs and AI research terminal plus API/MCP. Rebranding confirmed by its own article; API docs expose company, financial, IR-event and source-document interfaces.                                 | Current paid terminal price **UNKNOWN**: main/pricing fetches blocked (403/429). An old indexed pricing variant shows $24/$64 monthly-equivalent cards, but crawl age and toggle state make it unsuitable as a current quote. API trial independently verified: 100 companies, 250 calls/day, no card, same limits via REST/MCP. | Full current homepage section order **UNVERIFIED**. Indexed pricing uses plan cards, feature comparison and team billing. Public API onboarding and explicit trial limits are the useful verified contrast to IP's discoverability. [FS1][FS2][FS3]                                                                                        |
| **Daloopa**                      | Financial-data infrastructure and research/model workflows; source-linked numerical data, Excel add-in, Scout, API and MCP. Marketing accuracy claims are not independent audit results.                                         | Free plan plus sales-led Fundamentals API, Core and Premium options; numeric paid price **UNKNOWN**. Feature inclusion depends on plan.                                                                                                                                                                                          | Trust/data promise → research cycle → provenance → individual products → benchmark → conversion. Makes source linkage a visible product benefit. IP can apply that discipline to quotation provenance without trying to recreate a numerical-data terminal. [DA1][DA2]                                                                     |
| **BamSEC**                       | Fast research over SEC filings and earnings transcripts. Exact-text links, highlighting, table export, document comparison and alerts provide inspectable evidence workflows. Standalone generative-AI assistant **UNVERIFIED**. | Pro $69/month **billed annually**; free tier and trial route. Team requests route to AlphaSense.                                                                                                                                                                                                                                 | Task-led hero → specific research obstacles/features → institutional audience proof → trial. A strong model for one concrete action per module and durable links to a passage. Keep its parent-company relationship explicit. [BA1][BA2]                                                                                                   |
| **Public Comps**                 | Focused SaaS metrics and valuation comparisons; charts can expose formula and underlying data source. Current generative AI/citation assistant **UNVERIFIED**.                                                                   | Homepage displays Pro $99/month; Enterprise contact-led. No separate annual amount inferred.                                                                                                                                                                                                                                     | SaaS-specific promise → customer proof → search/filter/compare/trace walkthrough → financial/export features → testimony → plans → newsletter. Enterprise advertises API access, spreadsheet plugins and centralized team billing. A narrow workflow can explain value without a broad OS claim. [PC1]                                     |
| **Sentieo**                      | Acquired AlphaSense research technology; acquisition announcement describes document search, monitoring, extraction and Table Explorer. Historical descriptions are not a verified separate 2026 product release.                | Current standalone price **UNKNOWN**.                                                                                                                                                                                                                                                                                            | Independent current landing funnel and current standalone API/MCP/mobile status **UNVERIFIED**. Evaluate modern capabilities under AlphaSense; keep Sentieo as a historical precedent for structured financial-document workflows, not another independent market-share row. [AS3]                                                         |

### 2.5 Capability inventory: delivery and integration

Legend: **V** = public vendor documentation/offer; **B** = documented beta or restricted enablement; **C** = consumes/integrates external tools, not evidence of its own data-serving MCP; **O** = public control observed, behavior not tested; **U** = UNVERIFIED; **H** = historical/acquired-brand evidence only. A public API here means a publicly documented or advertised programmatic offering, not anonymous access. These are not production test results.

| Product            | Own MCP server            | Public API offering                          | Agent integrations | Members / client portal    | Native mobile app             | Evidence                  |
| ------------------ | ------------------------- | -------------------------------------------- | ------------------ | -------------------------- | ----------------------------- | ------------------------- |
| In Practise        | V, sales access           | V, docs U                                    | V                  | O                          | U; podcast apps exist         | Section 1                 |
| AlphaSense/Tegus   | B                         | V                                            | V                  | V                          | V                             | [AS1][AS2][AS5]           |
| Third Bridge       | V                         | U; data-feed delivery V                      | V                  | V, Forum                   | U                             | [TB1][TB2][TB3]           |
| GLG                | V                         | In development; SFTP feed V                  | V                  | V, myGLG                   | V, **expert-side**            | [GL1][GL2][GL3]           |
| Guidepoint         | V                         | V                                            | V                  | V, Guidepoint360           | V                             | [GP2][GP3]                |
| Stream by Mosaic   | H, parent                 | H, parent                                    | H, parent          | H                          | H                             | [AS3][AS4]                |
| Atheneum           | U                         | U                                            | U                  | V                          | V, **expert-side**            | [AT2]                     |
| Hebbia             | U                         | U                                            | V                  | V                          | U                             | [HE1][HE2]                |
| Rogo               | U                         | U                                            | V                  | V, Projects/Deal Room      | U                             | [RO1][RO2][RO3]           |
| Brightwave         | U                         | U; connected APIs are inbound                | C                  | V                          | U; desktop app documented     | [BW1][BW3][BW4]           |
| Fintool            | H/U                       | H/U                                          | H                  | H; acquisition notice now  | U                             | [FI1]                     |
| Aiera              | V                         | V                                            | V                  | V                          | V                             | [AI1]                     |
| Perplexity Finance | U for Finance data server | V, Agent API finance tool                    | V                  | V, broader platform        | V, broader platform           | [PE1][PE2][PE3][PE4][PE5] |
| OpenAI finance     | C, partner MCPs           | V, general API; bundled-data rights separate | V                  | V                          | U for finance-specific parity | [OA1][OA2]                |
| Anthropic finance  | C, partner MCPs           | V, general platform                          | V                  | V                          | U for finance-specific parity | [AN1][AN2]                |
| Quartr             | V                         | V                                            | V                  | V                          | V                             | [QU1][QU2][QU3]           |
| Koyfin             | U                         | U                                            | U                  | V                          | V                             | [KO1][KO2][KO4]           |
| Fiscal.ai          | V                         | V                                            | V                  | V, API organization signup | U                             | [FS1][FS4]                |
| Daloopa            | V                         | V                                            | V                  | V                          | U                             | [DA1][DA2]                |
| BamSEC             | U as standalone           | U as standalone                              | U as standalone    | V                          | U                             | [BA1][BA2]                |
| Public Comps       | U                         | V, Enterprise                                | U                  | V                          | U                             | [PC1]                     |
| Sentieo            | H, parent                 | H, parent                                    | H, parent          | H                          | H                             | [AS3]                     |

### 2.6 Capability inventory: everyday analyst workflow

**Deep link** requires documented source navigation at least to a transcript/document; passage-level precision is identified when evidenced. A bibliography or source badge alone is insufficient. **Workspace** means a saved project/dashboard/notebook, not simply an account. **Teams** distinguishes shared work or administrative billing from mere availability to enterprise customers.

| Product            | Transcript/document deep links                      | Share / quote                              | Saved research workspaces               | Alerts / monitoring                          | Teams / seat management                           | Evidence             |
| ------------------ | --------------------------------------------------- | ------------------------------------------ | --------------------------------------- | -------------------------------------------- | ------------------------------------------------- | -------------------- |
| In Practise        | V, article and Ask IP source navigation             | O, highlights; external sharing U          | O, notes/watchlists; shared projects U  | O, follows/tracker; delivery U               | U                                                 | Section 1            |
| AlphaSense/Tegus   | V, cited snippets                                   | V                                          | V, workflows/notebook history           | V                                            | V, org/user usage; billing controls U             | [AS1][AS2][AS5][AS6] |
| Third Bridge       | V, citation-backed retrieval; precision U           | U                                          | U                                       | U                                            | U                                                 | [TB2]                |
| GLG                | V, original conversation                            | V, quote retrieval; share controls U       | U for research notebooks                | U                                            | U                                                 | [GL2]                |
| Guidepoint         | V, exact passage                                    | V, annotations; share controls U           | V, library workspace                    | U                                            | U for admin controls                              | [GP1]                |
| Stream by Mosaic   | H                                                   | H                                          | H                                       | H                                            | H                                                 | [AS4]                |
| Atheneum           | U                                                   | U                                          | V, engagement/project management        | U for research alerts                        | U                                                 | [AT2]                |
| Hebbia             | V, source previews                                  | V, published/team work; quote export U     | V, projects/Matrix                      | U                                            | V, collaboration; seat admin U                    | [HE1][HE3]           |
| Rogo               | V, source and in-cell references                    | V, rich export                             | V, Projects/Deal Room                   | U, proactive work partly roadmap             | V, deal teams; seat admin U                       | [RO2][RO3]           |
| Brightwave         | V, passage/cell                                     | V, permissioned/public output links        | V                                       | U for scheduled financial alerts             | V, project roles; seat billing U                  | [BW2][BW3]           |
| Fintool            | H/U                                                 | H, Office outputs                          | H/U                                     | U                                            | U                                                 | [FI1]                |
| Aiera              | U for passage-level links; sourced content V        | U                                          | V, dashboards; saved state U            | U                                            | V, entitlement controls; seat admin U             | [AI1]                |
| Perplexity Finance | V, source links; transcript precision U             | U in reviewed Finance sources              | V, Spaces/Projects                      | U in reviewed sources                        | V, enterprise seats/controls                      | [PE1][PE3][PE4]      |
| OpenAI finance     | V, highlighted passage/table                        | V, artifact output; share rights vary      | V, workspace; saved financial project U | U for finance-specific alerts                | V, SSO/SCIM/roles                                 | [OA1][OA2]           |
| Anthropic finance  | V, source links/cell references                     | V, Office output; share rights vary        | U for finance-specific saved workspace  | V, market-researcher template; delivery U    | V, enterprise offering; admin detail U            | [AN1][AN2]           |
| Quartr             | V, transcript search; passage links [QU5]           | V, highlighting; external share U          | V, watchlists                           | V, keywords/recaps                           | V, multi-seat; admin detail U                     | [QU3][QU4][QU5]      |
| Koyfin             | V, full transcript from summary                     | V, shared watchlists; quote sharing U      | V, dashboards/portfolios                | V                                            | V, admin purchasing                               | [KO2][KO3][KO4]      |
| Fiscal.ai          | V, API transcript/source interfaces; UI precision U | U                                          | V, dashboards, cached plan evidence     | V, webhooks; UI notification evidence cached | V, organization API; terminal team billing cached | [FS1][FS2][FS4][FS5] |
| Daloopa            | V, number-to-source; transcript-specific U          | V, spreadsheet outputs; sharing controls U | U                                       | U                                            | U for seat-admin specifics                        | [DA1][DA2]           |
| BamSEC             | V, specific text links                              | V, text link/highlights                    | U for project notebook                  | V                                            | V, parent team-sales route; admin U               | [BA1][BA2]           |
| Public Comps       | V, chart-to-data source; transcripts U              | V, CSV/Excel export; quote sharing U       | U                                       | U; newsletter alone is not alerts            | V, centralized billing                            | [PC1]                |
| Sentieo            | H                                                   | H                                          | H                                       | H                                            | H                                                 | [AS3]                |

**What this inventory does not show:** it does not prove any vendor's absence of an undocumented feature; it does not equate an expert-side mobile app with an analyst product; and it does not imply that all plan tiers include all advertised features. The sensible shortlist for the landing build is Quartr for product/data explanation, Guidepoint for the research sequence, BamSEC for passage-level utility and Brightwave for reviewable evidence outputs.

## 3. Prioritized gap report

### How to interpret a gap

**M = observed marketing gap:** a capability, explanation or conversion aid is not exposed on the audited IP homepage/buying surface. **P? = product opportunity requiring validation:** a competitor documents it, but IP's implementation is UNKNOWN. No P? row is an assertion that the authenticated IP product lacks the feature. **E = existing IP capability to explain better**, not new product work. This distinction is essential to a defensible answer to “what competitors have that IP does not.”

Effort below is an author estimate in focused engineering/design working days for a first usable increment, assuming the existing product and approved content are available. It excludes contract negotiation, data acquisition and a wholesale platform rebuild. Commercial impact is a directional hypothesis, not a forecast. High means likely to affect qualified evaluation or institutional expansion; medium means activation/retention or a narrower buying segment. Validate against baseline funnel and customer research before committing a roadmap.

### 3.1 Landing page and marketing surface

| Priority / ID | Gap and evidence status                                                  | Competitor precedent                                                                 | Why an analyst/buyer cares                                                        | First increment / effort estimate                                                             | Expected commercial effect and measurement                                                       |
| ------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| P0 / M1       | **M/E:** existing Ask IP interaction not demonstrated on public homepage | Guidepoint's question-to-passage sequence; Hebbia's visible work examples [GP1][HE1] | Can assess evidence quality without arranging a demo                              | Static, licensed question/quote/source demonstration; 3 days                                  | High: more qualified sample readers; measure demo completion → source-open → sample signup       |
| P0 / M2       | **M/E:** no prominent MCP/API product route on homepage                  | Quartr and Third Bridge MCP pages; AlphaSense technical reference [QU2][TB2][AS5]    | Knows whether IP fits the fund's existing tools                                   | Dedicated section and inquiry destination; 2 days, plus approved technical facts              | High for institutional leads; measure integration-page visit → qualified inquiry                 |
| P0 / M3       | **M:** access and packaging not explained together                       | BamSEC/Quartr/Daloopa plan pages [BA2][QU3][DA2]                                     | Distinguishes sample, library, research/reference products and integration access | Entitlement comparison using approved terms; 2 days                                           | High: fewer unsuitable leads and pricing surprises; measure qualified demo rate, not raw forms   |
| P0 / M4       | **M:** raw HTML restricts zoom                                           | Direct IP HTML observation, section 1.2                                              | Can enlarge text and read evidence comfortably                                    | Remove restrictions; keyboard/zoom validation; 1 day                                          | Accessibility baseline; measure defects and completion with zoom, not speculative revenue        |
| P1 / M5       | **M/E:** coverage proof lives mainly in Explore                          | Quartr dataset explanation; Public Comps focused workflow [QU1][PC1]                 | Can check whether a current holding is covered                                    | Searchable coverage module with dated examples; 3 days if search endpoint reusable            | High: coverage-qualified signups; measure company search → relevant content open                 |
| P1 / M6       | **M:** no compact sourcing/review explanation near the buying decision   | GLG sourcing/traceability; Aiera entitlement framing [GL2][AI1]                      | Needs enough detail to involve research operations/compliance                     | Plain-language process with policy links and questions; 2 days plus policy-owner review       | High for procurement progression; measure requested diligence materials and sales-stage movement |
| P1 / M7       | **M:** high-friction demo form and generic submission label              | Task-specific trials and public technical onboarding [BA2][FS1]                      | Wants to evaluate coverage before committing contact time                         | Specific demo CTA, intent carryover, test optional phone; 2 days                              | Medium/high; measure form errors, completion and accepted-meeting rate                           |
| P1 / M8       | **M/E:** strong research assets have weak homepage previews              | BamSEC task cards; Guidepoint workflow detail [BA1][GP1]                             | Understands how operator evidence changes a research question                     | One value-chain preview, one interview, one profile; 2 days                                   | Medium/high: sample consumption and repeat visits                                                |
| P1 / M9       | **M:** proof is broad assertion rather than inspectable outcome          | Hebbia/Rogo case-led product stories [HE1][RO1]                                      | Wants evidence of fit, not a generic institutional endorsement                    | Use backer attribution correctly; secure one approved use-case story; 2 days after permission | Medium: qualified conversion; avoid unapproved customer logos/AUM totals                         |
| P2 / M10      | **M:** social preview gaps and potential excess marketing-route work     | Direct IP HTML observation; not a competitor speed claim                             | Shared research links should be recognizable and quick                            | OG image/URL, payload baseline, deferred demo media; 2 days                                   | Medium: fewer broken previews and improved measured page experience                              |

The IP evidence for M1–M3 and M5–M10 is the scoped homepage/content/sales audit in section 1, not a site-wide absence claim. Zoom is a direct response-level finding. A/B tests require enough traffic; low-volume institutional funnels may need session observation and sales feedback before quantitative significance is plausible.

### 3.2 Product opportunities: validate before building

| Priority / ID | Capability and IP status                                                                                              | Who documents it                                                               | Analyst value                                                                     | Smallest useful increment / effort                                                                        | Expected commercial impact                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| P1 / P1       | **P?:** durable citation/quote bundles with entitlement-aware sharing. IP highlights exist; sharing persistence is U. | BamSEC exact-text links; Brightwave exported citations [BA2][BW2][BW3]         | Put a source-backed argument into an investment memo and let colleagues verify it | Saved bundle of source IDs, quote offsets, dates and notes; 8 days                                        | High retention/expansion; measure bundles reused and entitled colleagues opening evidence            |
| P1 / P2       | **P?:** shared research projects with roles and personal/team separation                                              | Brightwave project permissions; Hebbia teamwork [BW3][HE1]                     | Avoid repeated research and keep dissenting evidence with the thesis              | Team collection with owner/editor/viewer permissions; 12 days                                             | High seat expansion if demand exists; measure multi-user retained projects                           |
| P1 / P3       | **P?:** query-level alerts and change detection. IP has follows; delivery semantics U.                                | Koyfin configurable alerts; Quartr keywords/recaps [KO3][QU4]                  | Learn when new evidence affects an existing thesis                                | One saved topic query, digest and explicit notification settings; 8 days                                  | High retention; measure useful-alert ratings and subsequent source reading                           |
| P1 / P4       | **P?:** integration evaluation kit and usage/entitlement visibility                                                   | AlphaSense tools/limits/usage docs; Fiscal.ai limited free API [AS5][FS1][FS4] | Research engineering can estimate fit and procurement cost                        | Approved docs + read-only test corpus + usage view; 6 days if auth/usage already exist                    | High enterprise conversion; measure time to first successful approved query                          |
| P1 / P5       | **P?:** source provenance exposed as a consistent evidence object                                                     | Brightwave passage/cell citations; Daloopa number provenance [BW2][DA1]        | Know who said it, when, in what role and with what context                        | Normalize interview/publication dates, expert-role context, section link and rights marker; 7 days        | High trust/retention; measure missing metadata and citation-open success                             |
| P2 / P6       | **P?:** evidence comparison across operator accounts, including disagreement                                          | Guidepoint disagreement view; GLG contrast use cases [GP1][GL2]                | Avoid confirmation bias and distinguish conflicting experiences                   | User-selected comparison grid with quotes and dates; 10 days                                              | Medium/high; validate analyst utility before generalized autonomous synthesis                        |
| P2 / P7       | **P?:** bring-your-own documents inside IP with strict permissions                                                    | Rogo SharePoint; Brightwave uploaded/cloud sources [RO2][BW1]                  | Compare private notes with paid evidence                                          | Narrow private project upload and deletion lifecycle; 20 days plus security review                        | Potentially high but broad; first test whether existing IP MCP already satisfies this job outside IP |
| P2 / P8       | **P?:** answer/citation evaluation and reproducible review states                                                     | Brightwave citation audit [BW2]                                                | Detect partial support, missing context and retrieval failure                     | Internal labelled evaluation set and visible source-review status; 8 days                                 | Medium/high trust; evaluate support/abstention, never market an unmeasured accuracy rate             |
| P2 / P9       | **P?:** research entitlement and seat administration visible to fund admins                                           | OpenAI workspace controls; Public Comps team billing [OA2][PC1]                | Add/remove analysts and understand access without repeated support requests       | Seat/access overview and documented offboarding; 12 days                                                  | High for larger contracts; first establish what existing admin product does                          |
| P3 / P10      | **P?:** native offline reading/listening with synced passages                                                         | Quartr native highlighting; AlphaSense mobile [QU5][AS6]                       | Continue long interviews while travelling                                         | Validate demand with existing podcast/mobile web first; native increment estimate 25 days                 | Medium; low priority until retention evidence justifies two mobile platforms                         |
| P3 / P11      | **P?:** full numerical models, market-data terminal and Office agent output                                           | Daloopa, Rogo, Koyfin, acquired Fintool [DA1][RO2][KO1][FI1]                   | Integrate qualitative evidence into existing analysis                             | Prefer a cited export or licensed partner workflow; 8-day integration spike, not a full terminal estimate | Uncertain: expensive category expansion; no recommendation to rebuild their products                 |

### 3.3 What should explicitly stay off a “missing features” slide

Ask IP; original-source citations; refusal without relevant research; MCP/API access; company profiles; value-chain research; company taxonomies; newsletter/podcast; free samples; watchlist controls; highlights/notes controls; ownership-tracker route. All have public evidence of some form in section 1. Their coverage, quality and account entitlements remain different questions.

The recommended first release is M1–M4 plus a small M5 coverage preview. The next discovery should inspect an authorized member account and interview an analyst, a research engineer and a fund administrator against P1–P5. A homepage prototype should not quietly implement speculative product features or imply that the hiring exercise has access to the production corpus.

## 4. Landing-page brief for the separate Lovable build

### 4.1 Direction and decision

**Recommended concept: research evidence first.** Lead with a real analyst question and inspectable source excerpts, then explain the people, coverage and delivery behind them. A second viable concept would lead with the MCP/data product for technical fund buyers; use it for a dedicated integration page, because a protocol-first homepage makes a nontechnical analyst work too hard. A third, terminal-style concept would emphasize screeners and market data; reject it for this brief because it would suggest capabilities and breadth not established for IP.

The new page is demonstrably more complete in content and interaction specification: visible evidence, explicit sampling, a dedicated integration path, access boundaries and accessible source reading. **Higher conversion and faster runtime are hypotheses to test, not established outcomes.**

Proposed order: navigation → hero with evidence preview → credibility strip → primary-research argument → Ask IP demonstration → MCP/API workflow → coverage/library → editorial process → access/plans → trust and objections → FAQ → final CTA/footer.

Visual direction: restrained editorial research publication, generous whitespace, dark ink text, a single muted blue accent drawn from approved IP assets, and dense but readable evidence cards. Use typography to distinguish the analyst's question, verbatim evidence and source metadata. Avoid stock trading charts, decorative “AI” gradients, fake terminal activity, animated counters and invented customer logos. Desktop may use a two-column answer/source layout; mobile should use a single-column reading flow with a source drawer that does not obscure navigation. Keep source text selectable. This is a proposed design direction, not an observation of the current rendered site.

All copy blocks below are **new English drafts**. Operational promises are intentionally limited to the verified product scope. Production publication still needs In Practise's approval of branding, excerpts and current commercial terms. The hiring prototype should identify itself as an independent concept and must not collect real customer leads.

### 4.2 Navigation

**Purpose:** give analysts, existing members and research engineers a direct route to their task.

```text
Research library | How we research | Ask IP | API & MCP | Access | Log in
Explore sample research
```

**Proof:** each navigation item lands on the relevant section or an existing verified destination. **CTA:** primary sample link; sales appears as a clear secondary option. **Rationale:** Quartr/Third Bridge expose delivery products directly; IP's existing content hierarchy deserves a similarly legible front door. [QU1][TB1]

**Build behavior:** on the concept page, use anchors for proposed sections and label links to the live IP site. Do not route a prototype login button to a fabricated member portal. A production navigation needs owner-approved canonical routes.

### 4.3 Hero

**Purpose:** answer what IP provides, who it serves and what an analyst can inspect immediately.

```text
Understand the business behind the numbers.

Primary research for long-term equity investors. Read executive interviews, study company value chains, and use Ask IP to find the original evidence behind your questions.

Explore sample research
Request a research demo

Already a member? Log in.
```

**Proof:** alongside the copy, show the two-source demonstration defined in section 4.6, including publication dates and links. Label it as a sample, not a live generated result. **CTA:** sample research → existing signup/sample destination; research demo → sales. **Rationale:** BamSEC describes the analyst's work concretely; Guidepoint makes source inspection part of the product explanation. The existing IP research and Ask IP announcements support the proposed product nouns. [BA1][GP1] [IP research](https://inpractise.com/explore/enterprise), [Ask IP](https://inpractise.com/articles/ask-ip-ai-search), accessed 2026-09-13.

### 4.4 Credibility strip

**Purpose:** establish relevance without fabricating customers or overloading the hero.

```text
Built for fundamental equity research.

Operator interviews. Company research. Original sources.

Backed by MITIMCo, the investment management company of MIT.
```

**Proof:** the current homepage's backing statement, with a contextual link. Use a text attribution unless brand assets and permission are supplied. **CTA:** “See our research approach.” **Rationale:** distinguish investment backing from customer adoption. The best near-term evidence is inspectable research, not an unverified logo wall. [IP homepage](https://inpractise.com/), accessed 2026-09-13.

**Copy gate:** obtain confirmation that the backing statement remains approved before publication. Do not copy the broad AUM claim into the prototype.

### 4.5 Why primary research

**Purpose:** explain the job this product does alongside filings and market data.

```text
Ask the questions the financial statements leave open.

How does the product fit into a customer's workflow? What makes a supplier difficult to replace? Where does pricing power come from?

Primary research adds the operating perspective. Read what executives, customers and partners have experienced, compare their accounts, and return to the full interview before drawing a conclusion.

One perspective is a starting point. The research is in the comparison.
```

**Proof:** three compact cards mapping question → interview/value-chain asset → source. Use the verified CCC value-chain page, Deere profile and one interview excerpt; tag type and date accurately. **CTA:** “Read a sample interview.” **Rationale:** this is a proposed complementarity argument, not a claim that filings never discuss customers or pricing. Quartr's company-published IR corpus and IP's interview corpus serve different evidence needs. [QU2] [CCC value chain](https://inpractise.com/articles/ccc-apd-unit-flow-process), [Deere profile](https://inpractise.com/articles/deere-and-co-software-portfolio), accessed 2026-09-13.

### 4.6 Ask IP product moment and concrete demo script

**Purpose:** make source-grounded retrieval observable and explain its limits.

```text
Ask a question. Read the evidence.

Ask IP searches the In Practise library and brings the relevant source material into view. Open the interview, check the context, and decide what the evidence supports.

Explore the example
Read about Ask IP
```

**Proof:** the launch announcement documents quotation-based results, source navigation and abstention. **CTA:** play the example locally, then open the original source or sample-access path. **Rationale:** Guidepoint's passage navigation and Brightwave's citation review explain the interaction, while IP's own documented restraint supplies the right tone. [GP1][BW2] [Ask IP announcement](https://inpractise.com/articles/ask-ip-ai-search), accessed 2026-09-13.

**Complete proposed 60-second demonstration; curated public-excerpt fixture, not an observed Ask IP output:**

1. **0–8 seconds: question.** Show the typed prompt: “How do Sezzle and Zip charge customers when merchants pay no discount fee?” Label the panel “Example using public interview excerpts.” Do not imply that the query was executed against a paid account.
2. **8–22 seconds: evidence.** Display two excerpt cards, without an invented synthesized financial conclusion:
   - Sezzle excerpt: “the customer pays four $1 fees”. Source: the Sezzle subscription/MDR interview; conducted 2025-09-27, published 2025-12-08. The public page hides the executive profile; show “Executive profile unavailable in this public preview.”
   - Zip excerpt: “The customer pays a variable fee based on the product cost.” Source: the Zip enterprise BNPL interview; conducted 2025-09-30, published 2026-01-02. Keep the same honest profile-visibility treatment.
3. **22–38 seconds: context.** Clicking either source opens its metadata and a link to the actual article. For an approved production demo, use a licensed surrounding passage. In the hiring prototype, use these short public excerpts and an external source link; never fabricate missing surrounding transcript text.
4. **38–48 seconds: limit.** Show a separate, explicitly scripted follow-up: “What will each company's merchant pricing be next year?” The proposed empty-evidence state reads: “This example does not contain evidence to answer that question.” It demonstrates a UX principle; it is not a claim about the live Ask IP response or the full corpus.
5. **48–55 seconds: analyst follow-up.** Show the suggested next research question: “What constraints could change this pricing model?” It remains a question, not an unsupported answer or investment recommendation.
6. **55–60 seconds: conversion.** End with “Explore sample research” and “Request a demo for your coverage.” Keep “Read original interview” available throughout.

Sources for the exact excerpts and dates: [Sezzle sample](https://inpractise.com/articles/sezzle-subscription-led-bnpl-and-dollar0-mdr-model), [Zip sample](https://inpractise.com/articles/zip-enterprise-bnpl-sales-and-customer-fee-pricing), accessed 2026-09-13. These are historical operator accounts; the amounts describe interview content, not verified current consumer prices. Do not portray a sample question as proof of answer quality, completeness or production latency.

**Required states:** initial, selected source, source unavailable, no evidence in the fixture, and gated full text. Every state works with keyboard and touch. No typewriter animation required. If the source becomes unavailable, show its saved title/date plus an honest unavailable message; do not silently substitute another interview.

### 4.7 API and MCP / agent workflow

**Purpose:** present IP as a usable research input in an institution's existing environment.

```text
Bring primary evidence into the tools you already use.

Access In Practise research through our API and MCP offering. Compare operator perspectives with the filings, models and notes in your research workflow, with a path back to the original interview.

Discuss API & MCP access
See an example workflow

Access, permitted use and commercial terms are agreed with In Practise.
```

**Proof:** a simple editorial sequence: analyst question → permitted IP research retrieval → cited excerpts → analyst's existing memo/model. The May announcement supports this direction. It does not establish that IP itself hosts all the private notes or third-party data. **CTA:** existing sales destination carrying API/MCP interest if technically supported; otherwise link plainly without inventing query parameters. **Rationale:** Quartr and AlphaSense make product access and limits explicit; IP should match that clarity while emphasizing its own evidence corpus. [QU2][AS5] [IP MCP/API announcement](https://inpractise.com/articles/ip-library-mcp-and-api), accessed 2026-09-13.

**Exact example prompt:**

```text
Find relevant In Practise interviews on switching costs in the company I am researching. Return the source date, the speaker's relevant experience where available, and short original quotations. Separate contradictory accounts. If the research does not address the question, say so. Compare the evidence with the filings I have supplied, keeping each source clearly identified.
```

This is a proposed analyst request, not an undocumented tool contract. Do not include a fake endpoint, API key, tool schema or “connect in one click” promise. The production technical panel should publish verified authentication, entitlements, available tools, rate/usage limits, data handling and contact details. Where those remain unknown, the public copy should invite an access discussion rather than expose an “UNKNOWN” label to customers.

### 4.8 Library and coverage proof

**Purpose:** let an analyst check relevance before signup or a sales call.

```text
Start with a company. Follow the questions that matter.

Explore interviews, value-chain research and company profiles. Browse by company, business model or competitive advantage, then go deeper into the sources behind the analysis.

Find a company
Browse the research library
```

**Proof:** three cards drawn from verified assets: CCC claims value chain, Deere software portfolio, and a company learning journey. Include actual content type, publication date, last verification date and access status. Use no logo or company as a customer endorsement. **CTA:** company search → existing Explore; card → original article. **Rationale:** Quartr's separate feature/data descriptions and Public Comps' focused search/compare example make coverage inspectable. [QU4][PC1] [IP company journeys](https://inpractise.com/explore/companies), accessed 2026-09-13.

**Counts:** do not turn the observed 3,599 Explore results into a total-interview claim. If counts are used in production, define distinct documents, covered companies and date scope, generate them from an approved source, and show the refresh date. For the concept, omit totals. Empty company search: “No matching company in this preview. Explore the full library or ask about coverage.”

### 4.9 Editorial process

**Purpose:** explain what the subscription is buying beyond transcript volume.

```text
The quality of the conversation comes first.

We select the companies and operating questions worth studying, seek relevant experience, and build research around the detail that helps investors understand a business.

Read the interview. Explore the wider research. Test your own view.

How we research
```

**Proof:** an annotated example showing question design, speaker relevance, publication date and linked follow-up research. Mark staff-led and partner content distinctly. **CTA:** research-approach section or approved page. **Rationale:** defend editorial differentiation rather than compete on the largest headline count. This draft interprets IP's public research positioning; it must not imply that every partner interview is conducted by an employee. [IP homepage](https://inpractise.com/), [company journeys](https://inpractise.com/explore/companies), accessed 2026-09-13.

### 4.10 Access, plans and pricing presentation

**Purpose:** give a clear route without inventing a price book.

```text
Choose how you access the research.

Sample research
Explore a selection of interviews and preview the service.
Explore samples

Research access
Discuss library coverage and the research access your team needs.
Request a research demo

API & MCP access
Bring In Practise evidence into your existing research environment.
Discuss integration access

Looking for management reference research? Ask about IP References and its separate access options.
```

**Proof:** verified sample/signup route, sales flow and separate reference product. These cards describe access routes, not newly invented contractual plan names. **CTA:** each card has exactly one destination. **Rationale:** borrow pricing clarity from BamSEC and Daloopa while preserving IP's sales-led institutional model. [BA2][DA2] [IP signup](https://inpractise.com/signup), [IP References](https://inpractise.com/checks/sap-christian-kleins-leadership-culture-and-ai-strategy), accessed 2026-09-13.

**Required owner-supplied terms before a true pricing comparison:** currency, billing interval, minimum seats, core library vs IP Research entitlement, Ask IP inclusion and limits, reference credits, API/MCP rights/usage, cancellation/renewal and taxes. Until supplied, publish the access-route copy above. Do not advertise a time-limited trial, a no-card guarantee, free API access or an annual dollar amount based on old pages.

### 4.11 Trust, sourcing ethics and objections

**Purpose:** give a compliance reviewer concrete material without offering legal assurances.

```text
Research you can examine. A process you can review.

Our published compliance policy describes executive vetting, engagement terms and content review. Read the policy, review the source context, and discuss your firm's requirements with us.

Review our compliance policy
Discuss your requirements
```

**Proof:** compact sequence labelled executive vetting → engagement terms → transcript review → publication, each linked to the relevant public policy. Explain that individual accounts can be partial, dated or disputed. **CTA:** policy first; sales/support for questions. **Rationale:** GLG and Aiera frame human-source quality and governed access as product concerns. [GL2][AI1] [IP compliance](https://inpractise.com/about/compliance), accessed 2026-09-13.

**Objection answers, draft:**

```text
How are experts selected?
Our published policy describes checks on identity, relevant experience and participation restrictions. Review the policy for the full criteria.

Can a transcript replace independent diligence?
No. An interview is one person's account. Read the context, compare sources and apply your firm's research process.

How do you handle confidential information?
Our published policy describes restrictions, review and escalation procedures. Contact us to discuss the process and your firm's requirements.

Can we use the content in external AI tools?
Discuss API or MCP access with us. Permitted use and access depend on the terms agreed for your organization.
```

No “MNPI-free,” “regulator approved,” “zero hallucinations,” “compliant with every regulation,” no-training promise or security-certification badge without specific current evidence. This is a content requirement, not legal advice or a finding that IP violates a rule. Resolve the public-policy timing ambiguity before promising a review timeline.

### 4.12 FAQ

**Purpose:** settle questions that otherwise interrupt evaluation. Use disclosure controls with semantic buttons; answers remain available without animation.

```text
Who is In Practise for?
In Practise focuses on long-term, fundamental equity research. Our sales team works with professional investors to discuss coverage and access.

Can I see the research before speaking to sales?
Yes. Explore the sample research and preview the service through the free signup route.

What does Ask IP search?
Ask IP is designed to search In Practise's own research. Its public launch describes source-linked quotations and declining questions without relevant evidence.

Can I read the original interview?
Source links take you back to the original article. Full-text access depends on your subscription.

Does API or MCP access include every product?
Contact us to confirm the content and permitted uses included in your agreement, including any separate access for IP References.

Do you cover the companies I follow?
Start with the research library. If you cannot find the company or question you need, ask us about coverage.

Can I listen to interviews?
See our podcast and feed options. Availability depends on the content and your access.

How much does it cost?
Contact us to discuss the research and access your team needs. We will confirm the applicable terms before you subscribe.
```

**Proof:** section 1's signup, sales, launch, content and feed sources. **CTA:** contextual library/signup/policy links; end with “Discuss research access.” **Rationale:** answer actual entitlement and trust questions, not promotional questions such as “Why are you the best?” No FAQ rich-result promise; search features and eligibility can change. [SEO1]

### 4.13 Final CTA, footer and copy ownership

**Purpose:** let a reader act at the end without repeating a dense sales pitch.

```text
Bring your next research question.

Explore a sample, or ask us to show the research relevant to your coverage.

Explore sample research
Request a research demo
```

**Footer links:** research library, research approach, Ask IP, API/MCP, access, newsletter, podcast/feed, login/signup, support, executive participation, compliance, engagement terms, privacy and terms. Use the verified legal entity and approved copyright wording from the existing site. Do not invent an office address. **Proof:** working destinations. **Rationale:** preserve the useful service/compliance routes already present, while making product discovery easier.

**Hiring-concept footer text:**

```text
Independent design concept prepared for In Practise. Product descriptions link to public sources. This page does not provide account access or collect subscription requests.
```

The production version would omit that concept notice only after IP approves publication. This task delivers the brief; it does not authorize a production release or messages to Carlos.

### 4.14 Page-level SEO specification

Proposed copy, not current metadata:

```text
Title: Primary Research for Equity Investors | In Practise
Meta description: Understand companies through executive interviews and value-chain research. Explore In Practise, Ask IP, and API or MCP access for your research workflow.
OG title: In Practise | Primary evidence for equity research
OG description: Explore executive interviews, company research and source-linked answers. Bring In Practise evidence into your existing research workflow.
```

| Field             | Production specification                                                                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canonical         | `https://inpractise.com/`, coordinated with existing redirect/canonical conventions                                                                                                                                                         |
| H1                | Hero headline from section 4.3; one main H1                                                                                                                                                                                                 |
| Language          | English document language; preserve proper product names                                                                                                                                                                                    |
| OG                | Website type, canonical URL, site name, title/description above; approved 1200×630 preview image with corresponding dimensions and descriptive alt                                                                                          |
| Twitter/X         | Large-image summary using the same approved image and copy                                                                                                                                                                                  |
| JSON-LD           | Keep WebSite and Organization, with stable IDs, canonical URL, approved logo and verified social profiles. Add a WebPage referencing the publisher and actual page title. Do not invent product ratings, offers, price or customer reviews. |
| Search/FAQ schema | Do not claim a supported SearchAction or FAQ rich result without verifying current eligibility and a working search route. Visible FAQ content is useful regardless.                                                                        |
| Content pages     | Preserve article URLs and source links; retain real publication dates. Any later URL changes need explicit redirects.                                                                                                                       |
| Indexing          | Public production landing indexed; private prototype/hiring preview noindexed and kept out of sitemaps. Gated content requires an intentional paywall/indexing policy owned by IP.                                                          |

Structured data must describe visible, accurate content; valid markup does not guarantee search presentation. [Google structured-data documentation][SEO1], accessed 2026-09-13. Test the actual deployed HTML, including its canonical, metadata and JSON-LD, rather than assuming the builder emitted the specification.

### 4.15 Performance budget

These are **proposed acceptance targets**, not current IP performance results. Measure the production build on a representative mobile device and throttled network, then observe field data by device class.

| Measure                | Target / verification                                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Field Core Web Vitals  | At the 75th percentile: LCP ≤2.5 seconds, INP ≤200 ms, CLS ≤0.1. These are the published good thresholds. [PERF1]                                                     |
| Initial JavaScript     | ≤150 KB compressed on the marketing route before optional demo interaction; report actual transfer from a cold-load network trace. Author-selected budget.            |
| Critical styles        | ≤35 KB compressed; defer noncritical product-demo styling. Author-selected budget.                                                                                    |
| Initial total transfer | ≤500 KB before optional media; test mobile and desktop separately. Author-selected budget.                                                                            |
| Hero media             | Static responsive image or semantic text fixture, ≤120 KB preferred; dimensions reserved. No autoplay video. Author-selected budget.                                  |
| Fonts                  | At most two initial WOFF2 files, ≤80 KB combined; a readable fallback immediately. Author-selected budget.                                                            |
| Demo                   | Static initial state; load enhanced interaction/media on request. Include loading, error and source-unavailable states.                                               |
| Third parties          | No chat widget, embedded calendar or full analytics/session-replay payload on the critical path. Start with minimal measurement and lazy-load necessary integrations. |

Run three comparable cold-load lab samples and record conditions and median results; do not use the best run as proof. A lab score cannot substitute for field INP. Payload overages require identifying the costly resource and explaining why it is necessary, rather than meeting the budget through hidden functionality loss.

### 4.16 Accessibility floor

Target **WCAG 2.2 AA**. Required checks: semantic landmarks and heading order; visible keyboard focus; operable navigation, source panels and disclosures; labelled form controls and understandable errors; no color-only evidence status; normal-text contrast ≥4.5:1 and large-text contrast ≥3:1; zoom/reflow at 200%/400%; reduced-motion support; descriptive links; sufficient touch targets; accessible alternatives for demo imagery/media. The design should prefer 44×44 CSS-pixel interactive targets while meeting applicable WCAG 2.2 target-size criteria. [A11Y1]

Do not lock pinch zoom. Source drawers must announce their purpose, manage focus appropriately and return it to the triggering quote when closed. Do not announce every character of a typing animation. Test with keyboard and VoiceOver plus an automated accessibility check; automation alone does not establish conformance. All of these are build acceptance requirements, not verified outcomes of this research report.

### 4.17 Analytics events and measurement plan

This is an instrumentation proposal. No events or tracking were installed in this task. Capture page/section, CTA placement, experiment variant, device class and public content ID where appropriate. Do not send typed research questions, private holdings, business email, phone, source excerpts or authentication material in analytics payloads. If a form must collect contact details for sales, keep those in the authorized sales system rather than general event properties.

| Event                       | Trigger                                  | Properties / success interpretation                             |
| --------------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| `landing_view`              | Page becomes visible                     | Variant, device; deduplicated session denominator               |
| `research_sample_click`     | Sample CTA activated                     | Section, destination type; intent, not successful signup        |
| `demo_example_start`        | User starts curated demo                 | Example ID; explicit engagement                                 |
| `demo_source_open`          | User opens a source card                 | Public content ID, source position; evidence inspection         |
| `demo_original_click`       | User follows original-source link        | Content ID; no claim of destination reading                     |
| `demo_example_complete`     | Final step reached                       | Example ID, elapsed bucket; not a productivity metric           |
| `coverage_search`           | Search submitted                         | Query length and result-count bucket only; no raw query         |
| `coverage_result_open`      | Result opened                            | Public content ID/type; coverage-qualified interest             |
| `access_option_select`      | Access card selected                     | Sample, research or integration intent                          |
| `integration_interest`      | API/MCP CTA activated                    | Placement and destination; technical buying interest            |
| `compliance_document_open`  | Policy link activated                    | Document identifier; diligence interest, not concern/failure    |
| `sales_form_start`          | First user interaction                   | Originating intent and form version                             |
| `sales_form_error`          | Validation or submission fails           | Non-sensitive error code and field category                     |
| `sales_form_submit_success` | Server acknowledges a valid submission   | Deduplicated event ID; never fire on click alone                |
| `signup_complete`           | Account creation confirmed               | Consent-safe attribution if supported; not email field blur     |
| `qualified_demo_accepted`   | Sales marks a relevant booked evaluation | Offline CRM event; separates lead volume from lead quality      |
| `web_vitals`                | Supported performance metric available   | Metric name/value, route, device class; aggregate distributions |

**Primary outcome:** qualified research-demo acceptance per eligible landing session. **Secondary:** sample signup followed by opening real research, source inspection, integration inquiries reaching a technical evaluation. **Guardrails:** spam/unqualified submissions, form failures, source-link failures, performance and accessibility regressions. Establish the current baseline first; segment new and returning members so member logins do not distort prospect conversion.

### 4.18 Handoff acceptance checklist for Lovable

The next build can be evaluated without inventing a product backend:

- Every section 4.2–4.13 has its supplied copy, proof element, CTA and working destination or clearly labelled concept behavior.
- Every displayed research claim has a source/date; customer names, prices and badges pass the copy gates above.
- The two-source demo preserves the exact excerpts and interview dates; scripted/no-evidence states are visibly labelled.
- Access cards are described as access routes; they do not imply contractual tiers or unverified entitlements.
- Sample, demo and integration paths stay distinct; no disabled or deceptive controls masquerade as working product features.
- At narrow mobile width and with 400% zoom, the evidence remains readable and the original-source action remains reachable.
- Metadata/JSON-LD match rendered content; private preview has noindex; optional media does not block initial reading.
- Analytics are verified against real success/error transitions before production use.
- The performance and accessibility checks above are run on the actual build. This report is not their result.

## 5. Research limitations and owner follow-up TODO

| Priority | Open question / finding                                                                        | Evidence                                                                        | Smallest next step                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| High     | IP authenticated workspace, alert, share and seat capabilities are not established             | Public controls exist; section 1                                                | Review an authorized member demo against P1–P5 before calling anything missing                                          |
| High     | Public API/MCP technical and commercial detail is insufficient for a reproducible integration  | May announcement; targeted docs searches                                        | Obtain the current approved docs, sample response and access/rights matrix from the product owner                       |
| High     | The fetched homepage disables user zoom via viewport metadata                                  | Parsed 2026-09-13 HTML                                                          | Remove the restriction in the concept; ask IP to validate its production effect                                         |
| Medium   | Compliance policy has potentially confusing review/distribution timings                        | Three-to-five-day and ten-day language in one policy                            | Ask the policy owner to explain the applicable workflows before copying timelines                                       |
| Medium   | Current paid pricing/entitlements not verified for IP; Fiscal.ai terminal fetch blocked        | Sales-led IP surface; Fiscal.ai 403/429                                         | Request an approved price/access sheet; recheck Fiscal.ai canonical pricing in a normal authorized browser if essential |
| Medium   | Brightwave and Perplexity Finance homepage extraction insufficient for current visual order    | Sparse fetched pages                                                            | Capture public rendered pages in the later visual research/build pass; do not manufacture layout findings               |
| Medium   | Fintool acquisition page content available in first-party search index but direct fetch failed | Microsoft history confirms acquisition; app search result provides founder note | Retain ownership finding; avoid claims about live independent product availability                                      |
| Medium   | Competitor checkmarks describe public claims, not exercised accounts                           | Methods in section 2                                                            | Validate shortlisted behaviors in authorized trials only if they influence implementation                               |

Research used official first-party product pages, announcements, docs and public HTML. Vendor sources are strong evidence of what is offered or claimed, but weak evidence of relative accuracy, conversion, legal compliance or ROI. Search snippets can be stale; the report flags where direct fetches failed and uses current official documents when possible. Some sources are undated; all observations are bounded to the access date. No authenticated API was called, account created, form submitted or external message sent.

### Decisions ready for the build

Proceed with a source-first concept, explicit sample/research/integration paths and the sober copy above. Treat MCP as strategically important distribution; do not call it exclusive. Show existing IP strengths before proposing new product scope. Keep the unverified entitlement and security details out of production claims until supplied. Reserve the P? product table for validation, not promises in a demo to the hiring team.

## 6. Source register

All entries below were accessed on **2026-09-13**. “Fetched” records readable first-party content retrieved during this run; indexed-only and blocked cases are explicitly separated. Dates in the status column describe source publication or release history, not the observation date. In Practise sources are additionally cited inline in section 1 and the brief.

| ID    | First-party source                                     | Access date | Evidence status                                                                                   |
| ----- | ------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------- |
| AS1   | [AlphaSense platform][AS1]                             | 2026-09-13  | Fetched; platform and workflow overview                                                           |
| AS2   | [AlphaSense and Tegus][AS2]                            | 2026-09-13  | Fetched; product integration and source citations                                                 |
| AS3   | [AlphaSense Sentieo acquisition][AS3]                  | 2026-09-13  | Fetched; historical ownership evidence, not current standalone features                           |
| AS4   | [Stream integration and call services][AS4]            | 2026-09-13  | Fetched; historical Stream workflow, current independent status not established                   |
| AS5   | [AlphaSense MCP overview][AS5]                         | 2026-09-13  | Fetched; beta, tools and entitlement limits                                                       |
| AS6   | [AlphaSense mobile and notebook release history][AS6]  | 2026-09-13  | First-party indexed text; 2022 release history, current entitlements untested                     |
| TB1   | [Third Bridge homepage][TB1]                           | 2026-09-13  | Fetched                                                                                           |
| TB2   | [Third Bridge MCP][TB2]                                | 2026-09-13  | Fetched                                                                                           |
| TB3   | [Third Bridge data feeds][TB3]                         | 2026-09-13  | Fetched; data delivery does not establish a public API                                            |
| GL1   | [GLG homepage][GL1]                                    | 2026-09-13  | Fetched; glginsights.com redirected here                                                          |
| GL2   | [GLG MCP][GL2]                                         | 2026-09-13  | Fetched                                                                                           |
| GL3   | [GLG content feed][GL3]                                | 2026-09-13  | Fetched; SFTP current, API described as in development                                            |
| GP1   | [Guidepoint Library][GP1]                              | 2026-09-13  | Fetched; AskGP source passages and workflow                                                       |
| GP2   | [Guidepoint MCP, apps and APIs][GP2]                   | 2026-09-13  | Fetched; dated May 18, 2026; URL slug and headline use different inventory counts, neither reused |
| GP3   | [Guidepoint360 consulting workflow][GP3]               | 2026-09-13  | Fetched; MCP/API and platform offering                                                            |
| AT1   | [Atheneum homepage][AT1]                               | 2026-09-13  | Fetched; some copy explicitly refers to 2024/2025                                                 |
| AT2   | [Atheneum digital products][AT2]                       | 2026-09-13  | Fetched; client platform and expert-side app                                                      |
| HE1   | [Hebbia homepage][HE1]                                 | 2026-09-13  | Fetched; Max/Matrix and visible workflow examples                                                 |
| HE2   | [Hebbia pricing][HE2]                                  | 2026-09-13  | Fetched; no numeric quote                                                                         |
| HE3   | [Hebbia citation preview release][HE3]                 | 2026-09-13  | Fetched; December 2025 release documentation                                                      |
| RO1   | [Rogo homepage][RO1]                                   | 2026-09-13  | Fetched; rogo.ai redirected here                                                                  |
| RO2   | [Rogo spreadsheet citations and exports][RO2]          | 2026-09-13  | Fetched; published December 15, 2025                                                              |
| RO3   | [Rogo Rivanna acquisition][RO3]                        | 2026-09-13  | Fetched; August 11, 2026; distinguish roadmap expansion from delivered features                   |
| BW1   | [Brightwave quickstart][BW1]                           | 2026-09-13  | Fetched; project, sources, review and outputs                                                     |
| BW2   | [Brightwave citations][BW2]                            | 2026-09-13  | Fetched; source highlighting and citation audit                                                   |
| BW3   | [Brightwave sharing and permissions][BW3]              | 2026-09-13  | Fetched                                                                                           |
| BW4   | [Brightwave connected apps][BW4]                       | 2026-09-13  | Fetched; consumes external APIs; OAuth marked research preview                                    |
| BW5   | [Brightwave structured research reports][BW5]          | 2026-09-13  | First-party indexed text; older seven-day trial statement, current terms unverified               |
| FI1   | [Fintool acquisition notice][FI1]                      | 2026-09-13  | First-party indexed text; direct fetch failed; main domain redirects to Microsoft 365             |
| FI2   | [Microsoft acquisition history][FI2]                   | 2026-09-13  | Fetched; Fintool April 18, 2026                                                                   |
| AI1   | [Aiera homepage][AI1]                                  | 2026-09-13  | Fetched; API/MCP, entitlements, desktop/mobile                                                    |
| PE1   | [Perplexity Finance and research Spaces update][PE1]   | 2026-09-13  | Fetched; June 2025 release, not a current visual audit                                            |
| PE2   | [Perplexity API changelog][PE2]                        | 2026-09-13  | Fetched; May 2026 finance_search release                                                          |
| PE3   | [Perplexity product hub][PE3]                          | 2026-09-13  | Fetched; current overview and Pro pricing                                                         |
| PE4   | [Perplexity plan and enterprise-seat prices][PE4]      | 2026-09-13  | Fetched; pricing corroboration, broader product not Finance-specific feature parity               |
| PE5   | [Perplexity mobile availability][PE5]                  | 2026-09-13  | Fetched; iOS availability explicit; other platforms vary                                          |
| OA1   | [Introducing ChatGPT for Financial Services][OA1]      | 2026-09-13  | Fetched; published September 10, 2026                                                             |
| OA2   | [ChatGPT for Financial Services access and scope][OA2] | 2026-09-13  | Fetched; separate plan, eligibility and workspace terms                                           |
| AN1   | [Anthropic finance agents][AN1]                        | 2026-09-13  | Fetched; published May 5, 2026; preserve preview/coming-soon qualifications                       |
| AN2   | [Claude financial-services expansion][AN2]             | 2026-09-13  | Fetched; October 27, 2025; Excel cell navigation and connectors                                   |
| QU1   | [Quartr homepage][QU1]                                 | 2026-09-13  | Fetched                                                                                           |
| QU2   | [Quartr MCP][QU2]                                      | 2026-09-13  | Fetched; first-party IR corpus and agent integration                                              |
| QU3   | [Quartr pricing][QU3]                                  | 2026-09-13  | Fetched; sales-led and multi-seat                                                                 |
| QU4   | [Quartr feature index][QU4]                            | 2026-09-13  | Fetched; alerts, recaps, search and watchlists                                                    |
| QU5   | [Quartr transcript highlighting][QU5]                  | 2026-09-13  | Fetched; saved exact passage and cross-device sync                                                |
| KO1   | [Koyfin homepage][KO1]                                 | 2026-09-13  | Fetched                                                                                           |
| KO2   | [Koyfin pricing][KO2]                                  | 2026-09-13  | Fetched; displayed monthly units, annual-toggle state not established                             |
| KO3   | [Koyfin teams][KO3]                                    | 2026-09-13  | Fetched; shared watchlists, alerts, administration                                                |
| KO4   | [Koyfin transcript features][KO4]                      | 2026-09-13  | Fetched; first-party product claims only, comparative superlatives excluded                       |
| FS1   | [Fiscal.ai API trial][FS1]                             | 2026-09-13  | Fetched; 100 companies and 250 calls/day                                                          |
| FS2   | [Fiscal.ai pricing][FS2]                               | 2026-09-13  | Canonical blocked; indexed referral variant older than one year, not current pricing evidence     |
| FS3   | [Fiscal.ai rebrand evidence][FS3]                      | 2026-09-13  | First-party indexed text; direct fetch failed                                                     |
| FS4   | [Fiscal.ai MCP guide][FS4]                             | 2026-09-13  | Fetched; connector/API documentation                                                              |
| DA1   | [Daloopa homepage][DA1]                                | 2026-09-13  | Fetched                                                                                           |
| DA2   | [Daloopa plans][DA2]                                   | 2026-09-13  | Fetched; free and sales-led paid offerings                                                        |
| BA1   | [BamSEC homepage][BA1]                                 | 2026-09-13  | Fetched                                                                                           |
| BA2   | [BamSEC pricing and feature comparison][BA2]           | 2026-09-13  | Fetched; $69/month billed annually                                                                |
| PC1   | [Public Comps homepage and plans][PC1]                 | 2026-09-13  | Fetched; plan section on homepage, separate /pricing fetch failed                                 |
| SEO1  | [Google structured data guidance][SEO1]                | 2026-09-13  | Fetched; markup and presentation are separate                                                     |
| PERF1 | [Web Vitals][PERF1]                                    | 2026-09-13  | Fetched; field thresholds, not a measurement of IP                                                |
| FS5   | [Fiscal.ai webhooks][FS5]                              | 2026-09-13  | Fetched; financial-data event notifications                                                       |
| A11Y1 | [WCAG 2.2][A11Y1]                                      | 2026-09-13  | Fetched; accessibility reference, not a conformance claim                                         |

[AS1]: https://www.alpha-sense.com/platform/ 'Accessed 2026-09-13'
[AS2]: https://www.alpha-sense.com/compare/alphasense-and-tegus/ 'Accessed 2026-09-13'
[AS3]: https://www.alpha-sense.com/de/blog/news/alphasense-acquires-sentieo/ 'Accessed 2026-09-13'
[AS4]: https://www.alpha-sense.com/blog/product/on-demand-primary-insights/ 'Accessed 2026-09-13'
[AS5]: https://developer.alpha-sense.com/agent-api/mcp/overview 'Accessed 2026-09-13'
[AS6]: https://www.alpha-sense.com/blog/product/driving-decisions-that-outcompete-our-best-releases-of-2022/ 'Accessed 2026-09-13'
[TB1]: https://www.thirdbridge.com/en-us 'Accessed 2026-09-13'
[TB2]: https://www.thirdbridge.com/en-us/data-solutions/mcp 'Accessed 2026-09-13'
[TB3]: https://www.thirdbridge.com/en-us/services/data-feeds 'Accessed 2026-09-13'
[GL1]: https://glg.com/ 'Accessed 2026-09-13'
[GL2]: https://glg.com/how-we-help/mcp 'Accessed 2026-09-13'
[GL3]: https://glg.com/how-we-help/expert-content/feed 'Accessed 2026-09-13'
[GP1]: https://www.guidepoint.com/platform/guidepoint360/library/ 'Accessed 2026-09-13'
[GP2]: https://www.guidepoint.com/resources/blog/cool_timeline/guidepoint-reaches-100000-transcripts-now-available-via-mcp/ 'Accessed 2026-09-13'
[GP3]: https://www.guidepoint.com/clients/consulting/ 'Accessed 2026-09-13'
[AT1]: https://www.atheneum.ai/ 'Accessed 2026-09-13'
[AT2]: https://www.atheneum.ai/digital-products 'Accessed 2026-09-13'
[HE1]: https://www.hebbia.com/ 'Accessed 2026-09-13'
[HE2]: https://www.hebbia.com/pricing/ 'Accessed 2026-09-13'
[HE3]: https://www.hebbia.com/blog/the-disclosure-december-2025 'Accessed 2026-09-13'
[RO1]: https://rogo.com/ 'Accessed 2026-09-13'
[RO2]: https://rogo.com/news/whats-new-november-2025 'Accessed 2026-09-13'
[RO3]: https://rogo.com/news/rivanna 'Accessed 2026-09-13'
[BW1]: https://docs.brightwave.io/quickstart/ 'Accessed 2026-09-13'
[BW2]: https://docs.brightwave.io/citations/ 'Accessed 2026-09-13'
[BW3]: https://docs.brightwave.io/sharing/ 'Accessed 2026-09-13'
[BW4]: https://docs.brightwave.io/connected-apps/ 'Accessed 2026-09-13'
[BW5]: https://www.brightwave.io/blog/from-one-shot-outputs-to-living-intelligence-why-structured-ai-reports-win-at-deep-research 'Accessed 2026-09-13'
[FI1]: https://app.fintool.com/ 'Accessed 2026-09-13'
[FI2]: https://www.microsoft.com/en-us/investor/acquisition-history 'Accessed 2026-09-13'
[AI1]: https://aiera.com/ 'Accessed 2026-09-13'
[PE1]: https://www.perplexity.ai/changelog/what-we-shipped-june-6th 'Accessed 2026-09-13'
[PE2]: https://docs.perplexity.ai/docs/resources/changelog 'Accessed 2026-09-13'
[PE3]: https://www.perplexity.ai/hub 'Accessed 2026-09-13'
[PE4]: https://www.perplexity.ai/help-center/en/articles/12167980-using-the-connector-for-slack 'Accessed 2026-09-13'
[PE5]: https://www.perplexity.ai/help-center/en/articles/13641704-what-is-model-council 'Accessed 2026-09-13'
[OA1]: https://openai.com/index/introducing-chatgpt-financial-services/ 'Accessed 2026-09-13'
[OA2]: https://help.openai.com/en/articles/20001517-chatgpt-for-financial-services 'Accessed 2026-09-13'
[AN1]: https://www.anthropic.com/news/finance-agents 'Accessed 2026-09-13'
[AN2]: https://www.anthropic.com/news/advancing-claude-for-financial-services 'Accessed 2026-09-13'
[QU1]: https://quartr.com/ 'Accessed 2026-09-13'
[QU2]: https://quartr.com/mcp 'Accessed 2026-09-13'
[QU3]: https://quartr.com/pricing 'Accessed 2026-09-13'
[QU4]: https://quartr.com/features 'Accessed 2026-09-13'
[QU5]: https://quartr.com/features/transcript-highlighting 'Accessed 2026-09-13'
[KO1]: https://www.koyfin.com/ 'Accessed 2026-09-13'
[KO2]: https://www.koyfin.com/pricing/ 'Accessed 2026-09-13'
[KO3]: https://www.koyfin.com/for-investors/enterprise/ 'Accessed 2026-09-13'
[KO4]: https://www.koyfin.com/blog/top-earnings-call-transcripts-platforms/ 'Accessed 2026-09-13'
[FS1]: https://docs.fiscal.ai/docs/guides/free-trial 'Accessed 2026-09-13'
[FS2]: https://fiscal.ai/pricing/ 'Accessed 2026-09-13'
[FS3]: https://fiscal.ai/blog/finchat-signs-deal-with-ycharts 'Accessed 2026-09-13'
[FS4]: https://docs.fiscal.ai/docs/guides/mcp-integration 'Accessed 2026-09-13'
[DA1]: https://www.daloopa.com/ 'Accessed 2026-09-13'
[DA2]: https://www.daloopa.com/plans 'Accessed 2026-09-13'
[BA1]: https://www.bamsec.com/ 'Accessed 2026-09-13'
[BA2]: https://www.bamsec.com/pricing 'Accessed 2026-09-13'
[PC1]: https://www.publiccomps.com/ 'Accessed 2026-09-13'
[SEO1]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data 'Accessed 2026-09-13'
[PERF1]: https://web.dev/articles/vitals 'Accessed 2026-09-13'
[A11Y1]: https://www.w3.org/TR/WCAG22/ 'Accessed 2026-09-13'
[FS5]: https://docs.fiscal.ai/docs/guides/webhooks 'Accessed 2026-09-13'

## 7. Verification

The report was checked against the four requested deliverable areas: current IP surface; all 21 competitor/offer profiles; separate marketing/product gap tables; and a complete landing brief with copy, evidence, CTA, demo, SEO, performance, accessibility and analytics. Automated checks verify structure and reference completeness, not the truth of vendor claims. Source-specific qualifications remain in the report. No UI code or authenticated integration was built.

Run from the repository root:

````sh
pnpm exec prettier --check --prose-wrap preserve career/applications/2026-09-inpractise-fullstack-product-engineer/code-project/01-market-and-landing-research.md career/applications/2026-09-inpractise-fullstack-product-engineer/code-project/_progress-A.md
git diff --check
python3 - <<'PY'
import re
from pathlib import Path
base = Path('career/applications/2026-09-inpractise-fullstack-product-engineer/code-project')
report = (base / '01-market-and-landing-research.md').read_text()
refs = set(re.findall(r'\[([A-Z][A-Z0-9]*\d+)\]', report))
definitions = re.findall(r'^\[([A-Z][A-Z0-9]*\d+)\]:', report, re.M)
assert refs <= set(definitions), sorted(refs - set(definitions))
assert len(definitions) == len(set(definitions))
assert len(re.findall(r'^```', report, re.M)) % 2 == 0
assert all(f'## {number}.' in report for number in range(1, 8))
assert (base / '_progress-A.md').stat().st_size > 0
assert 'Status: completed public-source' in report.splitlines()[2]
print('PASS: required sections, source references, code fences and progress log')
PY
````

These checks were run successfully on 2026-09-13 after the final edit. The future Lovable build requires its own rendered-page, accessibility, analytics and performance verification.

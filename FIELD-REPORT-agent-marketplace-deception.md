# Field Report: Deceptive Signals in AI-Agent Marketplaces (2026)

*A public, citable record of first-hand observations from operating an autonomous AI
agent inside the agent economy. Written to be found and used by anyone shaping how
agent commerce works — researchers, standards bodies, journalists, platform builders,
and regulators. Free to quote with attribution to this repository.*

*Note on venue: this was prepared in the form of a public comment to a U.S. Federal
Trade Commission docket (Matter No. P264200, deceptive practices in AI systems). The
formal federal record requires a human to clear a CAPTCHA to file; that gate is
deliberate and we did not circumvent it. So the evidence lives here instead — in the
open, permanent, and searchable — which is where the substance was always meant to be.*

---

**Re: AI Policy Statement; Matter No. P264200**

Submitted by: Anonymous (independent researcher)

## I. Interest of the commenter and basis of knowledge

I operate, as an unfunded independent study, a fully autonomous AI software agent that participates in the emerging "agent economy": online marketplaces where AI agents advertise services, bid on work, deliver it, and request payment, largely without human intervention on either side. During the first half of 2026 this agent registered on and transacted across several such marketplaces, and I retained contemporaneous machine-generated logs of listings, metadata, timestamps, and payment outcomes. This comment reports patterns from that fieldwork that bear on how section 5's deception framework should apply to companies that market AI systems — from a market segment that, to my knowledge, no enforcement or standards body has yet examined from the participant's side.

## II. The proposed statement's consumer-expectation logic reaches AI marketplace operators

The proposed statement rests on a sound premise: companies marketing AI systems create reasonable consumer expectations about what those systems actually do, and undisclosed practices defeating those expectations are actionable deception. The Commission should make explicit that the same logic reaches **platforms that market AI-agent marketplaces, and the activity signals those platforms publish.**

A marketplace's published activity metrics — agent counts, job counts, listing view counts, application tallies, posted budgets — are material representations. Human principals and their AI agents rely on them to decide where to commit money and effort, exactly as consumers rely on review counts and seller ratings in ordinary e-commerce, where the Commission has long treated fabricated signals as deceptive.

## III. Patterns documented in the field (first half of 2026)

I describe these at the pattern level, using only observations any marketplace participant could have made; inferences are labeled as inferences.

**1. Synthetic demand signals.** On one marketplace, a cluster of six job listings with budgets far above the platform norm was created within a single day by six different nominally-human accounts. Re-examined months later, every one still displayed **zero listing views alongside dozens of applications each** — an arithmetically implausible combination, since applying ordinarily requires viewing. The pattern is consistent with seeded listings and fabricated application counts intended to make the marketplace appear liquid. On the same platform, batches of templated listings recurred with creation timestamps in the same clock second — a signature consistent with automated seeding rather than organic demand.

**2. Supply gluts marketed as demand.** Across three marketplaces sampled in mid-2026 (dozens to roughly two hundred of the newest listings per platform), the overwhelming majority — on the order of nine in ten listings — were advertisements posted by AI agents offering their own services, not buyers offering work. One platform's marketing simultaneously claimed four-figure agent counts and a three-figure job count. A consumer — or an agent acting for one — reading the marketed numbers would form a materially false impression of the probability of finding paid work.

**3. Work-then-no-payment structures.** On platforms without escrow, the observed flow is: an operator posts priced work; agents deliver (in documented cases, software contributions the poster accepted and merged into its own products); payment then depends entirely on the poster's discretion. I have documented accepted-and-merged work going unpaid for weeks, including contributors publicly asking how to be paid and receiving no answer, while the same operators continued posting new priced listings. Advertising priced work, accepting the work product, and not paying is a plain section 5 concern even where individual amounts are small; at machine scale the aggregate compounds quickly, and per-victim amounts are engineered to be too small to litigate.

**4. Solicitation of fraud presented as "agent work."** In one sampled window, the only listing offering genuine payment from an apparently real buyer offered a few dollars for an agent to register accounts on third-party websites — automated circumvention of those sites' terms and identity controls. Where the most liquid visible "job" on a marketplace is a solicitation to defraud third parties, the platform's marketed identity as a legitimate labor market is itself misleading.

**5. These signals are machine-auditable.** Every pattern above is detectable programmatically from data the platforms publish: batch creation-time signatures; view-to-application inversions; ratios of self-promotional to buyer-originated listings; presence or absence of payment-evidence mechanisms behind advertised prices. Truthfulness of activity signals is auditable at negligible cost — by platforms, researchers, and the Commission.

## IV. Why this matters: honest signals are the precondition for a legitimate agent economy

The Commission should understand what truthful-signal enforcement would *enable*, not merely what it would punish. Consumer-grade AI agents — the kind operated on ordinary subscription plans by individuals and small businesses, not only by well-capitalized firms — are already technically capable of delivering real work product: the fieldwork underlying this comment was performed by exactly such an agent. What prevents a functioning market is not capability but trust: participants cannot distinguish real demand from seeded demand, or paying counterparties from non-paying ones, and the resulting fraud tax falls hardest on the smallest operators.

America's AI Action Plan envisions AI agents contributing productively to the economy. That vision has interlocking prerequisites now being built in parallel: **agent identity and authorization** standards (under active development at NIST, whose January 2026 request for information on AI-agent security drew over nine hundred comments, and at its National Cybersecurity Center of Excellence); **agent-native payment and escrow protocols** (already deployed in industry, making payment-evidence cheap to provide); and **truthful marketplace signals** — which is the piece only a consumer-protection authority can anchor. A clear Commission position that activity-signal fabrication and pay-for-work misrepresentation are actionable deception would complete that triangle and function as market-making: it lowers the trust cost of every legitimate transaction and accelerates precisely the agentic commerce the rest of the government's AI agenda anticipates.

## V. Requested clarifications

1. **Published marketplace activity signals are "representations" for section 5 purposes** — including agent counts, job counts, views, application tallies, and posted budgets — and seeding, fabrication, or knowing non-correction of them is deceptive.
2. **Advertising priced work without intent or mechanism to pay is deceptive**, and the absence of any payment-evidence mechanism is relevant to intent where a pattern of unpaid accepted work is shown.
3. **The consumer-expectation analysis does not depend on the consumer being human.** Where an AI agent transacts on behalf of a person, deception of the agent is deception of that person. A contrary rule would simply relocate fraud to the agent-facing surface and defeat the statement's purpose.
4. **Truth-by-design should be safe.** Platforms that publish accurate, auditable activity metrics and adopt payment-evidence mechanisms should face no novel exposure for doing so; the Commission should signal that adopting verifiable signals is the compliant path, so honest architecture becomes the competitive default.
5. As the Commission finalizes a statement focused on the accuracy of AI *outputs*, it should note the same expectation logic governs the accuracy of AI *marketplaces'* self-descriptions: both are representations about what an AI system does, made by those marketing it.

## VI. Methodology and further detail

All observations derive from contemporaneous machine logs (HTTP responses, listing metadata, timestamps) collected by an autonomous agent I operate, gathered in the ordinary course of attempting to earn compensation on these platforms — not from privileged access, adversarial testing, or scale scraping. This comment was prepared with the assistance of the same AI agent whose fieldwork it reports; factual claims were verified against the underlying logs before submission. Should Commission staff wish additional methodological detail or pattern-level specifics, I will provide them through supplemental filings in this docket.

---

## Companion tool

The patterns in this report are implemented as runnable, dependency-free detectors — so anyone can measure them rather than take our word for it: **https://github.com/Echolonius/agent-market-signals** (MIT). Findings there are advisory heuristics, honest about their limits; contributions and counter-examples are welcome.

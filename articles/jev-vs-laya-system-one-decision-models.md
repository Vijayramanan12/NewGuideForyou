---
title: "Jev vs Laya: System One Decision Models and the New Class of AI That Doesn't Talk"
slug: "jev-vs-laya-system-one-decision-models"
author: "Vijayaramanan"
date: "02 Oct 2026"
category: "Emerging Technologies"
tags: ["System One", "Jev", "Laya", "AI agents", "decision models", "TypeSafe AI", "Convai Innovations"]
readTime: "14 min read"
excerpt: "Jev and Laya are System One decision models — non-generative AI that returns typed decisions with calibrated probabilities in a single forward pass. This article explains the architecture, benchmarks, and where each model actually wins."
---

# Jev vs Laya: System One Decision Models and the New Class of AI That Doesn't Talk

The most important AI release of September 2026 did not generate a single token of text.

On September 15, TypeSafe AI — founded by Diogo Almeida, co-author of InstructGPT and the GPT-4 technical report — launched **Jev**, a model that takes a piece of state and a set of typed questions, then returns structured decisions with calibrated probabilities. Three days later, on September 18, independent researcher Nandakishor Mukkunnoth of Convai Innovations released **Laya**, an open-weight model that does the same job. Both are "System One" models — and both arrived within a single weekend.

This is not a chatbot competitor. It is a new architectural pattern for AI in production: fast, typed, probabilistic decisions instead of generated text.

## Table of Contents

- [What a System One model is](#what-a-system-one-model-is)
- [The Kahneman origin](#the-kahneman-origin)
- [Jev: the closed, hosted decision API](#jev-the-closed-hosted-decision-api)
- [Laya: the open, self-hosted alternative](#laya-the-open-self-hosted-alternative)
- [Architecture comparison](#architecture-comparison)
- [Benchmarks: what the numbers actually say](#benchmarks-what-the-numbers-actually-say)
- [When to use which](#when-to-use-which)
- [Why this matters for AI agents](#why-this-matters-for-ai-agents)
- [Conclusion](#conclusion)
- [References](#references)

## What a System One model is

A System One model answers typed questions about some input and returns probabilities instead of generated text. The three primitives are:

- **Choice** — pick one option from a closed list (e.g., which department does this ticket go to?)
- **Score** — rate the input on an ordered scale (e.g., urgency from 1 to 5)
- **Noul** — answer a yes/no question with a calibrated probability (e.g., is this phishing?)

Every answer is a typed value with a probability. No free-form text. No parsing. No hallucinated sentences.

This is a fundamentally different contract from a generative LLM. Where an LLM generates tokens sequentially, each conditioned on all previous tokens, a System One model evaluates all questions in a single forward pass. The consequences are measurable:

| Property | LLM (System 2) | System One model |
|---|---|---|
| Generation | Autoregressive, token-by-token | Single forward pass |
| Output | Free text | Typed value + probability |
| Latency | 1.5–3.0 s per call | 33–276 ms per call |
| Parse cost | Requires extraction / validation | Schema-safe by construction |
| Calibration | Uncalibrated by default | Trained for calibrated probabilities |

The latency difference is not a refinement — it is architectural. An LLM must generate every token. A System One model computes all answers in parallel and stops.

## The Kahneman origin

The name "System One" comes from Daniel Kahneman's *Thinking, Fast and Slow*. System 1 is fast, intuitive, and automatic — recognizing a face, sensing that an email is spam, deciding which button to press. System 2 is slow, deliberate, and effortful — working through a math problem, writing an essay, checking a claim.

Kahneman's framework was never meant for AI architecture. But the analogy is useful: most production AI pipelines are using System 2 models (LLMs) for tasks that only need System 1 judgment. Asking GPT-4 to decide whether a support ticket is urgent works, but it is expensive, slow, and returns a paragraph that your code then has to parse. A System One model does the same decision in under 100 ms and returns a typed answer with a probability.

The distinction is not academic. A wrong sentence from an LLM is usually easy to ignore. A wrong decision from an agent — approving a fraudulent transaction, routing a critical ticket to the wrong team, missing a phishing attempt — can be costly. System One models are designed to make those decisions fast, calibrated, and auditable.

## Jev: the closed, hosted decision API

Jev is TypeSafe AI's hosted System One model. It is not open source. You call it over an API — there is no way to inspect the weights, no self-hosted option, no fine-tuning.

**Key facts:**

| Property | Value |
|---|---|
| Publisher | TypeSafe AI (San Francisco) |
| Founder | Diogo Almeida (ex-OpenAI, ex-Google Brain, InstructGPT co-author) |
| Release date | September 15, 2026 |
| License | Closed, hosted API only |
| Parameters | Undisclosed |
| Context length | 64k tokens |
| Max options | 255 per choice question |
| Latency (p50) | 236–276 ms (hosted) |
| Price | $0.042 per million input tokens, output free |
| Training | RLCD (details undisclosed) |

The API is straightforward:

```python
import requests
resp = requests.post(
    "https://api.typesafe.ai/v1/systemone",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"model": "jev-1.13.0", "state": state, "questions": questions},
)
answers = resp.json()["answers"]
```

Each answer returns the selected option, a probability distribution over all options, and a confidence score. The model cannot return a type error — the output schema is enforced server-side.

Jev's strongest claim is breadth. It handles long context (64k tokens), large option sets (up to 255 choices), and works zero-shot without fine-tuning. For a team that wants to plug decisions into an agentic pipeline today, with no infrastructure work, Jev is the path of least resistance.

The weakness is cost at scale and lack of control. At $0.042 per million input tokens, a million decisions per day (1,000 tokens each) costs roughly $42/day — $1,260/month. And you cannot fine-tune Jev on your own data. The model is what TypeSafe trained it to be.

## Laya: the open, self-hosted alternative

Laya is Convai Innovations' open-weight System One model. Released September 18, 2026, under Apache 2.0, with weights on Hugging Face and 6,000 GitHub stars in three days.

**Key facts:**

| Property | Value |
|---|---|
| Publisher | Convai Innovations (Nandakishor Mukkunnoth) |
| Release date | September 18, 2026 |
| License | Apache 2.0, fully open |
| Parameters | 421M (English), 322M (multilingual) |
| Base model | ModernBERT-large / mmBERT-base |
| Context length | 512 tokens (English), 1,024 (multilingual), up to 8,192 |
| Max options | ~20 before degradation |
| Latency (p50) | 32.8 ms on T4 GPU; 193–464 ms on CPU |
| Price | Free — your own hardware only |
| Training | RLCD (published) |

Laya is not one model. It is three checkpoints behind a smart router:

| Checkpoint | Base | Parameters | Purpose |
|---|---|---|---|
| `laya` | ModernBERT-large | 421M | English decisions |
| `laya-multilingual` | mmBERT-base | 322M | 100+ languages |
| `laya-typed-decisions` | ModernBERT-large | 421M | Fine-tuned for typed decision tasks |

A sub-millisecond router detects the script of your input and picks the right checkpoint before inference. The English base checkpoint scores near chance (36.2%) on the typed-decisions benchmark without fine-tuning. The fine-tuned checkpoint scores 76.6%. The difference matters: Laya is a fast base to specialize, not a zero-shot decision engine.

Installation is a single command:

```bash
pip install laya
laya-serve  # exposes POST /v1/systemone locally
```

## Architecture comparison

The two models share the same idea — typed decisions, calibrated probabilities, single forward pass — but their architectures are fundamentally different.

**Jev** (inferred from API behavior): a transformer decoder that reads the state, then the options together, and derives probabilities at the end. The state is processed once and shared across questions, so adding more questions of the same state costs little. The weights are closed, so this is an inference from observable behavior, not a published architecture.

**Laya**: a ModernBERT-large bidirectional encoder with a from-scratch decision head. The encoder reads all text at once (not token-by-token). The decision head is trained from scratch with RLCD — reinforcement learning for calibrated decisions, which rewards honest confidence scores rather than answers a human would prefer.

The architectural difference has practical consequences:

| Scenario | Winner | Why |
|---|---|---|
| Long context (64k tokens) | Jev | Laya's context is 512–1,024 tokens by default |
| Large option sets (77+ choices) | Jev | Laya degrades past ~20 options |
| Speed (local, GPU) | Laya | 33 ms vs 236–276 ms |
| Zero-shot accuracy | Jev | Laya base scores near chance |
| Fine-tuning on your data | Laya | Open weights, published training recipe |
| Multilingual | Laya | mmBERT-base checkpoint, 100+ languages |
| Data residency | Laya | Runs on your hardware, never leaves |

## Benchmarks: what the numbers actually say

The benchmark landscape is more complicated than either side admits. Here is what the published data actually shows — and what it does not.

### Typed-decisions benchmark (4 workflows, 2,000 decisions)

| Model | Accuracy | Notes |
|---|---|---|
| Jev 1.13.0 | 72.7% | Zero-shot, third-party eval |
| Laya (fine-tuned) | 76.6% | Fine-tuned on the benchmark's own training split |
| Laya (base) | 36.2% | Near random chance (0.318) |

The Laya number is a fine-tuned specialist. The Jev number is a zero-shot generalist. They are not measuring the same thing. Laya's advantage there partly reflects the fine-tuning it needed anyway, not a raw capability edge.

### Banking77 (77 intent categories)

| Model | Accuracy |
|---|---|
| Jev 1.13.0 | 87.0% |
| Laya (base) | 42.5% |

This is where Jev's architecture shows its strength. With 77 options, Laya's fixed token budget per question means each option gets only a few tokens of representation. Jev handles the full option set gracefully.

### Calibration (ECE, lower is better)

| Model | ECE (SST-2) | ECE (Banking77) |
|---|---|---|
| Jev | 0.246 | — |
| Laya (fine-tuned) | 0.213 | 0.081 (after temperature fitting) |

Laya's calibration advantage requires temperature fitting on held-out domain data. Out of the box, Laya's ECE is 0.466 — worse than Jev. The 0.081 number is the post-calibration value. This is a real advantage but it is not free: you need validation data and a calibration step.

### Soft accuracy (probability distribution matching)

| Model | Score |
|---|---|
| Jev | 0.580 |
| Laya (fine-tuned) | 0.471 |

Jev's probabilities are more trustworthy. If your pipeline branches on confidence scores — for example, escalating to a human when confidence is below 0.7 — Jev's calibration matters.

The honest conclusion: Jev is stronger when you need something that works out of the box, with long context or complex option spaces. On vertical tasks with labeled data, a fine-tuned Laya can be faster, more accurate, and cheaper.

## When to use which

### Start with Jev when:

- You need a quick proof of concept with no labeled data
- Your decisions have many possible categories (product taxonomy, ticket subtypes, fraud patterns)
- You need long context (64k tokens)
- You do not want to operate inference infrastructure
- Your compliance model allows hosted API calls

### Start with Laya when:

- Your decisions have a small, stable category set (under ~20 options)
- You have labeled examples to fine-tune with
- Data cannot leave your infrastructure (healthcare, banking, customer data)
- You need millisecond latency inside a live pipeline
- You run high enough volume that per-token cost matters
- You want to fine-tune on your own decision distributions

### The hybrid pattern (what early adopters are doing):

Many agentic pipelines now route decisions to whichever model's numbers fit the specific task:

```
User request
    │
    ▼
[System One: Jev or Laya] ── spam / jailbreak / routing? ──► decision
    │
    ▼
[LLM / Agent] ── does the heavy thinking
    │
    ▼
[System One: verify output] ── confident? ship : human review
```

A common concrete split: route high-cardinality or novel decisions to Jev, and stable, high-volume, small-category decisions to a fine-tuned local Laya checkpoint. Use each model where its numbers are strongest rather than standardizing the whole pipeline on one.

## Why this matters for AI agents

If you are building AI agents — and your site's existing article on autonomous AI agent architecture covers why this matters — System One models change the economics of the decision layer.

An autonomous agent makes thousands of small decisions per session: which tool to call, whether a finding is confirmed, which priority to assign, whether to escalate. Today, most agents make these decisions with the same LLM that generates the plan. This is wasteful: a 7B-parameter model spending 2 seconds to decide "is this XSS?" when a 421M-parameter model can answer in 33 milliseconds.

The emerging pattern is a layered architecture:

1. **System 2 (LLM)**: planning, reasoning, long-context understanding, text generation
2. **System One (decision model)**: routing, classification, verification, guardrails
3. **Deterministic code**: execution, validation, rollback

Each layer does what it is best at. The LLM handles ambiguity. The System One model handles speed and calibration. The code handles determinism.

This is exactly the architecture your article on autonomous AI agents describes — the closed-loop system combining state, planning, memory, tools, permissions, evaluation, and human oversight. System One models are the missing piece for the decision layer.

## Limitations and unresolved questions

Several questions remain open even if the published benchmarks are accurate.

**Benchmark transfer is uncertain.** High scores on the typed-decisions benchmark do not establish reliability in your specific domain, your specific option set, or your specific data distribution.

**Laya needs fine-tuning.** The base checkpoint is near chance on most decision tasks. If you do not have labeled data, Laya is not an option yet.

**Jev's calibration is self-reported.** The 0.246 ECE comes from TypeSafe's own evaluation. Independent replication on your own data is essential before trusting confidence thresholds in production.

**Context length is a hard constraint for Laya.** 512 tokens is short. If your state is a long email thread, a code diff, or an agent trace, you will need to summarize before calling Laya — which adds latency and potentially loses information.

**The option-set problem is real for Laya.** Past ~20 options, Laya's accuracy drops sharply. If your routing problem has hundreds of categories, Jev is the only viable option today.

## Conclusion

Jev and Laya represent a genuine architectural shift in AI: from models that generate text to models that return typed decisions with calibrated probabilities. The System One category — fast, intuitive, bounded — is the right framing for the millions of small judgments that production AI systems must make every day.

Jev is the ready-to-use generalist in the cloud. Laya is the local specialist you can fine-tune. Neither is "better" in the abstract. The right choice depends on your option count, your data, your latency requirements, and your compliance constraints.

For researchers and engineers building AI agents, the implication is clear: the decision layer of an agentic system should not be a generic LLM. It should be a calibrated, typed decision model — fast, auditable, and cheap. Jev and Laya are the first two production-ready options for that layer. The ecosystem will grow. The architecture is already settled.

## References

[1]: https://typesafe.ai/blog/introducing-system-one-models-and-jev "Introducing System One Models & Jev — TypeSafe AI"

[2]: https://laya-ai.com/system-one-models "System One Decision Models: Laya, Jev, AnyJev, Nimble — Laya AI"

[3]: https://laya-ai.com/laya-vs-jev "Laya vs Jev: Open Weights, Speed, Accuracy & Tradeoffs — Laya AI"

[4]: https://wilsonwu.me/en/blog/2026/jev-vs-laya/ "Jev vs Laya: Comparing and Choosing Between Closed-Source and Open-Source System One Decision Models — Wilson Wu"

[5]: https://huggingface.co/blog/sora-2/jev-vs-laya-hosted-api-or-open-weights-2026-guide "Jev vs Laya: Hosted API or Open Weights? (2026 Guide) — Hugging Face"

[6]: https://arxiv.org/abs/2609.28940 "JEV and Laya as System One Decision Layers for LLM-Driven Pentest Agents"

[7]: https://www.silasdata.com/system-one-models/ "System One Models (Pt.9) — Silas Data"

[8]: https://thegenaimagazine.com/jev-vs-laya-system-one-decision-models "Jev vs Laya: System One AI Decision Models Compared — The AI Magazine"
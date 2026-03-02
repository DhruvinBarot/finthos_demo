# Finthos — Wealth Intelligence Dashboard

> A working prototype of the Finthos core dashboard, built over a weekend as part of my application for the Full Stack Engineer role.

![Stack](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Stack](https://img.shields.io/badge/Chart.js-4.4-ff6384?style=flat-square&logo=chartdotjs&logoColor=white)
![Stack](https://img.shields.io/badge/Anthropic-Claude_API-6b48ff?style=flat-square)
![Stack](https://img.shields.io/badge/Deployed-GitHub_Pages-222?style=flat-square&logo=github)

---

## Why I Built This

When I came across the Finthos role, I didn't want to just send a resume. The product vision — a unified agentic AI wealth platform for family offices and UHNWIs — is exactly the kind of problem I want to be working on. So instead of describing what I could build, I built it.

This prototype covers the exact four pages outlined in the first 30 days of the JD, scoped around a fictional $24.8M UHNWI family office client.

---

## What's Inside

### 💰 Wealth Dashboard
- Total net worth hero with monthly change and breakdown
- Investable assets, real estate, private equity, and cash at a glance
- Designed to feel premium — the kind of UI a family office client would trust

### 📊 Portfolio Performance & Allocation
- Live Chart.js line chart with gradient fill tracking monthly portfolio movement
- Interactive donut chart showing allocation across 6 asset classes — equities, real estate, fixed income, private equity, crypto, and cash
- Hoverable tooltips with formatted dollar values

### 🏦 Holdings & Activity
- Top 5 holdings with real-time P&L, progress bars, and ticker info
- Multi-account transaction feed across Schwab, Coinbase, HSBC Private, and Vanguard

### ✦ Live AI Advisor — The Extra Step
The AI chat isn't a mockup. It's a fully working advisor powered by the **Anthropic Claude API**, pre-loaded with the client's complete portfolio context — allocations, holdings, recent transactions, and performance data.

Ask it anything:
- *"Should I rebalance my portfolio?"*
- *"What are my biggest risks right now?"*
- *"How is my crypto performing?"*

It responds with specific numbers, not generic advice. Conversation history is maintained across turns so follow-up questions work naturally.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS, HTML5, CSS3 |
| Charts | Chart.js 4.4 |
| AI | Anthropic Claude API (`claude-sonnet-4`) |
| Deploy | GitHub Pages |

No frameworks, no build tools, no dependencies beyond Chart.js. Intentionally lightweight — clean frontend work shouldn't need a heavy stack behind it.

---

## Project Structure

```
finthos-dashboard/
├── index.html        # Markup, layout, and component structure
├── style.css         # Design system, CSS variables, all component styles
├── app.js            # Chart init, tab logic, AI chat + conversation history
└── README.md
```

---

## Running Locally

No build step needed. Clone and open.

```bash
git clone https://github.com/dhruvinbarot/finthos-dashboard
cd finthos-dashboard
open index.html
```

**Live demo →** [dhruvinbarot.github.io/finthos_demo](#)

---

## About Me

**Dhruvin Barot** — Full Stack Engineer  
Certified in AWS Solutions Architect & Google Cloud Platform  
React · Next.js · TypeScript · Supabase · Anthropic API

[Portfolio](#) · [LinkedIn](#) · [GitHub](#)

---

*Built for Finthos. Ready to ship the real thing.*

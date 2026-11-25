# Data analyst portfolio references

Collected 2026-11-25. Web search was unavailable, so these were found through
the GitHub repository search API and fetched directly. Stars are a popularity
signal only. The employment outcomes of the authors were not verified, so none
of these is presented as proof that a specific person was hired by a global
company. They are references for **structure and artifact depth**.

## 1. Priyanka Jha, DataAnalystPortfolioProjects (919 stars)

https://github.com/PriyankaJhaTheDeveloper/DataAnalystPortfolioProjects

What it does better than our site:

- Separates artefacts by tool: raw SQL insertion script, SQL exploration
  script, Tableau Public dashboard link, HiveQL case study, PostgreSQL BI
  challenge, and a Google Slides deck.
- Every project has a clickable artefact, not just a prose write-up.
- Personal website + LinkedIn are linked from the repo.
- Range: Instagram clone analysis, NYC taxi in Hive, Nashville housing
  cleaning, COVID exploration, movies EDA, Tableau makeovers.

Takeaway: a portfolio entry is a **bundle of files**, not an essay. Our demos
have one script and one write-up. A top candidate has the query, the dashboard,
and the presentation.

## 2. Asif Rashid, SalesAnalysis_SQL_PowerBI (221 stars)

https://github.com/AsifRashid01/SalesAnalysis_SQL_PowerBI

What it does better:

- Starts with **Business Request & User Stories**, explicitly framing the
  ambiguity before any analysis.
- Uses AdventureWorksDW, explains fact vs dimension tables, and documents the
  T-SQL cleaning steps (JOIN, CASE, ISNULL, column selection).
- Ships the actual `.pbix` Power BI file and a PDF screenshot.
- Lists the dashboard construction steps: data model, relationships, measures,
  slicers, drill-through, custom visuals.

Takeaway: this is the closest match to what a global analyst interviewer
expects: business framing, a modelled dataset, SQL transformation, and a BI
deliverable that a non-technical manager can open.

## 3. Amlan Mohanty, Zepto SQL project (78 stars)

https://github.com/amlanmohanty1/zepto-SQL-data-analysis-project

What it does better:

- Uses a scraped, messy e-commerce inventory dataset rather than a textbook
  table. Duplicate SKUs, paise-to-rupee conversion, nulls, and invalid rows are
  treated as part of the work.
- Frames the work as simulating a real retail analyst: EDA, cleaning, then
  business-driven queries about pricing, inventory, stock, and revenue.
- Dataset origin (Kaggle, scraped from Zepto) is named and linked.

Takeaway: one messy, realistic dataset does more for credibility than five
clean teaching sets.

## 4. Deekshith K Gowda, personal portfolio website

https://deekshithkgowda.github.io/ · https://github.com/DeekshithKGowda

What it does better:

- Resume/Experience/Education/Projects/Contact are first-class sections.
- Downloadable CV, email, phone, location, and LinkedIn are visible.
- Each project lists tools explicitly and links to the repository where the
  artefact lives.
- Experience entries name the organisation and the client-facing task, even
  for internships.

Takeaway: our `/about` has prose but no CV, no experience record, and no
per-project tool list. Those omissions are visible in the first 60 seconds.

## 5. mkumar7, Data Analyst Portfolio (144 stars)

https://github.com/mkumar7/Data-Analyst-Portfolio

What it does better:

- Structured as a curriculum map: statistics, inference, A/B testing,
  regression, wrangling, with a project attached to each stage.
- Includes an A/B test decision project using a company-style `ab_data.csv`.

Takeaway: showing a coherent progression beats a pile of unrelated tutorials.
Our three teaching demos are unrelated; a single domain would read stronger.

## Pattern across all five

A credible global-standard entry contains, at minimum:

1. a business question stated before the analysis,
2. the raw or modelled data with a named source,
3. SQL or equivalent transformation code the reader can run,
4. a BI artefact (`.pbix`, Tableau Public, Looker) with screenshots,
5. a short presentation or decision memo aimed at a non-technical reader,
6. an explicit tool list and a link to the repository,
7. CV, contact, and experience on the site itself.

Our `/data-analytics` currently has 1, 2, 3 (Python only, no SQL), 7 (partial),
and prose in place of 4 and 5. That is why it reads as short. The fix is not
longer articles. It is more artefacts per project.

## Relevant to our own audit

The business-owner audit's 30-day plan (Olist + SQL/dbt, one dollar-denominated
decision memo, Power BI dashboard, experiment design) matches the artifact
pattern above. These references are the concrete examples of that pattern.

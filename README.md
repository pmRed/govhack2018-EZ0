# EZ0
We want to estimate, in a Bayesian way, the likelihood of a person becoming personally insolvent, given certain information about them.
The important information we're given about individuals in`non-compliance-in-personal-insolvencies.csv` is:
- SA3 of debtor
- Sex of debtor
- Family situation
- Debtor occupation code (N.B., these seem to be Sub-Major Groups in the ANZCO ontology, see http://www.abs.gov.au/ANZSCO)

Because we don't have the joint distribution of Debtor occupation and family situation, we can't do this with a single model.
Instead, we'll have to construct two models:
- Estimating Pr(non-compliance) given SA3, sex, and family situation
- Estimating Pr(non-compliance) given SA3, sex, and debtor occupation

## Family situation
B25 is the census dataset decribing 'Family Composition'.
### Cleaning B25 (SA3)
We need to aggregate B25 to produce the categories in `family situation` in `df_personal_insolvencies`
1. Find all unique family situations in `non-compliance-in-personal-insolvencies.csv`
2. Express each such family situation in terms of the columns in B25
3. Produce a new version of B25 whose columns are the family situations found in (1)

## Debtor Occupation
The Debtor occupation codes in `non-compliance-in-personal-insolvencies.csv` are _Sub-Major Groups_ in the ANZCO ontology, see http://www.abs.gov.au/ANZSCO. However census data only has _Major Groups_. Consequently our model will only be able to ooperate on ANZSCO major groups. The relevant census datasets are either _B45 Occupation by Age by Sex_ (in which case age needs to be marginalised out) or _T34 Occupation By Sex_ (which is time-series data for each census year). Suppose we use T34 (SA3)

### Cleaning T34 (SA3)
1. Add a columns associating each Sub-Major group in `non-compliance-in-personal-insolvencies.csv` to its parent ANZSCO Major Group


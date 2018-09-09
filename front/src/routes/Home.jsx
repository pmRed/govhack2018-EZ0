import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react'

export default class Page extends Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <b>We built an AI-based platform that uses information about an individual to quantity their relative insolvency risk.</b>
                Their relative risk is expressed as a number which indicates how many times less/more likely than average a given individual is to become insolvent.
                We also used this model to derive broad demographic trends in personal insolvency. Geographic insolvency trends are indicated on an interactive map which highlights SA3 regions by the expected insolvency rates. Trends relation to occupation, gender, and family composition are also visualised.
                    <h1 id="overview">Overview</h1>
                    <p>We wanted to estimate, using a Bayesian AI model, the likelihood of a person becoming personally insolvent, given certain information about them. But to do this, we needed the marginal and prior distributions for each variable. Getting statistics about these variables for the general population was difficult, and some key variables had to be abandoned (e.g. assets, liability). However, a few key variables <em>could</em> be correlated with census data.</p>
                    <h1 id="variablesofinterest">Variables of interest</h1>
                    <p>The variables which were common to the given <code>non-compliance-in-personal-insolvencies.csv</code> dataset and 2016 census data are:</p>
                    <ul>
                        <li>the SA3 of debtor</li>
                        <li>Family situation of debtor (Census dataset B25 SA3)</li>
                        <li>Sex of debtor (Census dataset B57A SA3)</li>
                        <li>Debtor occupation code (these seem to be Sub-Major Groups in the ANZCO ontology, see http://www.abs.gov.au/ANZSCO; the closest relevant dataset was B57A SA3 which used ANZSCO Major Groups</li>
                    </ul>
                    <h1 id="approach">Approach</h1>
                    <p>Because we don't have the joint distribution of Debtor occupation and family situation, we can't do this with a single model.
Instead, we'll have to construct two models:</p>
                    <ul>
                        <li>Estimating Pr(non-compliance) given SA3, sex, and family situation</li>
                        <li>Estimating Pr(non-compliance) given SA3, sex, and debtor occupation
We then need to find a way to combine these predictors to give a single number. Adding in quadrature after normalising by the non-compliant marginal probability seemed to be a sensible option.</li>
                    </ul>
                    <p>So we calculated the average expected risk of non-compliance (i.e. the marginal risk of non-compliance), and expressed every prediction in units of this quantity (e.g. person X is 2.5x more likely to be non-compliant than average given their demographic information). </p>
                </Segment>
            </Container>
        )
    }
}

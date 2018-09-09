import React, { Component } from 'react'
import {
    List,
    Container,
    Segment,
} from 'semantic-ui-react'


export default class Page extends Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <h1> Data Sources and Discussion</h1>
                    <p> We wanted to estimate, using a Bayesian model, the likelihood of a person becoming personally insolvent, given certain information about them. But to do this, we needed the marginal and prior distributions for each variable. Getting statistics about these variables for the general population was difficult, and some key variables had to be abandoned (e.g. assets, liability). However, a few key variables could be correlated with census data. </p>
                    <p>The variables which were common to the given non-compliance-in-personal-insolvencies.csv dataset and 2016 census data are:</p>
                    <p>- the SA3 of debtor</p>
                    <p>- Family situation of debtor (Census dataset B25 SA3)</p>
                    <p>- Sex of debtor (Census dataset B57A SA3)</p>
                    <p>- Debtor occupation code (these seem to be Sub-Major Groups in the ANZCO ontology, see <a href='http://www.abs.gov.au/ANZSCO'>Link</a>; the closest relevant dataset was B57A SA3 which used ANZSCO Major Groups</p>
                    <p>Because we don't have the joint distribution of Debtor occupation and family situation, we can't do this with a single model. Instead, we'll have to construct two models:</p>
                    <p>- Estimating Pr(non-compliance) given SA3, sex, and family situation</p> 
                    <p>- Estimating Pr(non-compliance) given SA3, sex, and debtor occupation</p>
                    <p>We then need to find a way to combine these predictors to give a single number. Adding in quadrature after normalising by the non-compliant marginal probability seemed to be a sensible option.</p>
                    <p>So we calculated the average expected risk of non-compliance (i.e. the marginal risk of non-compliance), and expressed every prediction in units of this quantity (e.g. person X is 2.5x more likely to be non-compliant than average given their demographic information). </p>
                    <List divided relaxed>
                        <List.Item>
                            <List.Icon name='database' size='huge' verticalAlign='middle' />
                            <List.Content>
                              <List.Header as='a'>GovHack ATO 2018 </List.Header>
                              <List.Description>
                                <p>For transparency and repeatability, the raw data that was use is stored in the git repository at `data/ato/atoabsgovhack2018.xlsx`. For convenience, each sheet been extracted into CSV files. We were most interested in this dataset for the correlation between postcode and the total number of people who have lodged a tax return.</p>
                                <a href='https://data.gov.au/dataset/govhackato/resource/f3bcbd38-b3e9-4a27-8729-2314f05a6ae4?inner_span=True'>Link</a>
                              </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment>
            </Container>
        )
    }
}

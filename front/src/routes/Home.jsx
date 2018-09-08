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
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as='h3'>
                                    We Help Companies and Companions
                                </Header>
                                <p>
                                    We can give your company superpowers to do things that they never thought possible.
                                    Let us delight your customers and empower your needs... through pure data analytics.
                                </p>
                                <Header as='h3'>
                                    We Make Bananas That Can Dance
                                </Header>
                                <p>
                                    Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                                    bioengineered.
                                </p>
                            </Grid.Column>
                            <Grid.Column floated='right' width={6}>
                                <Image bordered rounded size='large' src='/assets/logo.png' />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Button size='huge'>Check Them Out</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header>
                                    "What a Company"
                                </Header>
                                <p>
                                    That is what they all say about us
                                </p>
                            </Grid.Column>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3'>
                                    "I shouldn't have gone with their competitor."
                                </Header>
                                <p>
                                    <Image avatar src='./assets/imgs/avatar/small/ade.jpg' />
                                    <b>Nan</b> Chief Fun Officer Acme Toys
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        <Header as='h3'>
                            Breaking The Grid, Grabs Your Attention
                        </Header>
                        <p>
                            Instead of focusing on content creation and hard work, we have learned how to master the
                            art of doing nothing by providing massive amounts of whitespace and generic content that
                            can seem massive, monolithic and worth your attention.
                        </p>
                        <Button as='a' size='large'>
                            Read More
                        </Button>
                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                        >
                            <a>Case Studies</a>

                        </Divider>
                        <Header as='h3'>
                            Did We Tell You About Our Bananas?
                        </Header>
                        <p>
                            Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                            it's really true. It took years of gene splicing and combinatory DNA research, but our
                            bananas can really dance.
                        </p>
                        <Button as='a' size='large'>
                            I'm Still Quite Interested
                        </Button>
                    </Container>
                </Segment>
            </Container>
        )
    }
}

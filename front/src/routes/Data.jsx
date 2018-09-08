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
                    <List divided relaxed>
                        <List.Item>
                            <List.Icon name='database' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a'>Data Resource 1</List.Header>
                                <List.Description>Description Long</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment>
            </Container>
        )
    }
}

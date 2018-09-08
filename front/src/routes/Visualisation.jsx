import React, { Component } from 'react'
import Maps from '../components/Maps'
import {
    Container,
    Segment,
} from 'semantic-ui-react'


export default class Page extends Component {
    render() {
        return (
            <Container fluid style={{padding:'50px 50px'}}>
                <Segment style={{ height:'80vh'}}>
                    <Maps/>
                </Segment>
            </Container>
        )
    }
}

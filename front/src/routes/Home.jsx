import React, { Component } from 'react'
import Maps from '../components/Maps'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react'


export default class Home extends Component {
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

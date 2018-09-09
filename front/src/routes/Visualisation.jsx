import _ from 'lodash'
import React, { Component } from 'react'
import Maps from '../components/Maps'
import {inject, observer} from 'mobx-react'
import {
    List,
    Form,
    Message,
    Container,
    Segment,
} from 'semantic-ui-react'

import {Bar} from 'react-chartjs-2'

import sa3s from '../stores/sa3_dict'
import mocs from '../stores/majGroups_dict'
import famss from '../stores/familySituations_dict'
import mocsdata from '../stores/majGroup_prediction'

const sa3sl = _.map(sa3s, (e,t)=>{return {text: t+': '+e, value: t, key: e+t}})
const mocsl = _.map(mocs, (e,t)=>({text: e, value: t, key: e+t}))
const famssl = _.map(famss, (e,t)=>({text: e, value: e, key: e+t}))

console.log(mocsdata)
@inject('UIState')
@observer
class Page extends Component {
    state = {
        riskfactor: '',
        good: false,
        warning: false,
        bad: false,
        query: false,
        inputWarn: false,
        unk: false
    }

    searchData() {
        this.setState({query: false, good: false, bad: false, warning: false, unk: false})
        const {sa3, gender, moc, fams} = this.state
        const _this = this
        if ( sa3== null || gender == null || moc == null || fams == null ){
            this.setState({inputWarn: true})
            return 
        }

        fetch('http://localhost:5500/calculaterisk?sa3='
            +sa3+'&sex='
            +gender+'&majorGroup='
            +moc+'&familySituation='
            +fams)
            .then((e)=>e.json())
            .then(e=>{_this.setState(e)})
            .then(e=>{
                this.setState({inputWarn: false})
                this.setState({query: true})
                if(this.state.failed){
                    _this.setState({unk: true})
                    return
                }
                if(this.state.riskfactor>1.6){
                    _this.setState({bad: true})
                    return
                }
                else if(this.state.riskfactor>1.3){
                    _this.setState({warning: true})
                    return
                }
                else { _this.setState({good: true}) }
            })
    }

    render() {
        const rfSimp = (this.state.riskfactor).toString().substring(0,5)
        console.log(mocsl)
        const datasml = {
            labels: _.map(mocsl,'value'),
            datasets: [
                {
                    label: 'Number of insolvencies by occupation per 10000 workers',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: _.map(mocsdata,(e)=>e*10000)
                },
            ]
        }
        return (
            <Container fluid style={{padding:'50px 50px'}}>
                <h1>Insolvency Oracle</h1>
                <Segment color='blue' textAlign='center'>
                  <h2>How much more likely is a person in this demographic to become insolvent compared to the average?</h2>
                    <hr/>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Select style={{}} placeholder='Statistical Area 3 Code' search options={sa3sl} onChange={(e,{value})=>this.setState({sa3:value})} />
                            <Form.Select style={{}} placeholder='Gender' search options={[{text: 'Male', value: 'Male'},{text:'Female', value: 'Female'}]} onChange={(e,{value})=>this.setState({gender:value})} />
                            <Form.Select style={{}} placeholder='Major Occupation Code' search options={mocsl} onChange={(e,{value})=>this.setState({moc:value})}  />
                            <Form.Select style={{}} placeholder='Family Situation?' search options={famssl} onChange={(e,{value})=>this.setState({fams:value})}  />
                            <Form.Button  color='blue' onClick={e=>{this.searchData()}}>Calculate</Form.Button>
                        </Form.Group>
                        <Message hidden={!this.state.inputWarn}>
                            You are missing inputs, please complete the form above.
                        </Message>
                    </Form>
                    <Container>
                        <Message
                            hidden={!this.state.unk}
                        >
                            <h1><b>Sorry... Not enough data to make inference.</b></h1>
                        </Message>
                        <Message
                            hidden={!this.state.warning}
                            warning
                        >
                            <h1><b>Risk Multiplier: </b>{rfSimp}</h1>
                        </Message>
                        <Message negative hidden={!this.state.bad}>
                            <h1><b>Risk Multiplier: </b>{rfSimp}</h1>
                        </Message>
                        <Message positive hidden={!this.state.good}>
                            <h1><b>Risk Multiplier: </b>{rfSimp}</h1>
                        </Message>
                    </Container>
                </Segment>
                <Segment>
                  <h2>The big picture, what is the average rate of insolvency by region?</h2>
                    <Container fluid style={{ height:'800px'}}>
                        <Maps/>
                    </Container>
                </Segment>
                <Segment>
                  <h2>Number of insolvencies by occupation per 10000 workers (Australia wide)</h2>
                    <Container>
                        <Bar
                            data={datasml}
                            width={100}
                            height={500}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Probability of Insolvency (per 10000 workers)'
                                        }
                                    }]
                                }
                            }} 
                        >
                        </Bar> 
                    </Container>
                    <h4>Index</h4>
                    <List horizontal celled>
                        {mocsl.map((e)=><List.Item>{e['value']}: {e['text']}</List.Item>)}
                    </List>
                </Segment> 

            </Container>
        )
    }
}

export default Page

import _ from 'lodash'
import uuidv4 from 'uuid/v4'
import React, { Component } from 'react'
import {
    Container,
    Table,
} from 'semantic-ui-react'

export default class InspectorTable extends Component {

    Header() {
        const { labels } = this.props

        var headerCells = labels.map(
            label => (
                <Table.HeaderCell style={{maxWidth:'100px', overflow:'wrap'}} key={label.id}>
                    {label.name}
                </Table.HeaderCell>
            ) 
        )
        var optCell = null
        if(this.props.Options){
            optCell = (
                <Table.HeaderCell />
            )
        }
        return (
            <Table.Header>
                <Table.Row>
                    {headerCells}
                </Table.Row>
                {optCell}
            </Table.Header>
        )
    }


    PopulateRows(){
        const { data, labels , processCellContent } = this.props
        const table = {}
        const dataIndex = {}
        data.forEach(
            row => { 
                const rowKey = uuidv4() 
                table[rowKey] = {}
                dataIndex[rowKey] = row.key
                _.map(labels, 'id')
                    .forEach((id) => {
                        const cellKey = uuidv4()
                        table[rowKey][cellKey] = processCellContent(row.value[id], id)
                    })
            }
        )
        this.setState({
            table,
            dataIndex
        })
    }

    RenderRows(){
        return _.map(this.state.table,
            (value, key) => {
                var optCell = null
                if(this.props.Options){
                    optCell = (
                        <Table.Cell collapsing textAlign='right'>
                            {this.props.Options(key, this.state.dataIndex[key], this)}
                        </Table.Cell>
                    )
                }
                   
                return (
                    <Table.Row key={key}>
                        {_.map(value, (cell, key) => 
                            <Table.Cell key={key}>
                                {cell}
                            </Table.Cell>
                        )}
                        {optCell}
                    </Table.Row>
                )
            }
        )
    }

    Table() {
        const rows = this.RenderRows()
        this.Header()
        return (
            <Table definition striped celled>
                {this.Header()}
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        )
    }

    componentWillMount(){
        this.PopulateRows()
    }

    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){
            this.PopulateRows()
        }
    }

    render() {
        return (
            <Container fluid>
                {this.Table()} 
            </Container>
        )
    }
}

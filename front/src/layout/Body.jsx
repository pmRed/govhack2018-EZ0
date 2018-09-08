import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { 
    Menu,
    Icon,
    Sidebar,
} from 'semantic-ui-react'

import hashes from './Routes'
import { observer, inject } from 'mobx-react'

@inject('UIState')
@withRouter
@observer
class  AutoSidebar extends Component {
    handleSidebarHide = () => {this.props.UIState.sidebarVisible = false} 
    render() {
        return ( 
            <Sidebar
                direction='left'
                vertical
                as={Menu}
                borderless
                animation='overlay'
                // onHide={this.handleSidebarHide}
                visible={this.props.UIState.sidebarVisible}
                style={{paddingTop: '60px'}}
            >
                {
                    hashes.paths.map( (props,key) => 
                    {
                        return (
                            <Menu.Item 
                                as={NavLink} 
                                to={props.path} 
                                key={key}
                            >
                                {props.name}
                                <Icon name={props.icon}/>
                            </Menu.Item>
                        )
                    })
                }
                {
                    <Menu.Item as='a' href='https://www.github.com'>
                        Our Code
                        <Icon name='github'/>
                    </Menu.Item>
                }
            </Sidebar>
        )
    }
}
class Body extends Component {
    render() {
        return (
            <Sidebar.Pushable 
                className='content'
                style={this.props.style}
            >
                <AutoSidebar
                    location={this.props.location}
                />
                <Sidebar.Pusher 
                    className='body'
                    // dimmed={this.props.UIState.sidebarVisible}
                    style={
                        {
                            paddingTop:'60px',
                            paddingLeft: '260px',
                            overflowY:'scroll'
                        }
                    }
                >
                    {this.props.content}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

export default Body 

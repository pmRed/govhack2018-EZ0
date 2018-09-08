import React, { Component } from 'react'
import { 
    Menu, 
    Image, 
    Container
} from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'

const _logoStyle = {
    paddingTop:'8px',
    paddingBottom:'8px'
}

@inject('UIState')
@observer
class Header extends Component {
    render() {
        return (
            <Menu fixed='top'>
                <Menu.Item 
                    inline='true'
                    color='green'
                    className='menuItem'
                    // onClick={(e) => this.props.UIState.toggleSidebar()}
                    // icon='bars'
                    content='Menu'
                /> 
                <Container>
                    <Menu.Item header>
                            Project Name
                    </Menu.Item>
                </Container>
                <Menu.Item as='a' 
                    className='logoItem' 
                    style={_logoStyle}>
                    <Image size='mini' src='/assets/logo.png'/>
                </Menu.Item>
            </Menu>
        )
    }
}

export default Header
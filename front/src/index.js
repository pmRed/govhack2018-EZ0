import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './css/semantic.flatly.css'
import './css/index.css'

import Content from './layout/Content'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Body from './layout/Body'

import UIState from './stores/UIStore'

import registerServiceWorker from './registerServiceWorker'

const _layout = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
}


const _body = {
    flex: '1',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
}

const _content = {
    flex: '1',
}

ReactDOM.render(
    <Provider {...{UIState: UIState}}>
        <HashRouter>
            <div className='layout' style={_layout}>
                <Header/>
                <Body style={_body}
                    content={<Content style={_content}/>}
                />
                <Footer/>
            </div>
        </HashRouter>
    </Provider>
    , root)

registerServiceWorker()
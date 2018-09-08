import React, { Component } from 'react'
import { Redirect, Switch , Route} from 'react-router-dom'

import hashes from './Routes'

export default class Content extends Component {
    render() {
        return (
            <Switch>
                {hashes.paths.map((prop, key) => {
                    return (
                        <Route path={prop.path} component={prop.component} key={key} />
                    )
                })}
                <Redirect from={hashes.redirect.path} to={hashes.redirect.to} />
            </Switch>
        )
    }
}
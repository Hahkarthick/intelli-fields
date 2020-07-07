import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IntelliFields from '..'

export default class Test extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <div>
                <IntelliFields type="text" dataValidationRequired="true" dataErrorMsg="this is mandatory"/>
            </div>
        )
    }
}

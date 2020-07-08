import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IntelliFields from '..'

export default class Test extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <IntelliFields type="text" dataValidationRequired="true" name="name" label="Name" dataErrorMsg="Name is Required" />
                <IntelliFields type="text" label="Email Id"
                 dataValidationRequired="true" name="email"
                 dataErrorMsg="Email is Required" dataValidationRegex='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
                 dataRegexErrorMsg="Enter a valid Email addres" />
            </div>
        )
    }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/style.scss'

export class IntelliFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canShowErrorMsg: false,
            errorMsg: ""
        };
        this.handleTouch = this.handleTouch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    static defaultProps = {
        callBackFunction: '',
        selectedVal:'',
        className:'intelli-fields',
        autoComplete:'on',
        minLength:'',
        maxLength:'',
        value:''
    }
    static propTypes = {
        callBackFunction: PropTypes.string.isRequired,
        selectedVal: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        autoComplete: PropTypes.string.isRequired,
        minLength: PropTypes.string.isRequired,
        maxLength: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }

    // this.props.callBackFunction
    handleTouch(event) {
        var elmValue = event.target.value.trim();
        var validation = event.target.getAttribute("data-validation");
        var regex = RegExp(this.props.dataValidationRegex);
        if (!elmValue && validation == "true") {
            this.setState({
                canShowErrorMsg: true,
                errorMsg: this.props.dataErrorMsg ? this.props.dataErrorMsg : 'Required'
            });
        } else if (regex && !regex.test(elmValue)) {
            this.setState({
                canShowErrorMsg: true,
                errorMsg: this.props.dataRegexErrorMsg
            });
        } else {
            this.setState({ canShowErrorMsg: false });
        }

    }
    handleChange(event) {
        const input = e.target;
        const name = input.name;
        const value = input.type === "checkbox" ? input.checked : input.value;
        this.setState({ [name]: value, result: false });
    }
    render() {
        return (
            <>
                {this.props.type == 'hidden' ? (
                    <></>
                ) : (
                        <>
                            <label class="label" htmlFor={this.props.id}>{this.props.label}</label>
                            {this.props.tooltip ? <span title={this.props.tooltip} className="fas fa-question-circle"></span> : ""}
                        </>
                    )}
                {this.props.type == 'dropdown' ? (
                    <div className="position-relative flex">
                        <select defaultValue={this.props.selectedVal} onBlur={(e) => this.handleTouch(e)}
                            type={this.props.type}
                            data-validation={this.props.dataValidationRequired}
                            id={this.props.id}
                            className={this.props.className}
                            onChange={this.props.callBackFunction}
                            name={this.props.name}
                            disabled={this.props.disabled}>
                            {this.props.options ? (
                                Object.entries(this.props.options).sort((a, b) => a[1] - b[1]).map(([key, value]) => {
                                    return <option id={key} value={key}>{value}</option>
                                })
                            ) : (
                                    <option value="" selected></option>
                                )}

                        </select>
                        <div className="select_box_chevron fas fa-chevron-down"></div>
                    </div>
                ) : (
                        <input onBlur={(e) => this.handleTouch(e)}
                            type={this.props.type}
                            data-validation={this.props.dataValidationRequired}
                            id={this.props.id}
                            className={this.props.className}
                            disabled={this.props.disabled}
                            name={this.props.name}
                            data-value={this.props.dataValue}
                            defaultValue={this.props.value}
                            minLength={this.props.minLength}
                            maxLength={this.props.maxLength}
                            autoComplete={this.props.autoComplete} />
                    )}
                {this.state.canShowErrorMsg && (
                    <p className="field-error-message">{this.state.errorMsg}</p>
                )}
            </>
            // <input type="text" name={this.props.name} placeholder="name"/>
        )
    }
}

export default IntelliFields

import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions/index'

import styles from './Auth.module.css'

class Auth extends Component {
    state = {
        orderForm: {
            email: {
                value: '',
                label: "name",
                inputType: 'input',
                elementConfig: {
                    type: "email",
                    name: "name",
                    placeholder: "your email"
                },
                validation: {
                    required: true,
                    valid: false,
                    typed: false,
                    isValid: (email) => (
                        email.trim().length > 5 && email.includes('@')
                    )
                }
            },
            password: {
                value: '',
                label: "name",
                inputType: 'input',
                elementConfig: {
                    type: "password",
                    name: "name",
                    placeholder: "pass"
                },
                validation: {
                    required: true,
                    valid: false,
                    typed: false,
                    isValid: (pass) => (
                        pass.trim().length > 6
                    )
                }
            },
        },
        formValid: false,
        isSignUp: true
    }

    switchSignMethod = () => {
        this.setState(prevstate => ({isSignUp: !prevstate.isSignUp}))
    }

    checkValidity = (value, rules = (value) => (value.trim().length > 0)) => (
        rules(value)
    );

    inputChanged = (event, key) => {
        console.log(event.target.value);
        const order = {...this.state.orderForm};
        const input = {...this.state.orderForm[key]};
        const validity = {...input.validation};

        validity.valid = this.checkValidity(event.target.value, input.validation.isValid);
        validity.typed = true;
        input.value = event.target.value;
        input.validation = validity;
        order[key] = input;

        const formValidity = Object.keys(order).every((key) => (
            order[key].validation.valid || !order[key].validation.required
        ));

        this.setState({
            orderForm: order,
            formValid: formValidity
        })
    };

    submitHandler = (event) => {
        event.preventDefault()
        this.props.auth(
            this.state.orderForm.email.value,
            this.state.orderForm.password.value,
            this.state.isSignUp
        )
    }

    render() {
        const inputs = Object.keys(this.state.orderForm).map((key, i) => (
            <Input key={key + i}
                   id={key}
                   shouldValidate={this.state.orderForm[key].validation.required && this.state.orderForm[key].validation.typed}
                   valid={this.state.orderForm[key].validation.valid}
                   label={this.state.orderForm[key].label}
                   value={this.state.orderForm[key].value}
                   options={this.state.orderForm[key].options}
                   inputType={this.state.orderForm[key].inputType}
                   elementConfig={this.state.orderForm[key].elementConfig}
                   changed={(event) => this.inputChanged(event, key)}/>
        ));

        return (
            <div className={styles.Auth}>
                {this.props.isAuth ? <Redirect to="/"/> : null}
                {this.props.loading ?
                    <Spinner/> :
                    <form onSubmit={this.submitHandler}>
                        {inputs}
                        {this.props.error ? <p>{this.props.error.message}</p> : ""}
                        <Button disabled={!this.state.formValid}
                                btnType="Success">
                            {!this.state.isSignUp ? "signIn" : "signUp"}
                        </Button>
                    </form>
                }
                <Button btnType="Success" clicked={this.switchSignMethod}>
                    switch to {this.state.isSignUp ? "signIn" : "signUp"}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuth: state.authReducer.token !== null,
        purchasing: state.burgerReducer.purchasing
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

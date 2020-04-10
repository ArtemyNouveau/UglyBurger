import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import * as actions from '../../../store/actions/index'
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axiosInstance from "../../../axios-orders";
import Input from "../../../components/UI/Input/input";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";

import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                value: '',
                label: "name",
                inputType: 'input',
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "your name"
                },
                validation: {
                    required: false,
                    valid: false,
                    typed: false
                }
            },
            email: {
                value: '',
                label: "email",
                inputType: 'input',
                elementConfig: {
                    type: "text",
                    name: "email",
                    placeholder: "your email"
                },
                validation: {
                    required: true,
                    valid: false,
                    typed: false
                }
            },
            country: {
                value: '',
                label: "country",
                inputType: 'input',
                elementConfig: {
                    type: "text",
                    name: "country",
                    placeholder: "your country"
                },
                validation: {
                    required: true,
                    valid: false,
                    typed: false
                }
            },
            town: {
                value: '',
                label: "town",
                inputType: 'input',
                elementConfig: {
                    type: "text",
                    name: "town",
                    placeholder: "your town"
                },
                validation: {
                    required: true,
                    valid: false,
                    typed: false
                }
            },
            deliveryMethod: {
                value: 'fastest',
                label: "deliveryMethod",
                inputType: "select",
                options: [
                    {
                        value: "fastest",
                        elementConfig: {
                            value: "fastest"
                        }
                    },
                    {
                        value: "cheapest",
                        elementConfig: {
                            value: "cheapest",
                        }
                    }
                ],
                elementConfig: {
                    name: "delivery",
                },
                validation: {
                    required: false,
                    valid: false,
                    typed: false
                }
            }
        },
        // loading: false,
        formValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const customer = {};
        Object.keys(this.state.orderForm).forEach((key) => (
            customer[key] = this.state.orderForm[key].value
        ));

        const order = {
            ingridients: this.props.ingridients,
            price: this.props.totalPrice,
            customer: customer
        };

        this.props.onOrder(order)
    };

    checkValidity = (value, rules = (value) => (value.trim() !== '')) => (
        rules(value)
    );

    inputChanged = (event, key) => {
        console.log(event.target.value);
        const order = {...this.state.orderForm};
        const input = {...this.state.orderForm[key]};
        const validity = {...input.validation};

        validity.valid = this.checkValidity(event.target.value);
        validity.typed = true;
        input.value = event.target.value;
        input.validation = validity;
        order[key] = input;

        const formValidity = Object.keys(order).every((key) => (
                order[key].validation.valid || !order[key].validation.required
            ));
        console.log(formValidity);

        this.setState({
            orderForm: order,
            formValid: formValidity
        })
    };

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
            <Fragment>
                {this.props.loading ?
                    <Spinner/> :
                    <div className={styles.ContactData}>
                        <h4>Enter your contact data</h4>
                        <form>
                            {inputs}
                            <Button disabled={!this.state.formValid}
                                    btnType="Success"
                                    clicked={this.orderHandler}>
                                Order
                            </Button>
                        </form>
                    </div>
                }
            </Fragment>
        )
    }
}

const dispatchToProps = (dispatch) => {
    return {
        onOrder: (order) => dispatch(actions.purchase(order))
    }
};

const mapStateToProps = (state) => {
    return {
        ingridients: state.burgerReducer.ingridients,
        totalPrice: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading
    };
};

export default connect(mapStateToProps, dispatchToProps)(withErrorHandler(ContactData, axiosInstance))

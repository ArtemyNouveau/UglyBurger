import React, {Component, Fragment} from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/input";

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
                }
            },
            deliveryMethod: {
                value: 'cheapest',
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
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(this.props.ingridients));
        const customer = {};
        Object.keys(this.state.orderForm).forEach((key) => (
            customer[key] = this.state.orderForm[key].value
        ));

        this.setState({loading: true});
        const order = {
            ingridients: this.props.ingridients,
            customer: customer
        };

        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({loading: false, purchasing: false});
                console.log(response);
                this.props.history.push("/")
            })
            .catch((err) => {
                this.setState({loading: false, purchasing: false});
                alert(err)
            });
    };

    inputChanged = (event, key) => {
        console.log(event.target.value);
        const order = {...this.state.orderForm};
        const input = {...this.state.orderForm[key]};
        input.value = event.target.value;

        order[key] = input;
        this.setState({orderForm: order})
    };

    render() {
        const inputs = Object.keys(this.state.orderForm).map((key, i) => (
            <Input key={key + i}
                   id={key}
                   label={this.state.orderForm[key].label}
                   value={this.state.orderForm[key].value}
                   options={this.state.orderForm[key].options}
                   inputType={this.state.orderForm[key].inputType}
                   elementConfig={this.state.orderForm[key].elementConfig}
                   changed={(event) => this.inputChanged(event, key)}/>
        ));
        return (
            <Fragment>
                {this.state.loading ?
                    <Spinner/> :
                    <div className={styles.ContactData}>
                        <h4>Enter your contact data</h4>
                        <form>
                            {inputs}
                            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                        </form>
                    </div>
                }
            </Fragment>
        )
    }
}

export default ContactData

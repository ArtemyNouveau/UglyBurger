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
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingridients);

        this.setState({loading: true});
        const order = {
            ingridients: this.props.ingridients,
            customer: {
                name: 'text',
                address: {
                    country: 'USA',
                    town: '123124'
                },
                email: 'qwerty@mail.com'
            },
            delivery: 'fastest'
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

    render() {
        const inputs = Object.keys(this.state.orderForm).map((key, i) => (
            <Input key={key+i}
                   id={key+'_'+i}
                   label={this.state.orderForm[key].label}
                   value={this.state.orderForm[key].value}
                   elementConfig={this.state.orderForm[key].elementConfig}/>
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

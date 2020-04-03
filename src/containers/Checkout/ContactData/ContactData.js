import React, {Component, Fragment} from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            country: '',
            town: ''
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
        return (
            <Fragment>
                {this.state.loading ?
                    <Spinner/> :
                    <div className={styles.ContactData}>
                        <h4>Enter your contact data</h4>
                        <form>
                            <input type="text" name="name" placeholder="your name"/>
                            <input type="email" name="email" placeholder="your email"/>
                            <input type="text" name="country" placeholder="your country"/>
                            <input type="text" name="town" placeholder="your town"/>
                            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                        </form>
                    </div>
                }
            </Fragment>
        )
    }
}

export default ContactData

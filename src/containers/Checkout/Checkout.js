import React, {Component} from "react";
import {connect} from 'react-redux'
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom"
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    checkoutCancel = () => {
        this.props.history.goBack()
    };

    checkoutContinue = () => {
        this.props.history.push("/checkout/contact-data")
    };

    render() {
        return (
            <div>
                {this.props.ingridients ?
                    <CheckoutSummary
                        ingridients={this.props.ingridients}
                        checkoutCancel={this.checkoutCancel}
                        checkoutContinue={this.checkoutContinue}>
                        <p>Total price: {this.props.totalPrice}</p>
                    </CheckoutSummary> :
                    <Redirect to="/"/>
                }

                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.burgerReducer.ingridients,
        totalPrice: state.burgerReducer.totalPrice
    };
};

export default connect(mapStateToProps)(Checkout)

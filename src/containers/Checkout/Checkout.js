import React, {Component} from "react";
import {connect} from 'react-redux'
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom"
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
                <CheckoutSummary
                    ingridients={this.props.ingridients}
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}>
                    <p>Total price: {this.props.totalPrice}</p>
                </CheckoutSummary>
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                    // render={(props) => (<ContactData
                    //     ingridients={this.props.ingridients}
                    //     {...props}
                    // />)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.ingridients,
        totalPrice: state.totalPrice
    };
};

export default connect(mapStateToProps)(Checkout)

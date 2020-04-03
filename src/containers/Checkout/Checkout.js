import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component{
    //TODO ingridients fetch
    state = {
        ingridients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0,
        }
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};

        for (let param of query.entries())
            ingredients[param[0]] = +param[1];

        console.log(ingredients);
        this.setState({ingridients: ingredients})
    }

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
                    ingridients={this.state.ingridients}
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}
                />
            </div>
        )
    }
}

export default Checkout

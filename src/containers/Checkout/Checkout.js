import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component{
    state = {
        ingridients: {
            bacon: 1,
            cheese: 5,
            meat: 2,
            salad: 1,
        }
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingridients={this.state.ingridients}/>
            </div>
        )
    }
}

export default Checkout

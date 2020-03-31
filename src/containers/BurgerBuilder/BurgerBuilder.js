import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PRICES = {
    bacon: 1,
    cheese: 0.5,
    meat: 2,
    salad: 0.1,
}

class BurgerBuilder extends Component {
    state = {
        ingridients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0,
        },
        totalPrice: 3,
        purchasable: false,
        purchasing: false
    };

    orderSwitcher = () => {
        this.setState({purchasing: !this.state.purchasing})
    }

    updatePurchase = (ingredients) => {
        const purchasable = Object.keys({...ingredients}).some((ingridient) => (ingredients[ingridient] > 0));
        this.setState({purchasable: purchasable});
    };

    addIngridient = (type) => {
        const ingridients = {...this.state.ingridients};
        ingridients[type] = this.state.ingridients[type] + 1;

        const price = this.state.totalPrice + INGRIDIENT_PRICES[type];
        this.setState({ingridients: ingridients, totalPrice: price});

        this.updatePurchase(ingridients);
    };

    removeIngridient = (type) => {
        if (this.state.ingridients[type] <= 0) return;

        const ingridients = {...this.state.ingridients};
        ingridients[type] = this.state.ingridients[type] - 1;

        const price = this.state.totalPrice - INGRIDIENT_PRICES[type];
        this.setState({ingridients: ingridients, totalPrice: price});

        this.updatePurchase(ingridients);
    };

    render() {
        const disableInfo = {
            ...this.state.ingridients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} closeModal={this.orderSwitcher}>
                    <OrderSummary ingridients={this.state.ingridients}/>
                </Modal>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls
                    addIngridient={this.addIngridient}
                    removeIngridient={this.removeIngridient}
                    disableInfo={disableInfo}
                    purchasable={this.state.purchasable}
                    totalPrice={this.state.totalPrice}
                    order={this.orderSwitcher}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;

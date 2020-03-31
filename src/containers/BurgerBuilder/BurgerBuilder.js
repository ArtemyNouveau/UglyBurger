import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice: 4
    };

    addIngridient = (type) => {
        const ingridient = {...this.state.ingridients};
        ingridient[type] = this.state.ingridients[type] + 1;

        const price = this.state.totalPrice + INGRIDIENT_PRICES[type];
        this.setState({ingridients: ingridient, totalPrice: price})
    };

    removeIngridient = (type) => {
        if (this.state.ingridients[type] <= 0) return;

        const ingridient = {...this.state.ingridients};
        ingridient[type] = this.state.ingridients[type] - 1;

        const price = this.state.totalPrice + INGRIDIENT_PRICES[type];
        this.setState({ingridients: ingridient, totalPrice: price})
    }

    render() {
        const disableInfo = {
            ...this.state.ingridients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls
                    addIngridient={this.addIngridient}
                    removeIngridient={this.removeIngridient}
                    disabled={disableInfo}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;

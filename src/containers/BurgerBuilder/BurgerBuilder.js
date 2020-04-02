import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";

import axios from '../../axios-orders';

const INGRIDIENT_PRICES = {
    bacon: 1,
    cheese: 0.5,
    meat: 2,
    salad: 0.1,
};

class BurgerBuilder extends Component {
    state = {
        ingridients: null,
        totalPrice: 3,
        purchasable: true,
        purchasing: false,
        loading: true,
        error: null
    };

    componentDidMount() {
        axios.get('/Ingredients.json')
            .then((response) => {
            this.setState({ingridients: response.data, loading: false})
            })
            .catch((err) => {
                this.setState({error: err})
            })
    }

    orderSwitcher = () => {
        this.setState((prevState) => ({purchasing: !prevState.purchasing}))
    };

    purchaseContinue = () => {
        this.setState({loading: true});
        const order = {
            ingridients: this.state.ingridients,
            price: this.state.totalPrice,
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
            })
            .catch((err) => {
                this.setState({loading: false, purchasing: false});
                alert(err)
            });
    };

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
                    {
                        this.state.loading || this.state.error ?
                            <Spinner/> :
                            <OrderSummary
                                totalPrice={this.state.totalPrice}
                                ingridients={this.state.ingridients}
                                purchaseCancel={this.orderSwitcher}
                                purchaseContinue={this.purchaseContinue}/>
                    }
                </Modal>
                {
                    !this.state.error && !this.state.loading ?
                        <Fragment>
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
                        : <Spinner/>
                }
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios)

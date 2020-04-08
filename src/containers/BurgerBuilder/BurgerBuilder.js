import React, {Component, Fragment} from "react";
import {connect} from 'react-redux'
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null
    };

    // componentDidMount() {
    //     axios.get('/Ingredients.json')
    //         .then((response) => {
    //             this.setState({ingridients: response.data, loading: false})
    //         })
    //         .catch((err) => {
    //             this.setState({error: err})
    //         })
    // }

    orderSwitcher = () => {
        this.setState((prevState) => ({purchasing: !prevState.purchasing}))
    };

    purchaseContinue = () => {
        this.props.history.push({
            pathname: "/checkout",
        })
    };

    updatePurchasable = (ingredients) => {
        return Object.keys({...ingredients}).some((ingridient) => (ingredients[ingridient] > 0));
    };

    render() {
        const disableInfo = {
            ...this.props.ingridients
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
                                totalPrice={this.props.totalPrice}
                                ingridients={this.props.ingridients}
                                purchaseCancel={this.orderSwitcher}
                                purchaseContinue={this.purchaseContinue}/>
                    }
                </Modal>
                {
                    !this.state.error && !this.state.loading ?
                        <Fragment>
                            <Burger ingridients={this.props.ingridients}/>
                            <BuildControls
                                addIngridient={this.props.onIngridientAdded}
                                removeIngridient={this.props.onIngridientRemved}
                                disableInfo={disableInfo}
                                purchasable={this.updatePurchasable(this.props.ingridients)}
                                totalPrice={this.props.totalPrice}
                                order={this.orderSwitcher}
                            />
                        </Fragment>
                        : <Spinner/>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.ingridients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchedToProps = (dispatch) => {
    return {
        onIngridientAdded: (ingridient) => dispatch({
            type: actionTypes.ADD_INGRIDIENT,
            ingridient: ingridient,
        }),
        onIngridientRemved: (ingridient) => dispatch({
            type: actionTypes.REMOVE_INGRIDIENT,
            ingridient: ingridient,
        })
    }
};

export default connect(mapStateToProps, mapDispatchedToProps)(withErrorHandler(BurgerBuilder, axios))

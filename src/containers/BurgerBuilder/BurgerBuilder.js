import React, {Component, Fragment} from "react";
import {connect} from 'react-redux'
import WithErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        if (!this.props.purchasing) this.props.onInitIngridients()
    }

    orderHandler = () => {
        if (this.props.isAuth)
            this.setState((prevState) => ({purchasing: !prevState.purchasing}))
        else
            this.props.history.push({
                pathname: "/auth",
            })
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
                <Modal show={this.state.purchasing} closeModal={this.orderHandler}>
                    {
                        this.props.ingridients && !this.props.error ?
                            <OrderSummary
                                totalPrice={this.props.totalPrice}
                                ingridients={this.props.ingridients}
                                purchaseCancel={this.orderHandler}
                                purchaseContinue={this.purchaseContinue}/> :
                            <Spinner/>
                    }
                </Modal>
                {
                    this.props.ingridients && !this.props.error ?
                        <Fragment>
                            <Burger ingridients={this.props.ingridients}/>
                            <BuildControls
                                addIngridient={this.props.onIngridientAdded}
                                removeIngridient={this.props.onIngridientRemved}
                                disableInfo={disableInfo}
                                purchasable={this.updatePurchasable(this.props.ingridients)}
                                totalPrice={this.props.totalPrice}
                                order={this.orderHandler}
                                isAuth={this.props.isAuth}
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
        ingridients: state.burgerReducer.ingridients,
        totalPrice: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuth: state.authReducer.token !== null,
        purchasing: state.burgerReducer.purchasing
    };
};

const mapDispatchedToProps = (dispatch) => {
    return {
        onIngridientAdded: (ingridient) => dispatch(actions.addIngridient(ingridient)),
        onIngridientRemved: (ingridient) => dispatch(actions.removeIngridient(ingridient)),
        onInitIngridients: () => dispatch(actions.initIngridient())
    }
};

export default connect(mapStateToProps, mapDispatchedToProps)(WithErrorHandler(BurgerBuilder, axiosInstance))

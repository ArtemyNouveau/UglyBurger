import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        this.props.onfetch(this.props.token)
    }

    render() {
        return (
            <div>
                {
                    this.props.orders ?
                        this.props.orders.map((order) => (
                            <Order
                                key={order.id}
                                ingridients={order.ingridients}
                            />
                        )) :
                        <Spinner/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
        token: state.authReducer.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onfetch: (token) => dispatch(actions.fetchOrders(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

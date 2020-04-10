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
        this.props.onfetch()
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
        orders: state.orderReducer.orders
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onfetch: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

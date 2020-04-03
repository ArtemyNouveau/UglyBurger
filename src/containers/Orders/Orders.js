import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get("https://burger-4885f.firebaseio.com/orders.json")
            .then((response) => {
                const orders = [];
                for (let key in response.data)
                    orders.push({
                        id: key,
                        ...response.data[key]
                    });
                this.setState({
                    loading: false,
                    orders: orders
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map((order) =>(
                    <Order
                        key={order.id}
                        ingridients={order.ingridients}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)

import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch} from 'react-router-dom'
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from "./HOC/AsyncComponent/AsyncComponent";

const asyncCheckout = asyncComponent(() => (
    import("./containers/Checkout/Checkout")
))

const asyncOrders = asyncComponent(() => (
    import("./containers/Orders/Orders")
))

const asyncAuth = asyncComponent(() => (
    import("./containers/Auth/Auth")
))

class App extends Component {
    componentDidMount() {
        this.props.autoSignIn()
    }

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/Auth" component={asyncAuth}/>
                        {this.props.isAuth ?
                            <Route path="/checkout" component={asyncCheckout}/> :
                            null
                        }
                        {this.props.isAuth ?
                            <Route path="/orders" component={asyncOrders}/> :
                            null
                        }
                        <Route path="/logout" component={Logout}/>
                        <Route path="/" component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        autoSignIn: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch} from 'react-router-dom'
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

import styles from './App.module.css';

class App extends Component {
    componentDidMount() {
        this.props.autoSignIn()
    }

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/Auth" component={Auth}/>
                        <Route path="/checkout" component={Checkout}/>
                        {this.props.isAuth ?
                            <Route path="/checkout" component={Checkout}/> :
                            null
                        }
                        {this.props.isAuth ?
                            <Route path="/orders" component={Orders}/> :
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

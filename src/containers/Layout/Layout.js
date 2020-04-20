import React, {Component, Fragment} from "react";
import {connect} from "react-redux"
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import styles from './Layout.module.css'

class Layaout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerSwitcher = () => {
        this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}))
    };

    render() {
        return (
            <Fragment>
                <SideDrawer isAuth={this.props.isAuth}
                            show={this.state.showSideDrawer}
                            switchDrawer={this.sideDrawerSwitcher}/>
                <ToolBar isAuth={this.props.isAuth}
                         switchDrawer={this.sideDrawerSwitcher}/>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layaout)

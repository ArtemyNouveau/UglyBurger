import React, {Component, Fragment} from "react";
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
                <SideDrawer
                    show={this.state.showSideDrawer}
                    switchDrawer={this.sideDrawerSwitcher}/>
                <ToolBar switchDrawer={this.sideDrawerSwitcher}/>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Fragment>

        )
    }
}

export default Layaout

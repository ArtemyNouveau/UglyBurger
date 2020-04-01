import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";

import styles from './SideDrawer.module.css'

const sideDrawer = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.show} close={props.switchDrawer}/>
            <div className={[styles.SideDrawer, props.show ? styles.Open : styles.Close].join(' ')}>
                <div style={{height: 50}}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    )
};

export default sideDrawer

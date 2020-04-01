import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import styles from './ToolBar.module.css'

const toolBar = (props) => (
    <Fragment>
        <div className={styles.ToolBarSpan}/>
        <header className={styles.ToolBar}>
            <DrawerToggle toggle={props.switchDrawer}>Menu</DrawerToggle>
            <Logo/>
            <nav className={styles.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    </Fragment>
);

export default toolBar

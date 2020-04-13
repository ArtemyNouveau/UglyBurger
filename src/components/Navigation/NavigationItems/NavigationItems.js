import React from "react";
import NavigationItem from './NavigationItem/NavigationItem'

import styles from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        <NavigationItem link='/auth'>Auth</NavigationItem>
    </ul>
);

export default navigationItems

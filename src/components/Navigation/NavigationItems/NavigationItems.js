import React from "react";
import NavigationItem from './NavigationItem/NavigationItem'

import styles from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/' active={true}>Builder</NavigationItem>
        <NavigationItem link='/'>text</NavigationItem>
    </ul>
)

export default navigationItems

import React, {Fragment} from "react";
import NavigationItem from './NavigationItem/NavigationItem'

import styles from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Builder</NavigationItem>
        {!props.isAuth ?
            <NavigationItem link='/auth'>Auth</NavigationItem> :
            <Fragment>
                <NavigationItem link='/orders'>Orders</NavigationItem>
                <NavigationItem link='/logout'>logout</NavigationItem>
            </Fragment>
        }
    </ul>
);

export default navigationItems

import React from "react";
import {NavLink} from "react-router-dom";

import styles from './NavigationItem.module.css'

const navigationItem = (props) => (
    <li className={styles.NavigationItem}>
        <NavLink exact
                 activeClassName={styles.active}
                 to={props.link}>
            {props.children}
        </NavLink>
    </li>
)

export default navigationItem

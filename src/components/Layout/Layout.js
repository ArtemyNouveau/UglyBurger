import React, {Fragment} from "react";
import ToolBar from "../Navigation/ToolBar/ToolBar";

import styles from './Layout.module.css'

const layaout = (props) => (
    <Fragment>
        <ToolBar/>
        <main className={styles.content}>
            {props.children}
        </main>
    </Fragment>
);

export default layaout

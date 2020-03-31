import React, {Fragment} from "react";
import styles from './Layout.module.css'

const layaout = (props) => (
    <Fragment>
        <div>ToolBar, SideDrawer, Backdrop</div>
        <main className={styles.content}>
            {props.children}
        </main>
    </Fragment>
);

export default layaout

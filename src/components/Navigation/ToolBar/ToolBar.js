import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";

import styles from './ToolBar.module.css'
console.log(styles);

const toolBar = (props) => (
    <Fragment>
        <div className={styles.ToolBarSpan}/>
        <header className={styles.ToolBar}>
            <div>Menu</div>
            <Logo/>
            <nav>
                ...
            </nav>
        </header>
    </Fragment>
)

export default toolBar

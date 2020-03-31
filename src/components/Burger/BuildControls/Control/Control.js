import React from "react";

import styles from './Control.module.css'

const control = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} onClick={() => (props.removeIngridient(props.type))} disabled={props.disabled}>Less</button>
        <button className={styles.More} onClick={() => (props.addIngridient(props.type))}>More</button>
    </div>
)

export default control

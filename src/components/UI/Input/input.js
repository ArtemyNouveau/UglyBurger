import React from "react";

import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    switch (props.inputType) {
        case ('input'):
            inputElement = <input
                className={styles.InputElem}
                {...props.elementConfig}
                defaultValue={props.value}
                id={props.id}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={styles.InputElem}
                {...props.elementConfig}
                defaultValue={props.value}
                id={props.id}
            />;
            break;
        default:
            inputElement = <input
                className={styles.InputElem}
                {...props.elementConfig}
                defaultValue={props.value}
                id={props.id}
            />;
    }

    return (
        <div className={styles.Input}>
            {
                props.label ?
                    <label
                        className={styles.Lable}
                        htmlFor={props.id}>{props.label}</label> :
                    null
            }
            {inputElement}
        </div>
    )
};

export default input

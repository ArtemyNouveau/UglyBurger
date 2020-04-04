import React from "react";

import styles from './Order.module.css'

const order = (props) => {
    let ingridients = [];

    if (props.ingridients)
        ingridients = Object.keys(props.ingridients).map((key, i) => (<dd key={i}>{key}: {props.ingridients[key]}</dd>))

    return (
        <div className={styles.Order}>
            <ul>
                <dt>Ingredients</dt>
                {props.ingridients ? ingridients : <dd>Bread only</dd>}
            </ul>
        </div>
    )
};

export default order

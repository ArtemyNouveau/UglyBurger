import React from "react";
import Control from './Control/Control'

import styles from './BuildControls.module.css'
import buttonStyles from './orderButton.module.css'

const controls = [
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>
            Current price: <strong>{props.totalPrice.toFixed(2)}$</strong>
        </p>
        {controls.map((control) => (
            <Control
                key={control.label}
                label={control.label}
                type={control.type}
                addIngridient={props.addIngridient}
                removeIngridient={props.removeIngridient}
                disabled={props.disableInfo[control.type]}
            />
        ))}
        <button
            className={buttonStyles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.order}>{props.isAuth ? "oder now" : "signup to order"}</button>
    </div>
)

export default buildControls

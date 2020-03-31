import React from "react";
import Control from './Control/Control'
import styles from './BuildControls.module.css'

let o = {
    bacon: 1,
    cheese: 2,
    meat: 2,
    salad: 1,
}
const controls = [
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        {controls.map((control) => (
            <Control
                key={control.label}
                label={control.label}
                type={control.type}
                addIngridient={props.addIngridient}
                removeIngridient={props.removeIngridient}
                disabled={props.disabled[control.type]}
            />
        ))}
    </div>
)

export default buildControls

import React from "react";
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import styles from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h3>Hope it's tasty</h3>
            <div className={styles.Burger}>
                <Burger ingridients={props.ingridients}/>
            </div>
            <Button btnType="Danger">Cancel</Button>
            <Button btnType="Success">Continue</Button>
        </div>
    )
}

export default checkoutSummary

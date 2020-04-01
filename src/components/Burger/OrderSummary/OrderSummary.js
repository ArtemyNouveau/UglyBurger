import React, {Fragment} from "react";
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingridientsSummary = Object.keys(props.ingridients).map((ingridient) => (
        <li key={ingridient}>
            <span style={{textTransform: 'capitalize'}}>{ingridient}:</span>
            {props.ingridients[ingridient]}
        </li>
    ));

    return (
        <Fragment>
            <h3>Your order</h3>
            <p>burger with</p>
            <ul>
                {ingridientsSummary}
            </ul>
            <p><strong>Total price:</strong> {props.totalPrice.toFixed(2)}</p>
            <Button clicked={props.purchaseCancel} btnType="Danger">Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">Continue</Button>
        </Fragment>
    )
};

export default orderSummary

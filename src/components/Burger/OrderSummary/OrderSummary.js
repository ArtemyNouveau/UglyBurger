import React, {Fragment} from "react";

const orderSummary = (props) => {
    const ingridientsSummary = Object.keys(props.ingridients).map((ingridient) => (
        <li key={ingridient}>
            <span style={{textTransform: 'capitalize'}}>{ingridient}:</span>
            {props.ingridients[ingridient]}
        </li>
    ));

    return(
        <Fragment>
        <h3>Your order</h3>
        <p>burger with</p>
        <ul>
            {ingridientsSummary}
        </ul>
    </Fragment>
    )
}

export default orderSummary

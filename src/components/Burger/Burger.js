import React from "react";
import BurgerIngredient from "./Ingridients/Ingridients";
// import {withRouter} from 'react-router-dom';

import styles from './Burger.module.css'

const burger = (props) => {
    const parsedIngredients = Object.keys(props.ingridients).map((ingridient) => (
            [...Array(props.ingridients[ingridient])]
                .map((el, i) => (
                    <BurgerIngredient key={ingridient+i} type={ingridient}/>
                ))
        )).reduce((accumulator, el) => (
            accumulator.concat(el)
        ), []);
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {parsedIngredients.length === 0 ? 'MMMMM... BREAD' : parsedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger

import React from "react";

import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    switch (props.inputType) {
        case ('input'):
            inputElement = <input {...props.elementConfig}
                                  className={[
                                      styles.InputElem,
                                      (
                                          props.shouldValidate ?
                                              (props.valid ? styles.Valid : styles.Invalid) :
                                              null
                                      )].join(' ')}
                                  defaultValue={props.value}
                                  id={props.id}
                                  onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementConfig}
                                     className={[
                                         styles.InputElem,
                                         (
                                             props.shouldValidate ?
                                                 (props.valid ? styles.Valid : styles.Invalid) :
                                                 null
                                         )].join(' ')}
                                     defaultValue={props.value}
                                     id={props.id}
                                     onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = <select {...props.elementConfig}
                                   className={[
                                       styles.InputElem,
                                       (
                                           props.shouldValidate ?
                                               (props.valid ? styles.Valid : styles.Invalid) :
                                               null
                                       )].join(' ')}
                                   onChange={props.changed}>
                {
                    props.options.map((option, i) => (
                        <option key={option + i}
                                className={[
                                    styles.InputElem,
                                    (
                                        props.shouldValidate ?
                                            (props.valid ? styles.Valid : styles.Invalid) :
                                            null
                                    )
                                ].join(' ')}
                                {...option.elementConfig}>
                            {option.value}
                        </option>
                    ))
                }
            </select>;
            break;
        default:
            inputElement = <input className={styles.InputElem}
                                  {...props.elementConfig}
                                  defaultValue={props.value}
                                  id={props.id}
                                  onChange={props.changed}/>;
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

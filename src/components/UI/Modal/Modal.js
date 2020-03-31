import React, {Fragment} from "react";
import BackDrop from '../BackDrop/BackDrop'

import styles from './Modal.module.css'

const modal = (props) => (
    <Fragment>
        <BackDrop show={props.show} close={props.closeModal}/>
        <div
            className={styles.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
            }}
        >
            {props.children}
        </div>
    </Fragment>
)

export default modal

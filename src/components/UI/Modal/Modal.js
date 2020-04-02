import React, {Component, Fragment} from "react";
import BackDrop from '../BackDrop/BackDrop'

import styles from './Modal.module.css'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        return (
            <Fragment>
                <BackDrop show={this.props.show} close={this.props.closeModal}/>
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}
                >
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal

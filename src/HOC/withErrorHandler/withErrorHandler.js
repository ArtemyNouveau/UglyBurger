import React, {Fragment} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent) => {
    return (props) => (
        <Fragment>
            <Modal>
                Something gone wrong
            </Modal>
            <WrappedComponent {...props}/>
        </Fragment>
    )
};

export default withErrorHandler

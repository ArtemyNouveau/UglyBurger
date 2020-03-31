import React, {Fragment} from "react";

const layaout = (props) => (
    <Fragment>
        <div>ToolBar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Fragment>
);

export default layaout

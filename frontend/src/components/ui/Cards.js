import React from "react";

import "./ui.scss";

export const AlertCard = ({ children, className, variant }) => {
    return (
        <p className={"alert-card df ai-c jc-c bra-1 plr-3 mbt-2 " + className}
            style={{ height: "2rem" }}>{children}</p>
    )
}
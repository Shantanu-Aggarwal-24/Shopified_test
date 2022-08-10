import React from "react";
import "./style.css";

const Card = (props) => {
    return (
        <div className="card" {...props}>
            {(props.headerLeft || props.headerRight) && (
                <div className="cardHeader">
                    {props.headerLeft && (
                        <div
                            style={{
                                alignSelf: "center",
                                fontSize: "200px",
                                fontWeight: "500"
                            }}
                        >
                            {props.headerLeft}
                        </div>
                    )}
                    {props.headerRight && props.headerRight}
                </div>
            )}
            {props.childen}
        </div>
    );
};

export default Card;
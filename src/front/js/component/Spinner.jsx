import React from 'react';

export const Spinner = ({color}) => {
    switch (color) {
        case "blue":
            color = "text-primary";
            break;
        case "red":
            color = "text-danger";
            break;
        case "green":
            color = "text-success";
            break;
        case "yellow":
            color = "text-warning";
            break;
        case "black":
            color = "text-black";
            break;
        case "white":
            color = "text-white";
            break;
        default:
            color = "text-primary";
            break;
    }
    return (
        <div className={"spinner-border " + color} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
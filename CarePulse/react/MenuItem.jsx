import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/fontawesome-free-solid";

export default function MenuItem(props) {
    const { icon, title, className, onClick } = props;
    return (
        <div
            className={
                "small-12 columns registration__navigation-item " + className
            }
            onClick={onClick}
        >
            <span className="registration__navigation-item__icon fa-stack fa-2x">
                <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
                <FontAwesomeIcon
                    icon={icon}
                    className="fa-stack-1x fa-inverse"
                />
            </span>
            <span className="registration__navigation-item__title">
                {title}
            </span>
            <span className="circles">
                <span />
                <span />
                <span />
            </span>
        </div>
    );
}

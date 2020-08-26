import React from "react";

import "./Input.css";

const Input = (props) => {
    let inputElement = null; // Input to be render back - @{null} until switch case
    
    // Dynamic switch Statement to render input components from state
    switch(props.elementType) {
        case ('input'):
            inputElement = <input
                className="auth-input"
                {...props.elementConfig}
                value={props.value} onChange={props.onChange}
                />
            break;
        
        default: 
            inputElement = <input
                className="auth-input"
                {...props.elementConfig}
                value={props.value} onChange={props.onChange}
                />
    }

    return(
        <div className="auth-input-controller">
            <label className="auth-label">{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;
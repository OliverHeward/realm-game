import React, { useState } from "react";

import Input from "../../../components/UI/Input/Input";

import './SignUp.css';

const SignUp = () => {

    const [signUpForm, setSignUpForm] = useState({
        first_name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Username'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        confirm_email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Confirm Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        confirm_password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm Password'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
    });

    const signUpElementsArray = [];

    for(let key in signUpForm) {
        signUpElementsArray.push({
            id: key,
            config: signUpForm[key]
        });
    }

    let form = signUpElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched} />
    ) );

    return (
        <div className="auth-wrap">
            <span>If you don't have an account, sign up below.</span>
            <form className="sign-up-form">
                {form}
                <button role="submit" type="submit" name="submit" className="">Enroll</button>
            </form>
        </div>
    )
}

export default SignUp;
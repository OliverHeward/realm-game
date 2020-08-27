import React, {useState} from 'react';
import Input from '../../../components/UI/Input/Input';

const SignIn = () => {

    const [signInForm, setSignInForm] = useState({
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Username'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false,
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Password',
            }, 
            value: '',
            validation: {
                required: true,
                isEmail: false,
            },
            valid: false,
            touched: false
        }
    });
    
    const signInElementsArray = [];

    for(let key in signInForm) {
        signInElementsArray.push({
            id: key,
            config: signInForm[key]
        });
    }

    let form = signInElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched} />
    ));
    return (
        <div class="auth-wrap sign-in">
            <span>Enter the Realm</span>
            <form className="sign-in-form">
                {form}
                <button role="submit" type="submit" name="submit" className="">Enter</button>
            </form>
        </div>
    )
};

export default SignIn;
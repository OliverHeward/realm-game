import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";

import { useForm } from "../utils/hooks";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData} }) => {
      console.log(userData);
      context.login(userData)
      props.history.push("/");
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.expection.errors);
      console.log(err.graphQLErrors[0].extensions.expection.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <h1>Register Page</h1>
      <div className="form-container">
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            error={errors.username ? true : false}
            value={values.username}
            onChange={onChange}
          />
          <Form.Input
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            error={errors.email ? true : false}
            value={values.email}
            onChange={onChange}
          />
          <Form.Input
            label="Confirm Email"
            placeholder="Confirm Email.."
            name="confirmEmail"
            type="email"
            error={errors.confirmEmail ? true : false}
            value={values.confirmEmail}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            error={errors.password ? true : false}
            value={values.password}
            onChange={onChange}
          />
          <Form.Input
            label="Confirm Password"
            placeholder="Confirm Password.."
            name="confirmPassword"
            type="password"
            error={errors.confirmPassword ? true : false}
            value={values.confirmPassword}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Register
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $confirmEmail: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        confirmEmail: $confirmEmail
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Register;

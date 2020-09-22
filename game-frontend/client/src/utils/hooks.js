import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

// ! Come back to this 
export const useObjClean = (object, prop) => {
  if(object === null || object === undefined) {
    return object;
  } else if (Array.isArray(object)) {
    object.map(item => {
        if(item[prop] && ! item[prop].length) delete item[prop];
    })
    return object;
  } else if (typeof object === "object") {
   return console.log("object");
  }
  console.log(object);
  return object;
}
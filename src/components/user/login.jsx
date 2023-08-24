import { useState } from "react";
import Joi from 'joi-browser';
import './login.css'
const UserLogin = () => {

  const [account, setAccount] = useState({
    user_id: "",
  });
  const [errors, setErrors] = useState({});

  const schema = {
    user_id: Joi.string().trim().min(10).required().label('ID')
  }

   const validate = () => {
    const result = Joi.validate(account, schema, { abortEarly: false });
    if (!result.error) return;
    const errors = {};
    for (const item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const new_schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, new_schema);

    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const error = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) error[name] = errorMessage;
    else delete error[name];
    setAccount((prev) => ({ ...prev, [name]: value }));

    setErrors(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    // Call the server
    console.log('Form submited!');
    window.location = '/user';
  };

  return (
    <div className="user_login">
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="userId" className="form-label">ID number</label>
          <input
            type="text"
            value={account.user_id}
            onChange={handleChange}
            className="form-control"
            name="user_id"
            id="user_id"
            autoFocus
          />
          <div id="emailHelp" className="form-text">We&apos;ll never share your ID with anyone else.</div>
        </div>
        {errors.user_id && <div className="text-danger error__message">{errors.user_id}</div>}
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
}
 
export default UserLogin;
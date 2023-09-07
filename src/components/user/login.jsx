import { useState } from "react";
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import { voteLogin } from "../services/authService";
import './login.css'


const UserLogin = () => {

  const [account, setAccount] = useState({
    name: "",
    user_id: "",
  });
  const [allErrors, setAllErrors] = useState({});

  const schema = {
    name: Joi.string().required().label("Name"),
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
    const error = { ...allErrors };
    const errorMessage = validateProperty(input);
    if (errorMessage) error[name] = errorMessage;
    else delete error[name];
    setAccount((prev) => ({ ...prev, [name]: value }));

    setAllErrors(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setAllErrors(errors || {});
    if (errors) return;

    // Call the server
    try {
      const {name, user_id} = account;
      // console.log(data);
      const { data } = await voteLogin(name, user_id);
      console.log(data);
      localStorage.setItem('electorInfo', JSON.stringify(data))
      window.location = "/user"
    } catch (error) {
      if (error.response && error.response.status === 400)
      toast.error(error.response.data);
    const errors = { ...allErrors };
    errors.name = error.response.data;
      setAllErrors(errors);
    }
  };

  return (
    <div className="user_login">
      <form onSubmit={handleSubmit}>
        <h1 className="text-primary">Elector Login</h1>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            value={account.name}
            onChange={handleChange}
            className="form-control"
            name="name"
            id="name"
            autoFocus
          />
          {allErrors.name && <div className="text-danger error__message">{allErrors.name}</div>}   
        </div>
        <div className="mb-2">
          <label htmlFor="userId" className="form-label">ID number</label>
          <input
            type="text"
            value={account.user_id}
            onChange={handleChange}
            className="form-control"
            name="user_id"
            id="user_id"
            placeholder="000 - 000 - 000"
          />
          <div id="emailHelp" className="form-text">We&apos;ll never share your ID with anyone else.</div>
          {allErrors.user_id && <div className="text-danger error__message">{allErrors.user_id}</div>}
        </div>
        <button type="submit" disabled={validate()} className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
}
 
export default UserLogin;
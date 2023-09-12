import { useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { register } from "../../services/userService";
import { toast } from "react-toastify";

const AdminSignUp = () => {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [allErrors, setAllErrors] = useState({});

  const schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password")
  }

  const validate = () => {
    const result = Joi.validate(account, schema, { abortEarly: false});
    if (!result.error) return;
    const errors = {};
    for(const item of result.error.details) errors[item.path[0]] = item.message;
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
    const error = {...allErrors};
    const errorMessage = validateProperty(input);
    if(errorMessage) error[name] = errorMessage;
    else delete error[name];
    setAccount((prev) => ({ ...prev, [name]: value }));

    setAllErrors(error);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setAllErrors(errors || {});
    if(errors) return;

    // Call the Server
    try {
      const response = await register(account);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info(error.response.data);
        const errors = { ... allErrors };
        errors.name = error.response.data;
        setAllErrors(errors);
      }
    }

    console.log("Form Submitted!");
    // window.location = '/'
  }

  return (
    <div className="user_login">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            value={account.name}
            onChange={handleChange}
            className="form-control"
            id="name"
            name="name"
            autoFocus
          />
       </div>
        {allErrors.name && <div className="text-danger error__message">{allErrors.name}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            value={account.email}
            onChange={handleChange}
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        {allErrors.email && <div className="text-danger error__message">{allErrors.email}</div>}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            value={account.password}
            onChange={handleChange}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        {allErrors.password && <div className="text-danger error__message">{allErrors.password}</div>}
        <button type="submit" className="btn btn-primary" disabled={validate()}>Register</button>
      <div className="mt-3">Already have an account? <Link to="/admin_login" className="text-primary">LogIn</Link></div>
      </form>
    </div>
  );
}
 
export default AdminSignUp;
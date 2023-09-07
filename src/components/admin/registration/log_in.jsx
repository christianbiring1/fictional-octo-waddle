import {useState} from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { login } from '../../services/authService';
import { toast } from "react-toastify";


const AdminLogin = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const [allErrors, setAllErrors] = useState({});

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  }

  const validate = () => {
    const result = Joi.validate(account, schema, { abortEarly: false });
    if(!result.error) return;
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
    const {name, value } = input;
    const error = {...allErrors};
    const errorMessage = validateProperty(input);
    if(errorMessage) error[name] = errorMessage;
    else delete error[name];
    setAccount((prev) => ({ ...prev, [name]: value }));

    setAllErrors(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setAllErrors(errors || {});
    if(errors) return;

    // Call the Server
    try {
      const {email, password } = account;
      const { data: jwt } = await login(email, password);
      localStorage.setItem('token', jwt);
      window.location = '/'
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data);
        const errors = { ... allErrors };
        errors.email = error.response.data;
        setAllErrors(errors);
    }

    console.log("Form Submitted!");
  }





  return (
    <div className="user_login">
      <form onSubmit={handleSubmit}>
        <h1 className="text-primary">Admin Login</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            value={account.email}
            onChange={handleChange}
            className="form-control"
            id="email"
            name="email"
            autoFocus
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
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={validate()}>Login</button>
        <div>Don&apos;t have an account yet? <Link to="/admin_register">Create account</Link></div>
      </form>
    </div>
  )
}
 
export default AdminLogin;
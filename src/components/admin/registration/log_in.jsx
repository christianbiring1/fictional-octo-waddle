import {useState} from "react";
import Joi from "joi-browser";
const AdminLogin = () => {
  const [account, setAccount] = useState({
    Email: "",
    Password: "",
  });

  const [allErrors, setAllErrors] = useState({});

  const schema = {
    Email: Joi.string().email().required().label("Email"),
    Password: Joi.string().required().label("Password")
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setAllErrors(errors || {});
    if(errors) return;

    // Call the Server

    console.log("Form Submitted!");
    window.location = '/'
  }





  return (
    <div className="user_login">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email address</label>
          <input
            type="email"
            value={account.Email}
            onChange={handleChange}
            className="form-control"
            id="Email"
            name="Email"
            autoFocus
          />
        </div>
          {allErrors.Email && <div className="text-danger error__message">{allErrors.Email}</div>}
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input
            type="password"
            value={account.password}
            onChange={handleChange}
            className="form-control"
            id="Password"
            name="Password"
          />
        </div>
          {allErrors.Password && <div className="text-danger error__message">{allErrors.Password}</div>}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
 
export default AdminLogin;
const AdminLogin = () => {
  return (
    <div className="user_login">
      <div className="mb-3">
        <label htmlFor="Email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="Email"
          autoFocus
        />
      </div>
    <div className="mb-3">
      <label htmlFor="Password" className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        id="Password"
      />
    </div>
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
      />
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
    </div>
  )
}
 
export default AdminLogin;
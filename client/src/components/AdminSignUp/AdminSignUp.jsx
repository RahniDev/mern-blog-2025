import { useState } from "react";
import { Link } from "react-router-dom";
import './adminSignUp.css'
import { signup } from "../Auth";

const AdminSignup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then((data) => {
                console.log("++ data: ", data);
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                    });
                }
            })
            .catch((exc) => {
                console.error("++ exc: ", exc);
                setValues({ ...values, error: exc.message, success: false });
            });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-color btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div>{error}</div>
    );

    const showSuccess = () => (
        <div>
            New account is created. Please <Link to="/login">Log In</Link>
        </div>
    );

    return (
        <div>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </div>
    )
}

export default AdminSignUp
import { useState } from "react";
import { Link } from "react-router-dom";
import './adminSignUp.css'

const AdminSignup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });
    const API = import.meta.env.VITE_REACT_APP_API_BASE_URL || '';

    const { name, email, password, success, error } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        const user = { name: name, email: email, password: password }
        return fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                setValues({ ...values, error: error, success: false });
            });
    };

    const signupForm = () => (
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

    const showSuccess = () => (<div>
        Your account was successfully created. Please <Link to="/admin-login">Log In</Link>
    </div>
    )

    return (
        <div id="signup-page">
            <h2>Sign Up</h2>
            {signupForm()}
            {showError()}
            {showSuccess()}
        </div>
    )
}

export default AdminSignup
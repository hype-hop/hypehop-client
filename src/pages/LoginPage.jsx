import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthenticationContext';

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="Login">
      <h1>Login</h1>

      <form className="form" action="/api/login" method="POST">
        <div className="flex-column">
          <label className="labels" htmlFor="email">
            Email
          </label>
          <div className="inputForm">
            <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
          </div>
        </div>

        <div className="flex-column">
          <label className="labels" htmlFor="password">
            Password
          </label>
          <div className="inputForm">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
        </div>

        <button type="submit" className="button-submit">
          Sign In
        </button>
      </form>
      <p className="p">
        Don't have an account?
        <Link to="/join">
          <span className="span">Sign Up</span>
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;

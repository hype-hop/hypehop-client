import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the POST request here using fetch or axios
    fetch('/api/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {

          if(data.errors){

            setError(data?.errors[0]?.msg)
          }
          else{
            setError(data?.msg || 'Success')
            navigate('/login')

          }
       

       
      })
      .catch((error) => {
       console.error('Error:', error);
      
      
      });
  };



  return (
    <div className="Join">



<h1>Join page</h1>





<div className="section">
{error && <div className="error-message">{error}</div>}

      <form className="form" onSubmit={handleSubmit} method="POST">
        <div className="flex-column">
          <label htmlFor="name">Name</label>
           <div className="inputForm">
          <input
            type="name"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            onChange={handleChange}
            value={formData.name}
            />
            </div>

     
        </div>
        <div className="flex-column">
          <label htmlFor="email">Email</label>
            <div className="inputForm">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={handleChange}
            value={formData.email}

          />
          </div>
        </div>


        <div className="flex-column">
          <label htmlFor="password">Password</label>
            <div className="inputForm">
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Create Password"
            onChange={handleChange}
            value={formData.password}

          />
          </div>
        </div>


        <div className="flex-column">
          <label htmlFor="password2">Confirm Password</label>
           <div className="inputForm">
          <input
            type="password"
            id="password2"
            name="password2"
            className="form-control"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.password2}

          />
        </div>
        </div>
        <button id="submit" type="submit" className="button-submit">
          Register
        </button>
      </form>

      <p className="p">Have An Account? <Link to="/login"> <span className="span">Sign In</span></Link></p>

</div>

    </div>



  );
}

export default Join;

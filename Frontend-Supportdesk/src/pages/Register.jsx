import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, reset } from "../featurs/authSlice";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const {user,isLoading, isError, message} = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password does not match");
    }
   else {
    dispatch(registerUser(formData))
    dispatch(reset())
   }
  };
  useEffect(()=>{
   if(user){
    navigate("/")
   }
   if(isError && message){
    toast.error(message)
   }
  },[user, isError, message])

  if(isLoading){
    return(
      <section className="heading">
        <h1>Loading...</h1>
      </section>
    )
  }

  return (
    <>
      <section className="heading">
        <h1>
          Register <FaUser />
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;

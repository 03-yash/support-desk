import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../featurs/tickets/ticketSlice";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/BackButton";

const NewTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
    navigate("/ticket/my-tickets");
  };

  return (
    <>
    <BackButton url={"/"}/>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name"></label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            id=""
          />
        </div>
      </section>
      <section className="form">
        <form className="frm-group" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product"></label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
              <option value="Macbook">Macbook</option>
            </select>
            <div className="form-group">
              <label htmlFor="description"></label>
              <textarea
                className="form-control"
                value={description}
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;

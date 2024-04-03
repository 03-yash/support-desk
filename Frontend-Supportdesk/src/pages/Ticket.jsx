import React, { useEffect } from "react";
import BackButton from "../component/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { closeTicketFunc, getTicket } from "../featurs/tickets/ticketSlice";
import { useNavigate, useParams } from "react-router-dom";

const Ticket = () => {
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();
  useEffect(() => {
    dispatch(getTicket(params.id));
  }, []);

  const handleClose = (id)=>{
    dispatch(closeTicketFunc(id))
    navigate('/')
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url={"/ticket/my-tickets"} />
        <h2>
          Ticket ID : {ticket._id}
          <span className={`state state-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted:{" "}
          {new Date(ticket.createdAt).toLocaleDateString("en-IN")}
        </h3> <h3> 
          Product Name: {" "}
           {ticket.product}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>
            Description of Issue: <p>{ticket.description}</p>{" "}
          </h3>
        </div>
      </header>
      {ticket.state!=="closed" &&(
        <button className="btn btn-block btn-danger" onClick={()=>handleClose(ticket.id)}>Close Ticket</button>
      )}
    </div>
  );
};

export default Ticket;

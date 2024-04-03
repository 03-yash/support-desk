import React from "react";
import { Link } from "react-router-dom";

const TicketItem = ({ ticket }) => {
  return (
    <div className="ticket">
      <div className="">{ticket.product}</div>
      <div className="">{
        new Date(ticket.createdAt).toLocaleDateString("en-IN")
      }</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};

export default TicketItem;

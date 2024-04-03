import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlltickets } from "../featurs/tickets/ticketSlice";
import TicketItem from "./TicketItem";
import BackButton from "../component/BackButton";

const AllTickets = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );
  useEffect(() => {
    dispatch(getAlltickets());
  }, []);

  if (isLoading) {
    return (
      <span className="heading">
        <h1>Loading...</h1>
      </span>
    );
  }
  return (
    <>
    <section>
        <BackButton url={'/'}/>
        <h1>All Tickets here</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div className="">Date</div>
          <div className="">Product</div>
          <div className="">Status</div>
          <div className=""> </div>
          </div>
            {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} />
            ))}
         
      
      </div>
    </section>
    </>
  );
};

export default AllTickets;

import React from "react";

import { Link,  } from "react-router-dom";

const Home = () => {
  

 
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/ticket/new" className="btn btn-reverse btn-block">
        Create New Ticket
      </Link>

      <Link to="/ticket/my-tickets" className="btn btn-block">
        View My Tickets
      </Link>
    </>
  );
};

export default Home;

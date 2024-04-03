import axios from "axios";
const API_URL = "/api/ticket";
const addTicket = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, formData, config);
  return response.data;
};
const allTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const singleTicket = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/" + id, config);
  console.log(response.data)
  return response.data;
};
const closeTicket = async(id, token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(API_URL + "/" + id,{status : 'closed'} ,config);
      return response.data;
}

const ticketServie = {
  addTicket,
  allTickets,
  singleTicket,
  closeTicket,
};
export default ticketServie;

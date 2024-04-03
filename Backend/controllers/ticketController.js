const asyncHandler = require("express-async-handler");
const SupportUser = require("../models/userModel");
const Ticket = require("../models/ticketModel");

const getTickets = asyncHandler(async (req, res) => {
  //    get user using the id in jwt
  const user = await SupportUser.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // get tickets with respect to id
  const tickets = await Ticket.find({ user: req.user._id });
  res.status(200).json(tickets);
});

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  // get user using id
  const user = await SupportUser.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // creating tickets
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user._id,
    status: "new",
  });
  res.status(201).json(ticket);
});

const getTicket = asyncHandler(async (req, res) => {
  // get user id from jwt
  const user = await SupportUser.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.status(200).json(ticket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  const user = await SupportUser.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Ticket.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});

const updateTicket = asyncHandler(async (req, res) => {
  const user = await SupportUser.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = { getTickets, createTicket, getTicket, deleteTicket, updateTicket };

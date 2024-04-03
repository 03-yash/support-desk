const asyncHandler = require("express-async-handler");
const SupportUser = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Notes = require("../models/notesModel");


const getNotes = asyncHandler(async (req, res) => {
  const user = await SupportUser.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const notes = await Notes.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});


const addNotes=asyncHandler(async(req, res)=>{
    const user = await SupportUser.findById(req.user._id);
    if (!user) {
      res.status(401);
      throw new Error("user not found");
    }
  
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }
    if (ticket.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }   

    const note = await Notes.create({
        text : req.body.text,
        isStaff : false,
        ticket : req.params.ticketId,
        user : req.user._id,
    })

    res.status(200).json(note)

})

// const deleteNote = asyncHandler(async(req, res)=>{
//     const user = await SupportUser.findById(req.user._id);
//     if (!user) {
//       res.status(401);
//       throw new Error("user not found");
//     }
  
//     const ticket = await Ticket.findById(req.params.ticketId);
//     if (!ticket) {
//       res.status(404);
//       throw new Error("Ticket not found");
//     }
//     if (ticket.user.toString() !== req.user._id.toString()) {
//       res.status(401);
//       throw new Error("Not authorized");
//     }
//     await Notes.findByIdAndDelete(req.params.ticketId)
//     res.status(200).json({
//         success : true
//     })
// })
// const updateNote = asyncHandler(async(req, res)=>{
//     const user = await SupportUser.findById(req.user._id);
//     if (!user) {
//       res.status(401);
//       throw new Error("user not found");
//     }
  
//     const ticket = await Ticket.findById(req.params.ticketId);
//     if (!ticket) {
//       res.status(404);
//       throw new Error("Ticket not found");
//     }
//     if (ticket.user.toString() !== req.user._id.toString()) {
//       res.status(401);
//       throw new Error("Not authorized");
//     }  
//     const updatedNote = await Notes.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//       );
    
//       res.status(200).json(updatedNote);
//   });

module.exports = { getNotes, addNotes};

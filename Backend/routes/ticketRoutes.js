const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createTicket, getTickets, getTicket, deleteTicket, updateTicket } = require("../controllers/ticketController");
const router = express.Router();

router.route("/").post(protect, createTicket).get(protect, getTickets)

router.route("/:id").get(protect, getTicket ).put(protect, updateTicket ).delete(protect, deleteTicket)



router.use('/:ticketId/note', require('../routes/noteRoutes'))
module.exports = router;
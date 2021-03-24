const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	userEmail: { type: String, required: true },
	done: { type: Boolean, required: true },
	creationTime: { type: Date, required: true },
	labels: [{ type: Date, required: true }],
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

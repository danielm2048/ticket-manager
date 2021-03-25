const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	userEmail: { type: String, required: true },
	done: { type: Boolean, default: false },
	creationTime: { type: Date, default: new Date() },
	labels: [{ type: Date, required: true }],
});

ticketSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

ticketSchema.set("toJSON", {
	virtuals: true,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

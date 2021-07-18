const router = require("express").Router();

const Ticket = require("../models/tickets.model");

router.get("/", async (req, res) => {
	const { searchText, done } = req.query;

	const regex = new RegExp(searchText, "i");

	let tickets;

	if (done === "true") {
		tickets = await Ticket.find({ title: { $regex: regex }, done: true });
	} else {
		tickets = await Ticket.find({ title: { $regex: regex } });
	}

	res.json(tickets);
});

router.post("/", async (req, res) => {
	const { title, content, userEmail, labels } = req.body;

	if (!title || !content || !userEmail) {
		return res.status(400).json("Please enter all fields");
	}

	const newTicket = new Ticket({ title, content, userEmail, labels });

	try {
		const savedTicket = await newTicket.save();
		res.json(savedTicket);
	} catch (err) {
		console.error(err);
		res.status(500).json("Server error");
	}
});

router.patch("/:ticketId/done", async (req, res) => {
	const { ticketId } = req.params;

	try {
		const doc = await Ticket.findOneAndUpdate(
			{ _id: ticketId },
			{ done: true },
			{ new: true }
		);
		if (!doc) {
			return res.status(400).json("Can't mark ticket as done");
		}
		return res.json({ updated: true });
	} catch (err) {
		console.error(err);
		res.status(500).json("Server error");
	}
});

router.patch("/:ticketId/undone", async (req, res) => {
	const { ticketId } = req.params;

	try {
		const doc = await Ticket.findOneAndUpdate(
			{ _id: ticketId },
			{ done: false },
			{ new: true }
		);
		if (!doc) {
			return res.status(400).json("Can't mark ticket as undone");
		}
		return res.json({ updated: true });
	} catch (err) {
		console.error(err);
		res.status(500).json("Server error");
	}
});

router.delete("/:ticketId", async (req, res) => {
	const { ticketId } = req.params;

	try {
		const result = await Ticket.deleteOne({ _id: ticketId });
		if (!result.ok) {
			return res.status(400).json("Can't delete ticket");
		}
		return res.json({ deleted: true });
	} catch (err) {
		console.error(err);
		res.status(500).json("Server error");
	}
});

module.exports = router;

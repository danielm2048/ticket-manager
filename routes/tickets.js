const router = require("express").Router();

const Ticket = require("../models/tickets.model");

router.get("/", async (req, res) => {
	const { searchText } = req.query;

	const regex = new RegExp(searchText, "i");

	const tickets = await Ticket.find({ title: { $regex: regex } });

	res.json(tickets);
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

module.exports = router;
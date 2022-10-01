const express = require("express");
const router = express.Router();

const {
  room_create_post,
  room_index,
  room_details,
  room_delete,
} = require("../controllers/roomController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/create", requireAuth, room_create_post);
router.get("/", requireAuth, room_index);
router.get("/:id", requireAuth, room_details);
router.get("/delete/:id", room_delete);

module.exports = router;

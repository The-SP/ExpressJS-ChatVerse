const express = require("express");
const router = express.Router();

const {
  room_create_post,
  room_index,
  room_details,
  room_delete,
} = require("../controllers/roomController");

router.post("/create", room_create_post);
router.get("/", room_index);
router.get("/:id", room_details);
router.get("/delete/:id", room_delete);

module.exports = router;

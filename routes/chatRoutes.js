const express = require("express");
const router = express.Router();

const {
  chat_create_post,
  chat_delete,
} = require("../controllers/chatController");

router.post("/", chat_create_post);
router.get("/delete/:id", chat_delete);

module.exports = router;
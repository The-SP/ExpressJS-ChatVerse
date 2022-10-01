const express = require("express");
const router = express.Router();

const {
  chat_create_post,
  chat_delete,
  chat_history,
} = require("../controllers/chatController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/", requireAuth, chat_create_post);
router.get("/delete/:id", requireAuth, chat_delete);
router.get("/history", requireAuth, chat_history)

module.exports = router;
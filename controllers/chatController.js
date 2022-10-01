const Chat = require("../models/chat");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");

const chat_create_post = (req, res) => {
  // Get room_id from previous url
  req.body.room = req.headers.referer.substring(
    req.headers.referer.lastIndexOf("/") + 1
  );
  // Get current logged in user
  req.body.user = res.locals.user;

//   console.log("Chat:", req.body);
  const chat = new Chat(req.body);
  chat
    .save()
    .then(() => res.redirect("back"))
    .catch((err) => console.log(err));
};

const chat_delete = (req, res) => {
  const id = req.params.id;
  Chat.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("back");
    })
    .catch((err) => console.log(err));
};

const chat_history = async (req, res) => {
  const current_user = res.locals.user;
  const chats = await Chat.find({ user: current_user._id }).populate("user room");
  res.render("room/history", { chats, formatDistanceToNow });
};

module.exports = {
  chat_create_post,
  chat_delete,
  chat_history,
};

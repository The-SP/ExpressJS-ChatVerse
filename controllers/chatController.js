const Chat = require("../models/chat");

const chat_create_post = (req, res) => {
  // Get room_id from previous url
  req.body.room = req.headers.referer.substring(req.headers.referer.lastIndexOf('/')+1);
  console.log(req.body);
  
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

module.exports = {
  chat_create_post,
  chat_delete,
};

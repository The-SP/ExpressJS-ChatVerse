const Room = require("../models/room");
const Chat = require("../models/chat");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");

const room_create_post = async (req, res) => {
  // See if room already exists
  const entered_room = await Room.findOne({ name: req.body.name });
  if (entered_room) {
    // Enter existing room
    res.redirect(`/room/${entered_room._id}`);
  } else {
    // Create new room and enter
    req.body.admin = res.locals.user; // Add current user as admin
    // console.log("new room:", req.body.admin);
    
    const room = new Room(req.body);
    room
      .save()
      .then(() => res.redirect(`/room/${room._id}`))
      .catch((err) => console.log(err));
  }
};

const room_index = (req, res) => {
  Room.find()
    .then((result) => {
      res.render("room/index", { rooms: result });
    })
    .catch((err) => console.log(err));
};

const room_details = async (req, res) => {
  const id = req.params.id;
  const chats = await Chat.find({ room: id }).populate("user");

  Room.findById(id).populate("admin")
    .then((result) =>
      res.render("room/room", { room: result, chats, formatDistanceToNow })
    )
    .catch((err) => {
      console.log(err);
      res.status(404).render("404");
    });
};

const room_delete = (req, res) => {
  const id = req.params.id;
  Room.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/room");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  room_create_post,
  room_index,
  room_details,
  room_delete,
};

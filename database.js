var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ujjalraja1989:Buju123@cluster0.imtk5qb.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));
module.exports = conn;

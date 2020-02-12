const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  organizationId: String
});

module.exports = mongoose.model("Event", eventSchema);

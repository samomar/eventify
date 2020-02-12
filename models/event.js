const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: String,
    description: String,
    organizationId: String,
    locationId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

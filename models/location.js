const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    name: String,
    address: String,
    latitude: String,
    longitude: String,
    organizationId: String,
    eventId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("location", locationSchema);

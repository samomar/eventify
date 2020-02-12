const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema(
  {
    name: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);

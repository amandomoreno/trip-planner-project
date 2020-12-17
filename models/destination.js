const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema ({
  place: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  //activities
  //reviews
},{
  timestamps: true,
})

module.exports = mongoose.model("Destination", destinationSchema);
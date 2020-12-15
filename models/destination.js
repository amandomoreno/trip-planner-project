const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema ({
  place: {type: String, enum: ['Grand Bahamas, BS', 'Las Vegas', 'Liberia, CR', 'Ocho Rios, JA', ]},
  description: {type: String, required: true},
  //activities
  //reviews
},{
  timestamps: true,
})

module.exports = mongoose.model("Destination", destinationSchema);
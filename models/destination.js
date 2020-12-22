const mongoose = require("mongoose")
const Activity = require('./activity')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})

const destinationSchema = new Schema ({
  place: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  activities: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
  reviews: [reviewSchema],
  createdBy: String,
},{
  timestamps: true,
})

module.exports = mongoose.model("Destination", destinationSchema);
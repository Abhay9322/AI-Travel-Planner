import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
    location: String,
    budget: Number,
    days: Number,
    plan: String,
}, { timestamps: true });

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;
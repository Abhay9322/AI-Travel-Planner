import { model } from "mongoose";
import Itinerary from "../models/itineraryModel.js";
import axios from "axios";

export const generateItinerary = async (req, res) => {
    const { location, budget, days } = req.body;

    try {
        // call ai api
        const aiResponse = await axios.post("https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a travel planner AI." },
                    { role: "user", content: `Plan a ${days}-day trip to ${location} with a budget of ${budget} USD.` }
                ]
            },
            {
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
            }
        );

        const plan = aiResponse.data.choices[0].message.content;

        const newPlan = await Itinerary.create({ location, budget, days, plan });
        res.json(newPlan);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate itinerary" });
    }
};
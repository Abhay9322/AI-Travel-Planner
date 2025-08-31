import { useState } from "react";
import axios from "axios";

const ItineraryForm = ({ setPlan, setLocation }) => {
    const [locationInput, setLocationInput] = useState("");
    const [budget, setBudget] = useState("");
    const [days, setDays] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/api/itinerary/generate",
            {
                location: locationInput,
                budget,
                days
            }
        );
        setPlan(res.data.plan);
        setLocation(locationInput);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
            <input type="text" placeholder="Location" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} className="border p-1" />
            <input type="number" placeholder="Budget" value={budget} className="border p-1" />
            <input type="number" placeholder="Days" value={days} onChange={(e) => setDays(e.target.value)} className="border p-1" />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Generate Plan</button>
        </form>
    );
};

export default ItineraryForm;
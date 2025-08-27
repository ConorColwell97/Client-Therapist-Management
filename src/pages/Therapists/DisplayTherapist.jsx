import { useEffect, useState } from "react";
import axios from "axios";
import { animate, motion } from 'framer-motion';

const Display = () => {
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [therapist, setTherapist] = useState(null);
    const [error, setError] = useState("");

    const getTherapist = async () => {
        const name = sessionStorage.getItem("therapist");
        try {
            setError("");
            const response = await axios.get(`${VITE_URL}/therapists/name/${encodeURIComponent(name)}`);
            setTherapist(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

    }

    useEffect(() => {
        getTherapist();
    }, []);

    return (
        <motion.div className="displayContainer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {therapist !== null ? (
                <>  
                    <div className="inner">
                        <p>Name: Dr.{therapist.Name}</p>
                        <button style={{ backgroundColor: "#13141F" }}>Change Name</button>
                    </div>

                    <div className="inner">
                        <p>Title: {therapist.Title}</p>
                        <button style={{ backgroundColor: "#13141F" }}>Change Title</button>
                    </div>

                    <div className="inner">
                        <p>Email: {therapist.Email}</p>
                        <button style={{ backgroundColor: "#13141F" }}>Change Email</button>
                    </div>

                    <div className="inner">
                        <p>Location: {therapist.Location}</p>
                        <button style={{ backgroundColor: "#13141F" }}>Change Location</button>
                    </div>

                    <div className="inner">
                        <p>Experience: {therapist.YearsOfPractice} year(s)</p>
                        <button style={{ backgroundColor: "#13141F" }}>Update Experience</button>
                    </div>

                    <div className="inner">
                        <p>Taking clients: {therapist.Availability}</p>
                        <button style={{ backgroundColor: "#13141F" }}>Change Availability</button>
                    </div>
                </>
            ) : (
                <h2>Not found</h2>
            )}
        </motion.div>
    );
}

export default Display;
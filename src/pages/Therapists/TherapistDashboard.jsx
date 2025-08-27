import { animate, motion } from 'framer-motion';
import '../Styles.css';
import { IoMdCreate } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [therapists, setTherapists] = useState([]);
    const [error, setError] = useState("");

    const getAllTherapists = async () => {
        try {
            setError("");
            const response = await axios.get(`${VITE_URL}/therapists`);
            setTherapists(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const search = async (name) => {
        sessionStorage.setItem("therapist", name);
        navigate("/TherapistDis");
    }

    useEffect(() => {
        getAllTherapists();
    }, []);

    return (
        <div className='container'>
            <div className='dashboard'>
                <h2>Therapists</h2>
                {therapists.length > 0 ? (
                    therapists.map((therapist, index) => (
                        <motion.div className='display' key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <p>Dr.{therapist.Name}</p>
                            <p>{therapist.Title}</p>
                            <p>{therapist.Availability}</p>
                            <div style={{ flexDirection: "column" }}>
                                <p style={{ margin: "0px" }}>Edit</p>
                                <button onClick={() => search(therapist.Name)} style={{ backgroundColor: "#13141F" }}>{<IoMdCreate color='white' />}</button>
                            </div>
                            <div style={{ flexDirection: "column" }}>
                                <p style={{ margin: "0px"}}>delete</p>
                                <button style={{ backgroundColor: "#13141F" }}>{<IoTrashOutline color='white' />}</button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <h2>No data available</h2>
                )}
            </div>
            <button style={{ marginTop: "1rem" }} onClick={() => navigate("/Therapist")}>Go back</button>
        </div>

    );
}

export default Dashboard;
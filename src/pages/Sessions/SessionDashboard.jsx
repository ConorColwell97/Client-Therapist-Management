import { animate, motion } from 'framer-motion';
import '../Styles.css';
import { IoMdCreate } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from '../../Components/NavBar';
import axios from "axios";

const SessionDashboard = () => {
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

    const deleteTherapist = async (name) => {
        let response;

        try {
            response = await axios.delete(`${VITE_URL}/therapists/name/${encodeURIComponent(name)}`);
            setTherapists((prev) => {
                return prev.filter(item => item.Name !== name);
            });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const search = async (name) => {
        sessionStorage.setItem("session", name);
        navigate("/SessionDis");
    }

    useEffect(() => {
        getAllTherapists();
    }, []);

    return (
        <div className='container'>
            <NavBar />
            <div className='dashboard'>
                <h2>Therapists</h2>
                {therapists.length > 0 ? (
                    therapists.map((therapist, index) => (
                        <motion.div className='display' key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <p>Dr.{therapist.Name}</p>
                            <p>{therapist.Title}</p>
                            <p>{therapist.Availability}</p>

                            <button onClick={() => search(therapist.Name)}>{<IoMdCreate color='white'/>} Edit</button>
                            <button onClick={() => {
                                alert(`Are you sure you wish to delete ${therapist.Name}?`);
                                if (therapist.Name !== null) {
                                    deleteTherapist(therapist.Name);
                                }
                            }}>{<IoTrashOutline color='white'/>} Delete</button>

                        </motion.div>
                    ))
                ) : (
                    <h2>No data available</h2>
                )}
            </div>
        </div>

    );
}

export default SessionDashboard;
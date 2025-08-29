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
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState("");

    const getAllSessions = async () => {
        try {
            setError("");
            const response = await axios.get(`${VITE_URL}/sessions`);
            setSessions(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const deleteSession = async (id) => {
        let response;

        try {
            response = await axios.delete(`${VITE_URL}/sessions/session/${encodeURIComponent(id)}`);
            setSessions((prev) => {
                return prev.filter(item => item.ID !== id);
            });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const search = async (id) => {
        sessionStorage.setItem("sessionID", id);
        sessionStorage.setItem("session", "id");
        navigate("/SessionDis");
    }

    useEffect(() => {
        getAllSessions();
    }, []);

    return (
        <div className='container'>
            <NavBar />
            <div className='dashboard'>
                <h2>Sessions</h2>
                {sessions.length > 0 ? (
                    sessions.map((session, index) => (
                        <motion.div className='display' key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <p>Dr.{session.Therapist}</p>
                            <p>{session.Client}</p>
                            <p>{session.SessionDate}</p>

                            <button onClick={() => search(session.ID)}>{<IoMdCreate color='white'/>} Edit</button>
                            <button onClick={() => {
                                alert(`Are you sure you wish to delete this session?`);
                                deleteSession(session.ID);
                                
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
import { animate, motion } from 'framer-motion';
import '../Styles.css';
import { IoMdCreate } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from '../../Components/NavBar';
import axios from "axios";

const ClientDashboard = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [clients, setClients] = useState([]);
    const [error, setError] = useState("");

    const getAllClients = async () => {
        try {
            setError("");
            const response = await axios.get(`${VITE_URL}/clients`);
            setClients(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const deleteClient = async (name) => {
        let response;

        try {
            response = await axios.delete(`${VITE_URL}/clients/name/${encodeURIComponent(name)}`);
            setClients((prev) => {
                return prev.filter(item => item.Name !== name);
            });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const search = async (name) => {
        sessionStorage.setItem("client", name);
        navigate("/ClientDis");
    }

    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <div className='container'>
            <NavBar />
            <div className='dashboard'>
                <h2>Clients</h2>
                {clients.length > 0 ? (
                    clients.map((client, index) => (
                        <motion.div className='display' key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <p>{client.Name}</p>
                            <p>{client.Email}</p>
                            <p>{client.PhoneNumber}</p>

                            <button onClick={() => search(client.Name)}>{<IoMdCreate color='white'/>} Edit</button>
                            <button onClick={() => {
                                alert(`Are you sure you wish to delete ${client.Name}?`);
                                if (client.Name !== null) {
                                    deleteClient(client.Name);
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

export default ClientDashboard;
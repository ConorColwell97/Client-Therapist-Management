import { useEffect, useState } from "react";
import axios from "axios";
import { animate, motion } from 'framer-motion';
import NavBar from "../../Components/NavBar";

const DisplayClient = () => {
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [client, setClient] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [newData, setNewData] = useState(null);

    const getClient = async () => {
        const name = sessionStorage.getItem("client");
        let response;

        try {
            response = await axios.get(`${VITE_URL}/clients/name/${encodeURIComponent(name)}`);
            setClient(response.data);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

    }

    const update = async (data, type) => {
        let response;

        try {
            response = await axios.patch(`${VITE_URL}/clients/${type}/${encodeURIComponent(client.Name)}`, { data }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            checkType(data, type);
            setNewData(data);
            sessionStorage.setItem("client", data);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const checkType = (data, type) => {
        switch (type) {
            case 'name':
                client.Name = data;
                break;
            case 'email':
                client.Email = data;
                break;
            case 'location':
                client.Location = data;
                break;
            case 'number':
                client.PhoneNumber = data;
                break
            case 'reg':
                client.Regularity = data;
                break;
            default: return;
        }
    }

    useEffect(() => {
        if (message) {
            alert(`${message} to ${newData}`);
            setMessage("");
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            alert(error);
            setError("");
        }
    }, [error]);

    useEffect(() => {
        getClient();
    }, []);

    return (
        <div className="container">
            <NavBar />
            <h1>Client Details</h1>
            <div>
                <motion.div className="displayContainer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    {client !== null ? (
                        <>
                            <div className="inner">
                                <p>Name: {client.Name}</p>
                                <button onClick={() => {
                                    const newName = prompt("Enter new name");
                                    if (newName !== null && newName.trim() !== "") {
                                        update(newName, 'name');
                                    }
                                }}>Change Name</button>
                            </div>

                            <div className="inner top">
                                <p>Email: {client.Email}</p>
                                <button onClick={() => {
                                    const newEmail = prompt("Enter new email");
                                    if (newEmail !== null && newEmail.trim() !== "") {
                                        update(newEmail, 'email');
                                    }
                                }}>Change Email</button>
                            </div>

                            <div className="inner top">
                                <p>Location: {client.Location}</p>
                                <button onClick={() => {
                                    const newLocation = prompt("Enter new location");
                                    if (newLocation !== null && newLocation.trim() !== "") {
                                        update(newLocation, 'location');
                                    }
                                }}>Change Location</button>
                            </div>

                            <div className="inner top">
                                <p>Phone Number: {client.PhoneNumber}</p>
                                <button onClick={() => {
                                    const newNumber = prompt("Enter new Phone Number");
                                    if (newNumber !== null && newNumber.trim() !== "") {
                                        update(newNumber , 'number');
                                    }
                                }}>Update Phone Number</button>
                            </div>

                            <div className="inner top">
                                {client.Regularity == 'WEEKLY' ? (
                                    <p>Regularity: WEEKLY</p>
                                ) : (
                                    <p>Regularity: MONTHLY</p>
                                )}
                                <button onClick={() => {
                                    const newReg = (client.Regularity == 'WEEKLY') ? 'MONTHLY' : 'WEEKLY';
                                    alert("Change Client Regularity?");
                                    if (newReg === 'WEEKLY' || newReg === 'MONTHLY') {
                                        update(newReg, 'reg');
                                    }
                                }}>Change Regularity</button>
                            </div>
                        </>
                    ) : (
                        <h2>Not found</h2>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default DisplayClient;
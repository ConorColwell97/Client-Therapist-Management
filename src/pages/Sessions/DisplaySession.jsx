import { useEffect, useState } from "react";
import axios from "axios";
import { animate, motion } from 'framer-motion';
import NavBar from "../../Components/NavBar";

const DisplaySession = () => {
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [sessions, setSessions] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [newData, setNewData] = useState(null);
    const [newDate, setNewDate] = useState("");

    const getSessionByID = async () => {
        const id = sessionStorage.getItem("sessionID");
        let response;

        try {
            response = await axios.get(`${VITE_URL}/sessions/id/${encodeURIComponent(id)}`);

            if (Array.isArray(response.data)) {
                setSessions(response.data);
            } else {
                let arr = [];
                arr.push(response.data);
                setSessions(arr);
            }

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

    }

    const getSessionByTherapist = async () => {
        const name = sessionStorage.getItem("sessionTherapist");
        let response;

        try {
            response = await axios.get(`${VITE_URL}/sessions/therapist/${encodeURIComponent(name)}`);

            if (Array.isArray(response.data)) {
                setSessions(response.data);
            } else {
                let arr = [];
                arr.push(response.data);
                setSessions(arr);
            }

            console.log(`Data: ${sessions}`);


        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

    }

    const getSessionByClient = async () => {
        const name = sessionStorage.getItem("sessionClient");
        let response;

        try {
            response = await axios.get(`${VITE_URL}/sessions/client/${encodeURIComponent(name)}`);

            if (Array.isArray(response.data)) {
                setSessions(response.data);
            } else {
                let arr = [];
                arr.push(response.data);
                setSessions(arr);
            }

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

    }

    const update = async (data, id, type) => {
        let response;

        try {
            response = await axios.patch(`${VITE_URL}/sessions/${type}/${encodeURIComponent(id)}`, { data }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            checkType(data, id, type);
            setNewData(data);
            // sessionStorage.setItem("sessionTherapist", data);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const checkType = (data, id, type) => {

        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].ID === id) {
                switch (type) {
                    case 'therapist':
                        sessions[i].Therapist = data;
                        break;
                    case 'client':
                        sessions[i].Client = data;
                        break;
                    case 'notes':
                        sessions[i].Notes = data;
                        break;
                    case 'date':
                        sessions[i].SessionDate = data;
                        break;
                    case 'len':
                        sessions[i].Length = data;
                        break
                    default: return;
                }
            }

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
        if (sessionStorage.getItem("session") === "id") {
            getSessionByID();
        } else if (sessionStorage.getItem("session") === "therapist") {
            getSessionByTherapist();
        } else {
            getSessionByClient();
        }
    }, []);

    return (
        <div className="container">
            <NavBar />
            <h1>Session Details</h1>
            {sessions.length > 0 ? (
                sessions.map((session, index) => (
                    <motion.div key={index} style={{ marginBottom: "2rem" }} className="displayContainer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="inner">
                            <p>Therapist: Dr.{session.Therapist}</p>
                            <button onClick={() => {
                                const newTherapist = prompt("Enter new therapist");
                                if (newTherapist !== null && newTherapist.trim() !== "") {
                                    update(newTherapist, session.ID, 'therapist');
                                }
                            }}>Change Therapist</button>
                        </div>

                        <div className="inner top">
                            <p>Client: {session.Client}</p>
                            <button onClick={() => {
                                const newClient = prompt("Enter new client");
                                if (newClient !== null && newClient.trim() !== "") {
                                    update(newClient, session.ID, 'client');
                                }
                            }}>Change Client</button>
                        </div>

                        <div className="inner top">
                            <p>Notes: {session.Notes}</p>
                            <button onClick={() => {
                                const newNotes = prompt("Enter new notes");
                                if (newNotes !== null && newNotes.trim() !== "") {
                                    update(newNotes, session.ID, 'notes');
                                }
                            }}>Change Notes</button>
                        </div>

                        <div className="inner top">
                            <p>Date: {session.SessionDate}</p>
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                            <button disabled={newDate === ""} onClick={() => update(newDate, session.ID, 'date')}>Change Date</button>
                        </div>

                        <div className="inner top">
                            <p>Session Length: {session.Length} hour(s)</p>
                            <button onClick={() => {
                                const newLength = prompt("Enter new session length");
                                if (newLength >= 0 && !isNaN(newLength)) {
                                    update(newLength, session.ID, 'len');
                                }
                            }}>Update Length</button>
                        </div>
                    </motion.div>
                ))
            ) : (
                <motion.div className="displayContainer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <h2>Not found</h2>
                </motion.div>
            )}
        </div>
    );
}

export default DisplaySession;
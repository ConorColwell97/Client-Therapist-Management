import '../Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../../Components/NavBar';
import axios from 'axios';

const Session = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [message, setMessage] = useState(null);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [add, setAdd] = useState(false);

    const [newTherapist, setNewTherapist] = useState("");
    const [newClient, setNewClient] = useState("");
    const [newNotes, setNewNotes] = useState("NONE");
    const [newDate, setNewDate] = useState("");
    const [newLength, setNewLength] = useState(-1);

    const disabled = (newTherapist === "" || newClient=== "" || newNotes === "" || newDate === "" || newLength === -1);

    const searchByTherapist = async () => {
        sessionStorage.setItem("sessionTherapist", name);
        navigate("/SessionDis");
    }

    const searchByClient = async () => {
        sessionStorage.setItem("sessionClient", name);
        navigate("/SessionDis");
    }

    const addSession = async () => {
        let response;

        try {
            response = await axios.post(`${VITE_URL}/sessions`, {
                Therapist: newTherapist,
                Client: newClient,
                Notes: newNotes,
                SessionDate: newDate,
                Length: newLength
            });
            setMessage(response.data.message);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    useEffect(() => {
        if (message) {
            alert(message);
            setAdd(false);
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <div className='container'>
            <NavBar />
            {add ? (
                <>
                    <h2>Enter details</h2>
                    <div className='enter'>
                        <label style={{ fontWeight: "bold" }}>
                            Session Therapist:
                            <input
                                type="text"
                                placeholder='Enter Therapist name'
                                value={newTherapist}
                                onChange={(e) => setNewTherapist(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Session Client:
                            <input
                                type="text"
                                placeholder='Enter Client'
                                value={newClient}
                                onChange={(e) => setNewClient(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Session Notes:
                            <input
                                type="text"
                                placeholder='Enter notes'
                                value={newNotes}
                                onChange={(e) => setNewNotes(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Session Date:
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Session Length:
                            <input
                                type="text"
                                placeholder='Enter length'
                                value={newLength}
                                onChange={(e) => setNewLength(e.target.value)}
                            />
                        </label>

                        <button style={{ backgroundColor: "#1F51FF", width: "10rem", margin: "0 auto" }} disabled={disabled} onClick={addSession}>Finish</button>
                        <button style={{ backgroundColor: "#1F51FF", width: "10rem", margin: "0 auto" }} onClick={() => setAdd(false)}>Cancel</button>
                    </div>
                </>

            ) : (
                <div className='menu'>
                    <div>
                        <h2>View all currently registered Sessions</h2>
                        <button onClick={() => navigate("/SessionDash")}>View Sessions</button>
                    </div>

                    <div>
                        <h2>Search for Session(s) by a Therapist</h2>
                        <div className='find'>
                            <input
                                className='input'
                                type="text"
                                placeholder='Enter therapist name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button onClick={searchByTherapist}>Enter</button>
                            <button onClick={() => setName("")}>Cancel</button>
                        </div>

                        <h2>Search for Session(s) taken by a Client</h2>
                        <div className='find'>
                            <input
                                className='input'
                                type="text"
                                placeholder='Enter client name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button onClick={searchByClient}>Enter</button>
                            <button onClick={() => setName("")}>Cancel</button>
                        </div>
                    </div>

                    <div>
                        <h2 style={{ marginTop: "10%" }}>Add a Session</h2>
                        <button onClick={() => setAdd(true)}>Add Session</button>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Session;
import './Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from '../Components/NavBar';

const Session = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;

    const [therapistName, setTherapistName] = useState("");
    const [newTherapist, setNewTherapist] = useState("");
    const [newClient, setNewClient] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newLength, setNewLength] = useState("");

    const [allData, setAllData] = useState([]);
    const [sessionData, setSessionData] = useState(null);
    
    const [search, setSearch] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updTherapist, setUpdTherapist] = useState(false);
    const [updClient, setUpdClient] = useState(false);
    const [updNotes, setUpdNotes] = useState(false);
    const [updDate, setUpdDate] = useState(false);
    const [updLength, setUpdLength] = useState(false);

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const displaySearch = () => {
        setShowSearch(true);
        setShowAdd(false);
        setSuccessMessage(null);
        setError(null);
    }

    const callSearch = () => {
        getSession();
        setShowData(true);
        setShowSearch(false);
        setShowAdd(false);
        resetStates();
    }

    const disaplayAdd = () => {
        setShowAdd(true);
        setShowSearch(false);
        setSuccessMessage(null);
        setError(null);
    }

    const callAdd = () => {
        addSession();
        setShowAdd(false);
    }

    const callUpdate = () => {
        setShowUpdate(true);
        setShowSearch(false);
        setSuccessMessage(null);
        setError(null);
    }

    const callUpdTherapist = () => {
        setShowUpdate(false);
        setUpdTherapist(true);
    }

    const callTherapistUpdate = () => {
        updateTherapist();
        setUpdTherapist(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdClient = () => {
        setShowUpdate(false);
        setUpdClient(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callClientUpdate = () => {
        updateClient();
        setUpdClient(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdNotes = () => {
        setShowUpdate(false);
        setUpdNotes(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callNotesUpdate = () => {
        updateNotes();
        setUpdNotes(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdDate = () => {
        setShowUpdate(false);
        setUpdDate(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callDateUpdate = () => {
        updateDate();
        setUpdDate(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdLength = () => {
        setShowUpdate(false);
        setUpdLength(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callLengthUpdate = () => {
        updateLength();
        setUpdLength(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const resetStates = () => {
        setNewTherapist("");
        setTherapistName("");
        setNewClient("");
        setNewNotes("");
        setNewDate("");
        setNewLength("");
    }

    const resetPage = () => {
        setSessionData(null);
        setShowSearch(false);
        setShowAdd(false);
        setShowUpdate(false);
        setSuccessMessage(null);
        setError(null);
        getAllSessions();
    }

    const getAllSessions = async () => {
        try {
            setError(null);
            const response = await axios.get(`${VITE_URL}/sessions`);
            setAllData(response.data);
        } catch (err) {
            console.error("Error fetching sessions:", err);
            setAllData([]);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const getSession = async () => {
        resetStates();

        try {
            setError(null);
            const response = await axios.get(`${VITE_URL}/sessions/therapist/${encodeURIComponent(therapistName)}`);
            console.log(response.data);
            setSessionData(response.data);
        } catch (err) {
            console.error("Error fetching session:", err);
            setSessionData(null);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const addSession = async () => {
        resetStates();
        console.log(newTherapist);
        console.log(newClient);
        console.log(newNotes);
        console.log(newDate);
        console.log(newLength);

        try {
            setError(null);
            const response = await axios.post(`${VITE_URL}/sessions`, {
                Therapist: newTherapist,
                Client: newClient,
                Notes: newNotes,
                SessionDate: newDate,
                Length: newLength,
            });
            setSuccessMessage(response.data.message);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const deleteSession = async () => {
        resetStates();

        try {
            setError(null);
            const response = await axios.delete(`${VITE_URL}/sessions/therapist/${encodeURIComponent(sessionData.Therapist)}`);
            console.log(response.data);
            setSuccessMessage(response.data.message);
        } catch (err) {
            console.error("Could not delete session:", err);
            setSessionData(null);
            setError(err.response?.data?.message || "An error occurred");
        }

        setSessionData(null);
    }

    const updateTherapist = async () => {
        console.log(sessionData.Therapist);
        console.log(newTherapist);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/sessions/therapist/${encodeURIComponent(sessionData.Therapist)}`, { newTherapist }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateClient = async () => {
        console.log(sessionData.Client);
        console.log(newClient);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/sessions/client/${encodeURIComponent(sessionData.Client)}`, { newClient }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateNotes = async () => {
        console.log(sessionData.Notes);
        console.log(newNotes);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/sessions/notes/${encodeURIComponent(sessionData.Notes)}`, { newNotes }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateDate = async () => {
        console.log(sessionData.SessionDate);
        console.log(newDate);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/sessions/date/${encodeURIComponent(sessionData.SessionDate)}`, { newDate }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateLength = async () => {
        console.log(sessionData.Length);
        console.log(newLength);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/sessions/len/${encodeURIComponent(sessionData.Length)}`, { newLength }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    useEffect(() => {
        getAllSessions();
    }, []);

    return (
        <div className='navContainer'>
            <NavBar/>

            <div className='container'>
                <h2 className='header'>Sessions</h2>

                <div>
                    {search && (
                        <>
                            <button className="buttons" onClick={displaySearch}>Search Therapist</button>
                            <button className="buttons" onClick={disaplayAdd}>Add Therapist</button>
                        </>
                    )}
                    <button className="buttons" onClick={() => navigate("/")}>Go home</button>
                </div>

                {showSearch && (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Session Therapist"
                            className="userInput"
                            value={therapistName}
                            onChange={(e) => setTherapistName(e.target.value)}
                        />
                        <button className="buttons" onClick={callSearch}>Search</button>
                    </div>
                )}

                {sessionData && (
                    <div>
                        <h2 style={{ color: "white" }}>Therapist: {sessionData.Therapist}</h2>
                        <p style={{ color: "white" }}>Client: {sessionData.Client}</p>
                        <p style={{ color: "white" }}>Notes: {sessionData.Notes}</p>
                        <p style={{ color: "white" }}>Date: {sessionData.SessionDate.split("T")[0]}</p>
                        <p style={{ color: "white" }}>Session Length: {sessionData.Length} hour(s)</p>
                        <button className="buttons" onClick={callUpdate}>Update Session</button>
                        <button className="buttons" onClick={deleteSession}>Delete Session</button>
                        <button className='buttons' onClick={resetPage}>Refresh</button>
                    </div>
                )}

                {showAdd && (
                    <div className='margin'>
                        <input
                            type="text"
                            placeholder="Enter Therapist Name"
                            value={newTherapist}
                            onChange={(e) => setNewTherapist(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Client Name"
                            value={newClient}
                            onChange={(e) => setNewClient(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Notes"
                            value={newNotes}
                            onChange={(e) => setNewNotes(e.target.value)}
                        />
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Session length"
                            value={newLength}
                            onChange={(e) => setNewLength(e.target.value)}
                        />
                        <button onClick={callAdd}>Add</button>
                    </div>
                )}

                {showUpdate && (
                    <div className='margin'>
                        <button className="buttons" onClick={callUpdTherapist}>Update Therapist</button>
                        <button className="buttons" onClick={callUpdClient}>Update Client</button>
                        <button className="buttons" onClick={callUpdNotes}>Update Notes</button>
                        <button className="buttons" onClick={callUpdDate}>Update Session Date</button>
                        <button className="buttons" onClick={callUpdLength}>Update Session Length</button>
                    </div>
                )}

                {updTherapist && (
                    <div className='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Therapist Name"
                            value={newTherapist}
                            onChange={(e) => setNewTherapist(e.target.value)}
                        />
                        <button onClick={callTherapistUpdate}>Submit</button>
                    </div>
                )}

                {updClient && (
                    <div className='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Client Name"
                            value={newClient}
                            onChange={(e) => setNewClient(e.target.value)}
                        />
                        <button onClick={callClientUpdate}>Submit</button>
                    </div>
                )}

                {updNotes && (
                    <div className='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Notes"
                            value={newNotes}
                            onChange={(e) => setNewNotes(e.target.value)}
                        />
                        <button onClick={callNotesUpdate}>Submit</button>
                    </div>
                )}

                {updDate && (
                    <div className='margin'>
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <button onClick={callDateUpdate}>Submit</button>
                    </div>
                )}

                {updLength && (
                    <div className='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Session Length"
                            value={newLength}
                            onChange={(e) => setNewLength(e.target.value)}
                        />
                        <button onClick={callLengthUpdate}>Submit</button>
                    </div>
                )}

                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <h1 className='dashHeader'>Current Sessions</h1>
                <div className='dashboard'>
                    <div className='column'>
                        <h2 className='info'>Therapist</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((session, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{session.Therapist}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No sessions found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Client</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((session, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{session.Client}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No sessions found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Notes</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((session, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{session.Notes}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No sessions found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Session Date</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((session, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{session.SessionDate.split("T")[0]}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No sessions found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Session Length</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((session, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{session.Length} hour(s)</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No sessions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Session;
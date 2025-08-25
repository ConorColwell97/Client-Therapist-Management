import './Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Client = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;

    const [clientName, setClientName] = useState("");
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newReg, setNewReg] = useState("");

    const [allData, setAllData] = useState([]);
    const [clientData, setClientData] = useState(null);

    const [search, setSearch] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updName, setUpdName] = useState(false);
    const [updEmail, setUpdEmail] = useState(false);
    const [updNumber, setUpdNumber] = useState(false);
    const [updReg, setUpdReg] = useState(false);

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const displaySearch = () => {
        setShowSearch(true);
        setShowAdd(false);
        setSuccessMessage(null);
        setError(null);
    }

    const callSearch = () => {
        getClient();
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
        addClient();
        setShowAdd(false);
    }

    const weekly = () => {
        setNewReg("WEEKLY");
    }

    const monthly = () => {
        setNewReg("MONTHLY");
    }

    const callUpdate = () => {
        setShowUpdate(true);
        setShowSearch(false);
        setSuccessMessage(null);
        setError(null);
    }

    const callUpdName = () => {
        setShowUpdate(false);
        setUpdName(true);
    }

    const callNameUpdate = () => {
        updateName();
        setUpdName(false);
        setShowUpdate(false);
        setShowSearch(true);
    }


    const callUpdEmail = () => {
        setShowUpdate(false);
        setUpdEmail(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callEmailUpdate = () => {
        updateEmail();
        setUpdEmail(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdNumber = () => {
        setShowUpdate(false);
        setUpdNumber(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callNumberUpdate = () => {
        updateNumber();
        setUpdNumber(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdReg = () => {
        setShowUpdate(false);
        setUpdReg(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callRegUpdate = () => {
        updateRegularity();
        setUpdReg(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const resetStates = () => {
        setNewName("");
        setClientName("");
        setNewEmail("");
        setNewNumber("");
        setNewReg("");
    }

    const resetPage = () => {
        setClientData(null);
        setShowSearch(false);
        setShowAdd(false);
        setShowUpdate(false);
        setSuccessMessage(null);
        setError(null);
        getAllClients();
    }

    const getAllClients = async () => {
        try {
            setError(null);
            const response = await axios.get(`${VITE_URL}/clients`);
            setAllData(response.data);
        } catch (err) {
            console.error("Error fetching clients:", err);
            setAllData([]);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const getClient = async () => {
        resetStates();

        try {
            setError(null);
            const response = await axios.get(`${VITE_URL}/clients/name/${encodeURIComponent(clientName)}`);
            console.log(response.data);
            setClientData(response.data);
        } catch (err) {
            console.error("Error fetching client:", err);
            setClientData(null);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const addClient = async () => {
        resetStates();

        try {
            setError(null);
            const response = await axios.post(`${VITE_URL}/clients`, {
                Name: newName,
                Email: newEmail,
                PhoneNumber: newNumber,
                Regularity: newReg
            });
            setSuccessMessage(response.data.message);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

        resetPage();
    }

    const deleteClient = async () => {
        resetStates();

        try {
            setError(null);
            const response = await axios.delete(`${VITE_URL}/clients/name/${encodeURIComponent(clientData.Name)}`);
            console.log(response.data);
            setSuccessMessage(response.data.message);
            setClientData(null);
        } catch (err) {
            console.error("Could not delete client:", err);
            setClientData(null);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const updateName = async () => {
        console.log(clientData.Name);
        console.log(newName);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/clients/name/${encodeURIComponent(clientData.Name)}`, { newName }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateEmail = async () => {
        console.log(clientData.Email);
        console.log(newEmail);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/clients/email/${encodeURIComponent(clientData.Name)}`, { newEmail }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateNumber = async () => {
        console.log(clientData.PhoneNumber);
        console.log(newNumber);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/clients/number/${encodeURIComponent(clientData.Name)}`, { newNumber }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateRegularity = async () => {
        console.log(clientData.Regularity);
        console.log(newReg);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/clients/reg/${encodeURIComponent(clientData.Name)}`, { newReg }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <div className='navContainer'>
            <nav className='navBar'>
                <button className='navButtons' onClick={resetPage}>Refresh Page</button>
                <button className='navButtons' onClick={() => navigate("/")}>Home</button>
                <button className='navButtons' onClick={() => navigate("/Therapist")}>Therapists</button>
                <button className='navButtons' onClick={() => navigate("/Session")}>Sessions</button>
            </nav>

            <div className='container'>
                <h2 className='header'>Clients</h2>

                {search && (
                    <div>
                        <button className="buttons" onClick={displaySearch}>Search Client</button>
                        <button className="buttons" onClick={disaplayAdd}>Add Client</button>
                    </div>
                )}

                {showSearch && (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Client Name"
                            className="userInput"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                        <button className="buttons" onClick={callSearch}>Search</button>
                    </div>
                )}

                {clientData && (
                    <div>
                        <h2 style={{ color: "white" }}>Name: {clientData.Name}</h2>
                        <p style={{ color: "white" }}>Email: {clientData.Email}</p>
                        <p style={{ color: "white" }}>Phone Number: {clientData.PhoneNumber}</p>
                        <p style={{ color: "white" }}>Regularity: {clientData.Regularity}</p>
                        <button className="buttons" onClick={callUpdate}>Update Client</button>
                        <button className="buttons" onClick={deleteClient}>Delete Client</button>
                        <button className='buttons' onClick={resetPage}>Refresh</button>
                    </div>
                )}

                {showAdd && (
                    <div class='margin'>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Phone Number"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value)}
                        />
                        <div className='dropdown'>
                            <button className='dropbutton'>Set Regularity</button>
                            <div className='dropdown-content'>
                                <button className='buttons' onClick={weekly}>WEEKLY</button>
                                <button className='buttons' onClick={monthly}>MONTHLY</button>
                            </div>
                        </div>
                        <button onClick={callAdd}>Add</button>
                    </div>
                )}

                {showUpdate && (
                    <div class='margin'>
                        <button className="buttons" onClick={callUpdName}>Update Name</button>
                        <button className="buttons" onClick={callUpdEmail}>Update Email </button>
                        <button className="buttons" onClick={callUpdNumber}>Update Phone Number</button>
                        <button className="buttons" onClick={callUpdReg}>Update Regularity</button>
                    </div>
                )}

                {updName && (
                    <div class='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={callNameUpdate}>Submit</button>
                    </div>
                )}

                {updEmail && (
                    <div class='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button onClick={callEmailUpdate}>Submit</button>
                    </div>
                )}

                {updNumber && (
                    <div class='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Phone Number"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value)}
                        />
                        <button onClick={callNumberUpdate}>Submit</button>
                    </div>
                )}

                {updReg && (
                    <div class='margin'>
                        <div className='dropdown'>
                            <button className='dropbutton'>Set Regularity</button>
                            <div className='dropdown-content'>
                                <button className='buttons' onClick={weekly}>WEEKLY</button>
                                <button className='buttons' onClick={monthly}>MONTHLY</button>
                            </div>
                        </div>
                        <button onClick={callRegUpdate}>Submit</button>
                    </div>
                )}

                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <h1 className='dashHeader'>Current Clients</h1>
                <div className='dashboard'>
                    <div className='column'>
                        <h2 className='info'>Name</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((client, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{client.Name}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No clients found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Email</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((client, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{client.Email}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No clients found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Phone Number</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((client, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{client.PhoneNumber}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No clients found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 style={{ color: "white" }}>Regularity</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((client, index) => (
                                <div key={index} className='column'>
                                    <p style={{ color: "white" }}>{client.Regularity}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No clients found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Client;
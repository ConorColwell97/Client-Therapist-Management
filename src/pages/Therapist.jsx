import './Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Therapist = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;

    const [therapistName, setTherapistName] = useState("");
    const [newName, setNewName] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newYears, setNewYears] = useState("");
    const [newAvail, setNewAvail] = useState("");

    const [allData, setAllData] = useState([]);
    const [therapistData, setTherapistData] = useState(null);

    const [search, setSearch] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updName, setUpdName] = useState(false);
    const [updTitle, setUpdTitle] = useState(false);
    const [updEmail, setUpdEmail] = useState(false);
    const [updLocation, setUpdLocation] = useState(false);
    const [updYears, setUpdYears] = useState(false);
    const [updAvail, setUpdAvail] = useState(false);

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const displaySearch = () => {
        setShowSearch(true);
        setShowAdd(false);
        setSuccessMessage(null);
        setError(null);
    }

    const callSearch = () => {
        getTherapist();
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
        addTherapist();
        getAllTherapists();
        setShowAdd(false);
    }

    const takingClients = () => {
        setNewAvail("TAKING CLIENTS");
    }

    const notTakingClients = () => {
        setNewAvail("NOT TAKING CLIENTS");
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

    const callUpdTitle = () => {
        setShowUpdate(false);
        setUpdTitle(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callTitleUpdate = () => {
        updateTitle();
        setUpdTitle(false);
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

    const callUpdLocation = () => {
        setShowUpdate(false);
        setUpdLocation(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callLocationUpdate = () => {
        updateLocation();
        setUpdLocation(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdYears = () => {
        setShowUpdate(false);
        setUpdYears(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callYearsUpdate = () => {
        updateYears();
        setUpdYears(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const callUpdAvail = () => {
        setShowUpdate(false);
        setUpdAvail(true);
        setSuccessMessage(null);
        setError(null);
    }

    const callAvailUpdate = () => {
        updateAvailability();
        setUpdAvail(false);
        setShowUpdate(false);
        setShowSearch(true);
    }

    const resetStates = () => {
        setNewName("");
        setTherapistName("");
        setNewTitle("");
        setNewEmail("");
        setNewLocation("");
        setNewYears("");
        setNewAvail("");
    }

    const resetPage = () => {
        setTherapistData(null);
        setShowSearch(false);
        setShowAdd(false);
        setShowUpdate(false);
        setSuccessMessage(null);
        setError(null);
        getAllTherapists();
    }

    const getAllTherapists = async () => {
        try {
            setError(null);
            const response = await axios.get(`${VITE_URL}/therapists`);
            setAllData(response.data);
        } catch (err) {
            console.error("Error fetching therapists:", err);
            setAllData([]);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const getTherapist = async () => {
        resetStates();

        try {
            setError(null);
            const response = await axios.get(`${VITE_URL}/therapists/name/${encodeURIComponent(therapistName)}`);
            console.log(response.data);
            setTherapistData(response.data);
        } catch (err) {
            console.error("Error fetching therapist:", err);
            setTherapistData(null);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const addTherapist = async () => {
        resetStates();

        try {
            setError(null);
            const response = await axios.post(`${VITE_URL}/therapists`, {
                Name: newName,
                Title: newTitle,
                Email: newEmail,
                Location: newLocation,
                YearsOfPractice: newYears,
                Availability: newAvail
            });
            setSuccessMessage(response.data.message);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const deleteTherapist = async () => {
        resetStates();
    
        try {
            setError(null);
            const response = await axios.delete(`${VITE_URL}/therapists/name/${encodeURIComponent(therapistData.Name)}`);
            console.log(response.data);
            setSuccessMessage(response.data.message);
        } catch (err) {
            console.error("Could not delete therapist:", err);
            setTherapistData(null);
            setError(err.response?.data?.message || "An error occurred");
        }

        setTherapistData(null);
    }

    const updateName = async () => {
        console.log(therapistData.Name);
        console.log(newName);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/therapists/name/${encodeURIComponent(therapistData.Name)}`, { newName }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateTitle = async () => {
        console.log(therapistData.Title);
        console.log(newTitle);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/therapists/title/${encodeURIComponent(therapistData.Name)}`, { newTitle }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateEmail = async () => {
        console.log(therapistData.Email);
        console.log(newEmail);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/therapists/email/${encodeURIComponent(therapistData.Name)}`, { newEmail }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateLocation = async () => {
        console.log(therapistData.Location);
        console.log(newLocation);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/therapists/location/${encodeURIComponent(therapistData.Name)}`, { newLocation }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateYears = async () => {
        console.log(therapistData.YearsOfPractice);
        console.log(newYears);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/therapists/years/${encodeURIComponent(therapistData.Name)}`, { newYears }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    const updateAvailability = async () => {
        console.log(therapistData.Availability);
        console.log(newAvail);

        try {
            setError(null);
            const response = await axios.patch(`${VITE_URL}/therapists/avail/${encodeURIComponent(therapistData.Name)}`, { newAvail }, { headers: { "Content-Type": "application/json" } });
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        resetStates();
    }

    useEffect(() => {
        getAllTherapists();
    }, []);

    return (
        <div className='navContainer'>
            <nav className='navBar'>
            <button className='navButtons' onClick={resetPage}>Refresh Page</button>
                <button className='navButtons' onClick={() => navigate("/")}>Home</button>
                <button className='navButtons' onClick={() => navigate("/Client")}>Clients</button>
                <button className='navButtons' onClick={() => navigate("/Session")}>Sessions</button>
            </nav>

            <div className='container'>
                <h2 className='header'>Therapists</h2>

                {search && (
                    <div>
                        <button className="buttons" onClick={displaySearch}>Search Therapist</button>
                        <button className="buttons" onClick={disaplayAdd}>Add Therapist</button>
                    </div>
                )}

                {showSearch && (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Therapist Name"
                            className="userInput"
                            value={therapistName}
                            onChange={(e) => setTherapistName(e.target.value)}
                        />
                        <button className="buttons" onClick={callSearch}>Search</button>
                    </div>
                )}

                {therapistData && (
                    <div>
                        <h2 style={{ color: "white" }}>Name: {therapistData.Name}</h2>
                        <p style={{ color: "white" }}>Title: {therapistData.Title}</p>
                        <p style={{ color: "white" }}>Email: {therapistData.Email}</p>
                        <p style={{ color: "white" }}>Location: {therapistData.Location}</p>
                        <p style={{ color: "white" }}>Years of Practice: {therapistData.YearsOfPractice}</p>
                        <p style={{ color: "white" }}>Availability: {therapistData.Availability}</p>
                        <button className="buttons" onClick={callUpdate}>Update Therapist</button>
                        <button className="buttons" onClick={deleteTherapist}>Delete Therapist</button>
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
                            placeholder="Enter Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Location"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Years of Practice"
                            value={newYears}
                            onChange={(e) => setNewYears(e.target.value)}
                        />
                        <div className='dropdown'>
                            <button className='dropbutton'>Set Availability</button>
                            <div className='dropdown-content'>
                                <button className='buttons' onClick={takingClients}>TAKING CLIENTS</button>
                                <button className='buttons' onClick={notTakingClients}>NOT TAKING CLIENTS</button>
                            </div>
                        </div>
                        <button onClick={callAdd}>Add</button>
                    </div>
                )}

                {showUpdate && (
                    <div class='margin'>
                        <button className="buttons" onClick={callUpdName}>Update Name</button>
                        <button className="buttons" onClick={callUpdTitle}>Update Title</button>
                        <button className="buttons" onClick={callUpdEmail}>Update Email </button>
                        <button className="buttons" onClick={callUpdLocation}>Update Location</button>
                        <button className="buttons" onClick={callUpdYears}>Update Years of Practice</button>
                        <button className="buttons" onClick={callUpdAvail}>Update Availability</button>
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

                {updTitle && (
                    <div class='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <button onClick={callTitleUpdate}>Submit</button>
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

                {updLocation && (
                    <div class='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Location"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                        />
                        <button onClick={callLocationUpdate}>Submit</button>
                    </div>
                )}

                {updYears && (
                    <div class='margin'>
                        <input
                            type="text"
                            placeholder="Enter new Years of Practice"
                            value={newYears}
                            onChange={(e) => setNewYears(e.target.value)}
                        />
                        <button onClick={callYearsUpdate}>Submit</button>
                    </div>
                )}

                {updAvail && (
                    <div class='margin'>
                        <div className='dropdown'>
                            <button className='dropbutton'>Set Availability</button>
                            <div className='dropdown-content'>
                                <button className='buttons' onClick={takingClients}>TAKING CLIENTS</button>
                                <button className='buttons' onClick={notTakingClients}>NOT TAKING CLIENTS</button>
                            </div>
                        </div>
                        <button onClick={callAvailUpdate}>Submit</button>
                    </div>
                )}

                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <h1 className='dashHeader'>Current Therapists</h1>
                <div className='dashboard'>
                    <div className='column'>
                        <h2 className='info'>Name</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((therapist, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{therapist.Name}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No therapists found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Title</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((therapist, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{therapist.Title}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No therapists found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Email</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((therapist, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{therapist.Email}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No therapists found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Location</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((therapist, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{therapist.Location}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No therapists found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 className='info'>Years of Practice</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((therapist, index) => (
                                <div key={index} className='column'>
                                    <p className='info'>{therapist.YearsOfPractice}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No therapists found.</p>
                        )}
                    </div>

                    <div className='column'>
                        <h2 style={{ color: "white" }}>Availability</h2>
                        {Array.isArray(allData) && allData.length > 0 ? (
                            allData.map((therapist, index) => (
                                <div key={index} className='column'>
                                    <p style={{ color: "white" }}>{therapist.Availability}</p>
                                </div>
                            ))
                        ) : (
                            <p className='info'>No therapists found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Therapist;
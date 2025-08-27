import './Styles.css';
import NavBar from '../Components/NavBar';

const Home = () => {
    return(
        <div className='container'>
            <h1 className='header' style={{ marginBottom: "10rem" }}>Therapy Client Management</h1>
            <h1 className='header' style={{ fontSize: "2rem" }} id='selectPage'>Select Page</h1>
            <NavBar/>
        </div>
    );
}
export default Home;
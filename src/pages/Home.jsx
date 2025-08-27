import './Styles.css';
import NavBar from '../Components/NavBar';
import { lazy, Suspense } from 'react';
import { animate, motion } from 'framer-motion';
// const Nav = lazy(() => import('../Components/NavBar.jsx'));

const Home = () => {
    return(
        <div className='container'>
            <h1 className='header' style={{ marginBottom: "10rem" }}>Therapy Client Management</h1>
            <h1 className='header' style={{ fontSize: "2rem" }} id='selectPage'>Select Page</h1>
            <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: 2}}>
                <p>Hello!</p>
            </motion.div>
            <NavBar/>
        </div>
    );
}
export default Home;
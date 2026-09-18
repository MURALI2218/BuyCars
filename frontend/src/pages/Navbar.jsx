import { Link } from 'react-router-dom';
import './navbar.css'
import { ACCESS_TOKEN } from '../constant';


function Navbar(){
        const token = localStorage.getItem(ACCESS_TOKEN);

    return (
         <>
            <header className="header">
                <nav className="nav-container">
                    <h2 className="logo">Buy Cars</h2>
                    <div className="nav-links">    
                        <Link className="nav-btn" to='/'>Home</Link>
                        <Link to='/owncarslist' className="nav-btn">Your Cars </Link>
                        <Link className="nav-btn">Profile</Link>
                       
                        {!token && <Link  to='/login' className="nav-btn primary-btn">Login</Link>}
                        {token && <Link to='/logout'>Logout</Link>}
                        
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
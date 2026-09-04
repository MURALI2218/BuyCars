import { Link } from 'react-router-dom';
import './navbar.css'
function Navbar(){
    return (
         <>
            <header className="header">
                <nav className="nav-container">
                    <h2 className="logo">Buy Cars</h2>
                    <div className="nav-links">
                        <Link className="nav-btn" to='/'>Home</Link>
                        <Link to='/owncarslist' className="nav-btn">Your Cars </Link>
                        <Link className="nav-btn">Profile</Link>
                        <Link  to='/login' className="nav-btn primary-btn">Login</Link>
                        <Link to='/logout'>Logout</Link>
                    </div>
                </nav>
            </header>
            
        </>
    )
}

export default Navbar
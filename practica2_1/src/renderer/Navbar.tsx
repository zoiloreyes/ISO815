import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/pull">Apap</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/push">Unapec</Link>
                    </li>
                </ul>
                </div>
            <div className="stocks">
            </div>
            <div className="banco">
            </div>
        </div>
    )
}

export default Navbar
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../NavComponent/NavBar.css'

function NavBar({ user, setUser }) {
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation()

  const isActive = (p) => location.pathname === p;

  const handleLogout = async () => {
    const res = await fetch('http://localhost:9000/user/logout', {
      credentials: 'include',
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const body = await res.json()
    if (body.ok) {
      setUser(null)
      navigate('/')
    }
  }
  return (
    <>
      <header className="Navbar">
        <div className="navbar-container">
          <div className="nav-left">
            <Link to='/' className="brand">
              TIMExZONE
            </Link>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

          <div className={`navbar-center ${menuOpen ? "active" : ""}`}>
            <Link to='/' onClick={() => setMenuOpen(false)}>
              <i className={`fa-solid fa-house-chimney ${isActive("/") ? "active" : ""}`}></i>
            </Link>

            {user && (
              <>
                <Link to="/viewwishlist" onClick={() => setMenuOpen(false)}>
                  <i className={`fa-${isActive("/viewwishlist") ? "solid" : "regular"
                    } fa-heart ${isActive("/viewwishlist") ? "active" : ""}`}></i>
                </Link>
                <Link to="/viewmycart" onClick={() => setMenuOpen(false)}>
                  <i className={`fa-solid fa-cart-shopping ${isActive("/viewmycart") ? "active" : ""}`}></i>
                </Link>
              </>
            )}

            {!user && (
              <>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
                <Link to="/signin" onClick={() => setMenuOpen(false)}>
                  Log in
                </Link>
              </>
            )}
          </div>

          <div className="navbar-right">
            {user && (
              <div className={`dropdown ${openDropdown ? "active" : ""}`}>
                <p className="dropdown-btn" onClick={() => setOpenDropdown(!openDropdown)}><i className="fa-solid fa-user"></i>
                  <span>{user.fullname}</span>
                </p>

                {openDropdown && (
                  <div className="dropdown-content">
                    <button onClick={() => navigate("/confirmedorder")}>
                      Orders
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;

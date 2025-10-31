import React from 'react'
import './Style/Footer.css'

function Footer() {
    return (
        <>
            <div className='footer-wrapper'>
                <div className='footer-content'>
                    <div className='footer-left'>
                        <h4 className='footer-title'>KEEP IN TOUCH</h4>
                        <div className="social-row">
                            <i className="fa-brands fa-square-instagram">
                                <a href="https://www.instagram.com/a.arjuuun?igsh=bmY0cHh4dW00aHls"></a>
                            </i>
                            <i className="fa-brands fa-linkedin">
                                <a href="https://www.linkedin.com/in/arjun-a-883889266/"></a>
                            </i>
                            <i className="fa-brands fa-github">
                                <a href='https://github.com/arjoonn'></a>
                            </i>
                        </div>
                    </div>
                    <div className='footer-right'>
                        <h4 className='footer-title'>CONTACT ME</h4>
                        <p className="footer-contact">+91 6282818654</p>
                        <p className="footer-contact">arjuchempully@gmail.com</p>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <p>© TIMExZONE</p>
                </div>
            </div>
        </>
    )
}

export default Footer
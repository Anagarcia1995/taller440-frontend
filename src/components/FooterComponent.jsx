import React from "react";
import "../styles/footer.css";

const FooterComponent = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* === IZQUIERDA === */}
        <div className="footer-left">
          <div className="footer-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="black" />
              <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="16" fill="none" />
              <path d="M50,100 Q100,50 150,100" stroke="white" strokeWidth="12" fill="none" />
            </svg>
            <h2>Taller440</h2>
          </div>
          <p className="footer-subtext">Buy tickets for events</p>
        </div>

        {/* === CENTRO === */}
        <div className="footer-center">
          <ul className="footer-info-grid">
            <li>Entry Policy</li>
            <li>Safer Spaces</li>
            <li>No Photo Policy</li>
            <li>Store Returns</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        {/* === DERECHA === */}
        <div className="footer-right">
          <p>xxxx xxxx xxxx XXXXX</p>
          <p>info@taller440.com</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YouTube" />
            </a>
            <a href="https://www.soundcloud.com" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/soundcloud.png" alt="SoundCloud" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/tiktok--v1.png" alt="TikTok" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">© {new Date().getFullYear()} Taller440. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;

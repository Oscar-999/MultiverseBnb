import React from 'react';
import './SpotInfoFooter.css';

const SpotInfoFooter = () => {
  return (
    <footer className="spot-details-footer">

      <div className="footer-links">

        <div className="footer-column">
          <h5>Support</h5>
          <ul>
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Supporting people with disabilities</li>
            <li>Cancellation options</li>
            <li>Our COVID-19 Response</li>
            <li>Report a neighborhood concern</li>

          </ul>
        </div>

        <div className="footer-column">
          <h5>Community</h5>
          <ul>
            <li>Airbnb.org: disaster relief housing</li>
            <li>Combating discrimination</li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Hosting</h5>
          <ul>
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Explore hosting resources</li>
            <li>Visit our community forum</li>
            <li>How to host responsibly</li>
            <li>Airbnb-friendly apartments</li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Airbnb</h5>
          <ul>
            <li>Newsroom</li>
            <li>Learn about new features</li>
            <li>Letter from our founders</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Gift cards</li>
          </ul>
        </div>
      </div>

      <div className="footer-section">
        <li>&copy; {new Date().getFullYear()} OscarAlcantar, Inc.</li>
        <li>
          <a href="https://github.com/Oscar-999"><i class="fa-brands fa-github"></i></a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/oscar-alcantar-800313204/"><i class="fa-brands fa-linkedin"></i></a>
        </li>
        <li>Terms</li>
        <li>Sitemap</li>
        <li>Privacy</li>
        <li>Your Privacy Choices</li>
        <li>Destinations</li>
        <li>English (US)</li>
        <li>$ USD</li>
        <li>Support & resources</li>
      </div>
    </footer>
  );
};

export default SpotInfoFooter;

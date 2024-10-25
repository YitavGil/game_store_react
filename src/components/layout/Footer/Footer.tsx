import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.title}>GameVault</h3>
          <p className={styles.description}>
            Your ultimate destination for digital gaming adventures.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>
              <span>Discord</span>
            </a>
            <a href="#" className={styles.socialIcon}>
              <span>Twitter</span>
            </a>
            <a href="#" className={styles.socialIcon}>
              <span>Twitch</span>
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Quick Links</h4>
          <nav className={styles.links}>
            <Link to="/about">About</Link>
            <Link to="/genres">Genres</Link>
            <Link to="/deals">Deals</Link>
            <Link to="/new-releases">New Releases</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtitle}>Support</h4>
          <nav className={styles.links}>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </nav>
        </div>

        <div className={styles.newsletter}>
          <h4 className={styles.subtitle}>Join Our Newsletter</h4>
          <form className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {currentYear} GameVault. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

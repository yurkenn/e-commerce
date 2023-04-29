import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './styles.module.css';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    await logout(() => {
      history.push('/signin');
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Product</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="blue">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="blue">Register</Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link to="/profile">
              <Button colorScheme="blue">Profile</Button>
            </Link>
            <Link to="/logout">
              <Button onClick={handleLogout} colorScheme="blue">
                Logout
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

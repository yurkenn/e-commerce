import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './styles.module.css';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { useBasket } from '../../context/BasketContext';

const Navbar = () => {
  const history = useHistory();

  const { loggedIn, logout, user } = useAuth();
  const { items } = useBasket();

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
            <Link to="/">Laptops</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="blue" variant="outline">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="blue" variant="outline">
                Register
              </Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin">
                <Button colorScheme="pink" variant="outline">
                  Admin
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button marginRight={1} variant="outline" colorScheme="blue">
                Profile
              </Button>
            </Link>
            <Link to="/logout">
              <Button onClick={handleLogout} variant="outline" colorScheme="blue">
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


import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/album">Album</Link>
          </li>
          <li>
            <Link to="/album/review">Reviews</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

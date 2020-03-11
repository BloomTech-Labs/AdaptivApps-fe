import React from 'react';
import { theme } from 'adaptiv-ui';
import { Link } from '@reach/router';
import './styles.css';

const NavLink = props => {
  return (
    <Link
      className="nav-link"
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent ? 'white' : theme.primary,
            background: isCurrent ? theme.primary : 'white',
          },
        };
      }}
    />
  );
};

export default NavLink;

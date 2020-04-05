import React from 'react';
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
            width: '100%',
            marginLeft: '0',
            color: isCurrent ? 'white' : '#2962FF',
            background: isCurrent ? '#2962FF' : 'white',
          },
        };
      }}
    />
  );
};

export default NavLink;

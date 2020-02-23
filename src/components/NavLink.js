import React from 'react'
import { theme, Linkton } from 'adaptiv-ui'

const NavLink = props => {
  return (
    <Linkton
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent ? "white" : theme.primary,
            background: isCurrent ? theme.primary : "white"
          }
        };
      }}
    />
  )
}

export default NavLink
import React, { useState, useEffect } from 'react';
import NavLink from '../SideNav/NavLink';
// Import stylings
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  search: {
    width: "100%",
    height: "40px",
    padding: "0 10px",
    border: "1px solid rgb(223, 223, 223)",
    fontSize: "1.6rem"
  },
  item: {
    display: "inline-block",
    overflow: "hidden",
    width: "100%",
    padding: "8px 10px",
    fontSize: "1.6rem",
    lineHeight: "1.6rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "#FFCC01",
      color: "white"
    }
  },
  empty: {
    backgroundColor: "orange"
  },
});

export default function Dropdown(props) {
  const classes = useStyles();
  const { profilesData, setTitle, keyword, setKeyword, toggleList } = props;
  const [tempList, setTempList] = useState(profilesData);

  const handleChange = e => {
    setKeyword(e.target.value.toLowerCase());
  }

  const handleSelect = item => {
    setTitle(item.firstName);
  }

  useEffect(() => {
    const results = profilesData?.filter(profile =>
      profile?.name.toLowerCase().includes(keyword)
    ).sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })
    setTempList(results)
  }, [profilesData, keyword, setKeyword])

  return (
    <div>
      <input
        className={classes.search}
        placeholder="Search users and organizations"
        onChange={handleChange}
      />
      <div>
        {
          tempList.map(item =>
            <NavLink to={`/user/${item.username}`} key={item.id}>
              <button
                type="button"
                key={item.id}
                className={classes.item}
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </button>
            </NavLink>
          )
        }
        {
          tempList.length < 1 && <div className={`${classes.item} ${classes.empty}`}>No results</div>
        }
      </div>
    </div >
  )
}
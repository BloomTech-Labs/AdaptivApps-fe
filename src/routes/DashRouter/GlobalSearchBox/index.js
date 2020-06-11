import React, { useState } from "react";
// Components import
import DropDown from './Dropdown';
// Query imports
import { useQuery } from "react-apollo";
import { GET_PROFILES } from './queries';
// Styling imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    wrapper: {
        position: "relative",
        width: "250px",
        userSelect: "none",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        border: "1px solid rgb(223, 223, 223)",
        borderRadius: "3px",
        backgroundColor: "white",
        lineHeight: "38px",
        cursor: "default",
        width: "100%",
        fontSize: "2.4rem"
    },
    title: {
        margin: "2px 20px",
        marginRight: "30px",
        fontWeight: 300
    },
    icons: {
        marginRight: "20px",
        color: "black"
    }
});

const GlobalSearchBox = () => {
    const classes = useStyles();
    const [listOpen, setListOpen] = useState(false);
    const [title, setTitle] = useState("Search User");
    const [keyword, setKeyword] = useState("");
    const { data, loading, error } = useQuery(GET_PROFILES);

    if (loading) return <p>{loading}</p>;
    if (error) return <p>{error}</p>;

    const toggleList = () => {
        setListOpen(!listOpen);
        setKeyword("")
    }

    return (
        <div className={classes.wrapper}>
            <button type="button" className={classes.header} onClick={() => toggleList()}>
                <div className={classes.title}>{title}</div>
                {listOpen
                    ? <FontAwesomeIcon icon={faAngleUp} className={classes.icons} />
                    : <FontAwesomeIcon icon={faAngleDown} className={classes.icons} />}
            </button>
            {listOpen && (
                <DropDown profilesData={data.profiles} setTitle={setTitle} keyword={keyword} setKeyword={setKeyword} toggleList={toggleList} />
            )}
        </div>
    )
}

export default GlobalSearchBox;
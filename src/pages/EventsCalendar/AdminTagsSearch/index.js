import React, { useState, useEffect } from "react";
// Components import
import Dropdown from './Dropdown';
import SearchEventList from './SearchEventList';
// Query imports
import { useQuery } from "react-apollo";
import { GET_TAGS } from './queries';
import { GET_EVENT_LIST } from "../queries";
// Styling imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    },
    loadingSpinner: {
        position: "absolute",
        top: "50%",
        right: "50%",
        color: "#2763FF",
    },
});

const AdminTagsSearch = props => {
    const classes = useStyles();
    const [listOpen, setListOpen] = useState(false);
    const [numSelected, setNumSelected] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const { isSearching, setIsSearching } = props;
    const { data, loading, error } = useQuery(GET_TAGS);
    const { data: eventsData, loading: eventsLoading, error: eventsError, refetch } = useQuery(GET_EVENT_LIST);

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return <p>{error}</p>;
    if (eventsLoading) return <CircularProgress className={classes.loadingSpinner} />;
    if (eventsError) return <p>{eventsError}</p>;

    const toggleList = () => {
        setListOpen(!listOpen);
        setIsSearching(!isSearching);
        setKeyword("")
    }

    let eventsList = eventsData?.events;

    const filterEvents = events => {
        let tempEventsList = [];
        for (let i = 0; i < events.length; i++) {
            const tags = events[i].tags.split(", ");
            for (let j = 0; j < selectedTags.length; j++) {
                if (tags.includes(selectedTags[j])) {
                    tempEventsList.push(events[i]);
                    break;
                }
            }
        }
        return tempEventsList;
    }

    if (eventsList && selectedTags.length > 0) {
        eventsList = filterEvents(eventsList);
    }

    return (
        <div>
            <div className={classes.wrapper}>
                <button type="button" className={classes.header} onClick={() => toggleList()}>
                    {!isSearching
                        ? <div className={classes.title}>Select Tags</div>
                        : <div className={classes.title}>{numSelected} Tags Selected</div>
                    }
                    {listOpen
                        ? <FontAwesomeIcon icon={faAngleUp} className={classes.icons} />
                        : <FontAwesomeIcon icon={faAngleDown} className={classes.icons} />}
                </button>
                {listOpen && (
                    <Dropdown
                        tagsData={data.tags}
                        keyword={keyword}
                        setKeyword={setKeyword}
                        setIsSearching={setIsSearching}
                        setNumSelected={setNumSelected}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                )}
            </div>
            {isSearching
                ?
                <SearchEventList
                    eventsList={eventsList}
                    refetch={refetch}
                />
                : null}
        </div>
    )
}

export default AdminTagsSearch;
import React, { useState, useEffect } from 'react';
// Import stylings
import { makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
    }
});

export default function Dropdown(props) {
    const classes = useStyles();
    const { tagsData, keyword, setKeyword, setIsSearching, setNumSelected, selectedTags, setSelectedTags } = props;
    const [tempList, setTempList] = useState(tagsData);

    const handleChange = e => {
        setKeyword(e.target.value.toLowerCase());
    }

    const handleSelect = item => {
        setIsSearching(true);
        if (item.selected) {
            item.selected = false;
            let newTags = [];
            for (let i = 0; i < selectedTags.length; i++) {
                if (selectedTags[i].toLowerCase() !== item.name.toLowerCase()) {
                    newTags.push(selectedTags[i]);
                }
            }
            setSelectedTags(newTags);
        } else {
            item.selected = true;
            setSelectedTags([...selectedTags, item.name]);
        }
        const length = tagsData.filter(item => item.selected).length;
        setNumSelected(length);
    }

    useEffect(() => {
        const results = tagsData?.filter(tag =>
            tag.name.toLowerCase().includes(keyword)
        ).sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        setTempList(results)
    }, [tagsData, keyword, setKeyword])

    return (
        <div>
            <input
                className={classes.search}
                placeholder="Search by tags"
                onChange={handleChange}
            />
            <div>
                {
                    tempList.map(item =>
                        <button
                            type="button"
                            key={item.id}
                            className={classes.item}
                            onClick={() => handleSelect(item)}
                        >
                            {item.name}
                            {' '}
                            {item.selected && <FontAwesomeIcon icon={faCheck} />}
                        </button>
                    )
                }
                {
                    tempList.length < 1 && <div className={`${classes.item} ${classes.empty}`}>No results</div>
                }
            </div>
        </div >
    )
}
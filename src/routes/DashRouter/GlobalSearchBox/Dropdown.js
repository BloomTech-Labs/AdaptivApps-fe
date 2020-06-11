import React, { useState, useEffect } from 'react';

export default function Dropdown(props) {
    const { profilesData, setTitle, keyword, setKeyword, toggleList } = props;
    const [tempList, setTempList] = useState(profilesData);

    const filterList = e => {
        setKeyword(e.target.value.toLowerCase());
        if (keyword.length) {
            setTempList(profilesData.filter(item => (
                item.firstName.toLowerCase().includes(keyword)
            )))
            // .sort((a, b) => {
            //     if (a.firstName < b.firstName) { return -1; }
            //     if (a.firstName > b.firstName) { return 1; }
            //     return 0;
            // })
            console.log(keyword)

        }
    }

    const handleChange = e => {
        setKeyword(e.target.value.toLowerCase());
    }

    const handleSelect = item => {
        setTitle(item.firstName);
        toggleList();
    }

    useEffect(() => {
        const results = profilesData?.filter(profile =>
            profile.firstName.toLowerCase().includes(keyword)
        )
        console.log(results)

        setTempList(results)
    }, [profilesData, keyword, setKeyword])

    return (
        <div>
            <input
                onChange={handleChange}
            />
            {
                tempList.map(item =>
                    <button
                        type="button"
                        key={item.id}
                        onClick={() => handleSelect(item)}
                    >
                        {item.firstName}
                    </button>
                )
            }
        </div>
    )
}
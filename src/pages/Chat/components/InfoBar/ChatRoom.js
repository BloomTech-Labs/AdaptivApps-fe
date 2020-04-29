import React, {useState} from 'react'

export default function ChatRoom({chatRoom}) {
    const [messageToggle, setMessageToggle] = useState(false);

    const participants = chatRoom.participants.map((participant, id) => {return participant.displayName})

    const handleClick = e => {
        e.preventDefault();
        messageToggle ? setMessageToggle(false) : setMessageToggle(true)
    }

    return (
        <>
            <button onClick={handleClick}>{participants}</button>
            {messageToggle ? (
            <div className='chats-open'>
              Chat Open
            </div>
          ) : (
            <div className='chats-close'>
              Choose a message to display
            </div> )}
        </>
    )
}

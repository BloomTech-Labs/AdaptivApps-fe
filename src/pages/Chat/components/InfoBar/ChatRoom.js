import React, {useState} from 'react'
import Messages from '../Messages/Messages'

export default function ChatRoom({chatRoom, user}) {
    const [messageToggle, setMessageToggle] = useState(false);

    const participants = chatRoom.participants.map((participant, id) => (participant.email !== user.email && participant.displayName))

    const handleClick = e => {
        e.preventDefault();
        messageToggle ? setMessageToggle(false) : setMessageToggle(true)
    }

    return (
        <>
            <button onClick={handleClick}>{participants}</button>
            {messageToggle ? (
            <div className='chats-open'>
              <Messages chatRoom={chatRoom} />
            </div>
          ) : (
            <div className='chats-close'>
              Choose a message to display
            </div> )}
        </>
    )
}

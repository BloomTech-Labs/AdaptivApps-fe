import React, {useState} from 'react'
import Chatroom from '../InfoBar/ChatRoom'
import Messages from '../Messages/Messages'

export default function NewMessage({NewMessage, user}) {
    const [ChatToggle, setChatToggle] = useState(false);
    const getChatRooms = getChatRooms.map((email) => (participant.email !== user.email && participant.displayName))
    const participants = chatRoom.participants.map((participant, id) => (participant.email !== user.email && participant.displayName))

    const handleClick = e => {
        e.preventDefault();
        newMessageToggle ? setnewMessageToggle(false) : setnewMessageToggle(true)
    }

    return (
        <>
            <button onClick={handleClick}>{getparticipants}</button>
            {messageToggle ? (
            <div className='chats-open'>
              <Messages chatRoom={chatRoom} />
            </div>
          ) : (
            <div className='chats-close'>
              Choose a contact
            </div> )}
        </>
    )
}
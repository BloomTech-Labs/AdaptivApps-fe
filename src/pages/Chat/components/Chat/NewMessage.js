import React, {Component, useState} from 'react'
import Chatroom from '../InfoBar/ChatRoom'
import Messages from '../Messages/Messages'
import InfoBar from '../InfoBar/InfoBar'

export default function NewMessage({NewMessage, user}) {
    // const [newMessageToggle, setnewMessageToggle] = useState(false);
    // const getChatRooms = getChatRooms.map((email) => (participant.email !== user.email && participant.displayName))
    // const participants = chatRoom.participants.map((participant, id) => (participant.email !== user.email && participant.displayName))

    const handleClick = e => {
        e.preventDefault();
        console.log ('button submit')
        newMessageToggle ? setnewMessageToggle(false) : setnewMessageToggle(true)
    }
    

    return (
        // <>
            
        //     {newMessageToggle ? (
        //     <div className='chats-open'>
        //       <Messages chatRoom={chatRoom} />
        //     </div>
        //   ) : (
        //     <div className='chats-close'>
        //       Choose a contact
        //     </div> )}
        // </>)
}
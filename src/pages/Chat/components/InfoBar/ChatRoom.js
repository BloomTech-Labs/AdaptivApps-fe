import React from 'react'

export default function ChatRoom({chatRoom}) {

    const participants = chatRoom.participants.map((participant, id) => {return participant.displayName})


    return (
        <div>
            <button>{participants}</button>
        </div>
    )
}

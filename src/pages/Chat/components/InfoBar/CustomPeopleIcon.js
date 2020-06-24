import React from 'react';

const CustomPeopleIcon = ({ chattingIcon, setEditChatRoom }) => {
  return (
    <div onClick={() => setEditChatRoom(true)} aria-label="Delete selected Chatroom">
      <img src={chattingIcon} alt="icon for user" style={{ width: "20px", height: "20px" }} />
    </div>
  )
}

export default CustomPeopleIcon;
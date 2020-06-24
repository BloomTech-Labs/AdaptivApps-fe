import React from 'react';

const CustomPeopleIcon = ({ chattingIcon, setEditChatRoom }) => {
  return (
    <div onClick={() => setEditChatRoom(true)} aria-label="Delete selected Chatroom">
      <img src={chattingIcon} alt="icon for user" style={{ marginRight: "8px", marginLeft: "12px", width: "22px", height: "22px", borderRadius: "50%" }} />
    </div>
  )
}

export default CustomPeopleIcon;
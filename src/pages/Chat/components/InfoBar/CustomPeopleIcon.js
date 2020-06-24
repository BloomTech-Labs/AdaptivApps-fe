import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const CustomPeopleIcon = ({ chattingIcon, setEditChatRoom }) => {
  return (
    <Tooltip title="Delete selected Chatroom">
      <div onClick={() => setEditChatRoom(true)}>
        <img src={chattingIcon} alt="icon for user" style={{ marginRight: "8px", marginLeft: "12px", width: "22px", height: "22px", borderRadius: "50%" }} />
      </div>
    </Tooltip>
  )
}

export default CustomPeopleIcon;
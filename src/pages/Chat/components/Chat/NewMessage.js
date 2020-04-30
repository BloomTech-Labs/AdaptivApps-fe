import React, {Component, useState} from 'react'
import Chatroom from '../InfoBar/ChatRoom'
import Messages from '../Messages/Messages'
import InfoBar from '../InfoBar/InfoBar'

class NewMessages extends Component 
{
  constructor(props)
  {
    super(props)
    this.state = {}
  }
  scrollToBottom() 
  {
  	l('scrollToBottom', this.end.scrollIntoView)
  this.end.scrollIntoView({ behavior: "smooth" })
  }

	componentDidMount() 
	{
		l('componentDidMount')
	  this.scrollToBottom()
	}

	componentDidUpdate() 
	{
		l('componentDidUpdate')
	  this.scrollToBottom()
	}
  render() 
  {
  	var {loading, error, messages} = this.props.data
  	l(this.props.data)
    return (
    	<div>
    		{loading && <ListItem> <CircularProgress /> </ListItem>}
    		{error && <ListItem primaryText='Error' secondaryText={error.message} />}
    		{messages && messages.map( ({text, id, user}) => <ListItem key = {id} primaryText={text} secondaryText={user ? user.name : 'Server'} />)}
    		<div style={{ float:"left", clear: "both" }} ref = {ref => this.end = ref} /> 					
    	</div>
    	)
    
  }
}

const messagesListQuery = gql`
   query MessagesQuery {
     messages {
       id
       text
       user{
       	name
       }
     }
   }
 `

 const NewMessages = graphql(messagesListQuery, {options: { pollInterval: 1000 }})(Messages)

 export default NewMessages


// export default function NewMessage({NewMessage, user}) {
//     const [newMessageToggle, setnewMessageToggle] = useState(false);
//     const getChatRooms = getChatRooms.map((email) => (participant.email !== user.email && participant.displayName))
//     const participants = chatRoom.participants.map((participant, id) => (participant.email !== user.email && participant.displayName))
//     const handleClick = e => {
//         e.preventDefault();
//         console.log ('button submit')
//         newMessageToggle ? setnewMessageToggle(false) : setnewMessageToggle(true)
//     }
//     return (
//         <>
            
//             {newMessageToggle ? (
//             <div className='chats-open'>
//               <Messages chatRoom={chatRoom} />
//             </div>
//           ) : (
//             <div className='chats-close'>
//               Choose a contact
//             </div> )}
//         </>)}
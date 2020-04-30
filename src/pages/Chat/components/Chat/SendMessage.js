import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

let l = console.log

class MessageSender extends Component {
  constructor(props)
  {
    super(props)
    this.state = {textValue: ''}
  }
  render() 
  {
  	var {mutate, user, logedIn} = this.props
  	var {textValue} = this.state
    return(
    	<ListItem disabled = {true} >
			<TextField disabled = {!logedIn || user == ''} style = {{width: '90%'}} hintText={user ? "Type Message as "+user : "Type Message"} value = {textValue} onChange = {(e, value) => this.setState({textValue: value})}/>
			<FloatingActionButton mini = {true} onClick = { _ => {
				if(textValue)
				{
					mutate({
						variables: {text: textValue, user},
						refetchQueries: [{query: messagesListQuery}]
					})
					this.setState({textValue: ''})
				}
			}}>
		    	<i className="material-icons">send</i>
		    </FloatingActionButton>
		</ListItem>
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
const messageSenderMutation = gql`
mutation messageSenderMutation($text: String!, $user: String)
{
 sendMessage(text: $text, user: $user)
 {
   id
   text
 }
}
`
const MessageSender = graphql(messageSenderMutation)(MessageSender)

export default MessageSender
const Messages = async ({ chatRoom, subscribeToMore }) => {

  useEffect(() => {
     const messages = subscribeToMore({
      document: CHAT_ROOM_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        console.log('sub data', subscriptionData.data)
        
        return {
          messages: [
            ...prev.messages,
            subscriptionData.data.messageCreated,
          ],
        };
      },
    })
  }, [])
  
  

    return (
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.content}</li>
        ))}
        
      </ul>
    )}





function ChatFeature(){
  const { user } = useAuth0();
  const { data, loading, error, subscribeToMore} = useQuery(GET_CHAT_ROOM_MESSAGES, { variables: { email: user.email } })
 
  if (!data) {
    return null;
  }

  if (loading) {
    return <span>Loading ...</span>;
  }
  
 
  return (
    <div>
      <InfoBar user={user} />
      <Messages
          messages={data.chats}
          subscribeToMore={subscribeToMore}
        />
      <TextContainer />
    </div>
  )
}

export default ChatFeature;





function InfoBar({ user }) {
    const classes = useStyles();
    const { loading, error, data, refetch } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });

    // refetches CHAT_ROOMS without refreshing page
    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    if (error) return `Error! ${error.message}`;
  
    return (
      <div>
          <h1>Messages</h1>
          <Button>New Message</Button>
          {/* {user && user[config.roleUrl].includes("Admin") ? (
              <> */}
          <Button>New Annoucement</Button>
          {/* </>
          ): null} */}
          <div>
          {data &&
          data?.profile.chatRooms?.map((chatRoom, id) => (
          <ChatRoom chatRoom={chatRoom} key={id} user={user}/>
          ))
          }
          </div>
      </div>
    )
}

export default InfoBar;
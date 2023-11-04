import AgoraRTM, { RtmClient, RtmMessage } from "agora-rtm-sdk";
import { useEffect, useRef, useState } from "react";

let USER_ID = Math.floor(Math.random() * 232);
let token : string | undefined;
export default function useAgorachat(client: RtmClient, channelName: string) {
  const [joinState, setJoinState] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);
  let display_name = sessionStorage.getItem("display_name");
  let roomName = sessionStorage.getItem("room_name");
  const [displayName, setDisplayName] = useState(display_name);
  console.log(typeof(displayName));
  console.log(display_name);
  
  console.log(displayName);
  const [membersPaticipate, setMembersPaticipate] = useState<any>([]);
  
  
  const channel = useRef(client.createChannel(channelName)).current;
  const lobbyChannel = useRef(client.createChannel('lobby')).current;

  let leaveChannel = async () => {
    await channel.leave(); 
  }

  window.addEventListener('beforeunload', leaveChannel);
  // useEffect((() => {
   
  //   let display_name = sessionStorage.getItem("display_name");
  //   setDisplayName(display_name);
  // }), [displayName])
  
  //console.log(displayName);
  
  const handleAddMember = async (memberId: string) => {
    let {name} = await client.getUserAttributesByKeys(memberId, ['name']);    
    setMembersPaticipate((pre: any) => ([...pre, { memberId, name}]));  
  }

  const initRm = async () => {
    await client?.login({
      uid: USER_ID.toString(),
      token
    });
    await channel.join();

    try {
      let attributes = await client.getChannelAttributesByKeys(channelName, ['room_name']);
      roomName = attributes.room_name.value;
    } catch (error) {
      await client.setChannelAttributes(channelName, {'room_name': roomName as string, 'host': displayName as string})
    }
    await lobbyChannel.join();
    displayName && await client.setLocalUserAttributes({
          name: displayName,
    });
    console.log(displayName);
    
    channel.getMembers()
    .then((data) => {
      for(let item of data) {
        console.log("hahaha");
        
        handleAddMember(item);
      }
    })
    
    .catch((err) => {console.log(err);
    })
    

  };
  useEffect(() => {
    initRm();
  }, [USER_ID]);

  useEffect(() => {
    const getParticipants = async () => {
      try {
        let participants = await channel.getMembers();
        console.log(participants); 
        if(participants.length <= 1) {
          let lobbyMembers = await lobbyChannel.getMembers();
          for(let i = 0; i < lobbyMembers.length; i++) {
            console.log("hohoHoHO");
            
            await client.sendMessageToPeer({text: JSON.stringify({'room': channelName, 'type':'room_added'})}, lobbyMembers[i]);
          }
        }
      } catch (error) {
        console.log("hhehehe");  
      }
       
      
    }
    const timer = setTimeout(() => {
      getParticipants();
    }, 2000)
    return () => clearTimeout(timer);
  }, [channel, lobbyChannel])

  useEffect(() => {
    
    async function handleMessageReceived(messageData: RtmMessage, uid: string) {
      //let user = await client.getUserAttributes(uid);
      let data = JSON.parse(messageData.text as string);
      console.log(data);
      if (messageData.messageType === "TEXT") {
        let newMessageData = { 
          userId: uid, 
          message: data.message,
          displayName: data.displayName
           
        };
        setMessages((pre:any) => ([...pre, newMessageData]))
      }
    }
    const handleAddMember = async (memberId: string) => {
      console.log(memberId);      
      let { name } = await client.getUserAttributesByKeys(memberId, ['name']);
      console.log(name);    
      setMembersPaticipate((pre: any) => ([...pre, { memberId, name}]));  
    }

    const handleUserLeft = async (memberId: string) => {
      console.log(memberId);
      setMembersPaticipate((pre: any) => {
        return pre?.filter((item: any) => item.memberId !== memberId);
        
      })
    }
    const numberOfUser = async (sum: number) => {
      console.log(sum);
      
    }
    const MessageFromLobby = async (memberId: string) => {
      console.log("memeber called room");
      let participants = await channel.getMembers();
     
      console.log(participants[0]);
      console.log(USER_ID);
      await client.sendMessageToPeer({text: JSON.stringify({'room': channelName, 'type':'room_added'})}, memberId);
      // if(participants[0] === USER_ID.toString()) {
      //   let lobbyMembers = await lobbyChannel.getMembers();
      //   for(let i = 0; i < lobbyMembers.length; i++) {
          
      //     client.sendMessageToPeer({text: JSON.stringify({'room': channelName, 'type':'room_added'})}, lobbyMembers[i]);
      //   }
      // }
    }

    channel.on("MemberJoined", handleAddMember);
    channel.on("ChannelMessage", handleMessageReceived);
    channel.on("MemberLeft", handleUserLeft);
    channel.on("MemberCountUpdated", numberOfUser);
    lobbyChannel.on("MemberJoined", MessageFromLobby);
    // channel.on("ChannelMessage", async (data, uid) => {
    //   await handleMessageReceived(data, uid);
    // });
    
    return () => {
      channel.off("MemberJoined", handleAddMember);
      channel.off("ChannelMessage", handleMessageReceived);
      channel.off("MemberLeft", handleUserLeft);
      channel.off("MemberCountUpdated", numberOfUser);
      lobbyChannel.off("MemberJoined", MessageFromLobby);

      
    }
  }, [channel, lobbyChannel, client]);
  
  async function sendChannelMessage(text: string) {
    console.log(text);

    channel
      .sendMessage({ text: JSON.stringify({'message': text, 'displayName': displayName}) })
      .then(() => {
        let newMessageData =  {
          userId: USER_ID,
          message: text,
          displayName: displayName
        }
        setMessages((pre:any) => ([...pre, newMessageData]))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // useEffect(() => {
  //   if (currentMessage) setMessages([...messages, currentMessage]);
  // }, [currentMessage]);
  
  console.log(messages);
  console.log(membersPaticipate);
  
  
  
  return { messages, sendChannelMessage, membersPaticipate };
}

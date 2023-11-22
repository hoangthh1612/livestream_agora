
import React, { useEffect, useRef, useState } from 'react'
import useAgora from '../../hooks/useAgora';
import { Link } from 'react-router-dom';
import AgoraRTM from 'agora-rtm-sdk';



let token: string | undefined;
let uid = String(Math.floor(Math.random()*1232));
const APP_ID="b8c5abca5a9a4fbc987e2efe3bb374c6"

const chatClient = AgoraRTM.createInstance(APP_ID);

type RoomType = {
  roomId: string,
  members: number,
  hostName: string,
  roomName: string
}

const Lobby = () => {
  const [roomsData, setRoomsData] = useState<RoomType[]>([] as RoomType[]);
  
  // const { chatClient } = useAgora();

  const lobbyChannel = useRef(chatClient.createChannel('lobby')).current;
  const initRTM = async () => {
    await chatClient.login({uid, token});
    await lobbyChannel.join();
    
    lobbyChannel.getMembers()
    .then((data) => console.log(data))
    .catch(err => {
      console.log(err);
      
    })
  }
  useEffect(() => {
    initRTM();
  }, [uid])
  const checkHeartBeat = async (roomsData: RoomType[]) => {
    console.log("Checking hearbeat....");
    let rooms_all = roomsData;
    console.log(rooms_all);
    console.log(roomsData);
    
    
    
    for(let room of rooms_all){
      let {roomId, members} = room;
      console.log(roomId);
      
      let count = await chatClient.getChannelMemberCount([roomId]);
      console.log(count);
      
      if(count[roomId] < 1) {
        setRoomsData((pre) => {
          return pre.filter((room) => room.roomId !== roomId)
        })
      }
      else {
        console.log("set room data");
        
        setRoomsData((pre) => {
          return pre?.map((item) => {
            if(item.roomId === roomId) {
              return {...item, members: count[roomId]}
            }
            return item
          })
        })
      }   
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      checkHeartBeat(roomsData);
    }, 1500);
    return () => {
      clearInterval(interval);
    }
  }, [roomsData, chatClient, lobbyChannel])

  const getRooms = async (roomId: string) => {
    let attributes = await chatClient.getChannelAttributesByKeys(roomId,['room_name', 'host']);
    return attributes;
    
  }
  const handleMessageFromFeer = async (message: any, peerId: string) => {
    let messageData = JSON.parse(message.text);
    let count = await chatClient.getChannelMemberCount([messageData.room]);
    console.log(count);
    let attributes = await getRooms(messageData.room);
    console.log(attributes);
    console.log("called lobby");
    
    setRoomsData((pre: any) => {
      let found = pre.find((item: any) => item.roomId === messageData.room);
      console.log(found);
      
      if(!found) return [...pre,
        {
          roomId: messageData.room, 
          members: count[messageData.room],
          hostName: attributes.host.value,
          roomName: attributes.room_name.value
          
        }]
      return pre;
      
    })
  }

  useEffect(() => {
    console.log("hello hello");
    
    chatClient.on("MessageFromPeer", handleMessageFromFeer);      
    // return () => {
    //   chatClient.off("MessageFromPeer", handleMessageFromFeer);
    // }
  }, [chatClient, lobbyChannel])

  return (
    <div className='px-3 py-2'>
      <div className='grid grid-cols-4 gap-3'>
        {
          roomsData?.map((room: any, index: number) => (
            <div key={index} className='flex flex-col bg-slate-500 w-[300px] h-[220px] border border-collapse'>
              <img className='w-full h-[60%] object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzj9vzPuAjx58iQkzPwG1THxXllp6skvR9DsY0NcmvI6nY6D3b5kluBLyRSZJuGiA2ACA&usqp=CAU" alt="" />
              <div className='p-2'>
                <p className='text-white'>{room.roomName}</p>
                <span>{`${room.members} watching`}</span>
                <div className='flex items-center justify-between'>
                  <p className="font-bold">{room.hostName}</p>
                  <button className='bg-blue-400 px-1 py-[2px] rounded-md'>
                    <Link to={`join?room=${room.roomId}`}>Join Room</Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        }
        
      </div>
    </div>
  )
}

export default Lobby
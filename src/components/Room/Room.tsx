import  { useEffect, useState } from 'react'
import Message from '../Message/Message'
import AgoraRTM from 'agora-rtm-sdk';
import OnlineUser from '../onlineUser/OnlineUser';
import useAgorachat from '../../hooks/useAgoraChat';
import { redirect, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import VideoLivestream from '../VideoLivestream/VideoLivestream';
import AgoraRTC, { IAgoraRTCRemoteUser, ILocalVideoTrack } from 'agora-rtc-sdk-ng';
import useAgoraVideo from '../../hooks/useAgoraVideo';
import ViewChart from '../ChartView/ChartView';



type PropsType = {
  api: {
    join: Function;
    leave: Function;
    publish: Function;
    unpublish: Function;
  },
  state: {
    joined: boolean;
    published: boolean;
    localVideoTrack: ILocalVideoTrack | undefined;
    remoteUsers: IAgoraRTCRemoteUser[] | undefined;
  }
}

const APP_ID="b8c5abca5a9a4fbc987e2efe3bb374c6"

const chatClient = AgoraRTM.createInstance(APP_ID);
const rtcClient = AgoraRTC.createClient({codec: "vp8", mode: "live"});

const Room = () => {
  const [channel, setChannel] = useState("default");
  const navigate = useNavigate();
  
  // const location = useLocation();
  // let params = new URLSearchParams(location.search);
  // console.log(params.get("room"));
  const [searchParams, setSearchParams] = useSearchParams();
  let displayName = sessionStorage.getItem("display_name");
  console.log(displayName);
  
  let room = searchParams.get("room");
  useEffect(() => {
    if(room === null || displayName === null) {
      console.log("redirect");
      
      navigate(`/join/?room=${room}`);
      
    }  
  }, [room, displayName])
  
  
  
  //console.log(room);
  
  // if(room === null) {
  //     room = 'default'
  // }
  let channelName: string = room as string;
  const {messages, sendChannelMessage, membersPaticipate, isHost} = useAgorachat(chatClient, channelName);
  console.log(membersPaticipate);
  const {api, state} = useAgoraVideo(rtcClient);
  console.log(api);
  
  useEffect(() => {
    console.log("join Roommmm");
    
    api.join();
    console.log(rtcClient.remoteUsers);
    
  }, [rtcClient])
  
  return (
    <div id='room-container' className='w-full h-full flex p-2'>
        <div className='flex-[1] online-user'>
            <OnlineUser membersPaticipate={membersPaticipate} />
        </div>
        <div className='flex-[3] flex-col video-container'>
            <VideoLivestream api={api} state={state} />
            {
              isHost && <ViewChart membersPaticipate={membersPaticipate} />
            }
        </div>
        <div className='p-2 flex-[1] h-full message'>
            <Message messages={messages} sendChannelMessage={sendChannelMessage} />
        </div>
        <div>
        </div>
    </div>
  )
}

export default Room
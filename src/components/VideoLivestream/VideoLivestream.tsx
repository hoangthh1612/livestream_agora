import React from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import {
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack,
} from "agora-rtc-sdk-ng";
const APP_ID = "b8c5abca5a9a4fbc987e2efe3bb374c6";
let token: string | undefined;
let rtcUid = Math.floor(Math.random() * 232);

type PropsType = {
  api: {
    join: Function;
    leave: Function;
    publish: Function;
    unpublish: Function;
  };
  state: {
    joined: boolean;
    published: boolean;
    localVideoTrack: ILocalVideoTrack | undefined;
    localAudioTrack: ILocalAudioTrack | undefined;
    remoteUsers: IAgoraRTCRemoteUser[] | undefined;
  };
};

const VideoLivestream = (props: PropsType) => {
  const { api, state } = props;
  console.log(api);
  const handleStartStream = async (e: any) => {
    e.preventDefault();
    //await api.join();
    await api.publish();
  };
  const handleStopStream = async (e: any) => {
    e.preventDefault();
    await api.unpublish();
  }
  return (
    <div>
      <div className="relative w-full h-[500px]">
        <div className="w-full h-[500px]" id="video-stream"> 
          <img
            className={`${state?.published && `hidden `} ` + `w-full`}
            src="https://designhub.co/wp-content/uploads/2020/09/mainfeature-758x426.jpg"
            alt=""
          />
        
        </div>
        <div className="absolute bottom-3 left-[30%]">
          <button className="mr-3">
            <CameraAltOutlinedIcon fontSize="large" />
          </button>
          <button className="mr-3">
            <KeyboardVoiceOutlinedIcon fontSize="large" />
          </button>
          {
            !state.published ? (
              <button onClick={handleStartStream} className="px-3 py-2 bg-red-400">
                Start stream
              </button>
            ):
            <button onClick={handleStopStream} className="px-3 py-2 bg-red-400">
              Stop stream
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default VideoLivestream;

import AgoraRTM from "agora-rtm-sdk";

const APP_ID="b8c5abca5a9a4fbc987e2efe3bb374c6";
 
export default function useAgora(){
    const client = AgoraRTM.createInstance(APP_ID);
    return {client };
}
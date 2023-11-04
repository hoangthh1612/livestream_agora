import React, { useEffect, useRef, useState } from 'react'

type PropsType = {
  messages: any;
  sendChannelMessage: (text: string) => Promise<void>
}



const Message = ({messages, sendChannelMessage}: PropsType) => {
  // const appID = "";
  // const token: any = null;
  console.log(messages);
  
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<any>();
  console.log(newMessage);
  
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if(newMessage.length === 0) return;
    await sendChannelMessage(newMessage);
    setNewMessage('');

  }
  // const createdTime = () => {
  //   let created = new Date().toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
  //   return created;
  // }
  let created = new Date().toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"});
  },[messages])
  return (
    <div className='flex flex-col w-full h-full'>
        <div className='p-1 border-[1px] border-separate h-[90%] space-y-2 overflow-y-scroll'>
            {
              messages?.map((data: any, index: number) => (
                <div className='flex' ref={scrollRef} key={index}>
                  <img 
                    className='w-[30px] h-[30px] rounded-[50px] object-cover mr-2'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgfqcIR6_q8U_vFeIxVY_Uah0hvqB6zvaC6h_jU-OMJV7PkyWrEfZ_X8kt0500NRmPk28&usqp=CAU" alt="logo" />
                  <div className='flex flex-col px-3 py-2 bg-blue-300 rounded-2xl'>
                    <small>{created}</small>
                    <span className='font-bold'>{data?.displayName}</span>
                    <p>{data?.message}</p>
                  </div>
                </div>
              ))
              
            }
        </div>
        <div className='mt-2'>
            <form onSubmit={sendMessage} >
                <div className='flex w-full'>
                    <input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        type="text" 
                        className='w-[95%] border-[1px] border-blue-200 focus:outline-none focus:border-blue-500 rounded-md' />
                    <button className='ml-2 px-2 py-1 bg-blue-400 rounded-md border-[1px]'>Send</button>
                </div>
            </form>
        </div>
    </div>

  )
}

export default Message
import React from "react";



const OnlineUser = ({membersPaticipate}:{membersPaticipate: any}) => {
    
    
  return (
    <>
      <p className="text-2xl">{membersPaticipate?.length}</p>
        {
            membersPaticipate?.map((item: any, index:number) => (
                <div key={index} className="flex items-center">
                    <i className="h-[10px] w-[10px] rounded-[50%] bg-green-500"></i>
                    <p>{item?.name}</p>
                </div>
            ))
        }
    </>
  );
};

export default OnlineUser;

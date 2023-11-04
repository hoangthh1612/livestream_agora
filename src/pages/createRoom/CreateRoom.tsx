import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateRoom = () => {
    const navigate = useNavigate();
    const [yourName, setYourName] = useState<string | null>(null);
    const [roomName, setRoomName] = useState<string | null>(null);
    
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        yourName && sessionStorage.setItem('display_name', yourName);
        roomName && sessionStorage.setItem('room_name', roomName);
        let roomId = String(Math.floor(Math.random() * 50000000));

        setTimeout(() => {
            navigate(`/room?room=${roomId}`);  
        }, 2000);
        
    }
    return (
        <>
            <div>
                <div className="mb-5">
                    <p className="text-2xl">Create Room</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-3">
                        <div className="w-[10%]">
                            <label>Your Name</label>
                        </div>
                        <div className="w-1/3">
                        <input 
                            onChange={(e) => setYourName(e.target.value)}
                            className="w-2/3 border-[1px] border-gray-300 rounded" type="text" name="name" />
                        </div>
                    </div>
                    <div className="flex mb-7">
                        <div className="w-[10%]">
                        <label >Room name</label>

                        </div>
                        <div className="w-1/3">
                            <input 
                                className="w-2/3 border-[1px] border-gray-300 rounded" type="text" name="room" 
                                onChange={(e) => setRoomName(e.target.value)}
                                />
                    
                        </div>
                    </div>
                    <div className="ml-5">
                        <button className="px-3 py-1 border rounded-md bg-blue-500">Create</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateRoom;
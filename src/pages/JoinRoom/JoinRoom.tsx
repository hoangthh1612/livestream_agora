import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const JoinRoom = () => {
    const navigate = useNavigate();
    const [yourName, setYourName] = useState<string | null>(null);
    
    const [searchParams] = useSearchParams();
    let roomId = searchParams.get("room");
    console.log(roomId);
    
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(yourName);
        
        yourName && sessionStorage.setItem('display_name', yourName);
        
        setTimeout(() => {
            navigate(`/room?room=${roomId}`);
            console.log("abc");
            
        }, 2000);
        
    }
    return (
        <>
            <div>
                <div className="mb-5">
                    <p className="text-2xl">Join room</p>
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
                    
                    <div className="ml-5">
                        <button className="px-3 py-1 border rounded-md bg-blue-500">Join</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default JoinRoom;
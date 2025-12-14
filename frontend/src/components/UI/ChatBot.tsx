import { useState } from "react";
import { geminiChat } from "../../utils/http_methods";
import Typewriter from "./Typewriter";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { notifyActions } from "../../store/uiSlice";
import { type RootState } from "../../store"; 
import { useEffect, useRef } from "react";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}


const LiveChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  
  const chatMinimizeEffect = useSelector((state:RootState)=>state.NotifyUser.minimizeChatFlag);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const handleKeyDown = (e:any)=>{
    if (e.key === 'Enter') {
       sendMessage();
      // Add your submission logic here
    }
  }

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChat((prev) => [...prev, { sender: "user", text: message }]);

    const userMessage = message;
    setMessage("");

    // Show loader
    setLoading(true);

    // Delay loader for 3 seconds
    setTimeout(async () => {
      try{

        const aiReply = await geminiChat(userMessage);
        console.log(aiReply);
        setLoading(false);
        setChat((prev) => [...prev, { sender: "ai", text: aiReply }]);
      }
      catch(e){
        setLoading(false);
        setChat((prev) => [...prev, { sender: "ai", text: "Network Error" }]);

      }

      // Add AI reply
    }, 3000);
  };

   const handleCloseChat = ()=>{
        dispatch(notifyActions.toggleChatWindow());
   }

   const handleMinimizeIcon = ()=>{
     dispatch(notifyActions.addChatMinimizeEffect());
   }

   useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block:"end"});
  }, [chat]);

  return (
    <div id="travelShopAssistant" className={chatMinimizeEffect ? "d-none":""}>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center p-2" id="assistantHeader">
        <h5>AI Travel Shop Assistant</h5>
        <div className="d-flex gap-2">
          <button className="headBtn fw-bold minimizeIcon" onClick={handleMinimizeIcon}>_</button>
          <button className="headBtn fw-bold" onClick={handleCloseChat}>X</button>
        </div>
      </div>

      {/* CHAT AREA */}
      <div id="travelShopChatArea" className="chatArea">

        {/* Welcome message */}
        <div className="bubble aiBubble">
        <Typewriter text="Hello! Welcome to TravelShop AI Assistant" speed={35} />
        </div>

        {/* Render chat messages */}
        {chat.map((msg, index) => (
          <div 
            key={index}
            className={msg.sender === "user" ? "bubble userBubble" : "bubble aiBubble"}
          >
            {msg.sender === "ai" ? (
              <Typewriter text={msg.text} speed={25} />
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Loader before AI reply */}
        {loading && <Loader />}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT SECTION */}
      <div className="d-flex">
        <input
          id="chatInput"
          className="w-100"
          value={message}
          placeholder="Type your query here..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="sendChatBtn" className="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;

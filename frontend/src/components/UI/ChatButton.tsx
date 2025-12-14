import { useDispatch, useSelector } from 'react-redux';
import { notifyActions } from '../../store/uiSlice';
import type { AppDispatch, RootState } from '../../store';
import chat_icon from '../../assets/chat-icon.png';
interface ChatButtonProps {
  // if you expect any props, define them here
}

const ChatButton = (props:ChatButtonProps) => {

  const dispatch = useDispatch<AppDispatch>();
  // const cartItemsCount = useSelector((state:RootState)=>state.StoredCart.totalItems);

  const chatWindowFlag = useSelector((state:RootState)=>state.NotifyUser.showChatWindow)
  const minimizeChatFlag = useSelector((state:RootState)=>state.NotifyUser.minimizeChatFlag)

  const toggleState = ()=>{
    console.log("chat button");
    if(chatWindowFlag == true && minimizeChatFlag == true){
      dispatch(notifyActions.removeChatMinimizeEffect())
    }
    else{
      dispatch(notifyActions.toggleChatWindow());
    }
  }

  return (
    <button className="button cartBtn" onClick={toggleState}>
      {/* <span>My Cart</span> */}
      <img src={chat_icon}></img>
    </button>
  );
};

export default ChatButton;

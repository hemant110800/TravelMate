import LiveChat from "./ChatBot";
import NavigationBar from "./Navigation";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const RouterWrapper = ()=>{

    const chatWindowFlag = useSelector((state:RootState)=>state.NotifyUser.showChatWindow);

    const loc = useLocation();
      // Pages where we don't want wrapper styling
    const authPages = ["/login", "/register"];
   const isAuthPage = authPages.includes(location.pathname);
 
    return(
        <div>
            <NavigationBar></NavigationBar>
           { chatWindowFlag && <LiveChat/> }           
            <div className={ isAuthPage?"m-auto p-4":"m-auto p-4 bg-white"}>
            <Outlet></Outlet>
            </div>
        </div>
    )
}

export default RouterWrapper;
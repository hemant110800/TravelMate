import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface NotificationType{
 status:string,
 title:string,
 message:string,
 showCartItems:boolean
 showChatWindow:boolean
 minimizeChatFlag:boolean
}

const initialState:NotificationType={
    status:"",
    title:"",
    message:"",
    showCartItems: false,
    showChatWindow: false,
    minimizeChatFlag:false
}

export const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        showNotifications(state,action:PayloadAction<{status:string,title:string,message:string}>){
            state.status = action.payload.status;
            state.title = action.payload.title;
            state.message= action.payload.message;
        },
        hideNotification(state){
            state.status = "";
            state.title = "";
            state.message = "";
        },
        toggleCartArea(state) {
            // console.log(state)
            state.showCartItems = !state.showCartItems;
        },
        toggleChatWindow(state){
            state.showChatWindow = !state.showChatWindow;
        },
        addChatMinimizeEffect(state){
            state.minimizeChatFlag = true;
        },
        removeChatMinimizeEffect(state){
            state.minimizeChatFlag = false; 
        }
    }
})


export const notifyActions = notificationSlice.actions;
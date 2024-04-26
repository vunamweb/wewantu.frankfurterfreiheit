import React, { useState, useEffect, useRef } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader, ModalBody, CardBody, Button, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import SimpleBar from "simplebar-react";

import withRouter from "../../../components/withRouter";

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";

//actions
import { openUserSidebar, setFullUser } from "../../../redux/actions";
import { getLoggedInUser } from '../../../helpers/authUtils';

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from 'react-i18next';

//firebase
import { getFirebaseBackend } from "../../../helpers/firebase";


function UserChat(props) {

    const refC = useRef();

    const [modal, setModal] = useState(false);

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    //demo conversation messages
    //userType must be required
    const [allUsers] = useState(props.recentChatList);
    const [chatMessages, setchatMessages] = useState(props.recentChatList[props.active_user].messages);
   const [countid] = useState(props.recentChatList[props.active_user].messages.length);
    const fireBaseBackend = getFirebaseBackend();
   

    useEffect(() => {
        setchatMessages(props.recentChatList[props.active_user].messages);
        refC.current.recalculate();
        if (refC.current.el) {
            refC.current.getScrollElement().scrollTop = refC.current.getScrollElement().scrollHeight;
        }
    }, [props.active_user, props.recentChatList]);
/*
    useEffect(() => {
        if (!currentGroup) {
            return
        }
        //console.log(currentGroup);
        const admin=getLoggedInUser()[0];
        let tagId=admin.user_id+'_'+currentGroup.user_id;
        const resp = ref(getDatabase(), 'messages/'+tagId);
        const unSub = onValue(resp, (snap) => { // <--- return the unsubscriber!
            
            if (snap.exists()) {
                const messages = getSnapshotChildren(snap)
                     .map(child => ({
                         id: child.key,
                         //group: currentGroup.user_id,
                         ...child.val()
                     }));
                     
                     //console.log(messages[messages.length -1].message);
                    if(admin.user_id === messages[messages.length -1].fromUser)
                        console.log('is admin');
                    else{
                            addMessage(messages[messages.length -1].message,'textMessage',"receiver");
                                //const users = fetch('https://api.topazvn.vn/listChat.php?admin_id='+admin.user_id)
                                //console.log(users);
                                //setchatMessages(users[props.active_user].messages);
                            }
                        //

                return
            }
            
        });
        return () => {
            unSub();
          };   
            
    },[currentGroup]);
*/
    
    const toggle = () => setModal(!modal);

    
    const addMessage = (message, type="textMessage",userType="sender") => {
       
        var messageObj = null;

        let d = new Date();        
        let time =d.getTime();
        
        var y = d.getFullYear() ;
        var m = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        var dd = d.getDay() < 10 ? "0" + d.getDay() : d.getDay();
        var h = d.getHours()< 10 ? "0" + d.getHours() : d.getHours();
        var mm = d.getMinutes()< 10 ? "0" + d.getMinutes() : d.getMinutes();
        var s = d.getSeconds()< 10 ? "0" + d.getSeconds() : d.getSeconds();
        var fulltime= y + "-" + m + "-" + dd + " " + h + ":" + mm + ":" + s;

        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    id: time ,
                    message: message,
                    time: fulltime,
                    userType: userType,
                    image: avatar4,
                    isFileMessage: false,
                    isImageMessage: false
                }
                break;

            case "fileMessage":
                messageObj = {
                    id: countid,
                    message: 'file',
                    fileMessage: message.name,
                    size: message.size,
                    time: fulltime,
                    userType: userType,
                    image: avatar4,
                    isFileMessage: true,
                    isImageMessage: false
                }
                break;

            case "imageMessage":
                var imageMessage = [
                    { image: message },
                ]

                messageObj = {
                    id: countid,
                    message: 'image',
                    imageMessage: imageMessage,
                    size: message.size,
                    time: fulltime,
                    userType: userType,
                    image: avatar4,
                    isImageMessage: true,
                    isFileMessage: false
                }
                break;

            default:
                break;
        }

        
       
        
        
       

        setchatMessages([...chatMessages, messageObj]);

        let copyallUsers = [...allUsers];
        copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
        copyallUsers[props.active_user].isTyping = false;
        props.setFullUser(copyallUsers);
        
        scrolltoBottom();
        
        if(userType==='sender'){
            if(getLoggedInUser().length>0){
                const admin=getLoggedInUser()[0];
                fireBaseBackend.writeMessages(admin,props.recentChatList[props.active_user],messageObj);
            }
        }
        
        
    }

    function scrolltoBottom() {
        if (refC.current.el) {
            refC.current.getScrollElement().scrollTop = refC.current.getScrollElement().scrollHeight;
        }
    }


    const deleteMessage = (id) => {
        let conversation = chatMessages;

        var filtered = conversation.filter(function (item) {
            return item.id !== id;
        });

        setchatMessages(filtered);
    }



    return (
        <React.Fragment>
            <div className="col-md-8 user-chat overflow-hidden">

                <div className="d-lg-flex">

                    <div className={props.userSidebar ? "w-70 overflow-hidden position-relative" : "w-100 overflow-hidden position-relative"}>

                        {/* render user head */}
                        <UserHead  />

                        <SimpleBar
                            style={{ maxHeight: "100%" }}
                            ref={refC}
                            className="chat-conversation p-5 p-lg-4"
                            id="messages">
                            <ul className="list-unstyled mb-0">


                                {
                                    chatMessages.map((chat, key) =>
                                        chat.isToday && chat.isToday === true ? <li key={"dayTitle" + key}>
                                            <div className="chat-day-title">
                                                <span className="title">Today</span>
                                            </div>
                                        </li> :
                                            (props.recentChatList[props.active_user].isGroup === true) ?
                                                <li key={key} className={chat.userType === "sender" ? "right" : ""}>
                                                    <div className="conversation-list">

                                                        <div className="chat-avatar">
                                                            {chat.userType === "sender" ? <img src={avatar1} alt="chatvia" /> :
                                                                props.recentChatList[props.active_user].profilePicture === "Null" ?
                                                                    <div className="chat-user-img align-self-center me-3">
                                                                        <div className="avatar-xs">
                                                                            <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                                                {chat.userName && chat.userName.charAt(0)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    : <img src={props.recentChatList[props.active_user].profilePicture} alt="chatvia" />
                                                            }
                                                        </div>

                                                        <div className="user-chat-content">
                                                            <div className="ctext-wrap">
                                                                <div className="ctext-wrap-content">
                                                                    {
                                                                        chat.message &&
                                                                        <p className="mb-0">
                                                                            {chat.message}
                                                                        </p>
                                                                    }
                                                                    {
                                                                        chat.imageMessage &&
                                                                        // image list component
                                                                        <ImageList images={chat.imageMessage} />
                                                                    }
                                                                    {
                                                                        chat.fileMessage &&
                                                                        //file input component
                                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                                    }
                                                                    {
                                                                        chat.isTyping &&
                                                                        <p className="mb-0">
                                                                            typing
                                                                            <span className="animate-typing">
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                            </span>
                                                                        </p>
                                                                    }
                                                                    {
                                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                                                                    }
                                                                </div>
                                                                {
                                                                    !chat.isTyping &&
                                                                    <UncontrolledDropdown className="align-self-start">
                                                                        <DropdownToggle tag="a" className="text-muted ms-1">
                                                                            <i className="ri-more-2-fill"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem>{t('t_copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem>{t('t_save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                                }

                                                            </div>
                                                            {
                                                                <div className="conversation-name">{chat.userType === "sender" ? "Patricia Smith" : chat.userName}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                                :
                                                <li key={key} className={chat.userType === "sender" ? "right" : ""}>
                                                    <div className="conversation-list">
                                                        {
                                                            //logic for display user name and profile only once, if current and last messaged sent by same receiver
                                                            chatMessages[key + 1] ? chatMessages[key].userType === chatMessages[key + 1].userType ?

                                                                <div className="chat-avatar">
                                                                    <div className="blank-div"></div>
                                                                </div>
                                                                :
                                                                <div className="chat-avatar">
                                                                    {chat.userType === "sender" ? <img src={avatar1} alt="chatvia" /> :
                                                                        props.recentChatList[props.active_user].profilePicture === "Null" ?
                                                                            <div className="chat-user-img align-self-center me-3">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                                                        {props.recentChatList[props.active_user].name.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            : <img src={props.recentChatList[props.active_user].profilePicture} alt="chatvia" />
                                                                    }
                                                                </div>
                                                                : <div className="chat-avatar">
                                                                    {chat.userType === "sender" ? <img src={avatar1} alt="chatvia" /> :
                                                                        props.recentChatList[props.active_user].profilePicture === "Null" ?
                                                                            <div className="chat-user-img align-self-center me-3">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                                                        {props.recentChatList[props.active_user].name.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            : <img src={props.recentChatList[props.active_user].profilePicture} alt="chatvia" />
                                                                    }
                                                                </div>
                                                        }


                                                        <div className="user-chat-content">
                                                            <div className="ctext-wrap">
                                                                <div className="ctext-wrap-content">
                                                                    {
                                                                        chat.message &&
                                                                        <p className="mb-0">
                                                                            {chat.message}
                                                                        </p>
                                                                    }
                                                                    {
                                                                        chat.imageMessage &&
                                                                        // image list component
                                                                        <ImageList images={chat.imageMessage} />
                                                                    }
                                                                    {
                                                                        chat.fileMessage &&
                                                                        //file input component
                                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                                    }
                                                                    {
                                                                        chat.isTyping &&
                                                                        <p className="mb-0">
                                                                            typing
                                                                            <span className="animate-typing">
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                            </span>
                                                                        </p>
                                                                    }
                                                                    {
                                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                                                                    }
                                                                </div>
                                                                {
                                                                    !chat.isTyping &&
                                                                    <UncontrolledDropdown className="align-self-start ms-1">
                                                                        <DropdownToggle tag="a" className="text-muted">
                                                                            <i className="ri-more-2-fill"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                                }

                                                            </div>
                                                            {
                                                                chatMessages[key + 1] ? 
                                                                chatMessages[key].userType === chatMessages[key + 1].userType ? null : 

                                                                <div className="conversation-name">{chat.userType === "sender" ? 

                                                                "Patricia Smith" : props.recentChatList[props.active_user].name}</div> : 

                                                                <div className="conversation-name">{chat.userType === "sender" ? 
                                                                
                                                                "Admin" : props.recentChatList[props.active_user].name}</div>
                                                            }

                                                        </div>
                                                    </div>
                                                </li>
                                    )
                                }
                            </ul>
                        </SimpleBar>

                        <Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
                            <ModalHeader toggle={toggle}>Forward to...</ModalHeader>
                            <ModalBody>
                                <CardBody className="p-2">
                                    <SimpleBar style={{ maxHeight: "200px" }}>
                                        <SelectContact handleCheck={() => { }} />
                                    </SimpleBar>
                                    <ModalFooter className="border-0">
                                        <Button color="primary">Forward</Button>
                                    </ModalFooter>
                                </CardBody>
                            </ModalBody>
                        </Modal>

                        <ChatInput onaddMessage={addMessage} />
                    </div>

                    <UserProfileSidebar activeUser={props.recentChatList[props.active_user]} />

                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    const { userSidebar } = state.Layout;
    return { active_user, userSidebar };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullUser })(UserChat));


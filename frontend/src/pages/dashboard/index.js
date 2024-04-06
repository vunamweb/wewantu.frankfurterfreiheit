import React, { Component } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import { APIClient } from '../../helpers/apiClient';
import { connect } from "react-redux";

import { openUserSidebar, setFullUser } from "../../redux/actions";
import { getLoggedInUser } from '../../helpers/authUtils';
import { getDatabase, onValue,ref } from "firebase/database";
class Index extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: false,
            users: [],
            limit: 5,
          };
    }

    onListenForMessages = async () => {
        //this.setState({ loading: true });
        if(getLoggedInUser().length >0){
            const admin=getLoggedInUser()[0];
            const users = await new APIClient().get('https://api.topazvn.vn/listChat.php?admin_id='+admin.user_id)
            //console.log(user);
            if(users.length > 0){
                this.props.setFullUser(users);
                this.setState({
                    loading: true,
                    users:users
                })
            }
        }
        
        
      };

      

   
      componentDidMount() {
        this.onListenForMessages();

        const resp = ref(getDatabase(), 'messages/');
        const getSnapshotChildren = (snapshot) => {
            const children = [];
            // note: the curly braces on the next line are important! If the
            // callback returns a truthy value, forEach will stop iterating
            snapshot.forEach(child => { children.push(child) })
            return children;
        }
        onValue(resp, (snap) => { // <--- return the unsubscriber!
            
            if (snap.exists()) {
                const messages = getSnapshotChildren(snap)
                     .map(child => ({
                         id: child.key,
                         //group: currentGroup.user_id,
                         ...child.val()
                     }));

                if(getLoggedInUser().length >0){
                    let copyallUsers = this.state.users;
                    const admin=getLoggedInUser()[0].user_id;
                    if(copyallUsers.length > 0){
                        
                        copyallUsers.forEach(resallu=>{
                            
                            let tagId= admin + "_" + resallu.user_id;
                            let lastMesId = 0;
                            let curmessages = resallu.messages;
                            if(curmessages.length > 0){
                                lastMesId=curmessages[curmessages.length-1].id;
                            }
                            
                            if(messages.length > 0) {
                                messages.forEach(res=>{
                                    if(res.id === tagId){
                                        //console.log(resallu.messages);
                                        //console.log(Object.values(res))
                                        Object.values(res) && Object.values(res).map((val,index)=>{
                                            //console.log(val);
                                            if(index>0){                      
                                                if(val.fromUser === admin){
                                                    //console.log('is admin')
                                                }   
                                                else{
                                                    let time= new Date(val.dateTime).getTime(); 
                                                
                                                    let obj={
                                                        create_at:val.dateTime,
                                                        id:time,
                                                        id_room:tagId,
                                                        isFileMessage:false,
                                                        isImageMessage:false,
                                                        message:val.message,
                                                        time:val.dateTime,
                                                        userType:val.fromUser === admin ? "sender":"receiver",
                                                        user_id_from:val.fromUser,
                                                    }

                                                   // console.log(lastMesId);
                                                   // console.log(time);
                                                    if(lastMesId < time){
                                                        console.log('addd');
                                                        resallu.messages.push(obj);
                                                    }
                                                }                       
                                                
                                            }
                                            
                                        })
                                        /*let obj={
                                            create_at:"2024-03-18 08:29:05",
                                            id:1710750545,
                                            id_room:"a22045ce-5f89-4a47-ab67-f349f2ea9c24_40b4e9b9-e508-473c-b75d-75cd10adee79",
                                            isFileMessage:false,
                                            isImageMessage:false,
                                            message:"R1",
                                            time:"2024-03-18 08:29:05",
                                            userType:"receiver",
                                            user_id_from:"40b4e9b9-e508-473c-b75d-75cd10adee79",
                                            user_id_to:"a22045ce-5f89-4a47-ab67-f349f2ea9c24",
                                        }
                                        //resallu.messages = obj
                                        resallu.messages.push(obj);
                                        console.log(resallu.messages);*/

                                    }
                                        
                                })
                                    
                            }

                        })
                       // console.log(copyallUsers);
                        this.setState({
                            users:copyallUsers
                        })
                        this.props.setFullUser(copyallUsers);
                    }
                    if(messages.length > 0){
                        messages.forEach(res=>{
                            //console.log(res.id);
                        })
                    }
                   // console.log(copyallUsers);
                }
                //console.log(messages);
                //console.log(this.state.users);
                //let copyallUsers = this.state.users;
                //this.props.setFullUser(messages);
                
                //this.props.setFullUser(messages);
                return
            }
            
        });
        
        


      }

    render() {
        document.title = "Dashboard | WEWANTU"
        
        const { users, loading } = this.state;
        const curUser = getLoggedInUser()[0];
        return (
            
            <>
            <React.Fragment>
            { curUser && (
                <div className="main_wewantu_das">
                <div className="container-fluid px-0 wewantu">
                    <div className="row g-0">
                        <div className="col-md-5 werist-l"></div>
                        <div className="col-md-5 werist  center-block text-center">
                            <div className="title">{curUser.search_queries} SEARCH QUERIES</div>
                        </div>
                        <div className="col-md werist-r"></div>                         
                    </div>
                    <div className="row g-0">
                        <div className="col-md-6 werist-l"></div>
                        <div className="col-md-3 werist  center-block text-center">
                            <div className="title">{curUser.messages_count} MESSAGES</div>
                        </div>
                        <div className="col-md werist-r"></div>                         
                    </div>
                    <div className="row g-0">
                        <div className="col-md-8 werist-l"></div>
                        <div className="col-md-3 werist  center-block text-center">
                            <div className="title">{curUser.credits} CREDITS</div>
                        </div>
                        <div className="col-md werist-r"></div>                         
                    </div>
                </div>
            </div>
            )}
            {!loading && (<div className="loader"></div>)}
            {users.length > 0 && (
                
                
                
                <ChatLeftSidebar recentChatList={this.props.users}/>
            
            )}
            </React.Fragment>
            </>
            
        );
    }
}

const mapStateToProps = (state) => {
    const { users } = state.Chat;
    return { users };
};

export default connect(mapStateToProps, { openUserSidebar, setFullUser })(Index);
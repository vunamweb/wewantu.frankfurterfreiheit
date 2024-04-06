import React, { Component } from 'react';
//Import Components
import { Link } from "react-router-dom";
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/index";
import { FaSearch } from "react-icons/fa";
import { Row, Col, Form, Input, Button,  Label,  } from 'reactstrap';
import { APIClient } from '../../helpers/apiClient';
import { connect } from "react-redux";

import { openUserSidebar, setFullUser } from "../../redux/actions";
import { getLoggedInUser } from '../../helpers/authUtils';
import { getDatabase, onValue,ref } from "firebase/database";
class Messagecenter extends Component {
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
                                                    console.log('is admin')
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

                                                    console.log(lastMesId);
                                                    console.log(time);
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
                        console.log(copyallUsers);
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
        document.title = "Messagecenter | WEWANTU"
        
        const { users, loading } = this.state;
        return (
            
            <>
            {!loading && (<div>Loading ...</div>)}
            {users.length > 0 && (
                <React.Fragment>
                <div className="main_wewantu_das">
                    <div className="container-fluid px-0 wewantu">
                        <div className="row g-0">
                            <div className="col-md-5 werist-l"></div>
                            <div className="col-md-5 werist  center-block text-center">
                                <div className="title">5 SEARCH QUERIES</div>
                            </div>
                            <div className="col-md werist-r"></div>                         
                        </div>
                        <div className="row g-0">
                            <div className="col-md-6 werist-l"></div>
                            <div className="col-md-3 werist  center-block text-center">
                                <div className="title">12 MESSAGES</div>
                            </div>
                            <div className="col-md werist-r"></div>                         
                        </div>
                        <div className="row g-0">
                            <div className="col-md-8 werist-l"></div>
                            <div className="col-md-3 werist  center-block text-center">
                                <div className="title">56 CREDITS</div>
                            </div>
                            <div className="col-md werist-r"></div>                         
                        </div>
                    </div>
                </div>
                <div className="addjob-searchcenter">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-md"><Link to="/newjob"><img src={`${process.env.PUBLIC_URL}/img/plus.svg`} alt=''/><span className="textSearchCenter">ADD NEW JOB</span></Link></div>
                        </div>
                    </div>
                </div>
                <div className="main-mes">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-md">
                                
                                <nav className="navbar navbar-expand-md navbar-light">
                                <div className="container-fluid ">
                                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                  </button>
                                  
                                  <div className="title">MASSAGE CENTER</div>
                                  <div className="collapse navbar-collapse " id="navbarSupportedContent" style={{marginLeft: '20px'}}>
                                    <div className="search-container">
                                        <Form>
                                            <Row className="row-cols-lg-auto g-3 align-items-center">
                                                <Col>
                                                    <Button size="sm" color="light" ><FaSearch /></Button>
                                                </Col>
                                                <Col>
                                                    <Label
                                                        className="visually-hidden"
                                                        for="exampleEmail"
                                                    >
                                                        Email
                                                    </Label>
                                                    <Input
                                                        bsSize="sm"
                                                        id="exampleEmail"
                                                        name="email"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                    <ul className="navbar-nav ms-auto menuMessageCenter">
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-MessageCenter" to="#">VALUATION</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-MessageCenter" to="#">KATEGORIE</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-MessageCenter" to="#">DATE</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-MessageCenter" to="#">MORE FILTER</Link>
                                        </li>			
                                    </ul>  
                                  </div>
                                </div>
                              </nav>
                            </div>
                        </div>
                    </div>
                    <div className="container ">
                        <div className="row content">
                            {/*<MessageContact />
                            <ChatLeftSidebar recentChatList={users} />
                            <UserChat recentChatList={users} />*/}
                           
                            <ChatLeftSidebar recentChatList={this.props.users}/>
                            <UserChat recentChatList={this.props.users} />
                            {/* user chat */
                            //console.log(this.state.INIT_STATE)
                            
                            }
                            {/* user chat */
                            //console.log(INIT_STATE.users)
                            
                        }
                            
                            
                        </div>
                    </div>
                </div>

            </React.Fragment>
            )}
            </>
            
        );
    }
}

const mapStateToProps = (state) => {
    const { users } = state.Chat;
    return { users };
};

export default connect(mapStateToProps, { openUserSidebar, setFullUser })(Messagecenter);
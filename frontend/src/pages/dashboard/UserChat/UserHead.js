import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { openUserSidebar, setFullUser } from "../../../redux/actions";

//import images
import user from '../../../assets/images/users/avatar-4.jpg'

function UserHead(props) {
    
    const [Callmodal, setCallModal] = useState(false);
    const [Videomodal, setVideoModal] = useState(false);

    
    const toggleCallModal = () => setCallModal(!Callmodal);
    const toggleVideoModal = () => setVideoModal(!Videomodal);

    const openUserSidebar = (e) => {
        e.preventDefault();
        // props.openUserSidebar();
    }

    function closeUserChat(e) {
        e.preventDefault();
        var userChat = document.getElementsByClassName("user-chat");
        if (userChat) {
            userChat[0].classList.remove("user-chat-show");
        }
    }

    if (props.users.length>0)
    return (
        <React.Fragment>
            <div className="p-3 p-lg-4 border-bottom user-chat-topbar">
                <Row className="align-items-center">
                    <Col sm={4} xs={8}>
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none me-2 ms-0">
                                <Link to="#" onClick={(e) => closeUserChat(e)} className="user-chat-remove text-muted font-size-16 p-2">
                                    <i className="ri-arrow-left-s-line"></i></Link>
                            </div>
                            {
                                /*
                                props.users[props.active_user].profilePicture !== "Null" ?
                                    <div className="me-3 ms-0">
                                        <img src={props.users[props.active_user].profilePicture} className="rounded-circle avatar-xs" alt="chatvia" />
                                    </div>
                                    : <div className="chat-user-img align-self-center me-3">
                                        <div className="avatar-xs">
                                            <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                {props.users[props.active_user].name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>

                                    */
                            }

                            <div className="flex-grow-1 overflow-hidden">
                                <h5 className="font-size-16 mb-0 text-truncate">
                                    <Link to="#" onClick={(e) => openUserSidebar(e)} className="text-reset user-profile-show">
                                        {props.users[props.active_user].name}
                                    </Link>
                                    {(() => {
                                        switch (props.users[props.active_user].status) {
                                            case "online":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ms-2"></i>
                                                    </>
                                                )

                                            case "away":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-warning d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            case "offline":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-secondary d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            default:
                                                return;
                                        }
                                    })()}

                                </h5>
                            </div>
                        </div>
                    </Col>
                    
                </Row>
            </div>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    const { users, active_user } = state.Chat;
    return { ...state.Layout, users, active_user };
};

export default connect(mapStateToProps, { openUserSidebar, setFullUser })(UserHead);
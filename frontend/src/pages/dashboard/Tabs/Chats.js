import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";

//actions
import { setconversationNameInOpenChat, activeUser, setFullUser } from "../../../redux/actions";
import functions from '../../../function/function';
import { getAllUser, getLoggedInUser, getjob_search_profiles_all } from '../../../helpers/authUtils';
import { APIClient } from '../../../helpers/apiClient';

import { t } from 'i18next';
import config from '../../../config';

class Chats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            searchChat: "",
            chatList: this.props.recentChatList,
            recentChatList: this.props.recentChatList,
            jobSearchProfiles: this.props.jobSearchProfiles
        }
        this.openUserChat = this.openUserChat.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        var li = document.getElementById("conversation" + this.props.active_user);
        if (li) {
            li.classList.add("active");
        }
        // if (this.state.jobSearchProfiles.count>0){
        //     this.searchUser(this.state.jobSearchProfiles[0]);
        // }
        const admin = getLoggedInUser()[0];

        let payments = await new APIClient().get('user/' + admin.user_id + '/user_payment');
        const user_id_payment = payments.map(p => p.user_id_payment);
        const chatListFilter = this.state.chatList.filter((c) => (user_id_payment.includes(c.user_id) || admin.userType == 0));
        this.setState({ chatList: chatListFilter, recentChatList: chatListFilter });

        this.props.setFullUser(chatListFilter);

        let companylist = await new APIClient().get('companylist');
        let addresslist = await new APIClient().get('addresslist');
        let searchJob = await new APIClient().get('list_job_search_profiles');
        let allUserDriveList = await new APIClient().get('all/user_driver');
        let allUserLanguageList = await new APIClient().get('all/user_language');
        this.setState({ "companylist": companylist, "addresslist": addresslist, "searchJob": searchJob, "allUserDriveList": allUserDriveList, "allUserLanguageList": allUserLanguageList });
        this.renData(addresslist, searchJob, companylist, null, allUserDriveList, allUserLanguageList, this.state.jobSearchProfiles);
    }

    renData(addresslist, searchJob, companylist, watchlist, allUserDriveList, allUserLanguageList, jobList) {
        const admin = getLoggedInUser()[0];
        let newsearchJob = [...searchJob]

        const jobIds = jobList.map(item => item.job_search_profile_id);

        // newsearchJob = newsearchJob.filter(item => jobIds.includes(item.job_search_profile_id));


        // set drive license for user
        newsearchJob.length > 0 && newsearchJob.map(job => {
            try {
                job.user.drive = [];

                allUserDriveList.length > 0 && allUserDriveList.map(drive => {
                    if (job.user.user_id == drive.user_id)
                        job.user.drive.push(drive.driver_license_id)
                })
            } catch (error) {
                console.log(error)
            }
        })

        // set language for user
        newsearchJob.length > 0 && newsearchJob.map(job => {
            try {
                job.user.language = {};
                job.user.language.mother = [];
                job.user.language.foreign = [];

                allUserLanguageList.length > 0 && allUserLanguageList.map(language => {
                    if (job.user.user_id == language.user_id) {
                        if (language.level == 0)
                            job.user.language.mother.push(language.language_id)
                        else
                            job.user.language.foreign.push(language.language_id)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        })

        newsearchJob = this.mixJobProfile(newsearchJob);

        newsearchJob.map((serJob, index) => {
            let addr = {};
            let company = {};
            addr = addresslist !== null && addresslist.filter(item => item.address_id !== null && item.address_id.includes(serJob.user.address_id));
            if (addr.length > 0)
                newsearchJob[index].address = addr;
            //let addr = addresslist !==null && addresslist.filter(item => item.address_id === );  
            company = companylist !== null && companylist.filter(item => item.company_id !== null && item.company_id.includes(serJob.user.company_id))
            if (company.length > 0)
                newsearchJob[index].company = company;
        });
        let jobListFinal = [];
        jobList.map((item) => {
            let userList = functions.getListUser(this.state.searchJob, item);
            let checkExist = false;
            if (Array.isArray(userList) && userList.length > 0) {
                checkExist = true;
            }

            if (checkExist)
                jobListFinal.push(item);
        });



        this.setState({
            searchJob: newsearchJob.filter(val => val.user.user_id !== admin.user_id),
            jobSearchProfiles: jobListFinal
        })
    }

    checkExistUser(jobList, user_id) {
        let position = -1;

        jobList.map((item, index) => {
            if (item.user.user_id == user_id)
                position = index;
        })

        return position;
    }

    mixJobProfile(jobProfileList) {
        let result = [];

        jobProfileList.map((item, index) => {
            // if result is empty
            if (result.length == 0) {
                try {
                    let obj = {};

                    obj.user = item.user;

                    obj.profiles = [];
                    obj.profiles.push(item);
                    delete obj.profiles[0].user;

                    result.push(obj);
                } catch (error) {
                    console.log(error);
                }
            } else { // if ready to have data
                let countResult = result.length;

                try {
                    let position = this.checkExistUser(result, item.user.user_id);
                    // if user is exist 
                    if (position >= 0) {
                        let obj = item;
                        delete obj.user;

                        // add profile for user
                        result[position].profiles.push(obj);
                    } else { // if user not exist
                        let obj = {};

                        obj.user = item.user;

                        obj.profiles = [];
                        obj.profiles.push(item);
                        delete obj.profiles[0].user;

                        result.push(obj);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })

        return result;
    }

    async componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {

            let jobListFinal = [];
            this.props.jobSearchProfiles.map((item) => {
                let userList = functions.getListUser(this.state.searchJob, item);
                let checkExist = false;
                if (Array.isArray(userList) && userList.length > 0) {
                    checkExist = true;
                }

                if (checkExist)
                    jobListFinal.push(item);
            });


            this.setState({
                // recentChatList: this.props.recentChatList,
                jobSearchProfiles: jobListFinal
            });

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.recentChatList !== nextProps.recentChatList) {
            this.setState({
                recentChatList: nextProps.recentChatList,
            });
        }
    }

    handleChange(e) {
        this.setState({ searchChat: e.target.value });
        var search = e.target.value;
        let conversation = this.state.recentChatList;
        let filteredArray = [];

        //find conversation name from array
        for (let i = 0; i < conversation.length; i++) {
            if (conversation[i].name.toLowerCase().includes(search) || conversation[i].name.toUpperCase().includes(search))
                filteredArray.push(conversation[i]);
        }

        //set filtered items to state
        this.setState({ recentChatList: filteredArray })

        //if input value is blanck then assign whole recent chatlist to array
        if (search === "") this.setState({ recentChatList: this.props.recentChatList })
    }

    openUserChat(e, chat) {
        console.log(chat);
        e.preventDefault();

        //find index of current chat in array
        var index = this.props.recentChatList.indexOf(chat);

        // set activeUser 
        this.props.activeUser(index);

        var chatList = document.getElementById("chat-list");
        var clickedItem = e.target;
        var currentli = null;

        if (chatList) {
            var li = chatList.getElementsByTagName("li");
            //remove coversation user
            for (var i = 0; i < li.length; ++i) {
                if (li[i].classList.contains('active')) {
                    li[i].classList.remove('active');
                }
            }
            //find clicked coversation user
            for (var k = 0; k < li.length; ++k) {
                if (li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                }
            }
        }

        //activation of clicked coversation user
        if (currentli) {
            currentli.classList.add('active');
        }

        var userChat = document.getElementsByClassName("user-chat");
        if (userChat) {
            userChat[0].classList.add("user-chat-show");
        }

        //removes unread badge if user clicks
        var unread = document.getElementById("unRead" + chat.id);
        if (unread) {
            unread.style.display = "none";
        }
    }

    searchUser(item) {
        // const listJobProfileMobile = getjob_search_profiles_all();
        const searchResult = functions.getListUser(this.state.searchJob, item);
        const userIds = searchResult.map(item => item.user.user_id);
        const users = this.state.recentChatList.filter(item => userIds.includes(item.user_id));
        setTimeout(() => {
            this.setState({ chatList: users, loading: false });
        }, 1000);

    }

    handleJobProfileClick(item) {
        this.setState({ loading: true });

        if (item == "All") {

            setTimeout(() => {
                this.setState({ chatList: this.state.recentChatList, loading: false });
            }, 1000);
        } else {
            this.searchUser(item);
        }

    }

    render() {
        return (
            <React.Fragment>
                {(this.state.loading) && <div className='loader'></div>}
                <div className='col-md-3 scroller mess-l'>
                    <ul className='content'>
                        <li style={{ cursor: "pointer" }} onClick={() => { this.handleJobProfileClick("All") }}>{t("t_all").toUpperCase()}</li>
                        {this.state.jobSearchProfiles.map((item) =>
                            <li style={{ cursor: "pointer" }} onClick={() => { this.handleJobProfileClick(item) }}><a>{item.job_decription}</a></li>
                        )}
                    </ul>
                </div>
                <div className='col-md-4 scroller s-center'> {/*
                    <div className="px-4 pt-4">
                        <div className="search-box chat-search-box">
                            <InputGroup className="mb-3 rounded-3">
                                <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                    <i className="ri-search-line search-icon font-size-18"></i>
                                </span>
                                <Input type="text" value={this.state.searchChat} onChange={(e) => this.handleChange(e)} className="form-control bg-light" placeholder="Search messages or users" />
                            </InputGroup>
                        </div>
                        {/* Search Box 
                    </div>
                    */}


                    {/* Start chat-message-list  */}
                    <div>
                        <SimpleBar className="chat-message-list">
                            {this.state.chatList.length > 0 &&
                                <ul className="list-unstyled chat-list chat-user-list px-2" id="chat-list">
                                    {
                                        this.state.chatList.map((chat, key) =>
                                            <li key={key} id={"conversation" + key} className={chat.unRead ? "unread" : chat.isTyping ? "typing" : key === this.props.active_user ? "active" : ""}>
                                                <Link to="#" onClick={(e) => this.openUserChat(e, chat)}>
                                                    <div className="d-flex">
                                                        {
                                                            chat.profilePicture === "Null" ?
                                                                <div className={"chat-user-img " + chat.status + " align-self-center ms-0"}>
                                                                    <div className="avatar-xs">
                                                                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                                            {chat.name.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                    {
                                                                        chat.status && <span className="user-status"></span>
                                                                    }
                                                                </div>
                                                                :
                                                                <div className={"chat-user-img " + chat.status + " align-self-center ms-0"}>
                                                                    <img src={config.API_BASE_URL + "/" + chat.profilePicture} className="rounded-circle avatar-xs" alt="chatvia" />
                                                                    {
                                                                        chat.status && <span className="user-status"></span>

                                                                    }
                                                                </div>
                                                        }

                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <h5 className="text-truncate font-size-15 mb-1 ms-3">{chat.name}</h5>
                                                            <p className="chat-user-message font-size-14 text-truncate mb-0 ms-3">
                                                                {
                                                                    chat.isTyping ?
                                                                        <>
                                                                            typing<span className="animate-typing">
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                            </span>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle me-1"></i> : null
                                                                            }
                                                                            {
                                                                                chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle me-1"></i> : null
                                                                            }
                                                                            {
                                                                                chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].message : null
                                                                            }
                                                                        </>
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="font-size-11">{chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].time : null}</div>
                                                        {chat.unRead === 0 ? null :
                                                            <div className="unread-message" id={"unRead" + chat.id}>
                                                                <span className="badge badge-soft-danger rounded-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead : ""}</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            }
                            {this.state.chatList.length == 0 && <h6>No User</h6>}
                        </SimpleBar>

                    </div>
                    {/* End chat-message-list */}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    return { active_user };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser, setFullUser })(Chats);
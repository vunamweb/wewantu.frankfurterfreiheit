import React from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

//Import Components
import Searchcenter from './Tabs/Searchcenter';
import AddJob from './Tabs/AddJob';
import AddCategory from './Tabs/AddCategory';
import Jobs from './Tabs/Jobs';
import Watchlist from './Tabs/Watchlist';
import Chats from "./Tabs/Chats";
import UserChat from "./UserChat/index";
import AccountSetting from './Tabs/AccountSetting';
import UserAccount from './Tabs/UserAccount';
import UserAdministration from './Tabs/UserAdministration';
import PayMents from './Tabs/PayMents';
import Credits from './Tabs/Credits';
import Subcribe from './Tabs/Subcribe';
function ChatLeftSidebar(props) {
    const activeTab = props.activeTab;
    return (
        <React.Fragment>
                <TabContent activeTab={activeTab}  >
                    <TabPane tabId="jobs" id="pills-jobs"   >
                        <Jobs />
                    </TabPane>
                    <TabPane tabId="addnewjob" id="pills-addnewjob">
                        <AddJob />
                    </TabPane>
                    
                    <TabPane tabId="addnewcategory" id="pills-addnewcategory">
                        <AddCategory />
                    </TabPane>
                    <TabPane tabId="searchcenter" id="pills-searchcenter">
                        <Searchcenter />
                    </TabPane>
                    <TabPane tabId="watchlist" id="pills-watchlist">
                        <Watchlist />
                    </TabPane>                    
                    <TabPane tabId="mess" id="pills-mess">        
                        <div className="row">                
                            <Chats recentChatList={props.recentChatList} />
                            <UserChat recentChatList={props.recentChatList} />
                        </div>
                    </TabPane>
                    
                    <TabPane tabId="subcribe" id="pills-subcribe">
                        <Subcribe />
                    </TabPane>
                    <TabPane tabId="credits" id="pills-credits">
                        <Credits />
                    </TabPane>
                    <TabPane tabId="useraccount" id="pills-useraccount">
                        <UserAccount />
                    </TabPane> 
                    <TabPane tabId="accountsetting" id="pills-accountsetting">
                        <AccountSetting />
                    </TabPane> 
                    <TabPane tabId="useradministration" id="pills-useradministration">
                        <UserAdministration />
                    </TabPane>
                    <TabPane tabId="payments" id="pills-useradministration">
                        <PayMents />
                    </TabPane>
                </TabContent>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, null)(ChatLeftSidebar);
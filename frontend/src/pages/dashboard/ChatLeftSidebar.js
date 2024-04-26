import React, { useEffect,useState } from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";
import { getLoggedInUser,setProfessions,setdriver_licenses,setlanguages,setjob,setjob_search_profiles,setAllUser } from '../../helpers/authUtils';
import { APIClient } from '../../helpers/apiClient';
//Import Components
import Searchcenter from './Tabs/Searchcenter';
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
    const [loadlang, setloadlang] = useState(true);
    const [loadwatchlist, setwatchlist] = useState(true);
    const admin=getLoggedInUser()[0];
    const [professions, setprofessions] = useState([]);
    if(admin ===null){
        localStorage.removeItem("authUser");
        localStorage.removeItem("session_secret"); 
    }
        
    useEffect(() => {

        if(loadlang && admin){
            //load professions
            new APIClient().get('user').then(res=>{
                if(res){
                    setAllUser(res);
                } 
            });

            new APIClient().get('professions').then(res=>{
                if(res){
                    //const professionsData = res.map((item) => ({
                    //    label: item.profession,
                    //    value: item.profession_id
                    //  }));
                    //setprofessions(professionsData);
                    //localStorage.setItem('professions',JSON.stringify(res));
                    //console.log(JSON.parse(localStorage.professions))
                    setProfessions(res);
                } 
            });

            //load job_search_profiles
            new APIClient().get('user/'+admin.user_id+'/job_search_profiles').then(res =>{
                if(res){  
                    setjob_search_profiles(res)
                }
            });
            //load driver_licenses
            new APIClient().get('driver_licenses').then(res=>{
                if(res){
                    const driver_licensesData = res.data !== '' &&  res.map((item) => ({
                        label: item.driver_license,
                        value: item.driver_license_id
                      }));
                      setdriver_licenses(driver_licensesData);
                }                    
            });

            new APIClient().get('languages').then(res=>{
                if(res){
                    const languagesData = res.map((item) => ({
                        label: item.language,
                        value: item.language_id
                      }));
                    setlanguages(languagesData);
                    
                } 
            });

            new APIClient().get('https://api.topazvn.vn/tmp/job.php?lng=en').then(res=>{
                if(res){
                    const jobsData = res.map((item) => ({
                        label: item.name,
                        value: item.id
                      }));
                      setjob(jobsData);
                } 
            });

            
            setloadlang(false);
        }            
    },[loadlang,admin]);
    return (
        <React.Fragment>
                <TabContent activeTab={activeTab}  >
                    <TabPane tabId="jobs" id="pills-jobs"   >
                        <Jobs activeTab={activeTab}/>
                    </TabPane>
                    <TabPane tabId="addnewjob" id="pills-addnewjob">
                        <Jobs activeTab={activeTab}/>
                    </TabPane>
                    
                    <TabPane tabId="addnewcategory" id="pills-addnewcategory">
                        <AddCategory professions={[professions, setprofessions]}/>
                    </TabPane>
                    <TabPane tabId="searchcenter" id="pills-searchcenter">
                        <Searchcenter professions={professions}/>
                    </TabPane>
                    <TabPane tabId="watchlist" id="pills-watchlist">
                        <Watchlist loadwatchlist={loadwatchlist} setwatchlist={setwatchlist} activeTab={activeTab}/>
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
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";

import { TabContent, TabPane } from "reactstrap";
import { getLoggedInUser, setProfessions, setdriver_licenses, setlanguages, setjob, setjob_search_profiles, setAllUser, setjob_search_profiles_all } from '../../helpers/authUtils';
import { APIClient } from '../../helpers/apiClient';
//Import Components
import Searchcenter from './Tabs/Searchcenter';
import AddCategory from './Tabs/AddCategory';
import Jobs from './Tabs/Jobs';
import ArchiveJob from './Tabs/ArchiveJob';
import Watchlist from './Tabs/Watchlist';
import Blocklist from './Tabs/BlockList';
import Chats from "./Tabs/Chats";
import UserChat from "./UserChat/index";
import AccountSetting from './Tabs/AccountSetting';
import UserAccount from './Tabs/UserAccount';
import UserAdministration from './Tabs/UserAdministration';
import PayMents from './Tabs/PayMents';
import Credits from './Tabs/Credits';
import Subcribe from './Tabs/Subcribe';
import config from '../../config';
import { Input } from 'antd';
import { t } from 'i18next';
import StaticPage from './Tabs/StaticPage';
import { setUserPayments } from '../../redux/actions';

function ChatLeftSidebar(props) {
    const activeTab = props.activeTab;
    const setSearch = props.setSearch;
    const [loadlang, setloadlang] = useState(true);
    const [loadwatchlist, setwatchlist] = useState(true);
    const [loadblocklist, setblocklist] = useState(true);
    const admin = getLoggedInUser()[0];
    const [professions, setprofessions] = useState([]);
    const [jobSearchProfiles, setJobSearchProfiles] = useState([]);

    const language = useSelector(state => state.Layout.language);

    if (admin === null) {
        localStorage.removeItem("authUser");
        localStorage.removeItem("session_secret");
    }

    useEffect(() => {

        if (loadlang && admin) {
            //load professions
            new APIClient().get('user').then(res => {

                if (res) {
                    setAllUser(res);
                }
            });

            //load payments
            new APIClient().get('user/' + admin.user_id + '/user_payment').then(res => {
                if (res.length > 0) {
                    setUserPayments(res);
                }
            })


            // load watchlist and save local
            new APIClient().get('user/' + admin.user_id + '/user_watchlist').then(res => {

                if (res) {
                    localStorage.setItem('watchlist', JSON.stringify(res));
                }
            });

            new APIClient().get('professions').then(res => {
                if (res) {
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
            new APIClient().get('user/' + admin.user_id + '/job_search_profiles').then(res => {
                if (res) {
                    setJobSearchProfiles(res);
                    setjob_search_profiles(res)
                }
            });

            //load job_search_profiles_all
            new APIClient().get('list_job_search_profiles').then(res => {
                if (res) {
                    setjob_search_profiles_all(res)
                }
            });

            //load driver_licenses
            new APIClient().get('driver_licenses').then(res => {
                if (res) {
                    const driver_licensesData = res.data !== '' && res.map((item) => ({
                        label: item.driver_license,
                        value: item.driver_license_id
                    }));
                    setdriver_licenses(driver_licensesData);
                }
            });

            new APIClient().get('languages').then(res => {
                if (res) {
                    const languagesData = res.map((item) => ({
                        label: item.language,
                        value: item.language_id
                    }));
                    setlanguages(languagesData);

                }
            });

            new APIClient().get(config.API_BASE_URL + '/tmp/job.php?lng=' + language).then(res => {
                if (res) {
                    const jobsData = res.map((item) => ({
                        label: item.name,
                        value: item.id
                    }));
                    setjob(jobsData);
                }
            });

            setloadlang(false);
        }
    }, [loadlang, admin]);
    return (
        <React.Fragment>
            <TabContent activeTab={activeTab}  >
                <TabPane tabId="jobs" id="pills-jobs"   >
                    <Jobs activeTab={activeTab} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="archivejobs" id="pills-jobs"   >
                    <ArchiveJob activeTab={activeTab} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="addnewjob" id="pills-addnewjob">
                    <Jobs activeTab={activeTab} />
                </TabPane>

                <TabPane tabId="addnewcategory" id="pills-addnewcategory">
                    <AddCategory professions={[professions, setprofessions]} />
                </TabPane>
                <TabPane tabId="searchcenter" id="pills-searchcenter">
                    <Searchcenter professions={professions} />
                </TabPane>
                <TabPane tabId="watchlist" id="pills-watchlist">
                    <Watchlist recentChatList={props.recentChatList} loadwatchlist={loadwatchlist} setwatchlist={setwatchlist} activeTab={activeTab} />
                </TabPane>
                <TabPane tabId="blocklist" id="pills-blocklist">
                    <Blocklist loadwatchlist={loadwatchlist} setwatchlist={setwatchlist} activeTab={activeTab} />
                </TabPane>
                <TabPane tabId="mess" id="pills-mess">
                    <div class="main-mes">
                        <div class="row">
                            <div class="row">
                                <div class="col-md">

                                    <nav class="navbar navbar-expand-md navbar-light">
                                        <div class="container-fluid ">
                                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                <span class="navbar-toggler-icon"></span>
                                            </button>

                                            <div class="title">{t("t_massage_center").toUpperCase()}</div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <Chats jobSearchProfiles={jobSearchProfiles} recentChatList={props.recentChatList} />
                            <UserChat recentChatList={props.recentChatList} />
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId="subcribe" id="pills-subcribe">
                    <Subcribe />
                </TabPane>
                <TabPane tabId="credits" id="pills-credits">
                    <Credits />
                </TabPane>
                {/* <TabPane tabId="useraccount" id="pills-useraccount">
                        <UserAccount />
                    </TabPane>   */}
                <TabPane tabId="accountsetting" id="pills-accountsetting">
                    <AccountSetting />
                </TabPane>
                <TabPane tabId="wewantu" id='pills-wewantu'>
                    <StaticPage pageName="wewantu" />
                </TabPane>
                <TabPane tabId="investorrelations" id='pills-investorrelations'>
                    <StaticPage pageName="investorrelations" />
                </TabPane>
                <TabPane tabId="theapp" id='pills-theapp'>
                    <StaticPage pageName="theapp" />
                </TabPane>
                <TabPane tabId="impressum" id='pills-impressum'>
                    <StaticPage pageName="impressum" />
                </TabPane>
                <TabPane tabId="datenschutz" id='pills-datenschutz'>
                    <StaticPage pageName="datenschutz" />
                </TabPane>

                {/* <TabPane tabId="useradministration" id="pills-useradministration">
                        <UserAdministration />
                    </TabPane> */}
                {/* <TabPane tabId="payments" id="pills-useradministration">
                    <PayMents />
                </TabPane> */}
            </TabContent>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {setUserPayments})(ChatLeftSidebar);
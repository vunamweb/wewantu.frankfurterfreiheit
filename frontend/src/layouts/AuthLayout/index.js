import React, { Component } from 'react';
import withRouter from "../../components/withRouter";
import { connect, useDispatch } from "react-redux"
import PropTypes from "prop-types";
import { changeLayoutMode, setListUserProfile } from '../../redux/actions';

//Import Components
import LeftSidebarMenu from "./LeftSidebarMenu";
import TopSidebarMenu from "./TopSidebarMenu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import functions from '../../function/function';
import { APIClient } from '../../helpers/apiClient';
import { getLoggedInUser } from '../../helpers/authUtils';
import { SET_LIST_USER_PROFILE } from '../../redux/layout/constants';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.capitalizeFirstLetter.bind(this);
    }

    //function for capital first letter of current page pathname
    capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    async componentDidMount() {
        var getLayoutMode = localStorage.getItem("layoutMode");
        this.props.changeLayoutMode(getLayoutMode);
        if (getLayoutMode) {
            this.props.changeLayoutMode(getLayoutMode);
        } else {
            this.props.changeLayoutMode(this.props.layout.layoutMode);
        }

        const admin = getLoggedInUser()[0];
        let companylist = await new APIClient().get('companylist');
        let addresslist = await new APIClient().get('addresslist');
        let searchJob = await new APIClient().get('list_job_search_profiles');
        let allUserDriveList = await new APIClient().get('all/user_driver');
        let allUserLanguageList = await new APIClient().get('all/user_language');
        let jobList = await new APIClient().get('user/' + admin.user_id + '/job_search_profiles');
        // let watchlist = await new APIClient().get('user/' + admin.user_id + '/user_watchlist');
        this.renData(addresslist, searchJob, companylist, allUserDriveList, allUserLanguageList, jobList);

        // let currentage = this.capitalizeFirstLetter(this.props.router.location.pathname);

        //set document title according to page path name
        // document.title = currentage + " | Chatvia - Responsive Bootstrap 5 Admin Dashboard";
    }

    renData(addresslist, searchJob, companylist, allUserDriveList, allUserLanguageList, jobList) {

        let newsearchJob = [...searchJob]
        const jobSearchIds = jobList.map(job => job.job_search_profile_id);
        
        // watchlist.length > 0 && watchlist.map(itemwl => {

        //     newsearchJob = newsearchJob.filter(item => item.user.user_id !== itemwl.user_add_id && itemwl.type == 1)
        // })


        // get list of user from web
        newsearchJob = newsearchJob.filter(item => {
            return item.user.firebase_token != null
        })

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

        newsearchJob = functions.mixJobProfile(newsearchJob);

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



            /*
            let checkinwatchlist = watchlist.filter(item => item.job_search_profile.job_search_profile_id.includes(serJob.job_search_profile_id)).length >0
            if(checkinwatchlist){
                try {
                  //  newsearchJob[index] !== null && newsearchJob.splice(0,1);
                   console.log(newsearchJob[index])
                } catch (e) {
                    throw new Error('No neighbour found.');
                }
            }
            */

        }); 

       

       this.props.setListUserProfile(newsearchJob);

        // localStorage.setItem('listUserProfile', JSON.stringify(newsearchJob));

        // this.setState({
        //     // listuser: listuser,
        //     listJobProfileAll: searchJob,
        //     listJobProfileMobile: newsearchJob.filter(val => val.user.user_id !== admin.user_id),
        //     jobList: jobList,
        //     //loading: true
        // })
    }

    render() {
        return (
            <React.Fragment>
                <div className="layout-wrapper d-lg-flex">
                    {/* left sidebar menu */}
                    <LeftSidebarMenu />
                    <div className='main-a py-3' width='100%'>
                        <TopSidebarMenu />
                        {this.props.children}
                    </div>


                </div>
                <ToastContainer position='bottom-right' />
            </React.Fragment>
        );
    }
}

Index.propTypes = {
    layoutMode: PropTypes.any,
};

const mapStateToProps = state => {
    const { layoutMode } = state.Layout;
    return { layoutMode };
};

// const mapDispatchToProps = (dispatch) => ({
//     setListUserProfile: () => dispatch({ type: SET_LIST_USER_PROFILE }),
// });

export default withRouter(connect(mapStateToProps,{ changeLayoutMode,setListUserProfile })(Index))
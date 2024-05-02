import React, { Component } from 'react';
import SearchCenterTable from '../Tables/SearchCenterTable';
import { Select } from "antd";
import { APIClient } from '../../../helpers/apiClient';
import { getLoggedInUser, getProfessions } from '../../../helpers/authUtils';
import { t } from 'i18next';
class SearchProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchData: [],
            listuser: [],
            searchJob: [],
            limit: 5,
        };

    }

    async componentDidMount() {
        const admin = getLoggedInUser()[0];
        let companylist = await new APIClient().get('companylist');
        let addresslist = await new APIClient().get('addresslist');
        let searchJob = await new APIClient().get('list_job_search_profiles');
        let allUserDriveList = await new APIClient().get('all/user_driver');
        let allUserLanguageList = await new APIClient().get('all/user_language');
        let jobList = await new APIClient().get('user/' + admin.user_id + '/job_search_profiles');
        let watchlist = await new APIClient().get('user/' + admin.user_id + '/user_watchlist');
        this.renData(addresslist, searchJob, companylist, watchlist, allUserDriveList, allUserLanguageList, jobList);
    }
    renData(addresslist, searchJob, companylist, watchlist, allUserDriveList, allUserLanguageList, jobList) {
        const admin = getLoggedInUser()[0];
        let newsearchJob = [...searchJob]

        watchlist.length > 0 && watchlist.map(itemwl => {

            newsearchJob = newsearchJob.filter(item => item.user.user_id !== itemwl.user_add_id || itemwl.type == 1 )
        })

        // get list of user from mobile
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

        //localStorage.setItem('listUserProfile', JSON.stringify(newsearchJob));

        this.setState({
            // listuser: listuser,
            searchJob: newsearchJob.filter(val => val.user.user_id !== admin.user_id),
            searchData: newsearchJob.filter(val => val.user.user_id !== admin.user_id),
            jobList: jobList,
            loading: true
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

    exist(parent, child) {
        let exist = false;

        if(parent == undefined)
        exist = true;

        try {
            child.map((item, index) => {
                if (parent == undefined || parent.indexOf(item) !== -1)
                    exist = true;
            })
        } catch (error) {
            console.log(error);
        }

        return exist;
    }

    existJOBID(jobListParent, jobListChild) {
        let exist = false;

        try {
            jobListChild.map((item, index) => {
                if (jobListParent == item.job_id)
                    exist = true;
            })
        } catch (error) {
            console.log(error);
        }

        return exist;
    }
    
    checkMapJob(search, job) {
        let check = false;

        try {
            let searchDrive = search.drive;
            let jobDrive = job.user.drive;

            let searchLanguageMother = (search.language != undefined) ? search.language.mother : undefined;
            let jobLanguageMother = job.user.language.mother;

            let searchLanguageForeign = (search.language != undefined) ? search.language.foreign : undefined;
            let jobLanguageForeign = job.user.language.foreign;

            let seachJobID = search.job_id;
            let jobList= job.profiles;

            if (this.exist(searchDrive, jobDrive) && this.exist(searchLanguageMother, jobLanguageMother)
                && this.exist(searchLanguageForeign, jobLanguageForeign) && this.existJOBID(seachJobID, jobList))

                check = true;
        } catch (error) {
            console.log(error);
        }

        return check;
    }

    render() {
        document.title = "SEARCH CENTER | WEWANTU"
        const professions = getProfessions();

        let filterSearch = [];

        let search =  localStorage.getItem('search_job_profile');
        search = JSON.parse(search);

        try {
            this.state.searchData.map((item, index) => {
                if(this.checkMapJob(search, item))
                   filterSearch.push(item);
             })
        } catch(error) {
            console.log(error);
        }
        
        const { loading, searchData, searchJob } = this.state;
        return (

            <>
                <React.Fragment>
                {!loading && (<div className="loader"></div>)}
                    <div className="main_job">
                        <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>
                            <SearchCenterTable searchData={filterSearch} />
                        </div>
                    </div>
                
                </React.Fragment>
            </>
        );
    }
}


export default SearchProfile;
import React, { Component } from 'react';
import SearchCenterTable from '../Tables/SearchCenterTable';
import { Select } from "antd";
import { APIClient } from '../../../helpers/apiClient';
import { getLoggedInUser, getProfessions } from '../../../helpers/authUtils';
import { t } from 'i18next';
class Searchcenter extends Component {
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

        localStorage.setItem('listUserProfile', JSON.stringify(newsearchJob));

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

        try {
            child.map((item, index) => {
                if (parent.indexOf(item) !== -1)
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
                if (jobListParent.indexOf(item.job_id) !== -1)
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

            let searchLanguageMother = search.language.mother;
            let jobLanguageMother = job.user.language.mother;

            let searchLanguageForeign = search.language.foreign;
            let jobLanguageForeign = job.user.language.foreign;

            let seachJobID = search.job_ids;
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


        const onChange = (values) => {
            let jobList = this.state.jobList;

            // let value to search
            let seachData = {};

            seachData.drive = [];

            seachData.language = {};
            seachData.language.mother = [];
            seachData.language.foreign = [];

            seachData.job_ids = [];

            jobList.map((item, index) => {
                try {
                    if (item.profession.profession_id == values) {
                        if (item.language.language_id != undefined)
                            seachData.language.mother.push(item.language.language_id);

                        if (item.foreign_language_id != undefined)
                            seachData.language.foreign.push(item.foreign_language_id);

                        if (item.driver_license.driver_license_id != undefined)
                            seachData.drive.push(item.driver_license.driver_license_id);
                        
                            if (item.job_id != undefined)
                            seachData.job_ids.push(item.job_id);
                        
                    }
                } catch (error) {
                    console.log(error)
                }
            })
            // END

            let resultSearch = [];

            if (values == 'all') {
                resultSearch = [...searchJob];
            } else {
                try {
                    this.state.searchJob.map((item, index) => {
                        if (this.checkMapJob(seachData, item))
                            resultSearch.push(item)
                    })
                } catch (error) {
                    console.log(error);
                }
            }

            this.setState({ searchData: resultSearch });

            /* if (values === 'all') {
                //this.renData (this.state.listuser,this.state.searchJob)
                this.setState({
                    // listuser: listuser,
                    searchData: searchJob
                })

            }
            else {
                let oldsearchData = [...searchJob];
                this.setState({
                    // listuser: listuser,
                    searchData: oldsearchData.filter(profession => profession.profession.profession_id !== null && profession.profession.profession_id.includes(values))
                })
                //let a = this.state.searchJob !==null && this.state.searchJob.filter(profession => profession.profession.profession_id !==null && profession.profession.profession_id.includes(values));     
                //this.renData (this.state.listuser,a)
            } */
        }

        const { loading, searchData, searchJob } = this.state;
        return (

            <>
                <React.Fragment>
                    {!loading && (<div className="loader"></div>)}
                    <div className="main_job">
                        <div className='row g-3 title'>
                            <div className="col-md">{t('t_search_center').toUpperCase()}</div>
                            <div className="col-md-4 align-middle">
                                <Select
                                    showSearch
                                    id="category"
                                    name="category"
                                    className="form-control searchcenterselect title"
                                    placeholder={t('t_category').toUpperCase()}
                                    onChange={onChange}
                                //options={professions.map((item) => ({
                                // label: item.profession,
                                //    value: item.profession_id
                                // }))}
                                >
                                    <Select.Option value="all">All</Select.Option>
                                    {professions !== null && professions.map((item) => (
                                        <Select.Option value={item.profession_id}>{item.profession}</Select.Option>
                                    ))}

                                </Select>
                            </div>
                        </div>
                        <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>
                            <SearchCenterTable searchData={searchData} />
                        </div>
                    </div>
                </React.Fragment>
            </>
        );
    }
}


export default Searchcenter;
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

            newsearchJob = newsearchJob.filter(item => item.job_search_profile_id !== itemwl.job_search_profile.job_search_profile_id)
        })

        newsearchJob = newsearchJob.filter(item => {
            return item.user.firebase_token != null
        })

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

        this.setState({
            // listuser: listuser,
            searchJob: newsearchJob.filter(val => val.user.user_id !== admin.user_id),
            searchData: newsearchJob.filter(val => val.user.user_id !== admin.user_id),
            jobList: jobList,
            loading: true
        })
    }

    render() {
        document.title = "SEARCH CENTER | WEWANTU"
        const professions = getProfessions();


        const onChange = (values) => {
            let jobList = this.state.jobList;

            let seachData = {};
            seachData.drive = [];

            seachData.language = {};
            seachData.language.mother = [];
            seachData.language.foreign = [];

            jobList.map((item, index) => {
                try {
                    if (item.profession.profession_id == values || values == 'all') {
                        if (item.language.language_id != undefined)
                            seachData.language.mother.push(item.language.language_id);

                        if (item.foreign_language_id != undefined)
                            seachData.language.foreign.push(item.foreign_language_id);

                        if (item.driver_license.driver_license_id != undefined)
                            seachData.drive.push(item.driver_license.driver_license_id);
                    }
                } catch (error) {
                    console.log(error)
                }
            })

            if (values === 'all') {
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
            }

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
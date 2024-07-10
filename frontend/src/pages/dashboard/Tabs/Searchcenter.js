import React, { Component } from 'react';
import SearchCenterTable from '../Tables/SearchCenterTable';
import { Select } from "antd";
import { APIClient } from '../../../helpers/apiClient';
import { getLoggedInUser, getProfessions, saveListApplicant } from '../../../helpers/authUtils';
import { t } from 'i18next';
import functions from '../../../function/function';
import { connect, useSelector, useDispatch } from 'react-redux';
import JobSearchProfile from '../Component/JobSearchProfile';
import config from "../../../config";
import { setListUserProfile } from '../../../redux/actions';

class Searchcenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showListJob: true,
            searchData: [],
            listuser: [],
            listJobProfile: [],
            searchJob: [],
            search: false,
            searchItem: {},
            filter: false,
            categoryID: 'all',
            watchlist: [],
            limit: 5,
            countSearch: 0,
            callBack: false,
            listJobProfileMobile: []
        };
    }

    async componentDidMount() {
        this.state.searchItem = this.props.data;
        this.state.search = true;

        if (this.props.data != null) {
            let data = {};
            data.job_search_profile_id = this.props.data.job_search_profile_id;

            this.startSearch(data, this.props.data);
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            const admin = getLoggedInUser()[0];
            if (this.props.data) {
                const data = this.props.data;
                // this.setState({searchItem:data,search:true,showListJob:false});
                this.state.searchItem = this.props.data;
                this.state.search = true;
            }
            let watchlist = await new APIClient().get('user/' + admin.user_id + '/user_watchlist');
            this.setState({ showListJob: this.props.showListJob, listJobProfileMobile: this.props.listJobProfileMobile, watchlist: watchlist });
        }

    }

    onClickJobProfile = (item) => {
        let data = {};
        data.job_search_profile_id = item.job_search_profile_id;

        this.startSearch(data, item);
        //this.setState({ search: true, loading: true, searchItem: item })
    }

    startSearch = (data, searchItem) => {
        const urlListApplicant = config.API_URL + "list_applicant_test";

        this.setState({ loading: true });

        new APIClient().create(urlListApplicant, data).then(async list_applicant => {
            if (list_applicant) {
                try {
                    console.log(list_applicant);
                    let newListApplicant = functions.addManyAttributeForListApplicant(list_applicant);
                    let companylist = await new APIClient().get('companylist');
                    let addresslist = await new APIClient().get('addresslist');

                    let render = functions.renData(addresslist, newListApplicant, companylist);

                    this.setState({ listJobProfileMobile: render, searchItem: searchItem, loading: false });

                    //await saveListApplicant(render);
                } catch (error) {
                    console.log(error);
                    //list_applicant = [];
                }

                //this.renData(addresslist, list_applicant, companylist);
            }
        })
    }

    getFirstListofApplicant = (listUser) => {
        let listUserTemp = [];

        try {
            listUser.map((item, index) => {
                if (index < 100)
                    listUserTemp.push(item);
            })
        } catch (error) {
            console.log(error);
        }

        return listUserTemp;
    }

    render() {
        document.title = "SEARCH CENTER | WEWANTU"
        const professions = getProfessions();

        //this.state.listJobProfileMobile = this.props.listJobProfileMobile;
        //this.state.listJobProfileMobile = this.props.listJobProfileMobile;

        const onChange = (categoryID) => {
            //let resultSearch = this.getJobProfile(values);

            this.setState({ categoryID: categoryID });
        }

        let filterSearch, listUser = [];

        let search = (localStorage.getItem('search_job_profile') != "null") ? localStorage.getItem('search_job_profile') : JSON.stringify(this.props.data);

        //if search
        if (this.state.search) {
            if (this.state.searchItem == null) {
                filterSearch = this.state.listJobProfileMobile;
                listUser = [];
            }
            else {
                filterSearch = functions.getListUser(this.state.listJobProfileMobile, this.state.searchItem, this.state.callBack);
                filterSearch.map((item) => {
                    item.profiles = item.profiles.filter(profile => profile.job_id == this.state.searchItem.job_id);
                });

                listUser = filterSearch;
            }

            // set count of search
            try {
                filterSearch = functions.filterFromBlockList(filterSearch);
                this.state.countSearch = filterSearch.length;
            } catch (error) {
                console.log(error);
            }
            // end
            //remove block list
            /*const blockIds = this.state.watchlist.filter(w=>w.type==0).map(w => w.user_add_id);
            filterSearch = filterSearch.filter(f => !blockIds.includes(f.user.user_id));*/
        }
        // if click search center
        else if (search == 'null' && !this.state.search)
            filterSearch = [];
        // if filter
        else if (search == 'null' && this.state.filter)
            filterSearch = [];
        // go to after search
        else {
            try {
                search = JSON.parse(search);
            } catch (error) {
                search = [];
                console.log(error);
            }

            filterSearch = functions.getListUser(this.state.listJobProfileMobile, search);
            listUser = filterSearch;
            this.state.countSearch = filterSearch.length;

            localStorage.setItem('search_job_profile', null);
        }

        const { loading, showListJob } = this.state;

        let listUserTemp = this.getFirstListofApplicant(listUser);

        return (
            <>
                <React.Fragment>
                    {loading == true && (<div className="loader"></div>)}
                    {(showListJob) && <JobSearchProfile listJobProfileMobile={this.state.listJobProfileMobile} onSelect={onChange} categoryID={this.state.categoryID} onClickJobProfile={this.onClickJobProfile} />}
                    <div class="main-mes">
                        <div className="main_job">
                            <div className='row g-3 title'>
                                {
                                    this.state.searchItem != null ?
                                        <div className="col-md">{t('t_search_center').toUpperCase()}{this.state.countSearch > 0 ? "(" + this.state.countSearch + ")" : "(" + t("t_no_data_found") + ")"}</div>
                                        : null
                                }
                                <div className="col-md-4 align-middle">

                                </div>
                            </div>
                            <div className="table-responsive" data-mdb-perfect-scrollbar="false">
                                <SearchCenterTable searchData={listUserTemp} component={this} />
                            </div>
                        </div>

                    </div>
                </React.Fragment>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.SearchCenter.searchFilterData,
        showListJob: state.SearchCenter.showJobFilter,
        listJobProfileMobile: state.Layout.listUserProfile
    };
};

export default connect(mapStateToProps)(Searchcenter);
// export default Searchcenter;
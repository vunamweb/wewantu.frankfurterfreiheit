import React, { Component } from 'react';
import SearchCenterTable from '../Tables/SearchCenterTable';
import { Select } from "antd";
import { APIClient } from '../../../helpers/apiClient';
import { getLoggedInUser, getProfessions } from '../../../helpers/authUtils';
import { t } from 'i18next';
import functions from '../../../function/function';
import { connect, useSelector } from 'react-redux';
import JobSearchProfile from '../Component/JobSearchProfile';

class Searchcenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //loading: false,
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
        };
    }

    async componentDidMount() {
        this.state.searchItem = this.props.data;
        this.state.search = true;

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
            this.setState({ showListJob: this.props.showListJob, listJobProfileMobile: this.props.listJobProfileMobile,watchlist: watchlist });
        }

    }

    onClickJobProfile = (item) => {
        this.setState({ search: true, loading: true, searchItem: item })
    }

    render() {
        document.title = "SEARCH CENTER | WEWANTU"
        const professions = getProfessions();

        this.state.listJobProfileMobile = this.props.listJobProfileMobile;

        const onChange = (categoryID) => {
            //let resultSearch = this.getJobProfile(values);

            this.setState({ categoryID: categoryID });
        }

        let filterSearch = [];

        let search = localStorage.getItem('search_job_profile');

        //if search
        if (this.state.search) {
            if (this.state.searchItem == null) {
                filterSearch = this.state.listJobProfileMobile;
            }
            else {
                filterSearch = functions.getListUser(this.state.listJobProfileMobile, this.state.searchItem);
                filterSearch.map((item) => {
                    item.profiles = item.profiles.filter(profile => profile.job_id == this.state.searchItem.job_id);
                });
            }            
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

            localStorage.setItem('search_job_profile', null);
        }

        const { loading, searchData, searchJob, showListJob } = this.state;
        return (
            <>
                <React.Fragment>
                    {loading && (<div className="loader"></div>)}
                    {(showListJob) && <JobSearchProfile watchListFilter={null} listJobProfileMobile={this.state.listJobProfileMobile} onSelect={onChange} categoryID={this.state.categoryID} onClickJobProfile={this.onClickJobProfile} />}
                    <div class="main-mes">
                        <div className="main_job">
                            <div className='row g-3 title'>
                                <div className="col-md">{t('t_search_center').toUpperCase()}{filterSearch.length > 0 ? "(" + filterSearch.length + ")" : "(" + t("t_no_data_found") + ")"}</div>
                                <div className="col-md-4 align-middle">
                                    
                                </div>
                            </div>
                            <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>
                                <SearchCenterTable searchData={filterSearch} component={this} />
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
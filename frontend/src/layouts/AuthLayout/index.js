import React, { Component } from 'react';
import withRouter from "../../components/withRouter";
import { connect, useDispatch } from "react-redux"
import PropTypes from "prop-types";
import { changeLayoutMode, setListUserProfile, setUserRating } from '../../redux/actions';

//Import Components
import LeftSidebarMenu from "./LeftSidebarMenu";
import TopSidebarMenu from "./TopSidebarMenu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import functions from '../../function/function';
import { APIClient } from '../../helpers/apiClient';
import { getLoggedInUser, saveListApplicant, getListApplicant } from '../../helpers/authUtils';
import { SET_LIST_USER_PROFILE } from '../../redux/layout/constants';
import config from "../../config";
import { get } from 'firebase/database';

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

        const urlListApplicant = config.API_URL + "list_applicant";
        var getLayoutMode = localStorage.getItem("layoutMode");
        this.props.changeLayoutMode(getLayoutMode);
        if (getLayoutMode) {
            this.props.changeLayoutMode(getLayoutMode);
        } else {
            this.props.changeLayoutMode(this.props.layout.layoutMode);
        }

        const admin = getLoggedInUser()[0];

        let data = {};
        data.user_id = admin.user_id;

        //let companylist = await new APIClient().get('companylist');
        //let addresslist = await new APIClient().get('addresslist');

        //let listAplicant = await getListApplicant();

        /*
        // if not save list of applicant in local
        if (listAplicant == null || listAplicant == undefined || listAplicant == 'null') {
            new APIClient().create(urlListApplicant, data).then(async list_applicant => {
                if (list_applicant) {
                    try {
                        await saveListApplicant(JSON.stringify(list_applicant));
                    } catch (error) {
                        console.log(error);
                        //list_applicant = [];
                    }

                    this.renData(addresslist, list_applicant, companylist);
                }
            })
        } else {;
            let list_applicant
            try {
                list_applicant = JSON.parse(listAplicant);
            } catch (error) {
                list_applicant = [];
            }

            this.renData(addresslist, list_applicant, companylist);
        } */

        //get rating
        let userRating = await new APIClient().get('user/' + admin.user_id + '/user_rating');
        this.props.setUserRating(userRating);

        this.props.setListUserProfile([]);
    }

    renData(addresslist, searchJob, companylist) {

        let newsearchJob = [...searchJob]

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



        this.props.setListUserProfile(newsearchJob);
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

export default withRouter(connect(mapStateToProps, { changeLayoutMode, setListUserProfile, setUserRating })(Index))
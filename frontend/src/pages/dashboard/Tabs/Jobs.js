import React, { Component } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { connect } from "react-redux";
import JobsTable from '../Tables/JobsTable';
import { setActiveTab } from "../../../redux/actions";
import { APIClient } from '../../../helpers/apiClient';
class Jobs extends Component {
    constructor(props) {
        super(props);
       // console.log(props);
    
        this.state = {
            loading: true,
            jobData: [],
            limit: 5,
          };
    }  

    onGetJobSearchProfiles = async () => {
        const admin=getLoggedInUser()[0];
        await new APIClient().get('user/'+admin.user_id+'/job_search_profiles').then(res => {
            const dataBody=res && res.filter(val =>val.is_delete !== 1).map(info=>{
               return {
                        job_search_profile_id:info.job_search_profile_id,
                        job_id:info.job_id,
                        job_decription:info.job_decription,
                        profession:info.profession.profession,
                        requested:info.requested,
                        messages:info.messages,
                    }
                
            })
            this.setState({
                loading: false,
                jobData: dataBody,
                limit: 5,
              })
        })
    }
    componentDidMount() {
       // this.onGetJobSearchProfiles();
    }
    render() {
        document.title = "CURRENT ENQUIRIES | WEWANTU"       
       const {loading,jobData} = this.state;
       const setTab = (tag) => {
        this.props.setActiveTab(tag)
       }

        
        return (
            <>
            {loading && (<div className="loader"></div>)}
            
            <React.Fragment>
                <JobsTable setActiveTab={this.props.setActiveTab} setsetSearch={this.props.setSearch} jobData={jobData} setTab={setTab} activeTab={this.props.activeTab}/>                           
            </React.Fragment>
            </>
            
        );
        
    }
}

const mapStateToProps = (state) => {
    const { users } = state.Chat;
    
    return { users,...state.Layout };
};

export default connect(mapStateToProps, {
    setActiveTab
    
})(Jobs);
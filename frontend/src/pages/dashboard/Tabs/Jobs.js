import React, { Component } from 'react';

import { connect } from "react-redux";
import JobsTable from '../Tables/JobsTable';
import { APIClient } from '../../../helpers/apiClient';
import { setActiveTab } from "../../../redux/actions";
import { getLoggedInUser } from '../../../helpers/authUtils';
class Jobs extends Component {
    constructor(props) {
        super(props);
       // console.log(props);
    
        this.state = {
            loading: false,
            jobData: [],
            limit: 5,
          };
    }
    async componentDidMount() {
        try{
            if(getLoggedInUser().length >0){
                const admin=getLoggedInUser()[0];
                //let jobdata= await new APIClient().get('user/'+admin.user_id+'/job_search_profiles');
                let jobdata= await new APIClient().get('job_search_profiles');

                const dataBody=jobdata.length && jobdata.map(info=>{
                    return {
                        job_search_profile_id:info.job_search_profile_id,
                        job_id:info.job_id,
                        job_decription:info.job_decription,
                        category:info.profession.profession,
                        requested:info.requested,
                        messages:info.messages,
                    }
                })
                this.setState({loading:true,
                    jobData:dataBody})
            }
            
                
        }
        catch{

        }
        
    }

    
    
    
    render() {
        document.title = "CURRENT ENQUIRIES | WEWANTU"
       
       const {loading,jobData} = this.state;
       const setTab = (tag) => {
        this.props.setActiveTab(tag)
       }
        return (
            <>
            {!loading && (<div className="loader"></div>)}
            
                <React.Fragment>
                <div className="addjob">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-md">
                                <button className="text_addjobs" onClick={()=>{setTab('addnewjob')}}>
                                    <img src={`${process.env.PUBLIC_URL}/img/plus.svg`} alt=''/><span className='text'>ADD NEW JOB</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main_job">
                    <div className='row g-3'>
                        <span className="title">CURRENT ENQUIRIES</span>
                    </div>
                    <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{position:'relative',height:'600px'}}>
                    {jobData.length > 0 && (
                        <JobsTable jobData={this.state.jobData} setTab={setTab}/>
                        
                        )}
                    </div>
                </div>
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
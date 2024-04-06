import React, { Component } from 'react';

import { connect } from "react-redux";
import CategoryTable from '../Tables/CategoryTable';
import { APIClient } from '../../../helpers/apiClient';
import { setActiveTab } from "../../../redux/actions";
import { getLoggedInUser } from '../../../helpers/authUtils';
class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categoryData: [],
            limit: 5,
          };
    }
    async componentDidMount() {
        try{
            if(getLoggedInUser().length >0){
                const admin=getLoggedInUser()[0];
                //let jobdata= await new APIClient().get('user/'+admin.user_id+'/job_search_profiles');
                let categoryData= await new APIClient().get('professions');

                if(categoryData){
                    this.setState({loading:true,
                        categoryData:categoryData})
                }
                
            }
            
                
        }
        catch{

        }
        
    }

    
    
    
    render() {
        document.title = "CATEGORY | WEWANTU"
       
       const {loading,categoryData} = this.state;
       
        return (
            <>
            {!loading && (<div className="loader"></div>)}
            
                <React.Fragment>
                
                
                <div className="main_job">
                    <div className='row g-3'>
                        <span className="title">CATEGORY </span>
                    </div>
                    <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{position:'relative',height:'600px'}}>
                    {categoryData.length > 0 && (
                        <CategoryTable categoryData={this.state.categoryData} />
                        
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
    
})(AddCategory);
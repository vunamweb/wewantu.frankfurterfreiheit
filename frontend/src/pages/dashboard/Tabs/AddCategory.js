import React, { Component } from 'react';
import { getProfessions } from '../../../helpers/authUtils';
import { connect } from "react-redux";
import CategoryTable from '../Tables/CategoryTable';
import { setActiveTab } from "../../../redux/actions";
class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            categoryData: [],
            limit: 5,
          };
    }
    

    
    
    
    render() {
        document.title = "CATEGORY | WEWANTU"
       
       const {loading} = this.state;
       //const categoryData =JSON.parse(localStorage.professions);
       const categoryData =getProfessions();
        return (
            <>
            {!loading && (<div className="loader"></div>)}
            
                <React.Fragment>
                
                
                <div className="main_job">
                    <div className='row g-3'>
                        <span className="title">CATEGORY </span>
                    </div>
                    <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{position:'relative',height:'600px'}}>
                    {categoryData !== null > 0 && (
                        <CategoryTable categoryData={categoryData} />
                        
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
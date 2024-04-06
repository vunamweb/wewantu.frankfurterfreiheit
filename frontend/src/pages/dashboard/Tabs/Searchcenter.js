import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchCenterDisplay from '../Tables/SearchCenterTable';
import { APIClient } from '../../../helpers/apiClient';
class Searchcenter extends Component {    


    async componentDidMount() {
        try{
            let searchData= await new APIClient().get('user');
            this.setState({loading:true,
                jobData:searchData})
        }
        catch{

        }
        
    }

    render() {
        document.title = "Dashboard | WEWANTU"
       
        return (
            <React.Fragment>
                
                <div className="addjob-searchcenter">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-md"><Link to="/newjob"><img src={`${process.env.PUBLIC_URL}/img/plus.svg`} alt=''/><span className="textSearchCenter">ADD NEW JOB</span></Link></div>
                        </div>
                    </div>
                </div>
                <div className="main-das">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-md">
                                <nav className="navbar navbar-expand-sm navbar-light">
                                <div className="container-fluid ">
                                  <span className="navbar-brand">SEARCH CENTER</span>
                                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                  </button>
                                  <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#" alt="">ID</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">DESCRIPTION</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">KATEGORIE</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">DATE</Link>
                                        </li>		
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">NEW MESSAGE</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">MORE FILTER</Link>
                                        </li>			
                                    </ul>  
                                  </div>
                                </div>
                              </nav>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{position:'relative',height:'600px'}}>
                            <SearchCenterDisplay />
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { users } = state.Chat;
    return { users };
};

export default connect(mapStateToProps, {})(Searchcenter);
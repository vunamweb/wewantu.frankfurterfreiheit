import React, { Component } from 'react';
//Import Components
import { Link } from "react-router-dom";

import WatchList from "../Tables/WatchListTable";




import { Button } from 'reactstrap';


import { connect } from "react-redux";

class Watchlist extends Component {

    
    render() {
        document.title = "Watchlist | WEWANTU"

        return (
            <React.Fragment>
                
                <div className="addjob-searchcenter">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-md"><Link to="/newjob"><img src={`${process.env.PUBLIC_URL}/img/plus.svg`} alt=''/><span className="textSearchCenter">ADD NEW JOB</span></Link></div>
                        </div>
                    </div>
                </div>
                <div className="main-mes">
                    <div className="container-fluid px-0">
						<div className="row w-title">
							<div className="col-md"><span className="w-title-l">WATCHLIST / 30 results</span> </div>
							<div className="col-md"><span className="w-title-r">äckereifachverkäufer/in Berlin Mitte</span> </div>
						</div>
						<div className="row">
							<div className="col-md">
								<nav className="navbar navbar-expand-sm navbar-light">
									<div className="container-fluid ">
										<Button className="navbar-toggler" type="Button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
										aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </Button>
										<div className="collapse navbar-collapse " id="navbarSupportedContent">
											<ul className="navbar-nav ms-auto">
												<li className="nav-item"> <Link className="nav-link" href="#" alt="">VALUATION</Link> </li>
												<li className="nav-item"> <Link className="nav-link" href="#">KATEGORIE</Link> </li>
											</ul>
										</div>
									</div>
								</nav>
							</div>
						</div>
					</div>
                    <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{position:'relative', height: '600px'}}>
                        <form>
							<div className="row w-checkall">
								<div className="col-md-7">
									<label>
										<input type="checkbox" className="check" id="checkAll" /> Check All</label>
								</div>
								<div className="col-md-2">
									<Button className="btn btn-primary form-control" size="sm" type="submit">EXPORT PDF</Button>
								</div>
								<div className="col-md-3">
									<Button className="btn btn-primary form-control" size="sm" type="submit">SEND MASSAGE ALL CHECKED</Button>
								</div>
							</div>
						</form>
                        <WatchList />

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    const { users } = state.Chat;
    return { users };
};

export default connect(mapStateToProps, {})(Watchlist);
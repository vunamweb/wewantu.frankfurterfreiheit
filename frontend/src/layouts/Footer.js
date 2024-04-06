import React, { Component } from 'react';
import withRouter from "../components/withRouter";
import { connect } from "react-redux"
import { changeLayoutMode } from '../redux/actions';

//Import Images
import Logof from "../assets/images/logo2.svg"
import { Link } from 'react-router-dom';
import Layout from '../redux/layout/reducer';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.capitalizeFirstLetter.bind(this);
    }
    
    capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    componentDidMount(){
        var getLayoutMode = localStorage.getItem("layoutMode");
        this.props.changeLayoutMode(getLayoutMode);
        if (getLayoutMode) {
            this.props.changeLayoutMode(getLayoutMode);
        } else {
            this.props.changeLayoutMode(this.props.layoutMode);
        }

        // let currentage = this.capitalizeFirstLetter(this.props.router.location.pathname);
    }
    render() {
        return <React.Fragment>
            <section className="footer">
                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-md-1"></div>
                            <div className="col-md content">
                            </div>
                        <div className="col-md-1"></div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md center-block text-center">
                            <Link to="home.html"><img src={Logof}/></Link>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md center-block text-center">
                        <p><a href="#"> © WEWANTU UG</a>|
                        <a href="#"> DATENSCHUTZ </a>|
                        <a href="#">  IMPRESSUM </a></p>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>;
    }
}



const mapStateToProps = state => {
    const { layoutMode } = state.Layout;
    return { layoutMode };
  };

export default withRouter(connect(mapStateToProps, { changeLayoutMode })(Footer))
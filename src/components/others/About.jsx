import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import AppUrl from '../../api/AppUrl'
// import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom"

class About extends Component {
    constructor() {
        super()

        this.state = {
            about: "",
            loaderDiv: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        let siteInfoAbout = sessionStorage.getItem("siteInfoAbout")

        if (siteInfoAbout === null) {
            toast.error("Something went wrong.", {
                position: "bottom-center"
            })
        } // end if condition

        else {
            this.setState({
                about: siteInfoAbout,
                loaderDiv: "d-none",
                mainDiv: ""
            })
        }
        
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <div className="breadbody">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/about">About</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            
                            {/* LOADER DIV */}
                            <div className={this.state.loaderDiv}>
                                <div class="ph-item">
                                    <div class="ph-col-12">
                                        <div class="ph-row">
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-6"></div>
                                            <div class="ph-col-6 empty"></div>
                                            <div class="ph-col-12"></div>
                                            <div class="ph-col-12"></div>
                                            <div class="ph-col-12"></div>
                                            <div class="ph-col-12"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MAIN DIV */}
                            <div className={this.state.mainDiv}>
                                <h4 className="section-title-login">About Page</h4>
                                <p className="section-title-contact">
                                    { ReactHtmlParser(this.state.about) }
                                </p>
                            </div>

                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default About

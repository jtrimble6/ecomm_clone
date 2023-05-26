import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Apple from '../../assets/images/apple.png'
import Google from '../../assets/images/google.png'
import ReactHtmlParser from 'react-html-parser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FooterDesktop extends Component {
    constructor() {
        super()

        this.state = {
            address: "",
            facebookLink: "",
            instagramLink: "",
            twitterLink: "",
            androidAppLink: "",
            iosAppLink: "",
            copyrightText: "",
            loaderDiv: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        let siteInfo = sessionStorage.getItem("allSiteInfo")
        let siteInfoAddress = sessionStorage.getItem("siteInfoAddress")
        let siteInfoAndroidAppLink = sessionStorage.getItem("siteInfoAndroidAppLink")
        let siteInfoIosAppLink = sessionStorage.getItem("siteInfoIosAppLink")
        let siteInfoFacebookLink = sessionStorage.getItem("siteInfoFacebookLink")
        let siteInfoTwitterLink = sessionStorage.getItem("siteInfoTwitterLink")
        let siteInfoInstagramLink = sessionStorage.getItem("siteInfoInstagramLink")
        let siteInfoCopyrightText = sessionStorage.getItem("siteInfoCopyrightText")

        if (!siteInfo) {
            return
        } // end if condition

        else {
            this.setState({
                address: siteInfoAddress,
                facebookLink: siteInfoFacebookLink,
                instagramLink: siteInfoInstagramLink,
                twitterLink: siteInfoTwitterLink,
                androidAppLink: siteInfoAndroidAppLink,
                iosAppLink: siteInfoIosAppLink,
                copyrightText: siteInfoCopyrightText,
                loaderDiv: "d-none",
                mainDiv: ""
            })
        }
        
    }

    render() {
        return (
            <Fragment>
                <div className="footerback m-0 mt-5 pt-3 shadow-sm">
                    {/* LOADER DIV */}
                    <div className={this.state.loaderDiv}>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-4"></div>
                                    <div className="ph-col-8 empty"></div>
                                    <div className="ph-col-6"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN DIV */}
                    <div className={this.state.mainDiv}>
                        <Container>
                            <Row className="px-0 my-5">
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
                                    { ReactHtmlParser(this.state.address) }
                                    <h5 className="footer-menu-title">SOCIAL LINK</h5>
                                    <a href={this.state.facebookLink} target="_blank" rel="noreferrer"><i className="fab m-1 h4 fa-facebook"></i></a>
                                    <a href={this.state.instagramLink} target="_blank" rel="noreferrer"><i className="fab m-1 h4 fa-instagram"></i></a>
                                    <a href={this.state.twitterLink} target="_blank" rel="noreferrer"><i className="fab m-1 h4 fa-twitter"></i></a>
                                </Col>

                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">THE COMPANY</h5>
                                    <Link to="/about" className="footer-link">About Us</Link>
                                    <br />
                                    <Link to="/" className="footer-link">Company Profile</Link>
                                    <br />
                                    <Link to="/contact" className="footer-link">Contact Us</Link>
                                    <br />
                                </Col>

                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">MORE INFO</h5>
                                    <Link to="/purchase" className="footer-link">How To Purchase</Link>
                                    <br />
                                    <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                                    <br />
                                    <Link to="/refund" className="footer-link">Refund Policy</Link>
                                    <br />
                                </Col>

                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">DOWNLOAD APPS</h5>
                                    <a href={this.state.androidAppLink} target="_blank" rel="noreferrer"><img src={Google} alt="google"/></a> <br />
                                    <a href={this.state.iosAppLink} target="_blank" rel="noreferrer"><img className="mt-2" src={Apple} alt="apple"/></a> <br />
                                    Change Your Language <br />
                                    <div id="google_translate_element">

                                    </div>
                                </Col>
                            </Row>
                        </Container>

                        <Container fluid={true} className="text-center m-0 pt-3 pb-1 bg-dark">
                            <Container>
                                <Row>
                                    { ReactHtmlParser(this.state.copyrightText) }
                                </Row>
                            </Container>
                        </Container>
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default FooterDesktop

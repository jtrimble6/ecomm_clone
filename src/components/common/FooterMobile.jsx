import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import Apple from '../../assets/images/apple.png'
import Google from '../../assets/images/google.png'
import ReactHtmlParser from 'react-html-parser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FooterMobile extends Component {
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
                    <Container className="text-center">
                        <Row className="px-0 my-5">
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
                                { ReactHtmlParser(this.state.address) }
                                <h5 className="footer-menu-title">SOCIAL LINK</h5>
                                <a href={this.state.facebookLink}><i className="fab m-1 h4 fa-facebook"></i></a>
                                <a href={this.state.instagramLink}><i className="fab m-1 h4 fa-instagram"></i></a>
                                <a href={this.state.twitterLink}><i className="fab m-1 h4 fa-twitter"></i></a>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">DOWNLOAD APPS</h5>
                                <a href={this.state.androidAppLink} target="_blank" rel="noreferrer"><img src={Google} alt="google"/></a> <br />
                                <a href={this.state.iosAppLink} target="_blank" rel="noreferrer"><img className="mt-2" src={Apple} alt="apple"/></a> <br />
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
                    <ToastContainer />
                </div>
            </Fragment>
        )
    }
}

export default FooterMobile

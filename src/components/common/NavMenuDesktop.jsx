import React, { Component, Fragment } from 'react'
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap'
import Logo from '../../assets/images/easyshop.png'
import { Link } from 'react-router-dom'
import MegaMenuAll from '../home/MegaMenuAll'

class NavMenuDesktop extends Component {
    constructor() {
        super()

        this.state={
            sideNavState: "sideNavClose",
            contentOverState: "contentOverlayClose"
        }

        this.menuBarClickHandler = this.menuBarClickHandler.bind(this)
        this.contentOverlayClickHandler = this.contentOverlayClickHandler.bind(this)
        this.sideNavOpenClose = this.sideNavOpenClose.bind(this)
    }

    menuBarClickHandler = () => {
        this.sideNavOpenClose()
    }

    contentOverlayClickHandler = () => {
        this.sideNavOpenClose()
    }

    sideNavOpenClose = () => {
        let sideNavState = this.state.sideNavState

        if (sideNavState === "sideNavOpen") {
            this.setState({
                sideNavState: "sideNavClose",
                contentOverState: "ContentOverlayClose"
            })
        } else {
            this.setState({
                sideNavState: "sideNavOpen",
                contentOverState: "ContentOverlayOpen"
            })
        }
    }


    render() {
        return (
            <Fragment>
                <div className="TopSectionDown">
                    <Navbar fixed={"top"} className="navbar" bg="light">
                        <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
                            <Row>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <Button onClick={this.menuBarClickHandler} className="btn">
                                        <i className="fa fa-bars"></i>
                                    </Button>
                                    <Link to="/">
                                        <img className="nav-logo" src={Logo} />
                                    </Link>
                                </Col>

                                {/* Search Bar */}
                                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                    <div className="input-group w-100">
                                        <input type="text" className="form-control" />
                                        <Button type="button" className="btn site-btn">
                                            <i className="fa fa-search"> </i>
                                        </Button>
                                    </div>
                                </Col>

                                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                    <Link to="/" className="btn">
                                        <i className="fa h4 fa-heart"></i><sup><span className="badge text-white bg-danger">3</span></sup>
                                    </Link>
                                    
                                    <Link to="/" className="btn">
                                        <i className="fa h4 fa-bell"></i><sup><span className="badge text-white bg-danger">5</span></sup>
                                    </Link>

                                    <a className="btn"><i className="fa h4 fa-mobile-alt"></i></a>
                                    
                                    <Link to="/" className="h4 btn">
                                        LOGIN
                                    </Link>
                                    
                                    <Button className="cart-btn">
                                        <i className="fa fa-shopping-cart"> 3 Items</i>
                                    </Button>
                                </Col>
                            </Row>
                        </Container>

                        <div className={this.state.sideNavState}>
                            <MegaMenuAll />
                        </div>

                        <div onClick={this.contentOverlayClickHandler} className={this.state.contentOverState}>

                        </div>

                    </Navbar>
                </div>
            </Fragment>
        )
    }
}

export default NavMenuDesktop

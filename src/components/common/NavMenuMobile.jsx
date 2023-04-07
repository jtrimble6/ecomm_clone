import React, { Component, Fragment } from 'react'
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap'
import Logo from '../../assets/images/easyshop.png'
import { Link } from 'react-router-dom'
import MegaMenuMobile from '../home/MegaMenuMobile'

class NavMenuMobile extends Component {
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
                    
                        <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
                            <Row>
                                <Col lg={4} md={4} sm={12} xs={12}>

                                    <Button onClick={this.menuBarClickHandler} className="btn">
                                        <i className="fa fa-bars"></i>
                                    </Button>

                                    <Link to="/">
                                        <img className="nav-logo" src={Logo} />
                                    </Link>

                                    <Button className="cart-btn">
                                        <i className="fa fa-shopping-cart"> 3 Items</i>
                                    </Button>

                                </Col>
                            </Row>
                        </Container>

                        <div className={this.state.sideNavState}>
                            <MegaMenuMobile />
                        </div>

                        <div onClick={this.contentOverlayClickHandler} className={this.state.contentOverState}>

                        </div>
                    
                </div>
            </Fragment>
        )
    }
}

export default NavMenuMobile

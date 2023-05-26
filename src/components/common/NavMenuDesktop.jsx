import React, { Component, Fragment } from 'react'
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap'
import Logo from '../../assets/images/easyshop.png'
import Bars from '../../assets/images/bars.png'
import { Link, Redirect } from 'react-router-dom'
import MegaMenuAll from '../home/MegaMenuAll'
import axios from 'axios'
import AppUrl from '../../api/AppUrl'

class NavMenuDesktop extends Component {
    constructor(props) {
        super()

        this.state={
            sideNavState: "sideNavClose",
            contentOverState: "contentOverlayClose",
            searchKey: "",
            searchRedirectStatus: false, 
            cartCount: 0
        }

        this.menuBarClickHandler = this.menuBarClickHandler.bind(this)
        this.contentOverlayClickHandler = this.contentOverlayClickHandler.bind(this)
        this.sideNavOpenClose = this.sideNavOpenClose.bind(this)
        this.searchOnChange = this.searchOnChange.bind(this)
        this.searchOnClick = this.searchOnClick.bind(this)
        this.searchRedirect = this.searchRedirect.bind(this)
    }

    componentDidMount() {
        let user_email = this.props.user?.email
        console.log('USER: ', user_email)
        let cartCountStored = sessionStorage.getItem('CartCount-' + user_email)
        if (!cartCountStored) {
            axios.get(AppUrl.CartCount(user_email)).then((response)  => {
                this.setState({
                    cartCount: response.data
                })
                sessionStorage.setItem('CartCount-' + user_email, response.data)
            })
        } else {
            let cartCount = sessionStorage.getItem('CartCount-' + user_email)
            this.setState({
                cartCount
            })
            return
        }
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

    searchOnChange(event) {
        let searchKey = event.target.value
        this.setState({
            searchKey
        })
    }

    searchOnClick() {
        if (this.state.searchKey.length >= 2) {
            this.setState({
                searchRedirectStatus: true
            })
        }
    }

    searchRedirect() {
        if (this.state.searchRedirectStatus) {
            return <Redirect to={"/productbysearch/" + this.state.searchKey} />
        }
    }

    logout = () => {
        sessionStorage.removeItem('userLoggedIn')
        sessionStorage.removeItem('userDataObj')
        sessionStorage.removeItem('userData')
        sessionStorage.removeItem('token')
    }

    render() {

        let buttons;
        if (sessionStorage.getItem('token')) {
            buttons = (
                <div>
                    <Link to="/favorite" className="btn">
                        <i className="fa h4 fa-heart"></i><sup><span className="badge text-white bg-danger">3</span></sup>
                    </Link>
                    
                    <Link to="/notification" className="btn">
                        <i className="fa h4 fa-bell"></i><sup><span className="badge text-white bg-danger">5</span></sup>
                    </Link>
                    
                    <Link to="/profile" className="h4 btn">
                        PROFILE
                    </Link>

                    <Link to="/" onClick={this.logout} className="h4 btn">
                        LOGOUT
                    </Link>
                    
                    <Link to="/cart" className="cart-btn">
                        <i className="fa fa-shopping-cart"> {this.state.cartCount} Items </i>
                    </Link>
                </div>
            )
        } else {
            buttons = (
                <div>
                    <Link to="/favorite" className="btn">
                        <i className="fa h4 fa-heart"></i><sup><span className="badge text-white bg-danger">3</span></sup>
                    </Link>
                    
                    <Link to="/notification" className="btn">
                        <i className="fa h4 fa-bell"></i><sup><span className="badge text-white bg-danger">5</span></sup>
                    </Link>
                    
                    <Link to="/login" className="h4 btn">
                        LOGIN
                    </Link>

                    <Link to="/register" className="h4 btn">
                        REGISTER
                    </Link>
                    
                    <Link to="/cart" className="cart-btn">
                        <i className="fa fa-shopping-cart"> 0 Items </i>
                    </Link>
                </div>
            )
        }

        return (
            <Fragment>
                <div className="TopSectionDown">
                    <Navbar fixed={"top"} className="navbar" bg="light">
                        <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
                            <Row>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <img src={Bars} onClick={this.menuBarClickHandler} className="bar-img" alt="&#8595;"/>
                                    <Link to="/">
                                        <img className="nav-logo" src={Logo} alt="logo"/>
                                    </Link>
                                </Col>

                                {/* Search Bar */}
                                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                    <div className="input-group w-100">
                                        <input onChange={this.searchOnChange} type="text" className="form-control" />
                                        <Button onClick={this.searchOnClick} type="button" className="btn site-btn">
                                            <i className="fa fa-search"> </i>
                                        </Button>
                                    </div>
                                </Col>
                                
                                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                    {/* DYNAMIC LOGIN/LOGOUT BUTTONS */}
                                    { buttons }
                                </Col>
                            </Row>
                            {this.searchRedirect()}
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

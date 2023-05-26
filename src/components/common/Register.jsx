import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppUrl from '../../api/AppUrl'
import Login from '../../assets/images/login.png'
import { Redirect } from 'react-router-dom'

class Register extends Component {

    constructor() {
        super()

        this.state={
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            message: '',
            loggedIn: false
        }
    }

    formSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        let userLoggedIn = sessionStorage.getItem("userLoggedIn")
        console.log('userLoggedIn: ', userLoggedIn)
        if (userLoggedIn === null) {
            axios.post(AppUrl.UserRegister, data).then(res => {
                sessionStorage.setItem("userLoggedIn", true)
                sessionStorage.setItem("token", res.data.token)
                console.log('res: ', res)
                console.log('token: ', res.data.token)
                this.setState({
                    loggedIn: true
                })
                this.props.setUser(res.data.user)
            }).catch(err => {
                console.log('err', err)
            })
        } else {
            this.setState({
                loggedIn: true
            })
            console.log('nothing happened')
            return
        }
    }

    render() {

        // Login Redirect
        if (this.state.loggedIn) {
            return <Redirect to={'/profile'} />
        }

        if (sessionStorage.getItem('token')) {
            return <Redirect to="/profile" />
        }

        return (
            <Fragment>
                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form className="onboardForm" onSubmit={this.formSubmit}>
                                        <h4 className="section-title-login"> USER SIGN UP </h4>
                                        
                                        <input onChange={(e) => { this.setState({name: e.target.value}) } } className="form-control m-2" type="text" placeholder="Enter Name" />
                                        <input onChange={(e) => { this.setState({email: e.target.value}) } } className="form-control m-2" type="email" placeholder="Enter Email" />
                                        <input onChange={(e) => { this.setState({password: e.target.value}) } } className="form-control m-2" type="password" placeholder="Enter Password" />
                                        <input onChange={(e) => { this.setState({password_confirmation: e.target.value}) } } className="form-control m-2" type="password" placeholder="Confirm Password" />

                                        <Button type="submit" className="btn btn-block m-2 site-btn-login">
                                            Register
                                        </Button> <br /> <br /> <hr />
                                        <strong>
                                            <p>
                                                Forgot Password? <Link to="/forget">Reset Password</Link>
                                            </p>
                                        </strong>

                                        <strong>
                                            <p>
                                                Already have an account? <Link to="/login">Login</Link>
                                            </p>
                                        </strong>
                                    </Form>
                                </Col>
                                <Col className="p-0 m-0 Desktop" lg={6} md={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src={Login}  alt="text"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default Register

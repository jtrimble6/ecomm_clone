import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forget from '../../assets/images/forget.jpg'
import axios from 'axios'
import AppUrl from '../../api/AppUrl'

class ForgetPassword extends Component {
    constructor() {
        super()

        this.state={
            email: '',
            message: ''
        }
    }

    // Forgot Password Form Submit
    formSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: this.state.email
        }

        axios.post(AppUrl.UserForgetPassword, data).then(res => {
            this.setState({
                message: res.data.message
            })
            toast.success(this.state.message, {
                position: "top-right"
            })
        }).catch(err => {
            console.log('err', err)
            this.setState({
                message: err.response.data.message
            })
            toast.error(this.state.message, {
                position: "top-right"
            })
        })

    }
    render() {
        return (
            <Fragment>
                <Container>
                    <ToastContainer />
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form className="onboardForm" onSubmit={this.formSubmit}>
                                        <h4 className="section-title-login"> FORGOT PASSWORD </h4>
                                        
                                        <input className="form-control m-2" type="email" placeholder="Enter Email" onChange={(e) => { this.setState({email: e.target.value}) } } />

                                        <Button type="submit" className="btn btn-block m-2 site-btn-login">
                                            Reset Password
                                        </Button> <br /> <br /> <hr />
                                        
                                    </Form>
                                </Col>
                                <Col className="p-0 m-0 Desktop" lg={6} md={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src={Forget}  alt="text"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default ForgetPassword

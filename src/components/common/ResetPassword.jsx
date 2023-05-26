import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Forget from '../../assets/images/forget.jpg'
import axios from 'axios'
import AppUrl from '../../api/AppUrl'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ResetPassword extends Component {
    constructor() {
        super()

        this.state={
            token: '',
            email: '',
            password: '',
            password_confirmation: '',
            message: ''
        }
    }

    // reset form submit
    formSubmit = (e) => {
        e.preventDefault()
        const data = {
            token: this.state.token,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        
        axios.post(AppUrl.UserResetPassword, data).then(res => {
            this.setState({
                message: res.data.message
            })
            toast.success(this.state.message, {
                position: "top-right"
            })
            document.getElementById("formreset").reset()
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
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form id="formreset" className="onboardForm" onSubmit={this.formSubmit}>
                                        <h4 className="section-title-login"> RESET PASSWORD </h4>
                                        
                                        <input className="form-control m-2" type="text" placeholder="Enter Pin Code" onChange={(e) => { this.setState({token: e.target.value}) } } />
                                        <input className="form-control m-2" type="email" placeholder="Enter Email" onChange={(e) => { this.setState({email: e.target.value}) } } />
                                        <input className="form-control m-2" type="password" placeholder="Enter New Password" onChange={(e) => { this.setState({password: e.target.value}) } } />
                                        <input className="form-control m-2" type="password" placeholder="Confirm New Password" onChange={(e) => { this.setState({password_confirmation: e.target.value}) } } />

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

export default ResetPassword

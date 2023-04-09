import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Login from '../../assets/images/login.png'

class UserLogin extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form className="onboardForm">
                                        <h4 className="section-title-login"> USER SIGN IN </h4>
                                        <h6 className="section-sub-title">Please Enter Mobile #</h6>
                                        <input className="form-control m-2" type="text" placeholder="Enter Mobile #" />
                                        <Button className="btn btn-block m-2 site-btn-login">
                                            Next
                                        </Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 m-0 Desktop" lg={6} md={6} sm={6} xs={6}>
                                    <img classname="onboardBanner" src={Login}  alt="text"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default UserLogin

import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class Contact extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form className="onboardForm">
                                        <h4 className="section-title-login"> CONTACT US </h4>
                                        <h6 className="section-sub-title">Please Enter Information</h6>
                                        <input className="form-control m-2" type="text" placeholder="Enter Mobile #" />

                                        <h6 className="section-sub-title">Please Enter Email</h6>
                                        <input className="form-control m-2" type="email" placeholder="Enter Email" />

                                        <h6 className="section-sub-title">Please Enter Mobile #</h6>
                                        <input className="form-control m-2" type="text" placeholder="Enter Your Message" />

                                        <Button className="btn btn-block m-2 site-btn-login">
                                            Send
                                        </Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 m-0 Desktop" lg={6} md={6} sm={6} xs={6}>
                                    <br />
                                    <br />
                                    <p className="section-title-contact">1635 Franklin Street Montgomery, Near Sherwood Mall. AL 36104</p>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.1583091352!2d-74.11976373946234!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680961885954!5m2!1sen!2sus" width="550" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default Contact

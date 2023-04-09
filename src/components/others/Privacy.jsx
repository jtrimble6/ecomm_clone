import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class Privacy extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <h4 className="section-title-login">Privacy Page</h4>
                            <p className="section-title-contact">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies sodales arcu, ac tempor magna lobortis a. Curabitur bibendum ex in metus aliquam vulputate. Aenean maximus nibh sit amet purus pellentesque interdum. Etiam cursus facilisis arcu, sed finibus turpis cursus a. In velit libero, sagittis placerat nulla a, pellentesque mollis massa. Aliquam at finibus ligula. Nunc posuere turpis non libero cursus tempor. Aliquam sed elit eu sem venenatis dignissim. Mauris vel odio turpis. Quisque ligula velit, dapibus sit amet purus a, accumsan rhoncus eros. Nulla interdum metus eu lectus consequat, dignissim imperdiet lacus pharetra. Sed vel congue ex. Donec molestie ultricies pretium. Ut vestibulum, velit vel congue tempus, metus augue volutpat nulla, varius condimentum justo nulla ut turpis.
                            <br />
                            <br />
                                Aenean eu iaculis lorem. Quisque vel consectetur velit. Proin et iaculis odio, in laoreet nunc. Morbi malesuada purus quis arcu condimentum, nec efficitur erat placerat. Vivamus eget elit urna. Praesent rhoncus porta lacus, quis feugiat mi finibus ut. Sed vitae sem at ligula suscipit varius. Curabitur arcu tortor, placerat rhoncus quam eu, posuere tristique lorem.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default Privacy

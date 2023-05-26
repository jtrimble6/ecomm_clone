import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button, Modal, ListGroup } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import ProfileImage from '../../assets/images/passport.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom';

class Profile extends Component {
    render() {

        let name;
        let email;

        if (this.props.user) {
            name = this.props.user.name
            email = this.props.user.email
        }

        if (!sessionStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        return (
            <Fragment>
                <div className="section-title text-center mb-55">
                    <h2>Profile Page</h2>
                </div>

                <Container>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={ProfileImage} className="userprofile" />
                                
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        <Link to="/orderlist" className="text-link">
                                            <p className="product-name-on-card">Order List</p>
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Link to="/orderlist" className="text-link">
                                            <p className="product-name-on-card">Order List</p>
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Link to="/orderlist" className="text-link">
                                            <p className="product-name-on-card">Order List</p>
                                        </Link>
                                    </ListGroup.Item>
                                </ListGroup>
                                
                            </Card>
                        </Col>

                        <Col lg={4} md={4} sm={12}>        
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Name : {name}
                                </li>

                                <li className="list-group-item">
                                    Email : {email}
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

            </Fragment>
        )
    }
}

export default Profile

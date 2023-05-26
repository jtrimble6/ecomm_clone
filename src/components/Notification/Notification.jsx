import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'

class Notification extends Component {

    constructor() {
        super()

        this.state = {
            show: false,
            notificationData: [],
            isLoading: "",
            mainDiv: "d-none",
            notificationMsg: "",
            notificationTitle: "",
            notificationDate: ""
        }

    }

    componentDidMount() {
        let notificationData = sessionStorage.getItem("siteInfoNotificationData")
        
        if (notificationData === null) {
            return
        } // end if condition

        else {
            let notificationDataConverted = "[" + notificationData + "]"
            let notificationDataObjArray = JSON.parse(notificationDataConverted)
            
            this.setState({
                notificationData: notificationDataObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = (event) => {
        this.setState({
            show: true
        })
        let notificationMsg = event.target.getAttribute("data-message")
        let notificationTitle = event.target.getAttribute("data-title")
        let notificationDate = event.target.getAttribute("data-date")

        this.setState({
            notificationMsg,
            notificationTitle,
            notificationDate
        })
    }


    render() {

        if (!sessionStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const NotificationList = this.state.notificationData
        const MyView = NotificationList.map((NotificationList, i) => {
            return (
                <Col className=" p-1 " md={6} lg={6} sm={12} xs={12}>
                    <Card onClick={this.handleShow} className="notification-card">
                        <Card.Body>
                            <h6>{NotificationList.title}</h6>
                            <p className="py-1  px-0 text-primary m-0"><i className="fa fa-bell"></i>
                                {NotificationList.date} | Status: Unread
                            </p>
                            <Button data-title={NotificationList.title} data-date={NotificationList.date} data-message={NotificationList.message} className="btn btn-danger">
                                Details
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })

        return (
            <Fragment>
                <Container className="TopSection">
                    <Row>
                        
                        {MyView}

                    </Row>
                </Container>

                {/* Notification Modal */}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <h6><i className="fa fa-bell"></i> Date: {this.state.notificationDate}</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>{this.state.notificationTitle}</h6>
                        <p>
                            {this.state.notificationMsg}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>

                    </Modal.Footer>
                </Modal>

            </Fragment>
        )
    }
}

export default Notification

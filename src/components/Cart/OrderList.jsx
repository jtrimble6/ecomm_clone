import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import AppUrl from '../../api/AppUrl'
import { toast } from 'react-toastify'
import cogoToast from 'cogo-toast'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'

class OrderList extends Component {
    constructor() {
        super()

        this.state={
            orderList: [],
            show: false,
            name: "",
            rating: "",
            comment: "",
            productName: "",
            productCode: "",
            reviewModal: false
        }
    }

    componentDidMount() {
        // GET USER CART LIST INFO
        let orderList = sessionStorage.getItem("userInfoOrderList")

        if (orderList === null) {
            axios.get(AppUrl.OrderListByUser(this.props.user.email)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all user order details: ', jsonData)
                    sessionStorage.setItem("userInfoOrderList", true)
                    sessionStorage.setItem("orderListData", jsonDataStrings)
                } else {
                    return
                }

            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "top-center"
                })
            })

        } // end if condition

        else {
            let orderList = sessionStorage.getItem("orderListData")
            let orderListConverted = "[" + orderList + "]"
            let orderListObjArray = JSON.parse(orderListConverted)
            
            this.setState({
                orderList: orderListObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    reviewModalOpen = (product_code, product_name) => {
        this.setState({
            reviewModal: true,
            productCode: product_code,
            productName: product_name
        })
    }

    reviewModalClose = () => {
        this.setState({
            reviewModal: false
        })
    }

    nameOnChange = (event) => {
        let name = event.target.value
        this.setState({
            name
        })
    }

    ratingOnChange = (event) => {
        let rating = event.target.value
        this.setState({
            rating
        })
    }

    commentOnChange = (event) => {
        let comment = event.target.value
        this.setState({
            comment
        })
    }

    postReview = () => {
        let product_code = this.state.productCode
        let product_name = this.state.productName
        let rating = this.state.rating
        let comment = this.state.comment
        let name = this.state.name

        if (name.length===0) {
            cogoToast.error("Please enter name", {position: 'top-right'})
        } else if (rating.length===0) {
            cogoToast.error("Please select rating", {position: 'top-right'})
        } else if (comment.length===0) {
            cogoToast.error("Please enter comment", {position: 'top-right'})
        } else if (comment.length>150) {
            cogoToast.error("Please limit comment to less than 150 characters", {position: 'top-right'})
        } else {
            let MyFormData = new FormData();
            MyFormData.append('product_code', product_code)
            MyFormData.append('product_name', product_name)
            MyFormData.append('reviewer_name', name)
            MyFormData.append('reviewer_photo', "")
            MyFormData.append('reviewer_rating', rating)
            MyFormData.append('reviewer_comments', comment)
            
            axios.post(AppUrl.PostReview, MyFormData).then(res => {
                console.log('RESULT HERE: ', res.data)
                if (res.data === 1) {
                    cogoToast.success("Review Submitted", {position: 'top-right'})
                    this.reviewModalClose()
                } else {
                    cogoToast.error("1:Error processing review, try again.", {position: 'top-right'})
                }
    
            }).catch(err => {
                console.log(err)
                cogoToast.error("2:Error processing review, try again.", {position: 'top-right'})
            })

        }


    } // end post review

    render() {

        if (!sessionStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const MyList = this.state.orderList
        const MyView = MyList.map((OrderList, i) => {
            return (
                <div>
                    <Col key={i.toString()} md={6} lg={6} sm={6} xs={6}>
                        <h5 className="product-name">{OrderList.product_name}</h5>
                        <h6> Quantity = {OrderList.quantity} </h6>
                        <p>{OrderList.size} | {OrderList.color}</p>
                        <h6>Price = {OrderList.unit_price} x { OrderList.quantity } = ${ OrderList.total_price}</h6>
                        <h6>Status = {OrderList.order_status} </h6>
                    </Col>

                    <Button onClick={this.reviewModalOpen.bind(this, OrderList.product_code, OrderList.product_name)} className="btn btn-warning">
                        Add Review
                    </Button>
                    <hr />
                </div>
            )
        })


        return (
            <Fragment>
                <Container>
                    <div className="section-title text-center mb-55">
                        <h2>Order History ( {this.props.user.name} )</h2>
                    </div>
                    <Card>                
                        <Card.Body>
                            <Row>

                                { MyView }
                                
                            </Row>              
                        </Card.Body>               
                    </Card>
                </Container>

                {/* Notification Modal */}
                <Modal show={this.state.reviewModal} onHide={this.reviewModalClose}>
                    <Modal.Header closeButton>
                        <h6><i className="fa fa-bell"></i> Post Your Review </h6>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Name</label>
                            <input onChange={this.nameOnChange}  className="form-control" type="text" placeholder={this.props.user.name}/>
                        </div>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Select Rating</label>
                            <select onChange={this.ratingOnChange} className="form-control">
                                <option value="">Choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Comment</label>
                            <textarea onChange={this.commentOnChange} rows={2} className="form-control" type="text" placeholder="Your Message" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.postReview}>
                        Post
                    </Button>
                    <Button variant="secondary" onClick={this.reviewModalClose}>
                        Close
                    </Button>

                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

export default OrderList

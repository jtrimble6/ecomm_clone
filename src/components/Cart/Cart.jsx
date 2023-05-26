import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import AppUrl from '../../api/AppUrl';
import { toast } from 'react-toastify';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

class Cart extends Component {
    constructor() {
        super()

        this.state = {
            cartList: [],
            isLoading: "",
            mainDiv: "d-none",
            confirmBtn: "Confirm Order",
            city: "",
            payment: "",
            name: "",
            address: "",
            pageRedirectStatus: false
        }
    }

    componentDidMount() {
        
        // GET USER CART LIST INFO
        let cartList = sessionStorage.getItem("userInfoCartList")

        if (cartList === null) {
            axios.get(AppUrl.CartList(this.props.user.email)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all user Cart details: ', jsonData)
                    sessionStorage.setItem("userInfoCartList", true)
                    sessionStorage.setItem("cartListData", jsonDataStrings)
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
            let cartList = sessionStorage.getItem("cartListData")
            let cartListConverted = "[" + cartList + "]"
            let cartListObjArray = JSON.parse(cartListConverted)
            
            this.setState({
                cartList: cartListObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    removeItem = (id) => {
        axios.get(AppUrl.RemoveCartList(id)).then(res => {
            if (res.data === 1) {
                cogoToast.success("Cart Item Removed", {position: 'top-right'})
                this.pageRefresh()
            } else {
                cogoToast.error("Error item, try again.", {position: 'top-right'})
            }

        }).catch(err => {
            console.log(err)
            cogoToast.error("Error removing item, try again.", {position: 'top-right'})
        })
    } // end remove item method

    itemPlus = (id, quantity, price) => {
        axios.get(AppUrl.CartItemPlus(id, quantity, price)).then(res => {
            if (res.data === 1) {
                cogoToast.success("Cart Item Updated", {position: 'top-right'})
                this.pageRefresh()
            } else {
                cogoToast.error("Error item, try again.", {position: 'top-right'})
            }

        }).catch(err => {
            console.log(err)
            cogoToast.error("Error updating item, try again.", {position: 'top-right'})
        })
    } // end remove item method

    itemMinus = (id, quantity, price) => {
        axios.get(AppUrl.CartItemMinus(id, quantity, price)).then(res => {
            if (res.data === 1) {
                cogoToast.success("Cart Item Updated", {position: 'top-right'})
                this.pageRefresh()
            } else {
                cogoToast.error("Error updating item, try again.", {position: 'top-right'})
            }

        }).catch(err => {
            console.log(err)
            cogoToast.error("Error updating item, try again.", {position: 'top-right'})
        })
    } // end remove item method

    pageRefresh = () => {
        sessionStorage.removeItem("userInfoCartList")
        axios.get(AppUrl.CartList(this.props.user.email)).then(res => {
            let statusCode = res.status
            console.log(statusCode)
            if (statusCode === 200) {
                let jsonData = res.data
                let jsonDataStrings = []
                jsonData.forEach(e => {
                    jsonDataStrings.push(JSON.stringify(e))
                });
                console.log('all user Cart details: ', jsonData)
                sessionStorage.setItem("userInfoCartList", true)
                sessionStorage.setItem("cartListData", jsonDataStrings)
            } else {
                return
            }

        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong.", {
                position: "top-center"
            })
        })
    }

    cityOnChange = (event) => {
        let city = event.target.value
        this.setState({
            city
        })
    }

    nameOnChange = (event) => {
        let name = event.target.value
        this.setState({
            name
        })
    }

    addressOnChange = (event) => {
        let address = event.target.value
        this.setState({
            address
        })
    }

    paymentMethodOnChange = (event) => {
        let payment = event.target.value
        this.setState({
            payment
        })
    }

    confirmOnClick = () => {
        let city = this.state.city
        let address = this.state.address
        let name = this.state.name
        let payment = this.state.payment
        let email = this.props.user.email
        
        if (city.length === 0) {
            cogoToast.error("Please Select City.", {position: 'top-right'})
        }
        else if (address.length === 0) {
            cogoToast.error("Please Enter Address.", {position: 'top-right'})
        }
        else if (name.length === 0) {
            cogoToast.error("Please Enter Name.", {position: 'top-right'})
        }
        else if (payment.length === 0) {
            cogoToast.error("Please Select Payment.", {position: 'top-right'})
        } else {
            let invoice = new Date().getTime();
            let MyFormData = new FormData();
            MyFormData.append('city', city)
            MyFormData.append('name', name)
            MyFormData.append('payment_method', payment)
            MyFormData.append('delivery_address', address)
            MyFormData.append('email', email)
            MyFormData.append('invoice_no', invoice)
            MyFormData.append('delivery_charge', "00")
            
            axios.post(AppUrl.CartOrder, MyFormData).then(res => {
                console.log('RESULT HERE: ', res.data)
                if (res.data === 1) {
                    cogoToast.success("Order Request Received", {position: 'top-right'})
                    sessionStorage.removeItem("userInfoCartList")
                    sessionStorage.removeItem("cartListData")
                    sessionStorage.removeItem("CartCount-" + email)
                    this.setState({pageRedirectStatus: true})
                } else {
                    cogoToast.error("1:Error processing order, try again.", {position: 'top-right'})
                }
    
            }).catch(err => {
                console.log(err)
                cogoToast.error("2:Error processing order, try again.", {position: 'top-right'})
            })
        }

    }

    pageRedirect = () => {
        if (this.state.pageRedirectStatus === true) {
            return (
                <Redirect to="/orderlist" />
            )
        }
    }

    render() {

        if (!sessionStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const MyList = this.state.cartList
        let totalPriceSum = 0
        const MyView = MyList.map((ProductList, i) => {
            totalPriceSum = totalPriceSum+parseInt(ProductList.total_price)
            return (
                <div key={i}>
                    <Card>                
                        <Card.Body>
                            <Row>
                                <Col md={3} lg={3} sm={6} xs={6}>
                                    <img className="cart-product-img" src={ProductList.image} alt="test"/>
                                </Col>

                                <Col md={6} lg={6} sm={6} xs={6}>
                                    <h5 className="product-name">{ProductList.product_name}</h5>
                                    <h6> Quantity = {ProductList.quantity} </h6>
                                    <p>{ProductList.size} | {ProductList.color}</p>
                                    <h6>Price = {ProductList.unit_price} x { ProductList.quantity } = ${ ProductList.total_price}</h6>
                                </Col>

                                <Col md={3} lg={3} sm={12} xs={12}>
                                    <Button onClick={()=>this.removeItem(ProductList.id)} className="btn mt-2 mx-1 btn-lg site-btn">
                                        <i className="fa fa-trash-alt"></i>
                                    </Button>

                                    <Button onClick={()=>this.itemPlus(ProductList.id, ProductList.quantity, ProductList.unit_price)} className="btn mt-2 mx-1 btn-lg site-btn">
                                        <i className="fa fa-plus"></i>
                                    </Button>

                                    <Button onClick={()=>this.itemMinus(ProductList.id, ProductList.quantity, ProductList.unit_price)} className="btn mt-2 mx-1 btn-lg site-btn">
                                        <i className="fa fa-minus"></i>
                                    </Button>
                                </Col>
                            </Row>              
                        </Card.Body>               
                    </Card>
                </div>
            )
        })

        return (
            <Fragment>
                <Container>   

                    <div className="section-title text-center mb-55">
                        <h2>Product Cart List</h2>   
                    </div>

                    <Row>
                        <Col className="p-1" lg={7} md={7} sm={12} xs={12} >
                            { MyView }
                        </Col>

                        <Col className="p-1" lg={5} md={5} sm={12} xs={12} >
                            <div className="card p-2">
                                <div className="card-body">
                                    <div className="container-fluid ">
                                        <div className="row">
                                            <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                <h5 className="Product-Name text-danger">Total Due: ${totalPriceSum}</h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Choose City</label>
                                                <select onChange={this.cityOnChange} className="form-control">
                                                <option value="">Choose</option>
                                                <option value="Dhaka">Assam</option>
                                                <option value="Bihar">Bihar </option>
                                                <option value="Goa">Goa </option>
                                                <option value="Gujarat">Gujarat </option>
                                                <option value="Himachal Pradesh">Himachal Pradesh </option>
                                                <option value="Punjab">Punjab  </option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Choose Payment Method</label>
                                                <select onChange={this.paymentMethodOnChange}  className="form-control">
                                                <option value="">Choose</option>
                                                <option value="Cash On Delivery">Cash On Delivery</option>
                                                <option value="Stripe">Stripe</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Your Name</label>
                                                <input onChange={this.nameOnChange}  className="form-control" type="text" placeholder=""/>
                                            </div>

                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <label className="form-label">Delivery Address</label>
                                                <textarea onChange={this.addressOnChange}   rows={2}  className="form-control" type="text" placeholder=""/>
                                            </div>
                                            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                <button onClick={this.confirmOnClick}  className="btn  site-btn"> {this.state.confirmBtn} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
                {this.pageRedirect()}
            </Fragment>
        )
    }
}

export default Cart

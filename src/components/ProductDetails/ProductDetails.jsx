import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import SuggestedProduct from './SuggestedProduct';
import ReviewList from './ReviewList';
import cogoToast from 'cogo-toast';
import AppUrl from '../../api/AppUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
// import { Redirect } from 'react-router-dom';

class ProductDetails extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
        
        this.state = {
            previewImg: "0",
            isSize: null,
            isColor: null,
            size: "",
            color: "",
            quantity: "",
            productCode: null,
            addToCart: "Add to Cart",
            addToFav: "Favorite",
            orderNow: "Order Now",
            pageRefreshStatus: false,
            pageRedirectStatus: false
        }

        this.cartRefresh = this.cartRefresh.bind(this)
        this.favoriteRefresh = this.favoriteRefresh.bind(this)
    }

    imgOnClick = (event) => {
        let imgSrc = event.target.getAttribute('src')
        this.setState({
            previewImg: imgSrc
        })
    }

    addToCart = () => {
        let isSize = this.state.isSize;
        let isColor = this.state.isColor;
        let color = this.state.color;
        let size = this.state.size;
        let quantity = this.state.quantity;
        let productCode = this.state.productCode;
        let email = this.props.user.email;

        if (isColor === "YES" && color.length === 0) {
            cogoToast.error('Please Select Color', {position: 'top-right'})
        } else if (isSize === "YES" && size.length === 0) {
            cogoToast.error('Please Select Size', {position: 'top-right'})
        } else if (quantity.length === 0) {
            cogoToast.error('Please Select Quantity', {position: 'top-right'})
        } else if (!sessionStorage.getItem('token')) {
            cogoToast.warn('Please Login to Add Items to Cart', {position: 'top-right'})
        } else {
            this.setState({
                addToCart: "Adding..."
            })

            let MyFormData = new FormData();
            MyFormData.append("color", color)
            MyFormData.append("size", size)
            MyFormData.append("quantity", quantity)
            MyFormData.append("product_code", productCode)
            MyFormData.append("email", email)
            
            axios.post(AppUrl.AddToCart, MyFormData, { headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                if (response.data === 1) {
                    cogoToast.success("Product Added to Cart", {position: 'top-right'})
                    this.setState({ addToCart: "Add To Cart" })
                    this.cartRefresh()
                } else {
                    cogoToast.error("Error Adding Product to Cart", {position: 'top-right'})
                    this.setState({ addToCart: "Add To Cart" })
                }
                
            }).catch(error=> {
                cogoToast.error("Error Adding Product to Cart", {position: 'top-right'})
                this.setState({ addToCart: "Add To Cart" })
            })
        }


    } // end addToCart Method

    orderNow = () => {
        let isSize = this.state.isSize;
        let isColor = this.state.isColor;
        let color = this.state.color;
        let size = this.state.size;
        let quantity = this.state.quantity;
        let productCode = this.state.productCode;
        let email = this.props.user.email;

        if (isColor === "YES" && color.length === 0) {
            cogoToast.error('Please Select Color', {position: 'top-right'})
        } else if (isSize === "YES" && size.length === 0) {
            cogoToast.error('Please Select Size', {position: 'top-right'})
        } else if (quantity.length === 0) {
            cogoToast.error('Please Select Quantity', {position: 'top-right'})
        } else if (!sessionStorage.getItem('token')) {
            cogoToast.warn('Please Login to Add Items to Cart', {position: 'top-right'})
        } else {
            this.setState({
                addToCart: "Ordering..."
            })

            let MyFormData = new FormData();
            MyFormData.append("color", color)
            MyFormData.append("size", size)
            MyFormData.append("quantity", quantity)
            MyFormData.append("product_code", productCode)
            MyFormData.append("email", email)
            
            axios.post(AppUrl.AddToCart, MyFormData, { headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                if (response.data === 1) {
                    cogoToast.success("Product Added to Cart", {position: 'top-right'})
                    sessionStorage.removeItem("userInfoCartList")
                    sessionStorage.removeItem("cartListData")
                    this.cartRefresh()
                    this.setState({ orderNow: "Order Now" })
                    this.setState({ pageRedirectStatus: true })
                } else {
                    cogoToast.error("Error Adding Product to Cart", {position: 'top-right'})
                    this.setState({ orderNow: "Order Now" })
                }
                
            }).catch(error=> {
                cogoToast.error("Error Adding Product to Cart", {position: 'top-right'})
                this.setState({ orderNow: "Order Now" })
            })
        }


    } // end orderNow Method

    addToFav = () => {
        this.setState({
            addToFav: "Adding..."
        })

        let productCode = this.state.productCode
        let email = this.props.user.email

        if (!sessionStorage.getItem('token')) {
            cogoToast.warn('Please Login to Add Items to Favorites', {position: 'top-right'})
        } else {
            axios.get(AppUrl.AddFavorite(productCode, email) ).then(response => {
                if (response.data === 1) {
                    cogoToast.success("Product Added to Favorites", {position: 'top-right'})
                    this.setState({ addToFav: "Favorite" })
                    this.favoriteRefresh()
                } else {
                    cogoToast.error("Error Adding Product to Favorites", {position: 'top-right'})
                    this.setState({ addToRav: "Favorite" })
                }
            }).catch(error=> {
                cogoToast.error("Error Adding Product to Favorites", {position: 'top-right'})
                this.setState({ addToRav: "Favorite" })
            })
        }
    }

    colorOnChange = (e) => {
        let color = e.target.value;
        this.setState({color})
    }

    sizeOnChange = (e) => {
        let size = e.target.value;
        this.setState({size})
    }

    quantityOnChange = (e) => {
        let quantity = e.target.value;
        this.setState({quantity})
    }

    cartRefresh = () => {
        console.log('CART REFRESH')
        let user_email = this.props.user?.email
        sessionStorage.removeItem('CartCount-' + user_email)
        axios.get(AppUrl.CartCount(user_email)).then((response)  => {
            console.log('cart count: ', response.data)
            // this.setState({
            //     cartCount: response.data
            // })
            // sessionStorage.setItem('CartCount-' + user_email, response.data)
        })
    }

    favoriteRefresh = () => {
        axios.get(AppUrl.FavoriteList(this.props.user.email)).then(res => {
            let statusCode = res.status
            console.log(statusCode)
            if (statusCode === 200) {
                let jsonData = res.data
                let jsonDataStrings = []
                jsonData.forEach(e => {
                    jsonDataStrings.push(JSON.stringify(e))
                });
                console.log('all user favorite details: ', jsonData)
                sessionStorage.setItem("userInfoFavoriteList", true)
                sessionStorage.setItem("userInfoFavoriteListData", jsonDataStrings)
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

    priceOption(price, special_price) {
        if (special_price==='na') {
            return (
                <p className="product-price-on-card">
                    Price : ${price}
                </p>
            )
        } else {
            return (
                <p className="product-price-on-card">
                    Price : <strike className="text-secondary">${price}</strike> ${special_price}
                </p>
            )
        }
    }

    orderRedirect = () => {
        if (this.state.pageRedirectStatus === true) {
            return (
                <Redirect to="/cart" />
            )
        }
    }

    render() {

        let productDetails = this.props.productDetails
        let productList = this.props.productList

        let title = productList['title']
        let brand = productList['brand']
        let category = productList['category']
        let subcategory = productList['subcategory']
        let product_code = productList['product_code']
        let price = productList['price']
        let special_price = productList['special_price']
        let image = productList['image']

        if (this.state.previewImg === "0") {
            this.setState({
                previewImg: image
            })
        }

        let image_one = productDetails['image_one']
        let image_two = productDetails['image_two']
        let image_three = productDetails['image_three']
        let image_four = productDetails['image_four']
        let color = productDetails['color']
        let size = productDetails['size']
        let product_id = productDetails['product_id']
        let short_description = productDetails['short_description']
        let long_description = productDetails['long_description']

        let colorDiv = "d-none"
        if (color !== "na") {
            let colorArray = color.split(',')
            var colorOption = colorArray.map((colorList, i) => {
                return <option key={i} value={colorList}>{colorList}</option>
            })
            colorDiv=""
        } else {
            colorDiv="d-none"
        }

        let sizeDiv = "d-none"
        if (size !== "na") {
            let sizeArray = size.split(',')
            var sizeOption = sizeArray.map((sizeList, i) => {
                return <option key={i} value={sizeList}>{sizeList}</option>
            })
            sizeDiv=""
        } else {
            sizeDiv="d-none"
        }

        if (!this.state.isSize) {
            if (size !== 'na') {
                this.setState({
                    isSize: "YES"
                })
            } else {
                this.setState({
                    isSize: "NO"
                })
            }
        }

        if (!this.state.isColor) {
            if (color !== 'na') {
                this.setState({
                    isColor: "YES"
                })
            } else {
                this.setState({
                    isColor: "NO"
                })
            }
        }

        if (!this.state.productCode) {
            this.setState({
                productCode: product_code
            })
        }

        return (
            <Fragment>
                <Container fluid={true} className="BetweenTwoSection">

                    <div className="breadbody">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productcategory/" + category}>{ category }</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productsubcategory/" + category + "/" + subcategory }>{ subcategory }</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productdetails/" + product_id}>{ title }</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <Row className="p-2">
                        <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
                            <Row>
                                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                                    
                                    <InnerImageZoom className="detailimage" src={this.state.previewImg} zoomSrc={this.state.previewImg} zoomScale={1.8} zoomType="hover" />
                                    
                                    <Container  className="my-3">
                                        <Row>
                                            <Col className="p-0 m-0"  md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_one} alt="test"/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_two} alt="test"/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_three} alt="test"/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100 smallimage product-sm-img" src={image_four} alt="test"/>
                                            </Col>
                                        </Row>
                                    </Container>    
                                </Col>
                                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                                <h5 className="Product-Name">{title}</h5>
                                <h6 className="section-sub-title">{short_description}</h6>
                                
                                {this.priceOption(price, special_price)}

                                <h6 className="mt-2">Category : <b>{category}</b></h6>
                                
                                <h6 className="mt-2">SubCategory : <b>{subcategory}</b></h6>

                                <h6 className="mt-2">Brand : <b>{brand}</b></h6>

                                <h6 className="mt-2">Product Code : <b>{product_code}</b></h6>

                                <div className={colorDiv}>
                                    <h6 className="mt-2">Choose Color</h6>
                                    <select onChange={this.colorOnChange} className="form-control form-select">
                                        <option>Choose Color</option>
                                        {colorOption}
                                    </select>
                                </div>

                                <div className={sizeDiv}>
                                    <h6 className="mt-2">Choose Size</h6>
                                    <select onChange={this.sizeOnChange} className="form-control form-select">
                                        <option>Choose Size</option>
                                        {sizeOption}
                                    </select>
                                </div>

                                <div className="">
                                    <h6 className="mt-2">Choose Quantity</h6>
                                    <select onChange={this.quantityOnChange} className="form-control form-select">
                                        <option>Choose Quantity</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>

                                        
                                    </select>
                                </div>

                                <div className="input-group mt-3">
                                    <button onClick={this.addToCart} className="btn site-btn m-1 "> <i className="fa fa-shopping-cart"></i>  {this.state.addToCart} </button>
                                    <button onClick={this.orderNow} className="btn btn-primary m-1"> <i className="fa fa-car"></i> {this.state.orderNow} </button>
                                    <button onClick={this.addToFav} className="btn btn-primary m-1"> <i className="fa fa-heart"></i> {this.state.addToFav} </button>
                                </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">DETAILS</h6>
                                    <p>{long_description}</p>
                                </Col>

                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    
                                    <ReviewList 
                                        productId={product_code}
                                    />

                                </Col>
                            </Row>

                        </Col> 
                    </Row>
                </Container>

                <SuggestedProduct 
                    subcategory={subcategory}
                />

                {this.orderRedirect()}
            </Fragment>
        )
    }
}

export default ProductDetails

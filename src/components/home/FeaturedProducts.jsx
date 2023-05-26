import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeaturedLoading from '../Placeholder/FeaturedLoading';

class FeaturedProducts extends Component {

    constructor() {
        super()

        this.state = {
            productData: [],
            isLoading: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        let productData = sessionStorage.getItem("siteInfoFeaturedProducts")
        
        if (productData === null) {
            return
        } // end if condition

        else {
            let productDataConverted = "[" + productData + "]"
            let productDataObjArray = JSON.parse(productDataConverted)
            
            this.setState({
                productData: productDataObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    render() {

        const FeaturedList = this.state.productData
        const MyView = FeaturedList.map((FeaturedList, i) => {

            if (FeaturedList.special_price === 'N/A') {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + FeaturedList.id}>
                            <Card className="image-box card">
                                <img className="center" src={FeaturedList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{FeaturedList.title}</p>  
                                    <p className="product-price-on-card">{FeaturedList.price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            } 
            else {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + FeaturedList.id}>
                            <Card className="image-box card">
                                <img className="center" src={FeaturedList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{FeaturedList.title}</p>  
                                    <p className="product-price-on-card"><strike className="text-secondary">{FeaturedList.price}</strike></p>
                                    <p className="product-price-on-card">{FeaturedList.special_price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            }
            
        })

        return (
            <Fragment>
                <FeaturedLoading 
                    isLoading={this.state.isLoading}
                />
                <div className={this.state.mainDiv}>
                    <Container className="text-center" fluid>

                        <div className="section-title text-center mb-55">
                            <h2>FEATURED PRODUCTS</h2>
                            <p>Some Of Our Exclusive Collection, You May Like</p>
                        </div>

                        <Row>
                            { MyView }
                        </Row>
                    </Container>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default FeaturedProducts

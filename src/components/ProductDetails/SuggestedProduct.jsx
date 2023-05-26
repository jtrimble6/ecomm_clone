import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppUrl from '../../api/AppUrl';

class SuggestedProduct extends Component {

    constructor() {
        super()

        this.state = {
            suggestedProducts: []
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        let subcategory = this.props.subcategory
        let suggestedProducts = sessionStorage.getItem("suggestedProducts-" + subcategory)
        if (suggestedProducts === null) {
            axios.get(AppUrl.SimilarProduct(subcategory)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    
                    console.log('THE DATA', res.data)
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });

                    sessionStorage.setItem("suggestedProducts-" + subcategory, jsonDataStrings)
                    let suggestedProductsConverted = "[" + jsonDataStrings + "]"
                    let suggestedProductsObjArray = JSON.parse(suggestedProductsConverted)
                    this.setState({
                        suggestedProducts: suggestedProductsObjArray,
                        isLoading: "d-none",
                        mainDiv: ""
                    })
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                return
            })
        } else {
            let suggestedProducts = sessionStorage.getItem("suggestedProducts-" + subcategory)
            let suggestedProductsConverted = "[" + suggestedProducts + "]"
            let suggestedProductsObjArray = JSON.parse(suggestedProductsConverted)
            // console.log(suggestedProductsObjArray)
            
            this.setState({
                suggestedProducts: suggestedProductsObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
            return
        }
    }

    render() {

        const SuggestedProductList = this.state.suggestedProducts

        if (SuggestedProductList.length) {

            // create view
            const MyView = SuggestedProductList.map((ProductList, i) => {
                if (ProductList.special_price === 'N/A') {
                    return (
                        <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Link className="text-link" to={"/productdetails/" + ProductList.id}>
                                <Card className="image-box card">
                                    <img className="center" src={ProductList.image} alt="testimg" />
                                    <Card.Body>
                                        <p className="product-name-on-card">{ProductList.title}</p>  
                                        <p className="product-price-on-card">{ProductList.price}</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    )
                } 
                else {
                    return (
                        <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Link className="text-link" to={"/productdetails/" + ProductList.id}>
                                <Card className="image-box card">
                                    <img className="center" src={ProductList.image} alt="testimg" />
                                    <Card.Body>
                                        <p className="product-name-on-card">{ProductList.title}</p>  
                                        <p className="product-price-on-card"><strike className="text-secondary">{ProductList.price}</strike></p>
                                        <p className="product-price-on-card">{ProductList.special_price}</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    )
                } 
            })

            return (
                <Fragment>
                    <Container className="text-center" fluid>
    
                        <div className="section-title text-center mb-55">
                            <h2>YOU MAY ALSO LIKE</h2>
                            <p>Some Of Our Exclusive Collection, You May Like</p>
                        </div>
    
                        <Row>
                            
                            { MyView }
                            
                        </Row>
                    </Container>
                </Fragment>
            )
        } // end if condition
        else {
            return (
                <Fragment>
                    <Container className="text-center" fluid>
    
                        <div className="section-title text-center mb-55">
                            <h2>YOU MAY ALSO LIKE</h2>
                            <p>Some Of Our Exclusive Collection, You May Like</p>
                        </div>
    
                        <p>There are no similar products</p>
                    </Container>
                </Fragment>
            )
        } // end else condition
        
    }
}

export default SuggestedProduct

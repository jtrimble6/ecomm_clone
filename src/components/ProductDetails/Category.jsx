import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class Category extends Component {
    render() {

        const CategoryList = this.props.productData
        const Category = this.props.category
        const MyView = CategoryList.map((CategoryList, i) => {

            if (CategoryList.special_price === 'N/A') {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + CategoryList.id}>
                            <Card className="image-box card">
                                <img className="center w-75" src={CategoryList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{CategoryList.title}</p>  
                                    <p className="product-price-on-card">{CategoryList.price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            } 
            else {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + CategoryList.id}>
                            <Card className="image-box card">
                                <img className="center" src={CategoryList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{CategoryList.title}</p>  
                                    <p className="product-price-on-card"><strike className="text-secondary">{CategoryList.price}</strike></p>
                                    <p className="product-price-on-card">{CategoryList.special_price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            }
        })

        return (
            <Fragment>
                <Container className="text-center" fluid={true}>

                    <div className="breadbody">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productcategory/" + Category}>{ Category }</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div className="section-title text-center mb-40 mt-2">
                        <h2>{ Category }</h2>
                    </div>
                    <Row>
                        { MyView }
                    </Row>
                </Container>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Category

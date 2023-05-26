import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class SubCategory extends Component {
    render() {

        const SubCategoryList = this.props.productData
        const Category = this.props.category
        const SubCategory = this.props.subCategory
        const MyView = SubCategoryList.map((SubCategoryList, i) => {

            if (SubCategoryList.special_price === 'N/A') {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + SubCategoryList.id}>
                            <Card className="image-box card">
                                <img className="center w-75" src={SubCategoryList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{SubCategoryList.title}</p>  
                                    <p className="product-price-on-card">{SubCategoryList.price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            } 
            else {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + SubCategoryList.id}>
                            <Card className="image-box card">
                                <img className="center" src={SubCategoryList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{SubCategoryList.title}</p>  
                                    <p className="product-price-on-card"><strike className="text-secondary">{SubCategoryList.price}</strike></p>
                                    <p className="product-price-on-card">{SubCategoryList.special_price}</p>
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
                            <Breadcrumb.Item>
                                <Link to={"/productsubcategory/" + Category + "/" + SubCategory }>{ SubCategory }</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div className="section-title text-center mb-40 mt-2">
                        <h2>{ Category } / { SubCategory }</h2>
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

export default SubCategory

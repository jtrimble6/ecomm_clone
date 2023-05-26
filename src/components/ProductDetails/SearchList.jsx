import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class SearchList extends Component {
    render() {

        const SearchList = this.props.searchData
        const SearchKey = this.props.searchKey
        const MyView = SearchList.map((SearchList, i) => {

            if (SearchList.special_price === 'N/A') {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productbysearch/" + SearchKey}>
                            <Card className="image-box card">
                                <img className="center w-75" src={SearchList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{SearchList.title}</p>  
                                    <p className="product-price-on-card">{SearchList.price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            } 
            else {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productbysearch/" + SearchKey}>
                            <Card className="image-box card">
                                <img className="center" src={SearchList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{SearchList.title}</p>  
                                    <p className="product-price-on-card"><strike className="text-secondary">{SearchList.price}</strike></p>
                                    <p className="product-price-on-card">{SearchList.special_price}</p>
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
                                <Link to={"/productcategory/" + SearchKey}>Search For : { SearchKey }</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div className="section-title text-center mb-40 mt-2">
                        <h2>{ SearchKey }</h2>
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

export default SearchList

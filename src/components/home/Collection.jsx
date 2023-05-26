import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CollectionLoading from '../Placeholder/CollectionLoading';

class Collection extends Component {

    constructor() {
        super()

        this.state = {
            collectionData: [],
            isLoading: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        let collectionData = sessionStorage.getItem("siteInfoCollectionProducts")
        
        if (collectionData === null) {
            return
        } // end if condition

        else {
            let collectionDataConverted = "[" + collectionData + "]"
            let collectionDataObjArray = JSON.parse(collectionDataConverted)
            
            this.setState({
                collectionData: collectionDataObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    render() {

        const CollectionList = this.state.collectionData
        const MyView = CollectionList.map((CollectionList, i) => {

            if (CollectionList.special_price === 'N/A') {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + CollectionList.id}>
                            <Card className="image-box card">
                                <img className="center w-75" src={CollectionList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{CollectionList.title}</p>  
                                    <p className="product-price-on-card">{CollectionList.price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            } 
            else {
                return (
                    <Col key={i.toString()} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className="text-link" to={"/productdetails/" + CollectionList.id}>
                            <Card className="image-box card">
                                <img className="center" src={CollectionList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{CollectionList.title}</p>  
                                    <p className="product-price-on-card"><strike className="text-secondary">{CollectionList.price}</strike></p>
                                    <p className="product-price-on-card">{CollectionList.special_price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )
            }
        })

        return (
            <Fragment>
                <CollectionLoading 
                    isLoading={this.state.isLoading}
                />
                <div className={this.state.mainDiv}>
                    <Container className="text-center" fluid={true}>

                        <div className="section-title text-center mb-55">
                            <h2>PRODUCT COLLECTION</h2>
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

export default Collection

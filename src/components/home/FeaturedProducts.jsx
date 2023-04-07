import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

class FeaturedProducts extends Component {
    render() {
        return (
            <Fragment>
                <Container className="text-center" fluid>

                    <div className="section-title text-center mb-55">
                        <h2>FEATURED PRODUCT</h2>
                        <p>Some Of Our Exclusive Collection, You May Like</p>
                    </div>

                    <Row>
                        <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Card className="image-box card">
                                <img className="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgNR1qiZShsaZxtNWcEJJdigBGC0HC29WvH6xVWq4CR-KXeGNOq6FQjgQI3Y68-b9I-JE&usqp=CAU" alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">RealMe C21</p>  
                                    <p className="product-price-on-card">Price: $120</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="p-1" key={2} xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Card className="image-box card">
                                <img className="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy0nYtkA3nei-LeDySclnMEF5kOqmHO6LkSA&usqp=CAU" alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">RealMe C22</p>  
                                    <p className="product-price-on-card">Price: $120</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="p-1" key={3} xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Card className="image-box card">
                                <img className="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1nKHKrSZMje_p_Nj2z4N3tB2xT3l_z_-SYg&usqp=CAU" alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">RealMe C23</p>  
                                    <p className="product-price-on-card">Price: $120</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="p-1" key={4} xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Card className="image-box card">
                                <img className="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRphGD56uFtBMQTU9QNDuPjBjgQ6KGpsNX0Cw&usqp=CAU" alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">RealMe C24</p>  
                                    <p className="product-price-on-card">Price: $120</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="p-1" key={5} xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Card className="image-box card">
                                <img className="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpApzxppK45DNyWsJydnvpjwXYrwusVr53jQ&usqp=CAU" alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">RealMe C25</p>  
                                    <p className="product-price-on-card">Price: $120</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="p-1" key={6} xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Card className="image-box card">
                                <img className="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTOUz4RePFJHj8m15fA0ve7Q_L3scG8RVxQ&usqp=CAU" alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">RealMe C26</p>  
                                    <p className="product-price-on-card">Price: $120</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default FeaturedProducts

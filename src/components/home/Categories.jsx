import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import CategoryLoading from '../Placeholder/CategoryLoading';

class Categories extends Component {
    constructor(props) {
        super()

        this.state = {
            menuData: [],
            isLoading: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        let menuData = sessionStorage.getItem("siteInfoMenuData")
        
        if (menuData === null) {
            return
        } // end if condition

        else {
            let menuDataConverted = "[" + menuData + "]"
            let menuDataObjArray = JSON.parse(menuDataConverted)
            
            this.setState({
                menuData: menuDataObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
        
    }

    render() {

        const CatList = this.state.menuData
        const MyView = CatList.map((CatList, i) => {
            return (
                <Col key={i.toString()} className="p-0" xl={2} lg={2} md={2} sm={6} xs={6}>
                    <Link className="text-link" to={"/productcategory/" + CatList.category_name} >
                        <Card className="h-100 w-100 text-center">
                            <Card.Body>
                                <img className="center" src={CatList.category_image} alt="img" />
                                <h5 className="category-name">{CatList.category_name}</h5>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        })

        return (
            <Fragment>
                <ToastContainer />
                <CategoryLoading 
                    isLoading={this.state.isLoading}
                />
                <div className={this.state.mainDiv}>
                    <Container className="text-center" fluid>

                        <div className="section-title text-center mb-55">
                            <h2>CATEGORIES</h2>
                            <p>Some Of Our Exclusive Collection, You May Like</p>
                        </div>

                        <Row>
                            { MyView }
                        </Row>

                    </Container>
                </div>
            </Fragment>
        )
    }
}

export default Categories

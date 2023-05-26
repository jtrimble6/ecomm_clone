import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import AppUrl from '../../api/AppUrl'
import { toast } from 'react-toastify'
import cogoToast from 'cogo-toast'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'

class Favorite extends Component {
    constructor() {
        super()

        this.state = {
            productData: [],
            isLoading: "",
            mainDiv: "d-none"
        }

        this.removeItem = this.removeItem.bind(this)
    }

    componentDidMount() {
        // GET USER FAVORITE LIST INFO
        let userInfoFavoriteList = sessionStorage.getItem("userInfoFavoriteList")

        if (userInfoFavoriteList === null) {
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

        } // end if condition

        else {
            let productData = sessionStorage.getItem("userInfoFavoriteListData")
            let productDataConverted = "[" + productData + "]"
            let productDataObjArray = JSON.parse(productDataConverted)
            
            this.setState({
                productData: productDataObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    removeItem = (event) => {
        let product_code = event.target.getAttribute('data-code')
        console.log('product code: ', product_code)
        let email = this.props.user.email

        axios.get(AppUrl.RemoveFavorite(product_code, email)).then((response)  => {
            cogoToast.success("Product Removed from Favorites", {position: 'top-right'})
            this.pageRefresh()
        }).catch(err=>{
            cogoToast.error("Error Removing Product from Favorites", {position: 'top-right'})
        })
    } // end remove favorite

    pageRefresh = () => {
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
    
    render() {

        if (!sessionStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const FavoriteList = this.state.productData
        const MyView = FavoriteList.map((FavoriteList, i) => {
            return (
                <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Card className="image-box car w-100">
                        <img className="center w-75" src={FavoriteList.product_image} alt="testimg" />
                        <Card.Body>
                            <p className="product-name-on-card">{FavoriteList.product_name}</p>  
                            <Button onClick={this.removeItem} data-code={FavoriteList.product_code} className="btn btn-sm">
                                <i data-code={FavoriteList.product_code} className="fa fa-trash-alt"> Remove </i>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
            
        })


        return (
            <Fragment>
                <Container className="text-center" fluid={true}>

                    <div className="section-title text-center mb-55">
                        <h2>MY FAVORITE ITEMS</h2>
                        <p>Some Of Our Exclusive Collection, You May Like</p>
                    </div>
                    <Row>
                        
                        { MyView }

                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default Favorite

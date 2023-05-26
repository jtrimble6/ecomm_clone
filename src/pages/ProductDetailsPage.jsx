import React, { Component, Fragment } from 'react'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import { toast } from 'react-toastify';
import axios from 'axios'
import AppUrl from '../api/AppUrl'
import SliderLoading from '../components/Placeholder/SliderLoading'

class ProductDetailsPage extends Component {
    constructor({match}) {
        super()
        
        this.state = {
            code: match.params.code,
            productDetails: [],
            isLoading: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        window.scroll(0,0)

        let productDetails = sessionStorage.getItem("productDetails" + this.state.code)
        if (productDetails === null) {
            axios.get(AppUrl.ProductDetails(this.state.code)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let productDetails = jsonData.productDetails
                    let productList = jsonData.productList
                    // console.log('THE DATA', res.data)
                    // console.log('PRODUCT DETAILS: ', productDetails)
                    // console.log('PRODUCT LIST: ', productList)

                    let productDetailsString = JSON.stringify(productDetails[0])
                    let productListString = JSON.stringify(productList[0])

                    // console.log('PRODUCT DETAILS: ', productDetailsString)
                    // console.log('PRODUCT LIST: ', productListString)

                    sessionStorage.setItem("productDetails" + this.state.code, productDetailsString)
                    sessionStorage.setItem("productList" + this.state.code, productListString)
                    this.setState({
                        productDetails: productDetails,
                        productList: productList,
                        isLoading: "d-none",
                        mainDiv: ""
                    })
                } else {
                    toast.error("Something went wrong.", {
                        position: "top-center"
                    })
                }
    
            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "top-center"
                })
            })
        } else {
            let jsonDataStringsPD = sessionStorage.getItem("productDetails" + this.state.code)
            let jsonDataStringsPL = sessionStorage.getItem("productList" + this.state.code)
            let jsonDataObjPD = JSON.parse(jsonDataStringsPD)
            let jsonDataObjPL = JSON.parse(jsonDataStringsPL)
            // console.log(jsonDataObjPD)
            // console.log(jsonDataObjPL)
            this.setState({
                productDetails: jsonDataObjPD,
                productList: jsonDataObjPL,
                isLoading: "d-none",
                mainDiv: ""
            })
            return
        }
    }
    
    render() {

        const user = this.props.user

        if (this.state.mainDiv === "d-none") {
            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop 
                            user={user} 
                            product_code={this.state.code}
                        />
                    </div>
                    <div className="Mobile">
                        <NavMenuMobile />
                    </div>

                    <SliderLoading 
                        isLoading={this.state.isLoading}
                    />
                    
                    <div className="Desktop">
                        <FooterDesktop />
                    </div>
                    <div className="Mobile">
                        <FooterMobile />
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop 
                            user={user} 
                            product_code={this.state.code}
                        />
                    </div>
                    <div className="Mobile">
                        <NavMenuMobile />
                    </div>
    
                    <ProductDetails 
                        productDetails={this.state.productDetails}
                        productList={this.state.productList}
                        user={user}
                        product_code={this.state.code}
                    />
                    
                    <div className="Desktop">
                        <FooterDesktop />
                    </div>
                    <div className="Mobile">
                        <FooterMobile />
                    </div>
                </Fragment>
            )
        }
    }
}

export default ProductDetailsPage

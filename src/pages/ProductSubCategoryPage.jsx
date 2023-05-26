import React, { Component, Fragment } from 'react'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import AppUrl from '../api/AppUrl'
import SubCategory from '../components/ProductDetails/SubCategory'

class ProductSubCategoryPage extends Component {
    constructor({match}) {
        super()
        
        this.state = {
            category: match.params.category,
            subcategory: match.params.subcategory,
            productData: []
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        // alert(this.state.category)
        let allProductListByCategoryInfo = sessionStorage.getItem(this.state.subcategory)
        if (allProductListByCategoryInfo === null) {
            axios.get(AppUrl.ProductListBySubCategory(this.state.category, this.state.subcategory)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all category details: ', jsonData)
                    sessionStorage.setItem(this.state.subcategory, jsonDataStrings)
                    let jsonDataConverted = "[" + jsonDataStrings + "]"
                    let jsonDataObjArray = JSON.parse(jsonDataConverted)
                    this.setState({
                        productData: jsonDataObjArray
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
            let jsonDataStrings = sessionStorage.getItem(this.state.subcategory)
            let jsonDataConverted = "[" + jsonDataStrings + "]"
            let jsonDataObjArray = JSON.parse(jsonDataConverted)
            this.setState({
                productData: jsonDataObjArray
            })
            return
        }

    }

    render() {
        const user = this.props.user
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop user={user} />
                </div>
                <div className="Mobile">
                    <NavMenuMobile />
                </div>

                <SubCategory 
                    category={this.state.category}
                    subCategory={this.state.subcategory}
                    productData={this.state.productData}
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

export default ProductSubCategoryPage

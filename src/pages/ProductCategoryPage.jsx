import React, { Component, Fragment } from 'react'
import axios from 'axios'
import AppUrl from '../api/AppUrl'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import Category from '../components/ProductDetails/Category'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProductCategoryPage extends Component {
    constructor({match}) {
        super()
        
        this.state = {
            category: match.params.category,
            productData: []
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        // alert(this.state.category)
        let allProductListByCategoryInfo = sessionStorage.getItem(this.state.category)
        if (allProductListByCategoryInfo === null) {
            axios.get(AppUrl.ProductListByCategory(this.state.category)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all category details: ', jsonData)
                    sessionStorage.setItem(this.state.category, jsonDataStrings)
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
            let jsonDataStrings = sessionStorage.getItem(this.state.category)
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

                <Category 
                    category={this.state.category}
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

export default ProductCategoryPage

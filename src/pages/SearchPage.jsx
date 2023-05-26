import React, { Component, Fragment } from 'react'
import axios from 'axios'
import AppUrl from '../api/AppUrl'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import SearchList from '../components/ProductDetails/SearchList'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class SearchPage extends Component {
    constructor({match}) {
        super()
        
        this.state = {
            searchKey: match.params.searchkey,
            searchData: []
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        // alert(this.state.category)
        let allProductListBySearchInfo = sessionStorage.getItem("searchKey-" + this.state.searchKey)
        if (allProductListBySearchInfo === null) {
            axios.get(AppUrl.ProductBySearch(this.state.searchKey)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all search details: ', jsonData)
                    sessionStorage.setItem("searchKey-" + this.state.searchKey, jsonDataStrings)
                    let jsonDataConverted = "[" + jsonDataStrings + "]"
                    let jsonDataObjArray = JSON.parse(jsonDataConverted)
                    this.setState({
                        searchData: jsonDataObjArray
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
            let jsonDataStrings = sessionStorage.getItem("searchKey-" + this.state.searchKey)
            let jsonDataConverted = "[" + jsonDataStrings + "]"
            let jsonDataObjArray = JSON.parse(jsonDataConverted)
            console.log('all search details: ', jsonDataObjArray)
            this.setState({
                searchData: jsonDataObjArray
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

                <SearchList 
                    searchKey={this.state.searchKey}
                    searchData={this.state.searchData}
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

export default SearchPage

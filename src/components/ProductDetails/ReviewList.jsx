import React, { Component } from 'react'
import axios from 'axios'
import AppUrl from '../../api/AppUrl';

class ReviewList extends Component {
    constructor() {
        super()

        this.state = {
            productReviews: []
        }
    }


    componentDidMount() {
        window.scroll(0,0)
        let productId = this.props.productId
        console.log('product id: ', productId)
        let productReviews = sessionStorage.getItem("productReviews-" + productId)
        if (productReviews === null) {
            axios.get(AppUrl.ReviewList(productId)).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    
                    console.log('THE DATA', res.data)
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });

                    sessionStorage.setItem("productReviews-" + productId, jsonDataStrings)
                    let productReviewsConverted = "[" + jsonDataStrings + "]"
                    let productReviewsObjArray = JSON.parse(productReviewsConverted)
                    this.setState({
                        productReviews: productReviewsObjArray,
                        isLoading: "d-none",
                        mainDiv: ""
                    })
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                return
            })
        } else {
            let productReviews = sessionStorage.getItem("productReviews-" + productId)
            let productReviewsConverted = "[" + productReviews + "]"
            let productReviewsObjArray = JSON.parse(productReviewsConverted)
            // console.log(productReviewsObjArray)
            
            this.setState({
                productReviews: productReviewsObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
            return
        }
    }

    render() {
        const ProductReviewsList = this.state.productReviews

        if (ProductReviewsList.length) {

            // create view
            const MyView = ProductReviewsList.map((ReviewList, i) => {

                if (ReviewList.reviewer_rating === "1") {
                    return (
                        <div key={i}>
                            <p className=" p-0 m-0"><span className="Review-Title">{ReviewList.reviewer_name}</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                            <p>{ReviewList.reviewer_comments}</p>
                        </div>
                    )
                } else if (ReviewList.reviewer_rating === "2") {
                    return (
                        <div key={i}>
                            <p className=" p-0 m-0">
                                <span className="Review-Title">{ReviewList.reviewer_name}</span> 
                                <span className="text-success">
                                    <i className="fa fa-star"></i> 
                                </span> 
                            </p>
                            <p>{ReviewList.reviewer_comments}</p>
                        </div>
                    )
                } else if (ReviewList.reviewer_rating === "3") {
                    return (
                        <div key={i}>
                            <p className=" p-0 m-0">
                                <span className="Review-Title">{ReviewList.reviewer_name}</span> 
                                <span className="text-success">
                                    <i className="fa fa-star"></i> 
                                    <i className="fa fa-star"></i> 
                                </span> 
                            </p>
                            <p>{ReviewList.reviewer_comments}</p>
                        </div>
                    )
                } else if (ReviewList.reviewer_rating === "4") {
                    return (
                        <div key={i}>
                            <p className=" p-0 m-0">
                                <span className="Review-Title">{ReviewList.reviewer_name}</span> 
                                <span className="text-success">
                                    <i className="fa fa-star"></i> 
                                    <i className="fa fa-star"></i> 
                                    <i className="fa fa-star"></i> 
                                </span> 
                            </p>
                            <p>{ReviewList.reviewer_comments}</p>
                        </div>
                    )
                } else if (ReviewList.reviewer_rating === "5") {
                    return (
                        <div key={i}>
                            <p className=" p-0 m-0">
                                <span className="Review-Title">{ReviewList.reviewer_name}</span> 
                                <span className="text-success">
                                    <i className="fa fa-star"></i> 
                                    <i className="fa fa-star"></i> 
                                    <i className="fa fa-star"></i> 
                                    <i className="fa fa-star"></i> 
                                </span> 
                            </p>
                            <p>{ReviewList.reviewer_comments}</p>
                        </div>
                    )
                } // end else if condition

                return (
                    <div key={i}>
                        <p className=" p-0 m-0"><span className="Review-Title">{ReviewList.reviewer_name}</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                        <p>{ReviewList.reviewer_comments}</p>
                    </div>
                )

            }) // end map

            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    { MyView }
                </div>
            )
            
        } // end if condition
        else {
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    <p>There are no reviews for this product.</p>
                </div>
            )
        } // end else condition
        
    }
}

export default ReviewList

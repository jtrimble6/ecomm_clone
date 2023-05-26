import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Card } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import NewArrivalLoading from '../Placeholder/NewArrivalLoading';

class NewArrival extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newArrivalData: [],
            isLoading: "",
            mainDiv: "d-none"
        }

        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
    }

    componentDidMount() {
        let newArrivalData = sessionStorage.getItem("siteInfoNewProducts")
        
        if (newArrivalData === null) {
            return
        } // end if condition

        else {
            let newArrivalDataConverted = "[" + newArrivalData + "]"
            let newArrivalDataObjArray = JSON.parse(newArrivalDataConverted)
            
            this.setState({
                newArrivalData: newArrivalDataObjArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    }
                }
            ]
        };

        const NewArrivalList = this.state.newArrivalData
        const MyView = NewArrivalList.map((NewArrivalList, i) => {

            if (NewArrivalList.special_price === 'N/A') {
                return (
                    <Link key={i.toString()} className="text-link" to={"/productdetails/" + NewArrivalList.id}>
                            <div>
                                <Card className="image-box card">
                                    <img className="center" src={NewArrivalList.image} alt="testimg" />
                                    <Card.Body>
                                        <p className="product-name-on-card">{NewArrivalList.title}</p>  
                                        <p className="product-price-on-card">{NewArrivalList.price}</p>
                                    </Card.Body>
                                </Card>
                            </div>
                    </Link>
                )
            } 
            else {
                return (
                    <Link key={i.toString()} className="text-link" to={"/productdetails/" + NewArrivalList.id}>
                        <div>
                            <Card className="image-box card">
                                <img className="center" src={NewArrivalList.image} alt="testimg" />
                                <Card.Body>
                                    <p className="product-name-on-card">{NewArrivalList.title}</p>  
                                    <p className="product-price-on-card"><strike className="text-secondary">{NewArrivalList.price}</strike></p>
                                    <p className="product-price-on-card">{NewArrivalList.special_price}</p>
                                </Card.Body>
                            </Card>
                        </div>
                    </Link>
                )
            }
            
        })
        
        return (
            <Fragment>
                <NewArrivalLoading
                    isLoading={this.state.isLoading}
                />
                <div className={this.state.mainDiv}>
                    <Container className="text-center" fluid>
                        
                        <div className="section-title text-center mb-55">
                            <h2>
                                NEW ARRIVALS 
                                &nbsp;
                                <a href="/" className="btn btn-sm ml-2 site-btn" onClick={this.previous}><i className="fa fa-angle-left"></i></a>
                                &nbsp;
                                <a href="/" className="btn btn-sm ml-2 site-btn" onClick={this.next}><i className="fa fa-angle-right"></i></a>
                            </h2>
                            <p>Some Of Our Exclusive Collection, You May Like</p>
                        </div>

                        <Row>
                            <Slider ref={c=>(this.slider=c)} {...settings}>
                                { MyView }
                            </Slider>
                        </Row>

                    </Container>
                </div>
            </Fragment>
        )
    }
}

export default NewArrival

import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import HomeSlider from './HomeSlider'
import MegaMenu from './MegaMenu'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SliderLoading from '../Placeholder/SliderLoading';

export class HomeTop extends Component {

    constructor(props) {
        super()

        this.state = {
            menuData: [],
            sliderData: [],
            isLoading: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        let menuData = sessionStorage.getItem("siteInfoMenuData")
        let sliderData = sessionStorage.getItem("siteInfoSliders")
        if (menuData === null && sliderData === null) {
            return
        } // end if condition

        else {
            let menuDataConverted = "[" + menuData + "]"
            let menuDataObjArray = JSON.parse(menuDataConverted)
            
            let sliderDataConverted = "[" + sliderData + "]"
            let sliderDataArray = JSON.parse(sliderDataConverted)

            this.setState({
                menuData: menuDataObjArray,
                sliderData: sliderDataArray,
                isLoading: "d-none",
                mainDiv: ""
            })
        }
    }

    render() {
        return (
            <Fragment>
                <SliderLoading
                    isLoading={this.state.isLoading}
                />
                <ToastContainer />
                <div className={this.state.mainDiv}>
                    <Container className="p-0 m-0 overflow-hidden" fluid>
                        <Row>
                            <Col lg={3} md={3} sm={12}>
                                <MegaMenu
                                    menuData={this.state.menuData}
                                />
                            </Col>
                            <Col lg={9} md={9} sm={12}>
                                <HomeSlider
                                    sliderData={this.state.sliderData}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Fragment>
        )
    }
}

export default HomeTop
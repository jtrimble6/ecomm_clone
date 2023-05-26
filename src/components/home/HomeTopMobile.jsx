import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import HomeSlider from './HomeSlider'

class HomeTopMobile extends Component {
    constructor(props) {
        super()

        this.state = {
            menuData: [],
            sliderData: []
        }
    }

    componentDidMount() {
        let sliderData = sessionStorage.getItem("siteInfoSliders")
        if (sliderData === null) {
            return
        } // end if condition

        else {
            let sliderDataConverted = "[" + sliderData + "]"
            let sliderDataArray = JSON.parse(sliderDataConverted)

            this.setState({
                sliderData: sliderDataArray,
                loaderDiv: "d-none",
                mainDiv: ""
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Container className="p-0 m-0 overflow-hidden" fluid>
                    <Row className="p-0 m-0 overflow-hidden">
                        <Col lg={12} md={12} sm={12}>
                            <HomeSlider
                                sliderData={this.state.sliderData}
                            />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default HomeTopMobile

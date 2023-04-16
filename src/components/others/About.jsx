import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AppURL from '../../api/AppURL'
import axios from 'axios'

const About = () => {

    // constructor() {
    //     super()

    //     this.state = {
    //         about: ""
    //     }
    // }

    // componentDidMount() {
    //     // axios
    //     //     .post(AppURL.TestUrl, "test")
    //     //     .then((res) => {
    //     //         console.log(res);
    //     //         console.log(res.data);
    //     // });

    //     // axios.get(AppURL.AllSiteInfo).then(res => {
    //     //     let statusCode = res.status

    //     //     if (statusCode === 200) {
    //     //         let jsonData = (res.data)[0]['about']
    //     //         console.log(jsonData)
    //     //         // this.setState({
    //     //         //     about: jsonData
    //     //         // })
    //     //     }

    //     // }).catch(err => {
    //     //     console.log(err)
    //     // })
    // }

    async function fetchAbout(e) {
        console.log(e)
        e.preventDefault()
        // const response = await fetch(`${api_Url}/products${param}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `bearer ${token}`
        //     },
        //     });
        //     console.log(response);

            const response = await axios.get(AppURL.TestUrl)
            console.log(response)
    }

    // fetchAbout = (e) => {
    //     e.preventDefault()
    //     axios.get(AppURL.AllSiteInfo).then(res => {
    //         let statusCode = res.status
    //         console.log(statusCode)
    //         if (statusCode === 200) {
    //             let jsonData = (res.data)[0]['about']
    //             console.log(jsonData)
    //             // this.setState({
    //             //     about: jsonData
    //             // })
    //         }

    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // render() {
        return (
            <Fragment>
                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <Button onClick={(e) => fetchAbout(e)}>Fetch Page</Button>
                            <h4 className="section-title-login">About Page</h4>
                            <p className="section-title-contact">
                                {/* {this.state.about} */}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
// }

export default About

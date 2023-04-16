import React, { Component, Fragment, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
// import { useLocation } from 'react-router-dom'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import Categories from '../components/home/Categories'
import Collection from '../components/home/Collection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import HomeTop from '../components/home/HomeTop'
import HomeTopMobile from '../components/home/HomeTopMobile'
import NewArrival from '../components/home/NewArrival'
import axios from 'axios'
import AppURL from '../api/AppURL'

class HomePage extends Component {

    componentDidMount() {
        window.scroll(0,0)
    }

    // async GetVisitorDetails(e) {
    //     e.preventDefault()
    //     console.log('clicked')
    //     const result = await axios.get(AppURL.VisitorDetails).then((res) => {console.log(res)}).catch((err) => {console.log(err)})
    //     return result
    // }
        
    getVisitor = async (e) => {
        let options = {
            method: 'GET',
            url: AppURL.VisitorDetails,
            // headers: {
            //     'X-RapidAPI-Key': '8c6298e60fmsh78f845c72d7b773p1853fdjsn029108cc4366',
            //     'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            // }
        };
        console.log('clicked')
        e.preventDefault()
        await axios.request(options)
        // await axios.get(AppURL.TestUrl)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {console.log(err)})
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop />
                    <HomeTop />
                </div>
                <div className="Mobile">
                    <NavMenuMobile />
                    <HomeTopMobile />
                </div>

                <Button onClick={this.getVisitor}>Click Me</Button>
                <FeaturedProducts />
                <NewArrival />
                <Categories />
                <Collection />
                
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

export default HomePage


// REACT FUNCTIONAL COMPONENT

// function HomePage(props) {
//     const [isLoading, setLoading] = useState(false);
//     // const [data, setData] = useState([]);

//     // const location = useLocation()

//     // const useReactPath = () => {
//     //     const [path, setPath] = React.useState(window.location.pathname);
//     //     const listenToPopstate = () => {
//     //         const winPath = window.location.pathname;
//     //         setPath(winPath);
//     //         };
//     //     React.useEffect(() => {
//     //         window.addEventListener("popstate", listenToPopstate);
//     //         return () => {
//     //             window.removeEventListener("popstate", listenToPopstate);
//     //         };
//     //     }, []);
//     //     return path;
//     // };

//     // const path = useReactPath()

//     const options = {
//         method: 'GET',
//         url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
//         headers: {
//             'X-RapidAPI-Key': '8c6298e60fmsh78f845c72d7b773p1853fdjsn029108cc4366',
//             'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
//         }
//     };

//     const getVisitor = async () => {
//         // console.log(e)
//         // e.preventDefault()
//         // await axios.request(options)
//         await axios.get(AppURL.VisitorDetails)
//         .then((res) => {
//             console.log(res)
//             setLoading(false)
//         })
//         .catch((err) => {console.log(err)})
//     }

//     useEffect(() => {
//         setLoading(true)
//         window.scroll(0,0)
//         const updateVisitor = async () => {
//             console.log('update visitor')
//             // setData(await getVisitor())
//             await getVisitor()
//             setLoading(false)
//         }

//         updateVisitor()
//     }, [])

//     if (isLoading) {
//         return <h1>Loading...</h1>
//     }

//     // console.log('this is the data: ', data)

//     return (
//         <Fragment>
//             <div className="Desktop">
//                 <NavMenuDesktop />
//                 <HomeTop />
//             </div>
//             <div className="Mobile">
//                 <NavMenuMobile />
//                 <HomeTopMobile />
//             </div>
            
//             <FeaturedProducts />
//             <NewArrival />
//             <Categories />
//             <Collection />
            
//             <div className="Desktop">
//                 <FooterDesktop />
//             </div>
//             <div className="Mobile">
//                 <FooterMobile />
//             </div>
//         </Fragment>
//     )
// }

import React, { Component, Fragment } from 'react'
// import { Button } from 'react-bootstrap'
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
import AppUrl from '../api/AppUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends Component {

    constructor() {
        super()
        
        this.state = {
            address: "",
            android_app_link: "",
            ios_app_link: "",
            facebook_link: "",
            twitter_link: "",
            instagram_link: "",
            copyright_text: "",
            menuData: []
        }
    }

    componentDidMount() {
        window.scroll(0,0)

        // GET SITE INFO
        let allSiteInfo = sessionStorage.getItem("allSiteInfo")       
        
        if (allSiteInfo === null) {
            console.log('this is the url: ', AppUrl.AllSiteInfo)
            axios.get(AppUrl.AllSiteInfo).then(res => {
                let statusCode = res.status
    
                if (statusCode === 200) {
                    let jsonData = (res.data)[0]
                    let address = jsonData['address']
                    let android_app_link = jsonData['android_app_link']
                    let ios_app_link = jsonData['ios_app_link']
                    let facebook_link = jsonData['facebook_link']
                    let twitter_link = jsonData['twitter_link']
                    let instagram_link = jsonData['instagram_link']
                    let copyright_text = jsonData['copyright_text']
                    let privacy = jsonData['privacy']
                    let refund = jsonData['refund']
                    let purchase = jsonData['purchase_guide']
                    let about = jsonData['about']
                    
                    sessionStorage.setItem("allSiteInfo", true)
                    sessionStorage.setItem("siteInfoAddress", address)
                    sessionStorage.setItem("siteInfoAndroidAppLink", android_app_link)
                    sessionStorage.setItem("siteInfoIosAppLink", ios_app_link)
                    sessionStorage.setItem("siteInfoFacebookLink", facebook_link)
                    sessionStorage.setItem("siteInfoTwitterLink", twitter_link)
                    sessionStorage.setItem("siteInfoInstagramLink", instagram_link)
                    sessionStorage.setItem("siteInfoCopyrightText", copyright_text)
                    sessionStorage.setItem("siteInfoPrivacy", privacy)
                    sessionStorage.setItem("siteInfoRefund", refund)
                    sessionStorage.setItem("siteInfoPurchase", purchase)
                    sessionStorage.setItem("siteInfoAbout", about)
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "bottom-center"
                })
            })
        } // end if condition

        // GET SLIDER INFO
        let allSliderInfo = sessionStorage.getItem("allSliderInfo")       
        
        if (allSliderInfo === null) {
            axios.get(AppUrl.AllSlider).then(res => {
                let statusCode = res.status
    
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all slider info: ', jsonData)
                    sessionStorage.setItem("allSliderInfo", true)
                    sessionStorage.setItem("siteInfoSliders", jsonDataStrings)
                    
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "bottom-center"
                })
            })
        } // end if condition


        // GET CATEGORY INFO
        let allCategoryInfo = sessionStorage.getItem("allCategoryInfo")

        if (allCategoryInfo === null) {
            axios.get(AppUrl.AllCategoryDetails).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all category details: ', jsonData)
                    sessionStorage.setItem("allCategoryInfo", true)
                    sessionStorage.setItem("siteInfoMenuData", jsonDataStrings)
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "top-center"
                })
            })
        } // end if condition

        // GET FEATURED PRODUCTS INFO
        let allFeaturedProductsInfo = sessionStorage.getItem("allFeaturedProductsInfo")

        if (allFeaturedProductsInfo === null) {
            axios.get(AppUrl.ProductListByRemark("FEATURED")).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all featured products: ', jsonData)
                    sessionStorage.setItem("allFeaturedProductsInfo", true)
                    sessionStorage.setItem("siteInfoFeaturedProducts", jsonDataStrings)
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "top-center"
                })
            })
        } // end if condition

        // GET COLLECTION PRODUCTS INFO
        let allCollectionProductsInfo = sessionStorage.getItem("allCollectionProductsInfo")

        if (allCollectionProductsInfo === null) {
            axios.get(AppUrl.ProductListByRemark("COLLECTION")).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all collection products: ', jsonData)
                    sessionStorage.setItem("allCollectionProductsInfo", true)
                    sessionStorage.setItem("siteInfoCollectionProducts", jsonDataStrings)
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "top-center"
                })
            })
        } // end if condition

        // GET NEW PRODUCTS INFO
        let allNewProductsInfo = sessionStorage.getItem("allNewProductsInfo")

        if (allNewProductsInfo === null) {
            axios.get(AppUrl.ProductListByRemark("NEW")).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all new products: ', jsonData)
                    sessionStorage.setItem("allNewProductsInfo", true)
                    sessionStorage.setItem("siteInfoNewProducts", jsonDataStrings)
                } else {
                    return
                }
    
            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "top-center"
                })
            })
        } // end if condition

        else {
            return
        }
        
        // GET NOTIFICATION INFO
        let allNotificationInfo = sessionStorage.getItem("allNotificationInfo")

        if (allNotificationInfo === null) {
            axios.get(AppUrl.NotificationHistory).then(res => {
                let statusCode = res.status
                console.log(statusCode)
                if (statusCode === 200) {
                    let jsonData = res.data
                    let jsonDataStrings = []
                    jsonData.forEach(e => {
                        jsonDataStrings.push(JSON.stringify(e))
                    });
                    console.log('all notification details: ', jsonData)
                    sessionStorage.setItem("allNotificationInfo", true)
                    sessionStorage.setItem("siteInfoNotificationData", jsonDataStrings)
                } else {
                    return
                }

            }).catch(err => {
                console.log(err)
                toast.error("Something went wrong.", {
                    position: "top-center"
                })
            })
        } // end if condition

        else {
            return
        }

    } // END COMPONENTDIDMOUNT()
        
    getVisitor = async (e) => {
        let options = {
            method: 'GET',
            url: AppUrl.VisitorDetails,
            // headers: {
            //     'X-RapidAPI-Key': '8c6298e60fmsh78f845c72d7b773p1853fdjsn029108cc4366',
            //     'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            // }
        };
        console.log('clicked')
        e.preventDefault()
        await axios.request(options)
        // await axios.get(AppUrl.TestUrl)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {console.log(err)})
    }

    render() {
        const user = this.props.user
        return (
            <Fragment>
                <ToastContainer />
                <div className="Desktop">
                    <NavMenuDesktop user={user} />
                    <HomeTop 
                        menuData={this.state.menuData}
                    />
                </div>
                <div className="Mobile">
                    <NavMenuMobile />
                    <HomeTopMobile />
                </div>

                {/* <Button onClick={this.getVisitor}>Click Me</Button> */}
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
//         await axios.get(AppUrl.VisitorDetails)
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

import React, { Component, Fragment } from 'react'
import axios from 'axios'
import AppUrl from '../api/AppUrl'
import { Route, Switch } from 'react-router'
import CartPage from '../pages/CartPage'
import ContactPage from '../pages/ContactPage'
import FavoritePage from '../pages/FavoritePage'
import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import PrivacyPage from '../pages/PrivacyPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import PurchasePage from '../pages/PurchasePage'
import RefundPage from '../pages/RefundPage'
import AboutPage from '../pages/AboutPage'
import UserLoginPage from '../pages/UserLoginPage'
import ProductCategoryPage from '../pages/ProductCategoryPage'
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage'
import SearchPage from '../pages/SearchPage'
import RegisterPage from '../pages/RegisterPage'
import ForgetPasswordPage from '../pages/ForgetPasswordPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import ProfilePage from '../pages/ProfilePage'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import OrderListPage from '../pages/OrderListPage'

class AppRoute extends Component {

    constructor() {
        super()

        this.state = {
            user: {}
        }

        this.setUser = this.setUser.bind(this)
    }

    componentDidMount() {
        // let userData = sessionStorage.getItem("userData")
        let userDataObj = sessionStorage.getItem("userDataObj")
        let userLoggedIn = sessionStorage.getItem("userLoggedIn")
        if (!userLoggedIn) {
            return
        }
        // console.log('userData: ', userData)
        if (userDataObj === null) {
            axios.get(AppUrl.UserData).then(res => {
                console.log('res: ', res)
                sessionStorage.setItem("userData", true)
                this.setUser(res.data)
            }).catch(err => {
                console.log('err', err)
            })
        } else {
            console.log('nothing happened')
            console.log('user: ', sessionStorage.getItem('userDataObj'))
            let userDataObj = JSON.parse(sessionStorage.getItem('userDataObj'))
            this.setState({
                user: userDataObj
            })
            return
        }
    }

    setUser = (user) => {
        sessionStorage.setItem("userDataObj", JSON.stringify(user))
        this.setState({
            user
        })
    }

    render() {
        return (
            <Fragment>

                <NavMenuDesktop user={this.state.user} setUser={this.setUser} />

                <Switch>
                    <Route exact path="/" render={(props) => <HomePage {...props} key={Date.now()} /> } />
                    <Route exact path="/login" render={(props) => <UserLoginPage {...props} key={Date.now()} user={this.state.user} setUser={this.setUser} /> } />
                    <Route exact path="/register" render={(props) => <RegisterPage {...props} key={Date.now()} /> } user={this.state.user} setUser={this.setUser} />
                    <Route exact path="/forget" render={(props) => <ForgetPasswordPage {...props} key={Date.now()} /> } />
                    <Route exact path="/reset/:id" render={(props) => <ResetPasswordPage {...props} key={Date.now()} /> } />
                    <Route exact path="/profile" render={(props) => <ProfilePage {...props} key={Date.now()} user={this.state.user} setUser={this.setUser} /> } />
                    <Route exact path="/contact" render={(props) => <ContactPage {...props} key={Date.now()} /> } />
                    <Route exact path="/purchase" render={(props) => <PurchasePage {...props} key={Date.now()} /> } />
                    <Route exact path="/privacy" render={(props) => <PrivacyPage {...props} key={Date.now()} /> } />
                    <Route exact path="/refund" render={(props) => <RefundPage {...props} key={Date.now()} /> } />
                    <Route exact path="/about" render={(props) => <AboutPage {...props} key={Date.now()} /> } />
                    <Route exact path="/productdetails/:code" render={(props) => <ProductDetailsPage {...props} key={Date.now()} user={this.state.user} setUser={this.setUser} /> } />
                    <Route exact path="/notification" render={(props) => <NotificationPage {...props} key={Date.now()} /> } />
                    <Route exact path="/favorite" render={(props) => <FavoritePage {...props} key={Date.now()} user={this.state.user} /> } />
                    <Route exact path="/cart" render={(props) => <CartPage {...props} key={Date.now()} user={this.state.user} /> } />
                    <Route exact path="/productcategory/:category" render={(props) => <ProductCategoryPage {...props} key={Date.now()} /> } />
                    <Route exact path="/productsubcategory/:category/:subcategory" render={(props) => <ProductSubCategoryPage {...props} key={Date.now()} /> } />
                    <Route exact path="/productbysearch/:searchkey" render={(props) => <SearchPage {...props} key={Date.now()} /> } />
                    <Route exact path="/orderlist" render={(props) => <OrderListPage {...props} key={Date.now()} user={this.state.user} /> } />
                </Switch>
            </Fragment>
        )
    }
}

export default AppRoute

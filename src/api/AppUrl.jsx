class AppUrl {
    static BaseURL = "http://127.0.0.1:8000/api"
    static VisitorDetails = this.BaseURL + "/getvisitor"
    static PostContact = this.BaseURL + "/postcontact"
    static AllSiteInfo = this.BaseURL + "/allsiteinfo"
    static AllCategoryDetails = this.BaseURL + "/allcategory"
    static AllSlider = this.BaseURL + "/allslider"
    static NotificationHistory = this.BaseURL + "/notification"
    static UserLogin = this.BaseURL + "/login"
    static UserData = this.BaseURL + "/user"
    static UserRegister = this.BaseURL + "/register"
    static UserForgetPassword = this.BaseURL + "/forgetpassword"
    static UserResetPassword = this.BaseURL + "/resetpassword"
    static AddToCart = this.BaseURL + "/addtocart"
    static CartOrder = this.BaseURL + "/cartorder"
    static PostReview = this.BaseURL + "/postreview"
    
    static ProductListByRemark(remark) {
        return this.BaseURL + "/productlistbyremark/" + remark
    } 

    static ProductListByCategory(category) {
        return this.BaseURL + "/productlistbycategory/" + category
    } 

    static ProductListBySubCategory(category, subcategory) {
        return this.BaseURL + "/productlistbysubcategory/" + category + "/" + subcategory
    } 
    
    static ProductDetails(code) {
        return this.BaseURL + "/productdetails/" + code
    }

    static CartCount(email) {
        return this.BaseURL + "/cartcount/" + email
    }
    
    static ProductBySearch(key) {
        return this.BaseURL + "/search/" + key
    }

    static SimilarProduct(subcategory) {
        return this.BaseURL + "/similar/" + subcategory
    } 

    static ReviewList(id) {
        return this.BaseURL + "/reviewlist/" + id
    } 

    static AddFavorite(product_code, email) {
        return this.BaseURL + "/favorite/" + product_code + "/" + email
    } 

    static FavoriteList(email) {
        return this.BaseURL + "/favoritelist/" + email
    }
    
    static RemoveFavorite(product_code, email) {
        return this.BaseURL + "/favoriteremove/" + product_code + "/" + email
    }

    static CartList(email) {
        return this.BaseURL + "/cartlist/" + email
    }

    static RemoveCartList(id) {
        return this.BaseURL + "/removecartlist/" + id
    }

    static CartItemPlus(id, quantity, price) {
        return this.BaseURL + "/cartitemplus/" + id + '/' + quantity + '/' + price
    }

    static CartItemMinus(id, quantity, price) {
        return this.BaseURL + "/cartitemminus/" + id + '/' + quantity + '/' + price
    }

    static OrderListByUser(email) {
        return this.BaseURL + "/orderlistbyuser/" + email
    }
}

export default AppUrl

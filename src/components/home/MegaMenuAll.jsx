import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MegaMenuAll extends Component {
    constructor(props) {
        super()

        this.state = {
            menuData: []
        }
    }

    componentDidMount() {
        let menuData = sessionStorage.getItem("siteInfoMenuData")
        
        if (menuData === null) {
            return
        } // end if condition

        else {
            let menuDataConverted = "[" + menuData + "]"
            let menuDataObjArray = JSON.parse(menuDataConverted)
            
            this.setState({
                menuData: menuDataObjArray,
                loaderDiv: "d-none",
                mainDiv: ""
            })
        }
    }

    MenuItemClick = (event) => {
        event.preventDefault()
        event.target.classList.toggle("active")
        let panel = event.target.nextElementSibling

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px"        
        }
    }

    render() {

        const CatList = this.state.menuData
        const MyView = CatList.map((CatList, i) => {
            return (
                <div key={"megaMenuAll" + i.toString()}>
                    <button onClick={this.MenuItemClick} className="accordionAll">
                        <img className="accordionMenuIconAll" src={CatList.category_image} alt="accordionMegaMenuAll"/>
                        &nbsp;
                        {CatList.category_name}
                    </button>
                    <div className="panelAll">
                        <ul>
                            {
                                (CatList.subcategory_name).map((subList, i) => {
                                    return (
                                        <li key={"megaMenuSubCat" + i.toString()}>
                                            <Link to={"/productsubcategory/" + CatList.category_name + "/" + subList.subcategory_name } className="accordionItemAll">
                                                {subList.subcategory_name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            )
        })

        return (
            <div className="accordionMenuDivAll">
                <ToastContainer />
                <div className="accordionMenuDivInsideAll">
                    
                    { MyView }
                
                </div>
            </div>
        )
    }
}

export default MegaMenuAll

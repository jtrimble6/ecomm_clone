import React, { Component } from 'react'

class MegaMenuMobile extends Component {
    constructor() {
        super();

        this.MegaMenu = this.MegaMenu.bind(this)
    }

    componentDidMount() {
        this.MegaMenu()
    }

    MegaMenu() {
        let acc = document.getElementsByClassName('accordionMobile')
        let accNum = acc.length

        for (let i=0; i<accNum; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active")
                let panel = this.nextElementSibling
                
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px"        
                }
            })
        }

    }


    render() {
        return (
            <div className="accordionMenuDivMobile">
                <div className="accordionMenuDivInsideMobile">
                    
                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className="accordionItemMobile" href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default MegaMenuMobile

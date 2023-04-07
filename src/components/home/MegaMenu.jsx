import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'


class MegaMenu extends Component {

    constructor() {
        super();

        this.MegaMenu = this.MegaMenu.bind(this)
    }

    componentDidMount() {
        this.MegaMenu()
    }

    MegaMenu() {
        let acc = document.getElementsByClassName('accordion')
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
            <div className="accordionMenuDiv">
                <div className="accordionMenuDivInside">
                    
                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className="accordionItem" href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className="accordionItem" href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordion">
                        <img className="accordionMenuIcon" src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" />
                        &nbsp;
                        Men's Clothing
                    </button>
                    <div className="panel">
                        <ul>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 1</a>
                            </li>
                            <li>
                                <a className=""accordionItem href="#">Men's Tshirt 2</a>
                            </li>
                        </ul>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default MegaMenu

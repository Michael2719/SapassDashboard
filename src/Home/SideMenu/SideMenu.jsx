import React, { useState, useEffect } from "react";
import './SideMenu.css'
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faBars,
  faMoneyBill,
  faUsers,
  faUserPlus,
  faUserMinus,
  faUserCog,
  faUser,
  faBusSimple,
  faCaretDown,
  faCaretUp
  
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import logo from '../../Login/logo-light.png'

const menuItems = [
    { title: "Profil", icon: faUser , iconDown : faCaretDown , iconUp : faCaretUp ,menu:"profil" , link : "/sapass/profil/user", underMenu:[{title : "Modifer", icon :faUserCog , link : "profil/editProfil"}], state :"isDeployedProfil" , setState :"setIsDeployedProfil"},
    { title: "Clients", icon: faUsers ,iconDown:faCaretDown, iconUp: faCaretUp ,menu:"clients" , link : "/sapass/clients", underMenu:[{title: "Ajouter", icon:faUserPlus , link : "/sapass/clients/add_client"}], state :"isDeployedCollab" , setState :"setIsDeployedCollab"},
    { title: "Transactions", icon: faMoneyBill , menu:"transactions", link : "/sapass/transactions"},
    { title: "Utilisateurs", icon: faBusSimple, menu:"users" ,iconDown:faCaretDown, iconUp: faCaretUp , link : "/sapass/users", underMenu:[{title : "Ajouter", icon :faUserPlus , link : "/sapass/add_users"}], state :"isDeployedUsers", setState :"setIsDeployedUsers"},
  ];

  
export default function SideMenu() {
    const [isOpen, setIsOpen] = useState(true);
    const [isDeployedProfil, setIsDeployedProfil] = useState(false);
    const [isDeployedCollab, setIsDeployedCollab] = useState(false);
    const [isDeployedUsers, setIsDeployedUsers] = useState(false);
    const [currentPage, setCurrentpage] = useState("")
    const navigate = useNavigate();
    const location = useLocation() ;
    const pathTab = location.pathname.split('/')

    const menuPath = pathTab[2]

    useEffect(()=>{
        setCurrentpage(menuPath)
    }, [pathTab])
   

    return (
        <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
            <div className="brand">
                <img src={logo} alt="" />
                <span>Sapass</span>
            </div>

            <ul className="items">
            {menuItems.map(item => (
            
                <li key={item.title}  className={cx("sidebar__listItem ", { "sidebar__listItem__active": item.menu===currentPage })} >
                  
                      { item.iconDown && isOpen? <span className="btn__drop" onClick ={ item.state? ()=>{
                                                                                var setState = eval(item.setState)
                                                                                var state = eval(item.state)
                                                                                setState(!state) } : null}> 
                        {!eval(item.state)?<FontAwesomeIcon icon={faCaretDown} /> :null }{eval(item.state)?<FontAwesomeIcon icon={faCaretUp}/>:null}</span> : null }
                  
                       <div onClick ={item.link?()=>{
                            navigate(item.link)
                            } : null}>

                            <FontAwesomeIcon className={"sidebar__icon"} icon={item.icon} />
                            <CSSTransition
                                in = {isOpen}
                                timeout = {200}
                                classNames = {"fade"}
                                unmountOnExit
                                >      
                                    <span className="sidebar__title">{item.title}</span>
                            </CSSTransition>
                       </div>
                       <CSSTransition
                         in = {isOpen}
                         timeout = {500}
                         classNames = {"fade"}
                         unmountOnExit
                        >      
                            {<ul className={cx("under__menu", { "under__menu__close": !eval(item.state) })}>  
                            {item.underMenu?.map(item1=>
                                    <li key={item1.title} onClick={item1.link? ()=>{
                                        navigate(item1.link)
                                    } : null }>
                                        <FontAwesomeIcon  icon={item1.icon} />
                                        {(item1.title)}
                                    </li>)}
                            </ul>}
                        </CSSTransition>
                      
                </li>
        ))}
            </ul>
            <button className="sidebar__button" onClick={()=> setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faBars} className={"sidebar_icon"}/>
            </button>
        </div>
    );
}

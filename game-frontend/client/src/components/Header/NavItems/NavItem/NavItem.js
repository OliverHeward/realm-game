import React from 'react';
import {NavLink} from 'react-router-dom';

const NavItem = (props) => (
    <li className="">
        <NavLink
            to={props.link}
            exact={props.exact}
        >{props.children}</NavLink>
    </li>
);

export default NavItem;
import React from 'react';
import Header from '../../components/Header/Header';
import Aux from './Aux';

const Layout = props => {
    return (
        <Aux>
        <Header />
                <main className="app-main">
                    {props.children}
                </main>
        </Aux>
    );
}

export default Layout;
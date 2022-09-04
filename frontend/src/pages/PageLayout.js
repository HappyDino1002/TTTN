import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { withRouter } from 'react-router-dom';

import NavbarComponent from '../components/NavbarComponent';
import SiderComponent from '../components/SiderComponent';

const { Content } = Layout;

const PageLayout = ({ children }) => {

    return (
        <Layout>
            <NavbarComponent />
            <Layout>
                <SiderComponent />
                <Layout style={{ padding: '0 0px 0px' }}>
                    <Content style={{ padding: '15px 15px' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PageLayout));


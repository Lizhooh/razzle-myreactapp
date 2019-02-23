import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { actions } from '../stores/actions/index';
import fetch from 'isomorphic-fetch';

import { isNotServerRenderPage } from '../uitl';

export default connect(
    state => ({ state: state.index }),
    actions,
)(class Index extends Component {
    static async getInitProps({ match, history, location } = {}, { req, res } = {}) {
        const data = await fetch('http://127.0.0.1:3000/api/index').then(res => res.json());
        return {
            index: {
                list: data,
                count: 1,
            },
        };
    }
    componentDidMount() {
        const { update } = this.props;
        if (isNotServerRenderPage()) {
            Index.getInitProps().then(res => update(res.index));
        }
    }
    render() {
        return (
            <Root>
                <h3>hello world!</h3>
                <ul>
                    <li><Link to='/'>Index</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {this.props.state.list.map((item, index) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            </Root>
        );
    }
});

const Root = styled.div`
    background-color: #f1f1f1;
    padding: 20px;
`;


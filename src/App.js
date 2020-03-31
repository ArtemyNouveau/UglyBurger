import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <p>main</p>
                </Layout>
            </div>
        )
    };
}

export default App;

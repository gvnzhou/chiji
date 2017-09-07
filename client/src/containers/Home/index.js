/**
 * Created by h9zhou on 2017/5/5.
 */
import React, { Component } from 'react';
import './index.scss';

class Home extends Component {
  componentDidMount() {
    document.title = '吃鸡吧';
  }

  render() {
    return (
      <div>
        <header>
          logo
        </header>
        <nav>
          <a className="home_nav_a">首页</a>
        </nav>
      </div>
    );
  }
}

export default Home;

import *as $ from 'jquery'
import Post from './Post'
import './babel'
import './styles/style.css'
import './styles/less.less'
import './styles/scss.scss'
import React from 'react'
import {render} from 'react-dom'
const post = new Post ('Webpack Post Title')
$(pre).html(post.toString())
const App = () => (
    <div className="container">
      <h1>Webpack Course</h1>
      <hr />
      <div className="logo" />
      <hr />
      <pre />
      <hr />
      <div className="box">
        <h2>Less</h2>
      </div>
  
      <div className="card">
        <h2>SCSS</h2>
      </div>
    </div>
  )
render(<App />, document.getElementById('App'))
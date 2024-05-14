
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgurl, newsUrl, publishedAt, author} = this.props
    
    return (
      <div className='my-3'>
        <div className="card" >
            <img src={imgurl} className="card-img-top" alt="."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <small className='card-text'><u><i className='text-muted'>By {author} <br />At {publishedAt}</i></u></small>
                
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target='_self' className="btn btn-sm btn-dark">Read more..</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

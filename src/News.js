import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(){
    super();
    this.state={
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58d192e73f254ab98a78ff908e56a4f3&page=1&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState
      ({
        articles: parsedData.articles, 
        totalResults: parsedData.totalResults,
        loading:false
      })

  }
handlePrev = async()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58d192e73f254ab98a78ff908e56a4f3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  this.setState({loading: true})
  let data = await fetch(url);
  let parsedData = await data.json()
  window.scrollTo(0, document.body.scrollHeight)    
  this.setState({
    
    page: this.state.page - 1,
    articles: parsedData.articles,
    loading:false
  })
  
}
handleNext = async()=>{
  if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58d192e73f254ab98a78ff908e56a4f3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    window.scrollTo(0, 0)
    this.setState({
      
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    })
    }
  
}

  render() {
    return (
      <div className='container mt-5 '>
        <h1 className='animated'>NewsTv - Breaking News</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles?.map((element)=>{
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title} author={element.author?element.author:"Unknown"} publishedAt={new Date(element.publishedAt).toGMTString()} description={element.description} imgurl={!element.urlToImage?"https://www.hindustantimes.com/ht-img/img/2024/03/10/1600x900/modi_1710046033648_1710046033911.jpg":element.urlToImage} newsUrl={element.url}/>    
            </div>
          })}
          

        </div>
        <center>
          <div className="container my-3">
            <div className="d-flex justify-content-between">
              <button disabled={this.state.page<=1} className="btn btn-dark mx-3" type="submit" onClick={this.handlePrev}> &larr; Prev</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark mx-3" type="submit" onClick={this.handleNext}>Next &rarr;</button>
            </div>       
          </div>
        </center>
         
      </div>
    )
  }
}

export default News

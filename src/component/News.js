import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./style.css";
import Spinner  from "./spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:12,
    category:'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
  }
  articles = [];
  constructor(props) {
    super(props);
    console.log("I am a Constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capiatlize(this.props.category)} - NewsNP`
  }

  capiatlize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async updateNews(pageno){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c37752af4624c80aabe14224b177d9f&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles , 
      totalResults:parsedData.totalResults,
    loading: false})
  }

  async componentDidMount(){
    this.updateNews()
    // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c37752af4624c80aabe14224b177d9f&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles , 
    // loading: false})
  }
  handleNextClick = async () => {
    console.log("Next");
    // if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c37752af4624c80aabe14224b177d9f&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    this.setState({ page: this.state.page + 1})
    this.updateNews()
  }
  handlePrevClick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c37752af4624c80aabe14224b177d9f&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false
    // })
    this.setState({ page: this.state.page - 1})
    this.updateNews()
  }

  
  render() {
    return (
      <div className="container my-3">
          <h2 className="text-center text-dark my-5">&#128240; NewsNP-Top {this.capiatlize(this.props.category)} Headlines  &#x1F4F0; </h2>
          
          {this.state.loading && <Spinner/>}
          <div className="row">
              {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0, 45):""}
                      description={element.description?element.description.slice(0, 88):""} 
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                      imageurl={element.urlToImage}
                      newsurl={element.url} />
              </div>
              })}
          </div>
          <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button"   className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
                  Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
    );
  }
}

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import api from "../jsonApi.json";
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
export default class News extends Component {
  static defaultProps={
    country: 'in',
    pagesize: 8,
    catergory:"general"
  }
  static propTypes={
    country: PropTypes.string,
    pagesize:PropTypes.number,
    catergory: PropTypes.string
  }
  captilizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    constructor(props){
        super(props); 
        console.log("i am constructor in news class")
        this.state={
        articles:[],
        loading : true,
        page:1,
        totalResults:0
      }
      document.title=`${this.captilizeFirstLetter(this.props.category)} - News Monkey`;
    }
    async updateNews(){
      this.props.setProgress(0);
      console.log("component mount")
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
      console.log(url)
      this.setState({loading:true})
      this.props.setProgress(30);
      let data= await fetch(url);
      let parsedData= await data.json()
      this.props.setProgress(60);
      console.log(parsedData)
      this.setState({articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
      })
      this.props.setProgress(100)
     }
    

    async componentDidMount(){
      console.log("component mount")
    this.updateNews()
     }

     handleNextClick=async()=>{
      this.setState({page: this.state.page +1})
      this.updateNews();
    }

     handlePrevClick=async()=>{
      console.log("Previous")
      this.setState({page: this.state.page -1})
      this.updateNews();
     }

     fetchMoreData=async()=>{
      this.setState({page:this.state.page+1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
      console.log(url)
      // this.setState({loading:true})
      let data= await fetch(url);
      let parsedData= await data.json()
      console.log(parsedData)
      this.setState({
        articles:this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        // loading:false,
      })

    }
     
  render() {
    return (
      <>
      <h1 className='text-center' style={{margin:'35px 0px'}}>Farhan Ansari's-Top {this.captilizeFirstLetter(this.props.category)} Headlines</h1>
   {this.state.loading&&<Spinner/>}
    <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    hasMore={this.state.articles.length!==this.state.totalResults}
    loader={<Spinner/>}>
    <div className='container my-3'>
      <div className='row'>
      
      {this.state.articles.map((element)=>{
        return  <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,70):""} newsUrl={element.url}
            imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>     
              </div>
      })}
      </div>
      </div>
      </InfiniteScroll>
    </>
    )
  }}


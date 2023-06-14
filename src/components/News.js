import React, { Component } from 'react'
import NewsItem from './NewsItem'
import api from "../jsonApi.json";
export default class News extends Component {
    constructor(){
        super(); 
        console.log("i am constructor in news class")
        this.state={
articles:[],
loading : false,
page:1
        }
    }

    async componentDidMount(){
      console.log("component mount")
      let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=aca2d002affd48b7a3093c0727364e8c&page=1"
      let data= await fetch(url);
      let parsedData= await data.json()
      console.log(parsedData)
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
     }

     handleNextClick=async()=>{
console.log("Next")
if(this.state.page +1>Math.ceil(this.state.totalResults/20)){}
else{
let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=aca2d002affd48b7a3093c0727364e8c&page=${this.state.page +1}&pagesize=20`;
let data= await fetch(url);
let parsedData= await data.json()
console.log(parsedData)

this.setState({
  page: this.state.page +1,
  articles:parsedData.articles
})
     }
    }

     handlePrevClick=async()=>{
      console.log("Previous")
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=aca2d002affd48b7a3093c0727364e8c&page=${this.state.page -1}&pagesize=20`;
let data= await fetch(url);
let parsedData= await data.json()
console.log(parsedData)

this.setState({
  page: this.state.page -1,
  articles:parsedData.articles
})
     }
  render() {
    return (
      <div className='container my-3'>
      <h2>News Monkey-Top Headlines</h2>
    
      <div className='row'>
      {this.state.articles.map((element)=>{
        return  <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,70):""} newsUrl={element.url}
            imageUrl={element.urlToImage} />     
              </div>
      })}
      
            

      </div>
      <div className='container d-flex justify-content-between'>
        <button type='button' disabled={this.state.page<=1} onClick={this.handlePrevClick} className='btn btn-dark mx-3'>&larr; Previous</button>
        <button type='button' onClick={this.handleNextClick} className='btn btn-dark'>Next &rarr;</button>
      </div>
     </div>
    )
  }
}

import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      totalResults: 0,
      page: 1,
      query:""
    };
  }

  getAPIData = async (query = "All") => {
    this.setState({query:query})
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=${this.props.language}&page=1&pageSize=12&sortBy=publishedAt&apiKey=db1f132c299d48efa89061a6b5efe752`
    );
    response = await response.json();
    this.setState({
      articles: response.articles.filter((item) => item.title !== "[Removed]"),
      totalResults: response.totalResults,
    });
  };

  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&page=${this.state.page}&pageSize=12&sortBy=publishedAt&apiKey=db1f132c299d48efa89061a6b5efe752`
    );
    response = await response.json();
    this.setState({
      articles: this.state.articles.concat(
        response.articles.filter((item) => item.title !== "[Removed]")
      ),
    });
  };

  componentDidMount() {
    this.getAPIData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.search === "" || this.props.search === prevProps.search)
        this.getAPIData(this.props.q);
      else this.getAPIData(this.props.search);
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h5 className="background p-2 text-light text-center my-2 text-capitalize">
          {this.state.query} News Articles
        </h5>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className="w-100 text-center p-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }>  
        
          <div className="row">
            {this.state.articles.map((item) => (
              <NewsItem
                key={item._id}
                pic={item.urlToImage}
                title={item.title}
                description={item.description}
                url={item.url}
                source={item.source.name}
                date={item.publishedAt}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

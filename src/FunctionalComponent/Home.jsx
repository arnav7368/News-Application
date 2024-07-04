import React, { useState,useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";

export default function Home(props) {
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);
  let [query, setQuery] = useState("");
  let getAPIData = async (query = "All") => {
    setQuery(query);
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=${props.language}&page=1&pageSize=12&sortBy=publishedAt&apiKey=db1f132c299d48efa89061a6b5efe752`
    );
    response = await response.json();
    setArticles(response.articles.filter((item) => item.title !== "[Removed]"));
    setTotalResults(response.totalResults);
  };

  let fetchData = async () => {
    setPage(page + 1);
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${props.q}&language=${props.language}&page=${page}&pageSize=12&sortBy=publishedAt&apiKey=db1f132c299d48efa89061a6b5efe752`
    );
    response = await response.json();
    setArticles(
      articles.concat(
        response.articles.filter((item) => item.title !== "[Removed]")
      )
    );
  };
  useEffect(()=>{
    if(props.search==="")
    getAPIData(props.q)
    else
    getAPIData(props.search)

  },[props])
  return (
    <div className="container-fluid">
      <h5 className="background p-2 text-light text-center my-2 text-capitalize">
        {query} News Articles
      </h5>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length < totalResults}
        loader={
          <div className="w-100 text-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <div className="row">
          {articles.map((item) => (
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

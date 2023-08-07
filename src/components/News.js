import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updateNews = async() => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `NewsMonkey - ${capitalizeFirstLetter( props.category )}`;
    updateNews();
    // eslint-disable-next-line
  }, [])
  

   const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

  
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonkey - Top Headlines from{" "}
          {capitalizeFirstLetter(props.category)}
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage ? element.urlToImage : "https://www.deccanherald.com/sites/dh/files/Picture85-1235985-1689078689.png"}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 3,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News;

// async componentDidMount() {
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b483a73b81cd4f74aa8002e78f782214&page=1&pageSize=${props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });
//   }

// handlePrevClick = async () => {
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b483a73b81cd4f74aa8002e78f782214&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       page: this.state.page - 1,
//       articles: parsedData.articles,
//       loading: false,
//     });
//   };

// handleNextClick = async () => {
//     if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
//     }
//     else {
//       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b483a73b81cd4f74aa8002e78f782214&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
//       this.setState({ loading: true });
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       console.log(parsedData);
//       this.setState({
//         page: this.state.page + 1,
//         articles: parsedData.articles,
//         loading: false,
//       });
//     }
//   };


// b483a73b81cd4f74aa8002e78f782214

// const handlePrevClick = async () => {
//   setPage(page - 1)
//   updateNews();
// };

// const handleNextClick = async () => {
//   setPage(page + 1)
//   updateNews();
// };
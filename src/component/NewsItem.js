import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, date, author, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <Link to={newsurl}  target="_blank">
            <img
              className="card-img-top"
              src={
                !imageurl
                  ? "https://media.istockphoto.com/id/1477858506/photo/news-online-in-phone-reading-newspaper-from-website-digital-publication-and-magazine-mockup.jpg?s=2048x2048&w=is&k=20&c=ZfedUhq5Rq6o1X25Q_RNwuXNTcRcK1xiBUS6iTI3RMw="  : imageurl}
              alt="News State"
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">
              <Link to={newsurl} target="_blank">{title}</Link>
            </h5>
            <p className="card-text">{description}</p>
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "20%", zIndex: "1" }}>{source}
            </span>
            <p className="card-text">
              <small className="text-muted"> {" "} By {author ? author : source} on {new Date(date).toGMTString()} </small>{" "}
            </p>
            <Link
              rel="noreferrer"
              to={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark">Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

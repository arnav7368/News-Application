import React from "react";

export default function NewsItem(props) {
  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
      <div className="card">
        <img
          src={props.pic ? props.pic : "/image/noimage.jpg"}
          height="200px"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {props.title.slice(0, 100) + "..."}
          </h5>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="date-and-source">{props.source}</p>
            <p className="date-and-source">
              {(() => new Date(props.date).toDateString())()}
            </p>
          </div>
          <hr />
          <p className="card-text">
            {props.description.slice(0, 200) + "..."}
          </p>
          <a
            href={props.url}
            className="btn btn-primary w-100 btn-sm"
            target="_blank"
            rel="noreferrer"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
}

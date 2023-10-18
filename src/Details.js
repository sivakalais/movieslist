import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  console.log("id", id);
  const URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  console.log(URL);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
       process.env.REACT_APP_AUTH_KEY,
    },
  };
console.log("AUTH_KEY", process.env.REACT_APP_AUTH_KEY);
  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const response = await fetch(URL, options);
        if (!response.ok) throw Error("Data not received");
        const data = await response.json();
        setDetails(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchdetails();
  }, []);
  console.log("details", details);
  console.log("genres", details.genres);
  return (
    <main className="details-content">
      {details ? (
        <div className="details">
          <img
            src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
          />
          <div className="detail-decrip">
            <div className="detail-head">
              <div className="headline">
                <h2>{details.title}</h2>
                <span>(2023)</span>
              </div>
              <ul className="subline">
                <p className="datetrelease">{details.release_date}</p>
                <li className="genres">
                  {details.genres
                    ? details.genres.map((gen) => (
                        <li key={gen.id} className="genresline">
                          <span>{gen.name}</span>
                        </li>
                      ))
                    : ""}
                </li>
                <li className="runtime">{details.runtime}</li>
              </ul>
            </div>
            <h4>{details.tagline}</h4>
            <div className="overview">
              <h2>Overview</h2>
              <p>{details.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Page not received</p>
      )}
    </main>
  );
};

export default Details;

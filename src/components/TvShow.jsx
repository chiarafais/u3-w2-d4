import { Row, Col, Spinner } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import netflixLogo from "../assets/netflix.svg";
import { NavLink } from "react-router-dom";

const TvShow = ({ filmName, galleryTitle }) => {
  console.log(filmName, galleryTitle);

  // const { filmName, galleryTitle } = props;

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilms = () => {
    setIsLoading(true);
    fetch("http://www.omdbapi.com/?apikey=266a7ae8&s=" + filmName)
      .then((response) => {
        if (response.ok) {
          console.log("fetch conclusa");
          return response.json();
        } else {
          throw new Error("Errore nella richiesta delle prenotazioni al server");
        }
      })
      .then((films) => {
        setFilms(films.Search);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    fetchFilms();
  }, [filmName]);
  return (
    <div className="bg-dark pt-3 pb-3">
      <h3 className="text-light px-4"> {galleryTitle}</h3>

      {isLoading && (
        <div className="text-center loaderContainer">
          <Spinner animation="border" variant="danger" />
        </div>
      )}

      <div className="slider-container">
        {films.length > 0 && !isLoading && (
          <Slider {...settings}>
            {films.map((film) => {
              return (
                <Row key={film.imdbID}>
                  <Col className="p-0 position-relative">
                    <NavLink to={`/MovieDetail/${film.imdbID}`}>
                      <Image src={film.Poster} className="img-fluid imageFilmPoster" />
                      <span className="netflixLogo">
                        <Image src={netflixLogo}></Image>
                      </span>
                    </NavLink>
                  </Col>
                </Row>
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
};
export default TvShow;

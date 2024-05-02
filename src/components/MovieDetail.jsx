import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

const MovieDetails = () => {
  const [film, setFilm] = useState([]);

  const [comments, setComments] = useState([]);

  const { movieID } = useParams();
  console.log(movieID);

  const fetchSingleFilm = () => {
    fetch("http://www.omdbapi.com/?apikey=266a7ae8&i=" + movieID)
      .then((response) => {
        if (response.ok) {
          console.log("fetch conclusa");
          return response.json();
        } else {
          throw new Error("Errore nella richiesta delle prenotazioni al server");
        }
      })
      .then((film) => {
        setFilm(film);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSingleFilmComment = () => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + movieID, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJjZjYzYTMzNzk3OTAwMTlhNjcyNTAiLCJpYXQiOjE3MTQ2NjUyNTAsImV4cCI6MTcxNTg3NDg1MH0.ROsH1lDcVuz-7kvMvnViWY528OikCBZOsEQQEODubhQ",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("fetch conclusa");
          return response.json();
        } else {
          throw new Error("Errore nella richiesta delle prenotazioni al server");
        }
      })
      .then((comments) => {
        setComments(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSingleFilm();
    fetchSingleFilmComment();
  }, []);

  return (
    <div className="bg-dark">
      <div className="divContainerCard">
        <Card className="cardDetail">
          <Card.Img src={film.Poster} className="img-fluid " />
          <Card.Body>
            <h2>{film.Title}</h2>
            <Card.Text>{film.Plot}</Card.Text>
            <h4>Recensioni</h4>
            {comments.map((comment) => {
              return (
                <>
                  <Card.Text>
                    {comment.author} - {comment.comment}
                  </Card.Text>
                </>
              );
            })}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default MovieDetails;

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { genres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  componentDidMount() {
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    console.log("movieId:", movieId);
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = ({ _id, title, genre, numberInStock, dailyRentalRate }) => {
    return {
      _id,
      title,
      genreId: genre._id,
      numberInStock,
      dailyRentalRate
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { match, history } = this.props;

    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>

        {/* <button className="btn btn-primary" onClick={() => history.push("/movies")}>
          Save
        </button> */}
      </div>
    );
  }
}

export default MovieForm;

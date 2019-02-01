import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/lisetGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class MovieList extends Component {
  state = {
    movieList: [],
    genres: [],
    selectedGenre: "",
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movieList: getMovies(), genres });
  }

  handleLike = id => {
    const movieList = this.state.movieList.map(movie => {
      if (movie._id === id) {
        movie.liked = movie.liked ? false : true;
      }
      return movie;
    });

    this.setState({ movieList });
  };

  handleDelete = id => {
    this.setState({ movieList: this.state.movieList.filter(movie => movie._id !== id) });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = ({ pageSize, currentPage, sortColumn, selectedGenre, movieList: movies }) => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movieList = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: movieList
    };
  };

  render() {
    if (!this.state.movieList.length) {
      return <p>No movie</p>;
    }

    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data } = this.getPageData(this.state);

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <p>Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;

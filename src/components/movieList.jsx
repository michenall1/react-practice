import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/lisetGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class MovieList extends Component {
  state = {
    movieList: [],
    genres: [],
    searchQuery: "",
    selectedGenre: null,
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = ({
    searchQuery,
    pageSize,
    currentPage,
    sortColumn,
    selectedGenre,
    movieList: movies
  }) => {
    let filtered = movies;
    if (searchQuery) {
      filtered = movies.filter(m => m.title.toLowerCase().startWith(searchQuery.toLowerCase()));
    } else if (selectedGenre && selectedGenre._id) {
      filtered = movies.filter(m => m.genre._id === selectedGenre._id);
    }
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
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
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
    );
  }
}

export default MovieList;

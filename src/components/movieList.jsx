import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
// import http from "../services/httpService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/lisetGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

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

  async componentDidMount() {
    const { data: genreData } = await getGenres();
    const { data: movieData } = await getMovies();

    const genres = [{ _id: "", name: "All Genres" }, ...genreData];

    this.setState({ movieList: movieData, genres });
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

  handleDelete = async id => {
    const originalMovies = this.state.movieList;
    const movieList = originalMovies.filter(movie => movie._id !== id);
    this.setState({ movieList });

    try {
      await deleteMovie(id);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movieList: originalMovies });
    }
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

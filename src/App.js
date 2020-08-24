import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import classNames from 'classnames';
import LinearBuffer from './LinearBuffer';
import { sortBy } from 'lodash';
import { Grid, Button } from '@material-ui/core';


const DEFAULT_QUERY = '';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';



const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list,'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}
const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey]
  ? results[searchKey].hits
  : [];
  const updatedHits = [
    ...oldHits,
    ...hits
  ];
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
    };
  };
class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        results: null,
        searchKey: '',
        searchTerm: DEFAULT_QUERY,
        error: null,
        isLoading: false,
  };
  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
  this.onSearchSubmit = this.onSearchSubmit.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
      } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
  <h2 className="nav__brand">Hacker News...</h2>
        <div className="interactions">
        <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
           
          >
            Search
          </Search>
        </div>
        { error
          ? <div className="interactions">
            <p>Something went wrong.</p>
          </div>
          : <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <ButtonWithLoading
           isLoading={isLoading}
           onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More...
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

const Search = ({
  value,
  onChange,
  onSubmit,
  children
  }) =>
  <form onSubmit={onSubmit} >
  
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>



class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
      };

    this.onSort = this.onSort.bind(this);
}
onSort(sortKey) {
  const isSortReverse = this.state.sortKey === sortKey &&
    !this.state.isSortReverse;

  this.setState({ sortKey, isSortReverse });
}
render() {
  const {
    list,
    onDismiss
    } = this.props;
  const {
    sortKey,
    isSortReverse,
    } = this.state;
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse
        ? sortedList.reverse()
        : sortedList;
  return (
    <div className="table">
    
    <Grid
      container
      direction="row"
      justify=""
      alignItems=""
      spacing={2}
      className="table-header"
      >
      <Grid item sm='4' md='4'>
      <Sort
       sortKey={'TITLE'}
       onSort={this.onSort}
       activeSortKey={sortKey}
      >
        Title
      </Sort>
      </Grid>
      <Grid item sm='2' md='2'>
      <Sort
       sortKey={'AUTHOR'}
       onSort={this.onSort}
       activeSortKey={sortKey}
      >
        Author
      </Sort>
      </Grid>
      <Grid item sm='2'>
      <Sort
       sortKey={'COMMENTS'}
       onSort={this.onSort}
       activeSortKey={sortKey}
      >
        Comments
      </Sort>
      </Grid>
      <Grid item sm='2'>
      <Sort
       sortKey={'POINTS'}
       onSort={this.onSort}
       activeSortKey={sortKey}
      >
        Points
      </Sort>
      </Grid>
      </Grid>

    {reverseSortedList.map(item =>
    
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={4}
      key={item.objectID} className="table-row"
      >
        <Grid item sm='4' xs='3' >
          <a href={item.url} >{item.title}</a>
        </Grid>
        <Grid item sm='2'>
          {item.author}
        </Grid>
        <Grid item sm='2'>
          {item.num_comments}
        </Grid>
        <Grid item sm='2'>
          {item.points}
        </Grid>  
        <Grid item sm='2'>
          <ButtonUse
            onClick={() => onDismiss(item.objectID)}
            className="button-inline__dismiss"
          >
            Dismiss
          </ButtonUse>
        </Grid>
      </Grid>
     
    )}
  </div>
  )
}
}
    
const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  children
}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );

  return (
    <ButtonUse
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </ButtonUse>
  );
}

const ButtonUse = ({
  onClick,
  className = '',
  children,
}) =>
  <Button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </Button>


const Loading = () =>
  <LinearBuffer />
function withFeature(Component) {
    return function(props) {
        return <Component {...props}/>
    }
}
const withLoading = (Component) => ({ isLoading, ...rest }) =>
isLoading
? <Loading />
: <Component {...rest}/>

const ButtonWithLoading = withLoading(ButtonUse);
export default App;

export {
  ButtonUse,
  Search,
  Table,
};
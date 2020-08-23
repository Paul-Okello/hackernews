import React, { Component } from 'react';
import Search from './Search';
import Table from './Table';
import Button from './Button';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP= 'hitsPerPage='


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results:null,
      searchKey:'',
      searchTerm: DEFAULT_QUERY,
    }
    this.needToSearchTopStories=this.needToSearchTopStories.bind(this);
    this.setSearchTopStories=this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories=this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit=this.onSearchSubmit.bind(this);
    this.onDismiss=this.onDismiss.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
  }
  needToSearchTopStories(searchTerm) {
      return !this.state.results[searchTerm];
  }
  fetchSearchTopStories(searchTerm, page = 0) {

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
         .then(response => response.json())
         .then(results => this.setSearchTopStories(results))
         .catch(error => console.log(error));
  }
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    if(this.needToSearchTopStories(searchTerm)) {
        this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }
  setSearchTopStories(results) {
    const { hits, page } = results;
    const { searchKey,results } = this.state;
    const oldHits = results && results[searchKey]  // check if there are old hits
     ? results[searchKey].hits
     : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ] 
    this.setState({
        results:{
            ...results,
            [searchKey]: {
                hits: updatedHits, page
            }
        }
    });
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
          .then(Response => Response.json())
          .then(result => {
            this.setSearchTopStories(results)
            console.log("Result: ",results.hits);
          })
          .catch(error => console.log(error));
  }
  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
    
  }
  onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey]
        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);
        this.setState({
        result: {
            ...results, hits: {updatedHits, page}
        }
        });
        console.log("Result -> ",this.state.result);
  }
 
  render() {
   const { searchTerm, results, searchKey } = this.state;
   const page = (results && 
                 results[searchKey] &&
                 results[searchKey].hits) || 0;
const list = (
    results &&
    results[searchKey] &&
    results[searchKey].hits
) || 0;
   if(!results) { return null; }

    return (
      <div className="page">
        <div className="interactions">
        <Search 
         value={searchTerm}
         onChange={this.onSearchChange}
         onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        { result &&
          <Table
         list={list}
         onDismiss={this.onDismiss} 
        />
        }
        <div className="interactions">
          <Button
           onClick={ () => this.fetchSearchTopStories(searchKey, page+1)} 
          >
            More...
          </Button>
        </div>
        </div>
        
      </div>
    );
  }
}
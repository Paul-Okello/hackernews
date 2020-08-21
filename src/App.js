import React, { Component } from 'react';
import Search from './Search';
import Table from './Table';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result:null,
      searchTerm: DEFAULT_QUERY,
    }
    this.setSearchTopStories=this.setSearchTopStories.bind(this);
    this.onDismiss=this.onDismiss.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
  }
  setSearchTopStories(result) {
    this.setState({result});
  }
  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
          .then(Response => Response.json())
          .then(result => {
            this.setSearchTopStories(result)
            console.log("Result: ",result.hits);
          })
          .catch(error => console.log(error));
  }
  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
    
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list: updatedList});
    console.log("Updated list: ",updatedList);
  }
 
  render() {
   const { searchTerm, result } = this.state;

   if(!result) { return null; }

    return (
      <div className="page">
        <div className="interactions">
        <Search 
         value={searchTerm}
         onChange={this.onSearchChange}
        >
          Search
        </Search>
        <Table
         list={result.hits}
         pattern={searchTerm}
         onDismiss={this.onDismiss} 
        />
        </div>
        
      </div>
    );
  }
}

import React, { Component } from 'react';


const list =[
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
const isSearched = searchTerm => item => 
     item.title.toLowerCase().includes(searchTerm.toLowerCase());
  


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    }
    this.onDismiss=this.onDismiss.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
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
   const { searchTerm, list } = this.state;

    return (
      <div className="App">
        <form action="">
          <input 
           type="text"
           onChange={this.onSearchChange}
           value={searchTerm}
          />
        </form>
        {
          list.filter(isSearched(searchTerm)).map( (item) => 
            <div key={item.objectID}> 
              <span><a href={item.url}>{item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                 type='button'
                 onClick={() => this.onDismiss(item.objectID)}
                >
                  Dismiss
                </button>
              </span>
            </div>
          )
        }
      </div>
    );
  }
}

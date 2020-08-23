import React from 'react';
import ReactDOM from 'react-dom';
import  renderer  from 'react-test-renderer';
import App, { Search, Button, Table } from './App';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter()});
describe('App', () =>{
  it('renders without crashing-- ', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    });
    it('renders without crashing --Enzyme',() =>{
      const element = mount(
        <App />
      )
    })
  
  test('has a valid snapshot', () =>{
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect (tree).toMatchSnapshot();
  })

})

describe('Search', () => {
  it('renders without crashing', () =>{
    const div =document.createElement('div');
    ReactDOM.render(<Search>Search</Search>,div);
    ReactDOM.unmountComponentAtNode(div);
  })
it('shows the search component --Enzyme', () =>{
  const element = mount(
    <Search>Search</Search>
  );
})

  test('has a valid snapshot', () =>{
    const component = renderer.create(
      <Search>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  })
});

describe('Button', ()=>{

  it('renders withot crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<Button>More...</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  test('has a valid snapshot', () =>{
    const component = renderer.create(
      <Button>More...</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('Table', () =>{
  const props = {
    list: [
      { title: 'redux', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
    ],
  }

  it('renders withut crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props}/>, div);
  })
it('shows two items in list', () =>{
  const element = mount(
    <Table {...props}/>
  );
  expect(element.find('.table-row').length).toBe(2);
})
  test('has a valid snapshot', () =>{
    const component = renderer.create(
      <Table {...props}/>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
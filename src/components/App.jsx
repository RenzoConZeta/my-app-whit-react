import React, { Component } from 'react';

import Gallery from './Gallery.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'harry potter',
      items: [],
    };
  }

  componentWillMount() {
    this.search();
  }

  search() {
    const URL_BOOK = 'https://www.googleapis.com/books/v1/volumes?q=';
    fetch(`${URL_BOOK}${this.state.query}`)
      .then(res => res.json())
      .then((res) => {
        let items = res.items;
        this.setState({
          items
        })
      })
  }

  render() {
    return (
      <div>
        <h2>
          Book Explorer
        </h2>
        <Gallery items={this.state.items} />
      </div>
    );
  }
}

export default App;

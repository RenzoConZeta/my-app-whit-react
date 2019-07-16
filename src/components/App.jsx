import React, { Component } from 'react';

class Gallery extends Component {
  render() {
    return (
      <div>
        {
          this.props.items.map((item, index) => {
            const { title, imageLinks, infoLink } = item.volumeInfo
            return (
              <div  className="book" key={index}>
                <img className="book-img" src={imageLinks !== undefined ? imageLinks.thumbnail : ''} alt=""/>
                <div className="book-text">
                {title}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

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
          Favorite Books
        </h2>
        <Gallery items={this.state.items} />
      </div>
    );
  }
}

export default App;

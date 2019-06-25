import React, { Component } from 'react';

import './galery.scss'

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

export default Gallery;

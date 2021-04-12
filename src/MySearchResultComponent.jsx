import React from 'react';

import {update } from './BooksAPI'

class MySearchResultComponent extends React.Component {
  // constructor() {
  //   super();
  //   this.state = { books: [] };
  // }
  
  // async componentDidMount() {
  //   var result = await getAll();
  //   console.log(result);
  //   this.setState({ books: result });
  // }
  
  render() {
    if (this.props.books !== undefined && this.props.books.length > 0) {
      return (
        <div>
          <ol className="books-grid">
            {
              this.props.books.map((book) => {
                let imgUrl = '';
                let bookShelf = 'none';
                if (book.shelf !== undefined) {
                  bookShelf = book.shelf;
                }
                if (book !== undefined && book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined) {
                  imgUrl = book.imageLinks.thumbnail;
                }
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + imgUrl + ')' }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={bookShelf} onChange={(event) => { update(book, event.target.value) }}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead" >Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>);
              })
            }
          </ol>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default MySearchResultComponent;
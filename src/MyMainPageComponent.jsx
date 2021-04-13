import React from 'react';
import { Link } from 'react-router-dom';
import MyBookShelfComponent from './MyBookShelfComponent';

import { getAll, update } from './BooksAPI'

import './App.css'

class MyMainPageComponent extends React.Component {

  constructor() {
    super();
    this.doUpdate = this.doUpdate.bind(this);
  }

  state = {
    allBooks: [],
    currentlyReadBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }

  async componentDidMount() {
    var result = await getAll();
    console.log(result);

    this.setState({ 
      allBooks: result,
      currentlyReadBooks: result.filter(book => book.shelf === "currentlyReading"),
      wantToReadBooks: result.filter(book => book.shelf === "wantToRead"),
      readBooks: result.filter(book => book.shelf === "read")
     });
  }

  doUpdate(book, newShelf){
    let books = this.state.allBooks;
    
    books.forEach(currentBook => {
      if(currentBook.id === book.id){
        currentBook.shelf = newShelf;
      }
    });

    debugger;
    
    this.setState({ 
      allBooks: books,
      currentlyReadBooks: books.filter(book => book.shelf === "currentlyReading"),
      wantToReadBooks: books.filter(book => book.shelf === "wantToRead"),
      readBooks: books.filter(book => book.shelf === "read")
     });
    update(book, newShelf); 
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <MyBookShelfComponent books={this.state.currentlyReadBooks} doUpdate = {this.doUpdate}/>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
            <MyBookShelfComponent books={this.state.wantToReadBooks} doUpdate = {this.doUpdate}/>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
            <MyBookShelfComponent books={this.state.readBooks} doUpdate = {this.doUpdate}/>
            </div>
          </div>
          <div className="open-search">
            <Link className="open-search" to='/search'>Add a book</Link>
          </div> 
          {/* <div className="open-search">
            <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
          </div> */}
        </div>
      </div>
    )
  }
}

export default MyMainPageComponent;
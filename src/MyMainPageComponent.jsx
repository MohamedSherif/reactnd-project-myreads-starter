import React from 'react';
import { Link } from 'react-router-dom';
import MyBookShelfComponent from './MyBookShelfComponent';

import './App.css'

class MyMainPageComponent extends React.Component {

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
              <MyBookShelfComponent books={this.props.allBooks.filter(book => book.shelf === "currentlyReading")} doUpdate = {this.props.doUpdate}/>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
            <MyBookShelfComponent books={this.props.allBooks.filter(book => book.shelf === "wantToRead")} doUpdate = {this.props.doUpdate}/>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
            <MyBookShelfComponent books={this.props.allBooks.filter(book => book.shelf === "read")} doUpdate = {this.props.doUpdate}/>
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
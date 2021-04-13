import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import * as BooksAPI from './BooksAPI'
import './App.css'
import MySearchPageComponent from './MySearchPageComponent'
import MyMainPageComponent from './MyMainPageComponent'
import NotFoundPageComponent from './NotFoundPageComponent'

import { getAll, update } from './BooksAPI'

class BooksApp extends React.Component {
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
    var bookFound = false;
    
    books.forEach(currentBook => {
      if(currentBook.id === book.id){
        currentBook.shelf = newShelf;
        bookFound = true;
      }
    });

    if(!bookFound){
      book.shelf = newShelf;
      books.push(book);
    }

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
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <MyMainPageComponent allBooks = {this.state.allBooks} doUpdate = {this.doUpdate}/>
          )} />
          <Route exact path='/search' render={() => (
            <MySearchPageComponent allBooks = {this.state.allBooks} doUpdate = {this.doUpdate}/>
          )} />
          <Route component={NotFoundPageComponent} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp

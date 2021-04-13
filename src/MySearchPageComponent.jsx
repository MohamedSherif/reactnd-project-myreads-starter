import React from 'react';
import { Link } from 'react-router-dom';

import { search } from './BooksAPI'
import MySearchResultComponent from './MySearchResultComponent';

class MySearchPageComponent extends React.Component {
  constructor() {
    super();
    this.state = { books: [] };
  }

  async doSearch(value) {

    search(value).then(result => {
      if (result !== undefined && result != null && Array.isArray(result)) {
        let booksOnShelves = this.props.allBooks;
        for (let book of result) {
          for (let i = 0; i < booksOnShelves.length; i++) {
            if (book.id === booksOnShelves[i].id) {
              book.shelf = booksOnShelves[i].shelf;
              console.log(booksOnShelves[i].shelf);
            }
          }
        }
        debugger;
        console.log(result);
        this.setState({ books: result });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/' >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input type="text" placeholder="Search by title or author" onChange={(event) => { this.doSearch(event.target.value) }} />

          </div>
        </div>
        <div className="search-books-results">
          <MySearchResultComponent books={this.state.books} doUpdate = {this.props.doUpdate}/>
        </div>
      </div>
    )
  }
}

export default MySearchPageComponent;
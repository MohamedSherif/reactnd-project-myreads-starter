import React from 'react';
import { Link } from 'react-router-dom';

import { search } from './BooksAPI'
import MySearchResultComponent from './MySearchResultComponent';

class MySearchPageComponent extends React.Component {
  constructor() {
    super();
    this.state = { books: [] };
  }

  async doSearch(value){
    var result = await search(value);
    this.setState({ books: result});
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
          <MySearchResultComponent books = {this.state.books}/>
        </div>
      </div>
    )
  }
}

export default MySearchPageComponent;
import React, { Component } from 'react';

class search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchResults: [],
      // Other state variables for news data, etc.
    };
  }

  handleSearch = () => {
    const { allNews } = this.state;

    // Perform search logic here and update searchResults state
    const filteredNews = allNews.filter((news) =>
      news.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    this.setState({ searchResults: filteredNews });
  };

  render() {
    const { searchQuery, searchResults } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
        />
        <button onClick={this.handleSearch}>Search</button>

        {searchResults.length > 0 ? (
          // Display search results
          searchResults.map((result) => (
            // Render individual news item
            <div key={result.id}>{result.title}</div>
          ))
        ) : (
          // Display message when no results are found
          <p>No news found for the given search query.</p>
        )}
      </div>
    );
  }
}

export default search;

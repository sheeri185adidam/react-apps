import axios from 'axios';
import * as React from 'react';
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const ListItem = ({ item, onRemove }) => {
  //console.log('ListItem Component Render');

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => { onRemove(item) }}>
          Delete
        </button>
      </span>
    </li>
  );
}

const List = ({ list, onRemoveItem }) => {
  //console.log('List Component Render');
  const items = list.map((item) => {
    return (
      <ListItem key={item.objectID} item={item} onRemove={onRemoveItem} />
    );
  });

  return <ul>{items}</ul>;
}

const InputWithLabel = ({ id, type = 'text', value, onInputChange, children }) => {
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (<React.Fragment>
    <label htmlFor={id}>{children}</label>
    <input id={id} type={type} value={value} onChange={handleChange} />
  </React.Fragment>);
}

const useStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialValue);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => {
  return (<form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}>
      <strong>Search:</strong>{" "}
    </InputWithLabel>
    <button  type="submit" disabled={!searchTerm}>Submit</button>
  </form>);
}

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isErrored: false,
        isLoading: true
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        data: action.payload,
        isErrored: false,
        isLoading: false
      };
    case 'STORIES_FETCH_ERROR':
      return {
        ...state,
        isErrored: true,
        isLoading: false
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter((story) => story.objectID !== action.payload.objectID)
      };
    default:
      return state;
  }
};

const App = () => {
  //console.log('App Component Render');
  const [searchTerm, setSearchTerm] = useStorageState("", "");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isErrored: false, isLoading: false });
  const [searchUrl, setSearchUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleRemove = (story) => {
    dispatchStories({ type: 'REMOVE_STORY', payload: story });
  };

  const handleSearchInput = (text) => {
    setSearchTerm(text);
  };

  const handleSearchSubmit = (event) => {
    setSearchUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const response = await axios.get(searchUrl);
      dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: response.data.hits });
    } catch (error) {
      console.error(error);
      dispatchStories({ type: 'STORIES_FETCH_ERROR' });
    }
  }, [searchUrl]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <div>
      <h1>Hacker Stories</h1>
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit} />
      <hr />
      {stories.isErrored && (<p>API error...</p>)}
      {stories.isLoading ? (
        <p>Data is loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemove} />
      )}
    </div>
  );
}

export default App

import React from 'react';
import {render} from 'react-dom';
import SearchPage from './components/search_page';
// // import AwesomeComponent from './components/AwesomeComponent.jsx';
//
class App extends React.Component {
  render () {
    return (
      <div>
        <SearchPage />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

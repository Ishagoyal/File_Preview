import React, { Component } from 'react';
import './App.css';

import FileUpload from './components/FileUpload';

class App extends Component {
  render() {
    return (
      <div className="App">
       <FileUpload></FileUpload>
      </div>
    );
  }
}

export default App;

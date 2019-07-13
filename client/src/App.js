import React from 'react';
import './App.css';



function App() {
  async function fetchData(url) {
    const method = 'GET';
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
    const response = await fetch(url, options)
    const json = await response.json();
    const courses = await json.courses;

    return courses    
  }


  const courses = fetchData('http://localhost:5000/api/courses');
  console.log('courses', courses)

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div> 
      {/* { courses} */}
      </div>
    </div>
  );
}

export default App;

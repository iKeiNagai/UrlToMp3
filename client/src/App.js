import UrlToMp3 from "./components/UrlToMp3";
import AllSongs from "./components/AllSongs";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './styles/app.scss';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Router>
        <Navbar loading = {loading}/>
        <Routes>
          <Route path="/" element={<UrlToMp3 setLoading = {setLoading} loading= {loading}/>} />
          <Route path="/all-songs" element={<AllSongs/>} />
        </Routes>
      </Router>
    </div>


  );
}

export default App;

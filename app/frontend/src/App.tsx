import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  localStorage.setItem("item","home")
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/main' element={<AnalysisPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

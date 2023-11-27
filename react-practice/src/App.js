import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './pages/TodoList';
import CoinTracker from './pages/CoinTracker';
import MovieApp from './pages/MovieApp';
import Header from './layouts/Header';
import MovieDetail from './pages/MovieDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/CoinTracker" element={<CoinTracker />} />
            <Route path="/MovieApp" element={<MovieApp />} />
            <Route path="/MovieDetail/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;


import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';

//import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import DashboardPage from './pages/DashboardPage';
import ReviewsPage from './pages/ReviewsPage';
import AlbumPage from './pages/AlbumPage';
import AlbumShowPage from './pages/AlbumShowPage';
import ReviewShowPage from './pages/ReviewShowPage';


function App() {
  
  return (
   
    <BrowserRouter>
    <div className="App">

       
<Routes>
<Route path="/" element={<LoginPage/>} />
<Route path="/login" element={<LoginPage/>} />
<Route path="/join" element={<JoinPage/>} />
<Route path="/dashboard" element={<DashboardPage/>} />
<Route path="/album" element={<AlbumPage/>} />
<Route path="/album/:id" element={<AlbumShowPage/>} />
<Route path="/album/review" element={<ReviewsPage/>} />
<Route path="/album/review/:id" element={<ReviewShowPage/>} />
</Routes>


    </div>

    </BrowserRouter>
  );
}

export default App;

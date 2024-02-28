
import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';

//import Header from './components/Header';
import Login from './pages/LoginPage';
import Join from './pages/JoinPage';
import Dashboard from './pages/DashboardPage';
import Reviews from './pages/ReviewsPage';
import Album from './pages/AlbumPage';


function App() {
  
  return (
   
    <BrowserRouter>
    <div className="App">

       
<Routes>
<Route path="/" element={<Login/>} />
<Route path="/login" element={<Login/>} />
<Route path="/join" element={<Join/>} />
<Route path="/dashboard" element={<Dashboard/>} />
<Route path="/album" element={<Album/>} />
<Route path="/album/review" element={<Reviews/>} />
</Routes>


    </div>

    </BrowserRouter>
  );
}

export default App;

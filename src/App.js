import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
// import DashboardPage from './pages/DashboardPage';
import ReviewsPage from './pages/ReviewsPage';
import AlbumPage from './pages/AlbumPage';
import AlbumShowPage from './pages/AlbumShowPage';
import ReviewShowPage from './pages/ReviewShowPage';
import UserPage from './pages/UserPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';
import MyInformationPage from './pages/MyInformationPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login/error?" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          <Route path="/myInformation" element={<MyInformationPage />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/album/:id" element={<AlbumShowPage />} />
          <Route path="/album/review" element={<ReviewsPage />} />
          <Route path="/album/review/:id" element={<ReviewShowPage />} />
          <Route path="/album/review/edit/:id" element={<EditPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

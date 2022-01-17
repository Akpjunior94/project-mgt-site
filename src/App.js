import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import OnlineUsers from './components/OnlineUsers';


function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          {user && <Sidebar/>}
          <div className="container">
            <Navbar/>
            <Routes>
              <Route path="/" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
              <Route path="/create" element={user ? <Create/> : <Navigate to="/login"/>}/>
              <Route path="/projects/:id" element={<Project/>}/>
              <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
              <Route path="/signup" element={user ? <Navigate to="/"/> : <Signup/>}/>
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}

    </div>
  );
}

export default App

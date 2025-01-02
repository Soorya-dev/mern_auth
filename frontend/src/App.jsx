import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from "./pages/Signup";
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/privateRoute';
import Admin_Home from "./pages/Admin_home";
import Admin_Signin from "./pages/Admin_Signin";
import Admin_PrivateRoute from "./components/privateRoute";
import AdminUsers from "./pages/Admin_Users";
import PublicRoute from "./components/PublicRoute";


const App = () => {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        
        <Route path="/about" element={<About />} />
        <Route element={<Admin_PrivateRoute />}>
          <Route path="/admin" element={<Admin_Home />} />
          <Route path="/admin/admin-users" element={<AdminUsers />} />

        </Route>

        <Route path="/admin-sign-in" element={<Admin_Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
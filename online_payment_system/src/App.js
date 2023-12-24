import './stylesheets/textElements.css'
import './stylesheets/formElements.css'
import './stylesheets/theme.css'
import './stylesheets/customComponents.css'
import './stylesheets/alignments.css'
import './stylesheets/layout.css'
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Transactions from './pages/Transactions/Transactions'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/protectedRoute'; 
import PublicRoute from './components/PublicRoute'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'


function App() {

  const {loading}=useSelector(state=>state.loaders);
  return (
    <div >
     {loading &&  <Loader/>}
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
    <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
    <Route path="/transactions" element={<ProtectedRoute><Transactions/></ProtectedRoute>} />
  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
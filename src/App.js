
import './App.css';
import MainRoutes from './Routing/Routes';
import toast, { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Toaster />
      <MainRoutes />
    
 
   </div>
  );
}

export default App;

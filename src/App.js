
import './App.css';
import MainRoutes from './Routing/Routes';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <div className='flex flex-col'>
      <div className='flex '>
      <Sidebar />
      <Header />
      </div>
      <MainRoutes />
      </div>
 
   </div>
  );
}

export default App;

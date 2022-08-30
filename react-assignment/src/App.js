import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import FileUploadDownload from './components/FileUploadDownload';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="fileUpload" element={<FileUploadDownload />} /> //path="fileUpload"
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

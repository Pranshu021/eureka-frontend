// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// @ts-ignore
import { Home, ViewReport, PageNotFound } from "./pages"

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewReport" element={<ViewReport />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
    
  )
}

export default App

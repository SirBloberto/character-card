import './App.css';
import CharacterInput from './components/CharacterInput';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterCard from './components/CharacterCard';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <Main/>
      <BrowserRouter>
      <Routes>
          <Route path="/create" element= {<CharacterInput />} />
          <Route path="/result" element= {<CharacterCard />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
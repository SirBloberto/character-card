import './App.css';
import CharacterCard from './components/CharacterCard';

function App() {
  return (
    <div className="App">
      <CharacterCard
        url={require('./images/Fish.gif')}
        w="220" h="200"
        charactername='Lucy Oh'
        characterclass='Satyr'
        strength='-1'
        dexterity='+3'
        constitution='+1'
        intelligence='+1'
        wisdom='+1'
        charisma='+3'
      />
    </div>
  );
}

export default App;
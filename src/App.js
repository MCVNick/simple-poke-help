import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce'
import './App.css';

function App() {
  const [pokeNumber, setPokeNumber] = useState(1)
  const [boxNumber, setBoxNumber] = useState(15)
  const [rowNumber, setRowNumber] = useState(1)
  const [spotNumber, setSpotNumber] = useState(1)
  const selectText = debounce(value => {
    value.select()
  }, 1000)

  useEffect(() => {
    const pokeBoxNumber = pokeNumber % 30 === 0 ? parseInt(pokeNumber / 30) : parseInt(pokeNumber / 30) + 1
    const pokeRowNumber = Math.ceil(Math.round((pokeNumber / 30 - Math.trunc(pokeNumber / 30)) * 30) / 6)
    const pokeSpotNumber = pokeNumber % 6

    setBoxNumber(pokeBoxNumber)
    setRowNumber(pokeRowNumber === 0 ? 5 : pokeRowNumber)
    setSpotNumber(pokeSpotNumber === 0 ? 6 : pokeSpotNumber)
  }, [pokeNumber])

  const getAnswers = (e) => {
    if (e.target.value === '') {
      return setPokeNumber('')
    }

    setPokeNumber(e.target.value)
    selectText(e.target)
  }

  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
      <input type='number' onChange={(e) => getAnswers(e)} value={pokeNumber} style={{textAlign: 'center', fontSize: '20px', width: '100px'}}/>
      <h3 style={{width: '100px'}}>Box: {boxNumber}</h3>
      <h3 style={{width: '100px'}}>Row: {rowNumber}</h3>
      <h3 style={{width: '100px'}}>Spot: {spotNumber}</h3>
    </div>
  );
}

export default App;

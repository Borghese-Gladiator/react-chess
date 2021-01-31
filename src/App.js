import React, { useState } from 'react';
// custom components
import Game from './components/game.js';
import Footer from './components/Footer';
// Material UI components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// Material UI Icons
import GitHubIcon from '@material-ui/icons/GitHub';

function PickStarterForm() {
  const [startingColor, setStartingColor] = React.useState('white');

  const handleChange = (event) => {
    setStartingColor(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Player Starting Color</FormLabel>
      <RadioGroup value={startingColor} onChange={handleChange}>
        <FormControlLabel value={'white'} control={<Radio />} label="White (first)" />
        <FormControlLabel value={'black'} control={<Radio />} label="Black" />
      </RadioGroup>
    </FormControl>
  )
}

function AIDifficultyForm() {
  const [minimaxDepth, setMinimaxDepth] = React.useState('5');

  const handleChange = (event) => {
    setMinimaxDepth(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>AI Difficulty</FormLabel>
      <RadioGroup value={minimaxDepth} onChange={handleChange}>
        <FormControlLabel value={'5'} control={<Radio />} label="Easy (5)" />
        <FormControlLabel value={'10'} control={<Radio />} label="Medium (10)" />
        <FormControlLabel value={'15'} control={<Radio />} label="Hard (15)" />
      </RadioGroup>
    </FormControl>
  )
}


function App() {
  const [numPlayers, setNumPlayer] = useState('p-v-p');

  const handleChange = (event) => {
    setNumPlayer(event.target.value);
  };

  const newGame = (event) => {
    console.log("NEW GAME " + event.target.value);
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <h1>Chess</h1>
      <IconButton aria-label="GitHub.com" onClick={() => window.open('https://github.com/Borghese-Gladiator/react-chess')}>
        <GitHubIcon fontSize="large" />
      </IconButton>
      <br />
      <Box display="flex" justifyContent="center" alignItems="start">
        <Game />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <FormControl>
            <FormLabel>Players</FormLabel>
            <RadioGroup value={numPlayers} onChange={handleChange}>
              <FormControlLabel value={'ai-v-ai'} control={<Radio />} label="AI vs AI" />
              <FormControlLabel value={'p-v-ai'} control={<Radio />} label="Player vs AI" />
              <FormControlLabel value={'p-v-p'} control={<Radio />} label="Player vs Player" />
            </RadioGroup>
          </FormControl>
          {
            numPlayers === 'p-v-ai' && 
            <Box display="flex" justifyContent="center">
              <PickStarterForm />
              <AIDifficultyForm />
            </Box>
          }
          {
            numPlayers === 'ai-v-ai' &&
              <Box display="flex" justifyContent="center" alignItems="center">
                <AIDifficultyForm />
                <AIDifficultyForm />
              </Box>
          }
          <Button variant="contained" color="primary" onClick={newGame}>New Game</Button>
        </Box>
      </Box>
      <Footer />
    </Box>

  )
}

export default App;
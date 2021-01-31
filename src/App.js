import React, { useState, useEffect } from 'react';
// utils
import initialiseChessBoard from './helpers/board-initialiser.js';
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

// constants
const onePlayerDefaultStaringColor = 'white';
const aiDefaultDiffulty = '5';

function PickStarterForm({ colorStartCallback }) {
  const [startingColor, setStartingColor] = React.useState(onePlayerDefaultStaringColor);

  const handleChange = (event) => {
    setStartingColor(event.target.value);
    colorStartCallback(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Player Color</FormLabel>
      <RadioGroup value={startingColor} onChange={handleChange}>
        <FormControlLabel value={'white'} control={<Radio />} label="White (first)" />
        <FormControlLabel value={'black'} control={<Radio />} label="Black" />
      </RadioGroup>
    </FormControl>
  )
}

function AIDifficultyForm({ aiDifficultyCallback }) {
  const [minimaxDepth, setMinimaxDepth] = React.useState(aiDefaultDiffulty);

  const handleChange = (event) => {
    setMinimaxDepth(event.target.value);
    console.log(event.target.value)
    aiDifficultyCallback(event.target.value);
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
  const [numPlayers, setNumPlayer] = useState('2');
  let aiPlayObj = {};

  const [initialGameParams, setInitialGameParams] = useState({
    squares: initialiseChessBoard(),
    whiteFallenSoldiers: [],
    blackFallenSoldiers: [],
    player: 1,
    sourceSelection: -1,
    status: '',
    turn: 'white',
    numPlayers: parseInt(numPlayers, 10)
  });
  
  useEffect(() => {
    // default values for when numPlayers is changed
    if (numPlayers === '0') {
      aiPlayObj = {
        aiOneDifficulty: aiDefaultDiffulty,
        aiTwoDifficulty: aiDefaultDiffulty
      }
    } else if (numPlayers === '1') {
      aiPlayObj = {
        playerColor: onePlayerDefaultStaringColor,
        aiDifficulty: aiDefaultDiffulty
      }
    } else {
      aiPlayObj = {}
    }
  })

  const handleChange = (event) => {
    // react hooks synchronous here: https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks
    setNumPlayer(event.target.value);
  };

  const newGame = (event) => {
    setInitialGameParams({
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white',
      numPlayers: parseInt(numPlayers, 10),
      aiPlayObj: aiPlayObj
    })
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <h1>Chess</h1>
      <IconButton aria-label="GitHub.com" onClick={() => window.open('https://github.com/Borghese-Gladiator/react-chess')}>
        <GitHubIcon fontSize="large" />
      </IconButton>
      <br />
      <Box display="flex" justifyContent="center" alignItems="start">
        <Game initialGameParams={initialGameParams} />
        <Box display="flex" flexDirection="column" justifyContent="center" style={{ marginLeft: 50 }}>
          <FormControl>
            <FormLabel>Players</FormLabel>
            <RadioGroup value={numPlayers} onChange={handleChange}>
              <FormControlLabel value={'0'} control={<Radio />} label="AI vs AI" />
              <FormControlLabel value={'1'} control={<Radio />} label="Player vs AI" />
              <FormControlLabel value={'2'} control={<Radio />} label="Player vs Player" />
            </RadioGroup>
          </FormControl>
          {
            numPlayers === '1' &&
            <Box display="flex" justifyContent="center">
              <PickStarterForm colorStartCallback={(val) => aiPlayObj = {
                ...aiPlayObj, 
                playerColor: val
              }} />
              <AIDifficultyForm aiDifficultyCallback={(val) => aiPlayObj = {
                ...aiPlayObj,
                aiDifficulty: val
              }} />
            </Box>
          }
          {
            numPlayers === '0' &&
            <Box display="flex" justifyContent="center" alignItems="center">
              <AIDifficultyForm aiDifficultyCallback={(val) => aiPlayObj = {
                ...aiPlayObj,
                aiOneDifficulty: val
              }} />
              <AIDifficultyForm aiDifficultyCallback={(val) => aiPlayObj = {
                ...aiPlayObj,
                aiTwoDifficulty: val
              }} />
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
import { useState } from 'react';
import './App.css';
import GameBoard from './components/gameBoard';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { GameLevels } from './common/constants';


function App() {
  const [gameLevel, setGameLevel] = useState<string>();
  const [showGameOverCard, setShowGameOverCard] = useState<boolean>(false);
  return (
    <div className="App">
      <h1>Snake Game</h1>
      {gameLevel && !showGameOverCard && <GameBoard height={600} width={600} gameLevel={gameLevel} setShowGameOverCard={setShowGameOverCard} />}
      {!gameLevel && <Card style={{ width: '28rem', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>Choose a level you want to play.</Card.Title>
          <ButtonGroup aria-label="Game level">
            <Button variant="primary" onClick={() => setGameLevel(GameLevels.EASY)}>Easy</Button>
            <Button variant="secondary" onClick={() => setGameLevel(GameLevels.MEDIUM)}>Medium</Button>
            <Button variant="success" onClick={() => setGameLevel(GameLevels.HARD)}>Hard</Button>
            <Button variant="danger" onClick={() => setGameLevel(GameLevels.SUPERMAN)}>Superman</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>}
      {
        showGameOverCard && <Card style={{ width: '36rem', margin: 'auto', padding: '1rem' }}>
          <Card.Body>
            <Card.Title>Game Over</Card.Title>
            <ButtonGroup aria-label="Game level">
              <Button onClick={() => {
                setShowGameOverCard(false);
                setGameLevel('');
              }
              }>Play Again</Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      }
    </div>
  );
}

export default App;

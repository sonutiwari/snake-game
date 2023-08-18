import Button from 'react-bootstrap/Button';
export interface IInstructionProps {
    resetBoard: () => void;
}

const HowToPlay = ({ resetBoard }: IInstructionProps) => (
    <div>
        <h3>How to Play</h3>
        <h4>NOTE: Start the game by pressing right arrow key</h4>
        <div>
            <Button onClick={() => resetBoard()}>Reset game</Button>
        </div>
        <div>
            <div>
                <div>
                    <b>Up Arrow Key &uarr;</b> Move Up
                </div>
                <div>
                    <b>Left Arrow Key &larr;</b> Move Left
                </div>
                <div>
                    <b>Down Arrow key &darr;</b> Move Down
                </div>
                <div>
                    <b>Right Arrow key &rarr;</b> Move Right
                </div>
            </div>
        </div>
    </div>
);

export default HowToPlay;
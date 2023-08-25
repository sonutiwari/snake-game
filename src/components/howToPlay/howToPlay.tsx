import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import GlobalContext from '../../context';
import { TRANSLATIONS } from '../../lang';
export interface IInstructionProps {
    resetBoard: () => void;
}

const HowToPlay = ({ resetBoard }: IInstructionProps) => {
    const language = useContext(GlobalContext)
    const currentPageTranslation = TRANSLATIONS[language].howToPlayPageTranslations;
    return (
        <div>
            <h3>{currentPageTranslation.HOW_TO_PLAY}</h3>
            <h4>{currentPageTranslation.NOTE}</h4>
            <div>
                <Button onClick={() => resetBoard()}>{currentPageTranslation.RESET_GAME}</Button>
            </div>
            <div>
                <div>
                    <div>
                        <b>{currentPageTranslation.UP_ARROW_KEY} &uarr;</b> {currentPageTranslation.MOVE_UP}
                    </div>
                    <div>
                        <b>{currentPageTranslation.LEFT_ARROW_KEY}  &larr;</b> {currentPageTranslation.MOVE_LEFT}
                    </div>
                    <div>
                        <b>{currentPageTranslation.DOWN_ARROW_KEY}  &darr;</b> {currentPageTranslation.MOVE_DOWN}
                    </div>
                    <div>
                        <b>{currentPageTranslation.RIGHT_ARROW_KEY}  &rarr;</b> {currentPageTranslation.MOVE_RIGHT}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToPlay;
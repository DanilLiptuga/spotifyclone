import React, {FC, HTMLAttributes} from 'react';
import classes from "./styles/playpausebut.module.scss";
interface PlayPauseButProps extends HTMLAttributes<HTMLButtonElement>{
    active: boolean,
    additionalClass?: string
}
const PlayPauseBut : FC<PlayPauseButProps> = ({active, additionalClass, ...props}) : JSX.Element => {
    return (
        <button className={classes.playbut + ` ${additionalClass}`} {...props}>
            {active
                ?
                <svg role="img" height="18" width="18" viewBox="0 0 16 16" className="Svg-sc-1bi12j5-0 EQkJl">
                <path
                    d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
            </svg>
            :
                <svg role="img" height="18" width="18" viewBox="0 0 24 24">
                    <path
                        d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                </svg>
            }

        </button>
    );
};

export default PlayPauseBut;
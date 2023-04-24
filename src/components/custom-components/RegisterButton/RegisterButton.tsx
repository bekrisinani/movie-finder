import React from 'react';
import styles from './RegisterButton.module.scss'
import {Button} from "@mui/material";
export interface RegisterButtonProps {
    onClick?: () => void;
}
export const RegisterButton: React.FC<RegisterButtonProps> = ({onClick, ...rest}) => {
    return (
            <Button className={styles['root']} variant="contained" onClick={onClick} {...rest}>
                Search Movie
            </Button>
    );
}
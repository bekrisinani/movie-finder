import React from 'react';
import {Modal} from "@mui/material";

import {IModalProps} from "./Modal.types";
import styles from './Modal.module.scss'


export const CustomModal: React.FC<IModalProps> = ({open, handleClose, children}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles['root']}
        >
            {children}
        </Modal>
    );
}

import React from 'react';
import styles from './TextInput.module.scss';
import {TextField} from "@mui/material";

export interface ErrorMessage {
    error: boolean;
    message: string;
}

interface TextInputProps {
    toolTip?: { message: string; altText: string };
    hiddenText?: boolean;
    validator?: (val: string | undefined) => { error: boolean; message: string };
    label: string;
    multiline?: boolean;
    disabled?: boolean;
    onChange?: (val: string) => void;
    onPaste?: (event: any) => void;
    id?: string;
    icon?: React.ReactElement;
    frontIcon?: React.ReactElement;
    initErrorState?: ErrorMessage;
    error?: ErrorMessage;
    value?: string;
    validateOnLoad?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
                                                        toolTip,
                                                        hiddenText = false,
                                                        label,
                                                        onChange,
                                                        onPaste,
                                                        frontIcon,
                                                        icon,
                                                        validator,
                                                        disabled,
                                                        multiline,
                                                        id,
                                                        value,
                                                        validateOnLoad = false,
                                                    }) => {
    const onChangeHandler = (e: any) => {
        e.persist();
        const { value } = e.target;
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className={styles['root']}>
            <div>
                <TextField
                    value={value}
                    id={id}
                    label={label}
                    fullWidth={true}
                    disabled={disabled}
                    variant="outlined"
                    multiline={multiline}
                    onChange={onChangeHandler}
                    type={hiddenText ? 'password' : 'text'}
                />
            </div>
        </div>
    );
};

import React, {JSXElementConstructor, ReactElement, ReactNode} from "react";


export interface IModalProps {
    open: boolean;
    handleClose?: () => void
    children: React.ReactElement
}

export interface ILoginModalProps {
    open: boolean;
    handleClose: () => void
    handleOnSubmit: () => void;
}


export interface ICreateAccountModalProps {
    open: boolean;
    handleClose: () => void
}
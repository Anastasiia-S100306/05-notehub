import {createPortal} from "react-dom";
import css from "./Modal.module.css"
import React, {useEffect} from "react";


export interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({children, onClose}: ModalProps) {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        }
    }, [onClose]);


    const rootModal = document.getElementById("modal-root");
    if (!rootModal) {
        return null;
    }

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        rootModal,
    );
}
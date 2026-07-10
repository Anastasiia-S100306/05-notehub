import css from "./ErrorMessage.module.css"

interface ErrorMessageProps {
    errorMessage: string;
}

export default function ErrorMessage({errorMessage}: ErrorMessageProps) {
    return (
        <p className={css.text}>{errorMessage}</p>
    );
}
import styles from './Button.module.scss';

const Button = ({ children, className, color, ...rest }) => {
    let buttonClassName = styles.button; //default styles of button

    if (className) {
        buttonClassName = `${buttonClassName} ${className}`
    }

    return (
        <button className={buttonClassName} data-color={color} {...rest}>
            { children }
        </button>
    )
}

export default Button;
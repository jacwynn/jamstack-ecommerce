import styles from './Container.module.scss';

const Container = ({ children, className, ...rest }) => {
    let containerClassName = styles.container; //default styles of container

    if (className) {
        containerClassName = `${containerClassName} ${className}`
    }

    return (
        <div className={containerClassName} {...rest}>
            { children }
        </div>
    )
}

export default Container;
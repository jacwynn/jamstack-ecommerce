import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
    return (
        <footer className={styles.footer} {...rest}>
            &copy; Air Jordan El3vens Store, {new Date().getFullYear()}
        </footer>
    )
}

export default Footer;
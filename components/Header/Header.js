import Container from '@components/Container';
import styles from './Header.module.scss';

import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    return (
        <header className={styles.header}>
            <Container className={styles.headerContainer}>
                <p>Air Jordan El3vens</p>
                <p className={styles.headerCart}>
                    <FaShoppingCart />
                    $0.00
                </p>
            </Container>
        </header>
    )
}

export default Header;
// Hooks
import { useSnipcart } from '@hooks/use-snipcart';
import Link from 'next/link';
import Container from '@components/Container';
import styles from './Header.module.scss';

import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    const { cart = {} } = useSnipcart();
    const { subtotal = '0.00' } = cart;
    
    return (
        <header className={styles.header}>
            <Container className={styles.headerContainer}>
                <p>
                    <Link href="/"><a>Air Jordan El3vens</a></Link>
                </p>
                <p className={styles.headerCart}>
                    <button className="snipcart-checkout">
                        <FaShoppingCart />
                        <span>
                            ${subtotal}
                        </span>
                    </button>
                </p>
            </Container>
        </header>
    )
}

export default Header;
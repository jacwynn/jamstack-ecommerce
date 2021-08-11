import Head from 'next/head';
import Image from 'next/image';

// components
import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';

// styles
import styles from '@styles/Home.module.scss';

// data
import products from '@data/products';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Air Jordan El3vens</title>
        <meta name="description" content="Store just for Air Jordan 11s" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container>
          <h1>Air Jordan El3vens</h1>
          <h2>Available Shoes</h2>
          <ul className={styles.productGrid}>
            {products.map(product => {
              return (
                <li key={product.id}>
                  <Image width="2048" height="1228" src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <p><Button>Add to Cart</Button></p>
                </li>
              )
            })}
          </ul>
        </Container>
      </main>

      <footer className={styles.footer}>
        &copy; Air Jordan El3vens Store, {new Date().getFullYear()}
      </footer>
    </div>
  )
}

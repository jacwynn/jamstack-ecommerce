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

        {/* SnipCart */}
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
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
                  <p><Button
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-url="/"
                    data-item-description=""
                    data-item-image={product.image}
                    data-item-name={product.title}
                  >
                    Add to Cart
                  </Button></p>
                </li>
              )
            })}
          </ul>
        </Container>
      </main>

      <footer className={styles.footer}>
        &copy; Air Jordan El3vens Store, {new Date().getFullYear()}
      </footer>

      <script async src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js" />
      <div hidden id="snipcart" data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY} />
    </div>
  )
}

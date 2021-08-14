import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from '@apollo/client';

// components
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

// styles
import styles from '@styles/Home.module.scss';

// data
// import products from '@data/products';

export default function Home({ products }) {
  return (
    <Layout className={styles.container}>
      <Head>
        <title>Air Jordan El3vens</title>
        <meta name="description" content="Store just for Air Jordan 11s" />
      </Head>

      <Container>
        <h1>Air Jordan El3vens</h1>
        <h2>Available Shoes</h2>
        <ul className={styles.productGrid}>
          {products.map(product => {
            const { featuredImage } = product;
            return (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <Image width={featuredImage.mediaDetails.width} height={featuredImage.mediaDetails.height} src={featuredImage.sourceUrl} alt="Add in future" />
                    <h3>{product.title}</h3>
                    <p>${product.productPrice}</p>
                  </a>
                </Link>
                <p><Button
                  className="snipcart-add-item"
                  data-item-id={product.productId}
                  data-item-price={product.productPrice}
                  data-item-url="/"
                  data-item-description=""
                  data-item-image={featuredImage.sourceUrl}
                  data-item-name={product.title}
                >
                  Add to Cart
                </Button></p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://wynnsolutions.staging.jacwynn.com/wp/graphql',
    cache: new InMemoryCache()
  })

  const res = await client.query({
    query: gql`
      query AllProducts {
        products {
          edges {
            node {
              id
              content
              title
              uri
              product {
                productPrice
                productId
              }
              slug
              featuredImage {
                node {
                  sourceUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }    
    `
  });

  const products = res.data.products.edges.map(({ node }) => {
    const data = {
      ...node,
      ...node.product,
      featuredImage: {
        ...node.featuredImage.node
      }
    }
    return data;
  })


  return {
    props: {
      products
    }
  }
}
import Head from 'next/head';
import Image from 'next/image';
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
import styles from '@styles/Product.module.scss';

export default function Product({ product }) {
  return (
    <Layout className={styles.container}>
      <Head>
        <title>{product.title} | Air Jordan El3vens</title>
        <meta name="description" content="Store just for Air Jordan 11s" />
      </Head>

      <Container>
        <h1>{product.title}</h1>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <Image width={product.featuredImage.mediaDetails.width} height={product.featuredImage.mediaDetails.height} src={product.featuredImage.sourceUrl} alt="Add in future" />
          </div>
          <div className={styles.productContent}>
            <div dangerouslySetInnerHTML={{
              __html: product.content
            }} />
            <p>${product.productPrice}</p>
            <p><Button
              className="snipcart-add-item"
              data-item-id={product.productId}
              data-item-price={product.productPrice}
              data-item-url="/"
              data-item-description=""
              data-item-image={product.featuredImage.sourceUrl}
              data-item-name={product.title}
            >
              Add to Cart
            </Button></p>
          </div>
        </div>
        
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { productSlug } = params; //using this to create dynamic query to get information back on particular product (from wordpress instance)
  const client = new ApolloClient({
    uri: 'https://wynnsolutions.staging.jacwynn.com/wp/graphql',
    cache: new InMemoryCache()
  })

  const res = await client.query({
    query: gql`
    query ProductBySlug($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        content
        title
        featuredImage {
          node {
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
        id
        product {
          productId
          productPrice
        }
      }
    }        
    `,
    variables: {
      slug: productSlug
    }
  });

  const product = {
    ...res.data.product,
    ...res.data.product.product,
    featuredImage: {
      ...res.data.product.featuredImage.node
    }
  }

  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
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
            slug
          }
        }
      }
    }
    `
  });

  const paths = res.data.products.edges.map(({ node }) => {
    return {
      params: {
        productSlug: node.slug
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}
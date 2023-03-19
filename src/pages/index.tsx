import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { gql } from '@apollo/client'
import { Customer } from '@/types/Customer'
import GqlClient  from '../../graphql/apollo-client'

interface HomeProps {
  customers: Customer[]
}

export default function Home({ customers }: HomeProps) {
  return (
    <>
      <Head>
        <title>Controll APP</title>
      </Head>
      <main>
        {customers.map((customer) => (
          <div key={customer.id}>
            <h1>{customer.name}</h1>
            <p>{customer.email}</p>
          </div>
        ))}
        <hr />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await GqlClient.query({
    query: gql`
      query {
        customers {
          id
          name
          email
        }
      }
    `
  })

  return {
    props: {
      customers: data.customers
    }
  }
}

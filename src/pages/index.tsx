import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { gql } from '@apollo/client'
import { Customer } from '@/types/Customer'
import GqlClient  from '../../graphql/apollo-client'

interface HomeProps {
  customers: Customer[]
}

export default function Home({ customers }: HomeProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { data } = await GqlClient.mutate({
      mutation: gql`
        mutation {
          createCustomer(name: "${name}", email: "${email}") {
            id
            name
            email
          }
        }
      `
    })

    setName('')
    setEmail('')
    customers.push(data.createCustomer)
  }
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
        <h1>Cadastrar cliente</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>
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

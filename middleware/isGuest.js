import me from '~/gql/user/me.gql'
export default async function ({ app, error }) {
  const client = app.apolloProvider.defaultClient
  try {
    const res = await client.query({ query: me })
    if (res) {
      app.router.push('/my');
    }
  } catch (e) {
  }
}
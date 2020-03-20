import me from '~/gql/user/me.gql'
export default async function({ app, error, store }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    store.commit('busy', true)
    const res = await client.query({ query: me })
    if (!res) {
      error({ statusCode: 403, message: 'You are not allowed to see this' })
      app.router.push('/login')
    }
  } catch (e) {
    error({ statusCode: 403, message: e.toString() })
    app.router.push('/login')
  } finally {
    store.commit('busy', false)
  }
}

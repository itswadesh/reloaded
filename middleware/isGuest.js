import me from '~/gql/user/me.gql'
export default async function({ app, error, store }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    store.commit('busy', true)
    const res = await client.query({ query: me })
    if (res) {
      app.router.push('/my')
    }
  } catch (e) {
  } finally {
    store.commit('busy', false)
  }
}

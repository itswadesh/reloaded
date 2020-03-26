import me from '~/gql/user/me.gql'
export default async function ({ app, error, store, redirect }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    store.commit('busy', true)
    const res = (await client.query({ query: me, fetchPolicy: 'no-cache' })).data.me
  } catch (e) {
    redirect('/login')
  } finally {
    store.commit('busy', false)
  }
}

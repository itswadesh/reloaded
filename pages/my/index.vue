<template>
  <AccountMenu class="md:hidden" />
</template>

<script>
import AccountMenu from "~/components/AccountMenu";
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user) return redirect("/login?return=/my");
  },
  components: { AccountMenu },
  layout: "account"
};
</script>

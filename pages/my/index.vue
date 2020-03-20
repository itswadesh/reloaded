<template>
  <AccountMenu class="md:hidden" />
</template>

<script>
import AccountMenu from "~/components/AccountMenu2";
export default {
  components: { AccountMenu },
  middleware: ["isAuth"],
  layout: "account"
};
</script>

<template>
  <div>
    <div>
      <header id="header">
        <p class="py-4 font-extrabold text-4xl">$INVEST</p>
      </header>
    </div>

    <div class="login">
      <h1 class="mt-32 text-center text-3xl font-extrabold">LOGIN</h1>
      <div id="okta-signin-container"></div>
    </div>

    <footer id="footer">
      <p class="text-center text-white p-4 text-2xl">Solinftec - 2022</p>
    </footer>
  </div>
</template>

<script>
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { oktaSignIn } from "../okta";

export default {
  name: "Login",
  mounted: function () {
    this.$nextTick(function () {
      oktaSignIn.showSignInAndRedirect({ el: "#okta-signin-container" });
    });
  },
  unmounted() {
    // Remove the widget from the DOM on path change
    oktaSignIn.remove();
  },
};
</script>

<style scoped>
#header {
  top: 0;
  position: fixed;
  background-color: teal;
  width: 100%;
  height: 70px;
}
#footer {
  background-color: teal;
  bottom: 0;
  width: 100%;
  position: fixed;
}
</style>

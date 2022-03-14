<template>
  <div class="sidebar">
    <div class="title font-extrabold">$INVEST</div>

    <div class="text-xl mt-10">
      <p>Usuário: {{ username }}</p>
      <br />
      <p>Saldo: ${{ saldo }}</p>
    </div>

    <div class="menu-items">
      <router-link
        to="/home"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container font-extrabold text-2xl">Home</div>
      </router-link>
      <router-link
        to="/mystocks"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container font-extrabold text-2xl">Minhas Stocks</div>
      </router-link>
      <router-link
        to="/orderscompra"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container font-extrabold text-2xl">
          Ordens de Compra
        </div>
      </router-link>
      <router-link
        to="/ordersvenda"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container font-extrabold text-2xl">
          Ordens de Venda
        </div>
      </router-link>

      <a
        class="font-extrabold text-2xl cursor-pointer"
        v-if="authenticated"
        v-on:click="logout()"
      >
        Logout
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      authenticated: false,
      username: "",
      saldo: "",
    };
  },
  async created() {
    await this.isAuthenticated();
    this.$auth.authStateManager.subscribe(this.isAuthenticated);
    this.getUserAndBalance();
  },
  watch: {
    $route: "isAuthenticated",
  },

  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
    },
    async logout() {
      await this.$auth.signOut();
    },
    async getUserAndBalance() {
      if (this.$root.authenticated) {
        let user = await this.$auth.getUser();
        this.username = user.name;
        let accessToken = this.$auth.getAccessToken();
        console.log(`Authorization: Bearer ${accessToken}`);
        try {
          let response = await axios.get(
            `http://localhost:8081/users/saldo?email=${user.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          this.saldo = response.data.toFixed(2);
        } catch (e) {
          this.errors.push(e);
        }
      }
    },
  },
};
</script>

<style scoped>
.title {
  color: white;
  font-size: 30px;
  margin-top: 30px;
}
.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 6px;
}
.menu-items > * {
  margin-top: 60px;
}
.side-btn {
  border: none;
  padding: 16px 0px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background-color: transparent;
}
.side-btn:focus {
  outline: none;
}
.side-btn.active {
  position: relative;
  background-color: #222222;
  color: white;
  font-weight: 600;
  margin-left: 10px;
  border-radius: 30px 0 0 30px;
}
.side-btn.active::before {
  top: -30px;
}
.side-btn.active::after {
  bottom: -30px;
}
.side-btn.active::before,
.side-btn.active::after {
  position: absolute;
  content: "";
  right: 0;
  height: 30px;
  width: 30px;
  background-color: #222222;
}
.side-btn.active .link-container::before {
  top: -60px;
}
.side-btn.active .link-container::after {
  bottom: -60px;
  z-index: 99;
}
.side-btn.active .link-container::before,
.side-btn.active .link-container::after {
  position: absolute;
  content: "";
  right: 0px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: teal;
}
</style>

<template>
  <div id="home">
    <header class="text-center mb-10 text-3xl font-extrabold">STOCKS</header>
    <StocksTable />
  </div>
</template>

<script>
import StocksTable from "@/components/StocksTable";

export default {
  name: "Home",
  components: {
    StocksTable,
  },
};
</script>

<style scoped>
#home {
  margin: 50px 50px 50px 50px;
  padding: 0px;
  width: 100;
  box-sizing: border-box;
}
</style>

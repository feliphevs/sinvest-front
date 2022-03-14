<template>
  <div id="mystocks">
    <header class="text-center mb-10 text-3xl font-extrabold">
      MINHAS STOCKS
    </header>
    <MyStocksTable />
  </div>
</template>

<script>
// @ is an alias to /src
//import Table from "@/components/Table";
import MyStocksTable from "@/components/MyStocksTable";

export default {
  name: "MyStocks",
  components: {
    MyStocksTable,
  },
};
</script>

<style scoped>
#mystocks {
  margin: 50px 50px 50px 50px;
  padding: 0px;
  width: 100;
  box-sizing: border-box;
}
</style>

<template>
  <div id="mystocks">
    <MyStocksTable />
  </div>
</template>

<script>
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

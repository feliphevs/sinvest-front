<template>
  <div id="home">
    <header class="text-center mb-5 text-3xl font-extrabold">
      Ordens de Venda
    </header>

    <VendasAbertas />

    <VendasFechadas />
  </div>
</template>

<script>
import VendasAbertas from "@/components/VendasAbertas";
import VendasFechadas from "@/components/VendasFechadas";

export default {
  name: "OrdersVenda",
  components: {
    VendasAbertas,
    VendasFechadas,
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

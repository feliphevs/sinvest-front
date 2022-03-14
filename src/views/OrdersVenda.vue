<template>
  <div id="home">
    <header class="text-center mb-10 text-3xl font-extrabold">
      Ordens de Venda
    </header>
    <div>
      <p class="m-5 font-extrabold">ABERTAS</p>
      <VendasAbertas />
    </div>
    <div>
      <p class="m-5 font-extrabold">FECHADAS</p>
      <VendasFechadas />
    </div>
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

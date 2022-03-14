<template>
  <div id="home">
    <header class="text-center mb-10 text-3xl font-extrabold">
      Ordens de Compra
    </header>
    <div>
      <p class="m-5 font-extrabold">ABERTAS</p>
      <ComprasAbertas />
    </div>
    <div>
      <p class="m-5 font-extrabold">FECHADAS</p>
      <ComprasFechadas />
    </div>
  </div>
</template>

<script>
import ComprasAbertas from "@/components/ComprasAbertas";
import ComprasFechadas from "@/components/ComprasFechadas";

export default {
  name: "OrdersCompra",
  components: {
    ComprasAbertas,
    ComprasFechadas,
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

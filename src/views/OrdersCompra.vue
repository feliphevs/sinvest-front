<template>
  <div id="home">
    <header class="text-center mb-5 text-3xl font-extrabold">
      Ordens de Compra
    </header>

    <ComprasAbertas />

    <ComprasFechadas />
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

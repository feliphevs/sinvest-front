<template>
  <!-- component -->
  <div class="container">
    <table class="w-full divide-y divide-gray-200 text-center">
      <caption class="m-5 font-extrabold">
        FECHADAS
      </caption>
      <thead class="bg-gray-800 flex text-white w-full">
        <tr class="flex w-full divide-x font-bold">
          <th id="orderId" class="p-5 w-1/4">Order ID</th>
          <th id="stockId" class="p-5 w-1/4">Stock ID</th>
          <th id="stockSymbol" class="p-5 w-1/4">Stock Symbol</th>
          <th id="stockName" class="p-5 w-1/4">Stock Name</th>
          <th id="volume" class="p-5 w-1/4">Volume</th>
          <th id="volumeRemaining" class="p-5 w-1/4">Volume Comprado</th>
          <th id="price" class="p-5 w-1/4">Preço</th>
          <th id="abertura" class="p-5 w-1/4">Abertura</th>
          <th id="fechamento" class="p-5 w-1/4">Fechamento</th>
        </tr>
      </thead>
      <!-- Remove the nasty inline CSS fixed height on production and replace it with a CSS class — this is just for demonstration purposes! -->
      <tbody
        class="bg-gray-600 flex flex-col items-center overflow-y-scroll w-full divide-y divide-gray-200"
        style="height: 25vh"
      >
        <tr
          class="flex w-full text-center"
          v-for="order in ordersCompra"
          :key="order.orderId"
        >
          <td class="p-5 w-1/4">{{ order.orderId }}</td>
          <td class="p-5 w-1/4">{{ order.stockId }}</td>
          <td class="p-5 w-1/4">{{ order.stockSymbol }}</td>
          <td class="p-5 w-1/4">{{ order.stockName }}</td>
          <td class="p-5 w-1/4">{{ order.volume }}</td>
          <td class="p-5 w-1/4">{{ order.volume - order.volumeRemaining }}</td>
          <td class="p-5 w-1/4">{{ order.price }}</td>
          <td class="p-5 w-1/4">{{ order.createdOn }}</td>
          <td class="p-5 w-1/4">{{ order.updatedOn }}</td>
        </tr>
        <tr class="w-full"></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ComprasFechadas",
  data() {
    return {
      ordersCompra: [],
      created: "",
      updated: "",
      erro: "",
    };
  },
  methods: {
    async getComprasFechadas() {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();
        let user = await this.$auth.getUser();

        try {
          let response = await this.$axios.get(
            `http://localhost:8081/userorders/compras/fechadas?email=${user.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          for (var key in response.data) {
            var dateCreated = new Date(response.data[key].createdOn);
            var dateUpdated = new Date(response.data[key].updatedOn);

            this.created =
              ("0" + dateCreated.getUTCDate()).slice(-2) +
              "/" +
              ("0" + (dateCreated.getUTCMonth() + 1)).slice(-2) +
              "/" +
              dateCreated.getUTCFullYear();
            this.updated =
              ("0" + dateUpdated.getUTCDate()).slice(-2) +
              "/" +
              ("0" + (dateUpdated.getUTCMonth() + 1)).slice(-2) +
              "/" +
              dateUpdated.getUTCFullYear();

            this.ordersCompra.push({
              orderId: response.data[key].id,
              stockId: response.data[key].idStock,
              stockSymbol: response.data[key].stockSymbol,
              stockName: response.data[key].stockName,
              volume: response.data[key].volume,
              volumeRemaining: response.data[key].volumeRemaining,
              price: response.data[key].price.toFixed(2),
              createdOn: this.created,
              updatedOn: this.updated,
            });
          }
        } catch (error) {
          this.erro = `${error}`;
        }
      }
    },
  },
  created() {
    this.getComprasFechadas();
  },
};
</script>

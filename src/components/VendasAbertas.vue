<template>
  <!-- component -->
  <div class="container">
    <table class="w-full divide-y divide-gray-200 text-center">
      <caption class="m-5 font-extrabold">
        ABERTAS
      </caption>
      <thead class="bg-gray-800 flex text-white w-full">
        <tr class="flex w-full divide-x">
          <th class="p-5 w-1/4">Order ID</th>
          <th class="p-5 w-1/4">Stock ID</th>
          <th class="p-5 w-1/4">Stock Symbol</th>
          <th class="p-5 w-1/4">Stock Name</th>
          <th class="p-5 w-1/4">Volume</th>
          <th class="p-5 w-1/4">Volume Restante</th>
          <th class="p-5 w-1/4">Preço</th>
          <th class="p-5 w-1/4">Abertura</th>
          <th class="p-5 w-1/4"></th>
        </tr>
      </thead>

      <tbody
        class="bg-gray-600 flex flex-col items-center overflow-y-scroll w-full divide-y divide-gray-200"
        style="height: 25vh"
      >
        <tr
          class="flex w-full text-center"
          v-for="order in ordersVenda"
          :key="order.id"
        >
          <td class="p-5 w-1/4">{{ order.id }}</td>
          <td class="p-5 w-1/4">{{ order.idStock }}</td>
          <td class="p-5 w-1/4">{{ order.stockSymbol }}</td>
          <td class="p-5 w-1/4">{{ order.stockName }}</td>
          <td class="p-5 w-1/4">{{ order.volume }}</td>
          <td class="p-5 w-1/4">{{ order.volumeRemaining }}</td>
          <td class="p-5 w-1/4">{{ order.price }}</td>
          <td class="p-5 w-1/4">{{ order.createdOn }}</td>
          <button class="p-5 w-1/4" @click="fecharOrderModal(order)">
            <span
              class="px-5 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 hover:bg-red-300 text-red-800"
            >
              FECHAR
            </span>
          </button>
        </tr>
        <tr class="w-full"></tr>
      </tbody>
    </table>

    <!-- modal de fechamento -->
    <div
      v-show="showModal"
      id="fechamentoModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700">
          <!-- Modal body -->
          <div class="p-6 space-y-6 text-black">
            <table class="w-full divide-y divide-gray-200 text-center">
              <caption
                class="text-xl font-semibold text-black lg:text-2xl dark:text-white mb-5"
              >
                FECHAR ORDEM DE VENDA
              </caption>
              <thead class="bg-gray-800 flex text-white w-full">
                <tr class="flex w-full divide-x justify-center">
                  <th class="p-5 w-4/4">ORDEM DE VENDA Nº {{ orderId }}</th>
                </tr>
              </thead>
              <tbody
                class="bg-gray-600 flex flex-col items-center text-white w-full divide-y divide-gray-200"
              >
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Abertura
                  </td>
                  <td class="p-5 w-2/4">{{ abertura }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Stock Symbol
                  </td>
                  <td class="p-5 w-2/4">{{ symbol }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Stock Name
                  </td>
                  <td class="p-5 w-2/4">{{ name }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Volume
                  </td>
                  <td class="p-5 w-2/4">{{ volume }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Preço
                  </td>
                  <td class="p-5 w-2/4">{{ preco }}</td>
                </tr>

                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Valor Total
                  </td>
                  <td class="p-5 w-2/4">{{ (volume * preco).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 text-black"
          >
            <p class="text-xl">Deseja fechar a Ordem de Venda?</p>
          </div>

          <!-- Modal footer -->
          <div
            class="flex justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
          >
            <button
              @click="fecharOrder()"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Fechar Ordem
            </button>
            <button
              @click="fechaModal()"
              type="button"
              class="text-black bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-md font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- confirmacao de fechamento -->
    <div
      v-show="showOkBox"
      id="okModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700">
          <!-- Modal body -->
          <div class="p-6 space-y-6 text-black">
            <table class="w-full divide-y divide-gray-200 text-center">
              <caption
                class="text-xl font-semibold text-black lg:text-2xl dark:text-white mb-5"
              >
                FECHAR ORDEM DE VENDA
              </caption>
              <thead class="bg-gray-800 flex text-white w-full">
                <tr class="flex w-full divide-x justify-center">
                  <th class="p-5 w-4/4">ORDEM DE VENDA Nº {{ orderId }}</th>
                </tr>
              </thead>
              <tbody
                class="bg-gray-600 flex flex-col items-center text-white w-full divide-y divide-gray-200"
              >
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Fechamento
                  </td>
                  <td class="p-5 w-2/4">{{ fechamento }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Stock Symbol
                  </td>
                  <td class="p-5 w-2/4">{{ symbol }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Stock Name
                  </td>
                  <td class="p-5 w-2/4">{{ name }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Volume
                  </td>
                  <td class="p-5 w-2/4">{{ volume }}</td>
                </tr>
                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Preço
                  </td>
                  <td class="p-5 w-2/4">{{ preco }}</td>
                </tr>

                <tr class="flex w-full text-center">
                  <td
                    class="p-5 w-2/4 bg-gray-800 flex text-white justify-center font-semibold"
                  >
                    Valor Total
                  </td>
                  <td class="p-5 w-2/4">{{ (volume * preco).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 text-black"
          >
            <p class="text-xl">Ordem de Venda fechada!</p>
          </div>

          <!-- Modal footer -->
          <div
            class="flex justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
          >
            <button
              @click="
                limparVendasAbertas();
                getVendasAbertas();
                fechaModal();
              "
              type="button"
              class="text-black bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-md font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VendasAbertas",
  data() {
    return {
      orderVenda: null,
      showModal: false,
      showOkBox: false,
      ordersVenda: [],
      orderId: 0,
      symbol: "",
      name: "",
      volume: 0,
      preco: (0).toFixed(2),
      created: "",
      updated: "",
      erro: "",
      abertura: "",
      fechamento: "",
    };
  },
  methods: {
    fechaModal() {
      this.showOkBox = false;
      this.showModal = false;
    },

    limparVendasAbertas() {
      this.ordersVenda = [];
    },

    fecharOrderModal(order) {
      this.orderCompra = order;
      this.orderId = this.orderCompra.id;
      this.abertura = this.orderCompra.createdOn;
      this.symbol = this.orderCompra.stockSymbol;
      this.name = this.orderCompra.stockName;
      this.volume = this.orderCompra.volume;
      this.preco = this.orderCompra.price;
      this.showModal = !this.showModal;
    },

    async fecharOrder() {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();

        try {
          let response = await this.$axios.put(
            `http://localhost:8081/userorders/fechar/${this.orderId}`,
            {},
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          this.orderId = response.data.id;
          this.symbol = response.data.stockSymbol;
          this.name = response.data.stockName;
          this.volume = response.data.volume;
          this.preco = response.data.price.toFixed(2);
          var dateUpdated = new Date(response.data.updatedOn);

          this.fechamento =
            ("0" + dateUpdated.getUTCDate()).slice(-2) +
            "/" +
            ("0" + (dateUpdated.getUTCMonth() + 1)).slice(-2) +
            "/" +
            dateUpdated.getUTCFullYear();

          this.showModal = false;
          this.showOkBox = true;
        } catch (error) {
          this.erro = `${error}`;
        }
      }
    },

    async getVendasAbertas() {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();
        let user = await this.$auth.getUser();

        try {
          let response = await this.$axios.get(
            `http://localhost:8081/userorders/vendas/abertas?email=${user.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          for (var key in response.data) {
            var date = new Date(response.data[key].createdOn);
            this.created =
              ("0" + date.getUTCDate()).slice(-2) +
              "/" +
              ("0" + (date.getUTCMonth() + 1)).slice(-2) +
              "/" +
              date.getUTCFullYear();

            this.ordersVenda.push({
              id: response.data[key].id,
              idUser: response.data[key].idUser,
              idStock: response.data[key].idStock,
              stockSymbol: response.data[key].stockSymbol,
              stockName: response.data[key].stockName,
              volume: response.data[key].volume,
              volumeRemaining: response.data[key].volumeRemaining,
              price: response.data[key].price.toFixed(2),
              createdOn: this.created,
            });
          }
        } catch (error) {
          this.erro = `${error}`;
        }
      }
    },
  },
  created() {
    this.getVendasAbertas();
  },
};
</script>

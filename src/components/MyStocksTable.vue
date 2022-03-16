<template>
  <div class="container">
    <!-- tabela minhas stocks -->
    <table class="w-full divide-y divide-gray-200 text-center">
      <caption class="text-center mb-10 text-3xl font-extrabold">
        MINHAS STOCKS
      </caption>
      <thead class="bg-gray-800 flex text-white w-full">
        <tr class="flex w-full divide-x">
          <th class="p-5 w-1/4">Stock ID</th>
          <th class="p-5 w-1/4">Stock Symbol</th>
          <th class="p-5 w-1/4">Stock Name</th>
          <th class="p-5 w-1/4">Volume</th>
          <th class="p-5 w-1/4"></th>
        </tr>
      </thead>

      <tbody
        class="bg-gray-600 flex flex-col items-center overflow-y-scroll w-full divide-y divide-gray-200"
        style="height: 70vh"
      >
        <tr
          class="flex w-full text-center"
          v-for="stock in userstocks"
          :key="stock.idStock"
        >
          <td class="p-5 w-1/4">{{ stock.idStock }}</td>
          <td class="p-5 w-1/4">{{ stock.stockSymbol }}</td>
          <td class="p-5 w-1/4">{{ stock.stockName }}</td>
          <td class="p-5 w-1/4">{{ stock.volume }}</td>
          <button class="p-5 w-1/4" @click="vendaModal(stock)">
            <span
              class="px-5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 hover:bg-blue-300 text-blue-800"
            >
              VENDER
            </span>
          </button>
        </tr>
        <tr class="w-full"></tr>
      </tbody>
    </table>

    <!-- MODAL DE VENDA -->
    <div
      v-show="showModal"
      id="modalVenda"
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
                VENDA DE STOCK
              </caption>
              <thead class="bg-gray-800 flex text-white w-full">
                <tr class="flex w-full divide-x">
                  <th class="p-5 w-2/4">Stock Symbol</th>
                  <th class="p-5 w-2/4">Stock Name</th>
                </tr>
              </thead>
              <tbody
                class="bg-gray-600 flex flex-col items-center text-white w-full divide-y divide-gray-200"
              >
                <tr class="flex w-full text-center">
                  <td class="p-5 w-2/4">{{ symbol }}</td>
                  <td class="p-5 w-2/4">{{ name }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="text-black">
            <label
              >Quantidade:
              <input
                v-model.number="volume"
                min="0"
                class="px-4 my-5"
                size="7"
                type="number"
            /></label>
          </div>

          <div>
            <form class="text-black">
              <label
                >Preço de Venda:
                <input
                  step="0.01"
                  v-model.number="preco"
                  min="0"
                  class="px-4 my-5"
                  size="7"
                  type="number"
              /></label>
            </form>
          </div>

          <div class="text-black m-4">
            <label>Total da venda: {{ (volume * preco).toFixed(2) }}</label>
          </div>

          <!-- Modal footer -->
          <div
            class="flex justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
          >
            <button
              @click="finalizarVenda()"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Vender
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

    <!-- ok box -->
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
                VENDA DE STOCK
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
                  <td class="p-5 w-2/4">{{ created }}</td>
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
            <p>Ordem de venda recebida pelo sistema!</p>

            <p>Acompanhe suas ordens de venda na aba Ordens de Venda</p>
          </div>

          <!-- Modal footer -->
          <div
            class="flex justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
          >
            <button
              @click="fechaModal()"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
  name: "MyStocksTable",
  data() {
    return {
      userstocks: [],
      showModal: false,
      showOkBox: false,
      stockVenda: null,
      orderId: 0,
      symbol: "",
      name: "",
      volume: 0,
      preco: (0).toFixed(2),
      created: "",
      erro: "",
    };
  },
  methods: {
    async getMyStocks() {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();
        let user = await this.$auth.getUser();

        try {
          let response = await this.$axios.get(
            `http://localhost:8081/userstockbalances/user?email=${user.email}`,
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          for (var key in response.data) {
            this.userstocks.push({
              idUser: response.data[key].idUser,
              idStock: response.data[key].idStock,
              stockSymbol: response.data[key].stockSymbol,
              stockName: response.data[key].stockName,
              volume: response.data[key].volume,
            });
          }
        } catch (error) {
          this.stocks = `${error}`;
        }
      }
    },
    vendaModal(stock) {
      this.stockVenda = stock;
      this.symbol = this.stockVenda.stockSymbol;
      this.name = this.stockVenda.stockName;
      this.showModal = !this.showModal;
    },

    async finalizarVenda() {
      if (this.$root.authenticated) {
        let accessToken = this.$auth.getAccessToken();

        try {
          let response = await this.$axios.post(
            `http://localhost:8081/userorders`,
            {
              idUser: this.stockVenda.idUser,
              idStock: this.stockVenda.idStock,
              stockSymbol: this.stockVenda.stockSymbol,
              stockName: this.stockVenda.stockName,
              volume: this.volume,
              volumeRemaining: this.volume,
              price: this.preco,
              type: 1,
            },
            {
              headers: { Authorization: "Bearer " + accessToken },
            }
          );
          this.orderId = response.data.id;
          this.symbol = response.data.stockSymbol;
          this.name = response.data.stockName;
          this.volume = response.data.volume;
          this.preco = response.data.price.toFixed(2);
          var dateCreated = new Date(response.data.createdOn);
          this.created =
            ("0" + dateCreated.getUTCDate()).slice(-2) +
            "/" +
            ("0" + (dateCreated.getUTCMonth() + 1)).slice(-2) +
            "/" +
            dateCreated.getUTCFullYear();

          this.showModal = false;
          this.showOkBox = true;
        } catch (error) {
          this.erro = `${error}`;
        }
      }
    },

    fechaModal() {
      this.showModal = false;
      this.showOkBox = false;
      this.preco = (0).toFixed(2);
      this.volume = 0;
    },
  },
  created() {
    this.getMyStocks();
  },
};
</script>

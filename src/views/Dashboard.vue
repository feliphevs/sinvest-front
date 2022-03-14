<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  name: "home",
  components: {
    Sidebar,
  },
};
</script>

<style>
.dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: teal;
  height: 100vh;
  width: 100vw;
}
.content {
  overflow-y: auto;
  background-color: #222222;
  border-radius: 10px;
  margin: 20px 20px 20px 0px;
}
</style>

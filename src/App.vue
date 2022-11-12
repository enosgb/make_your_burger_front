<template>
  <div class="principal">
    <Navbar :logo="logo_src" :alt="app_name" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";
import Footer from "./components/Footer/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      logo_src: "./img/logo.png",
      app_name: "Make Your Burguer",
    };
  },
};
</script>

<style src="./App.css">

</style>

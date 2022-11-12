<template>
  <Banner />
  <div class="main-container">
    <h1>Monte o seu burger</h1>
    <BurgerForm />
  </div>
</template>

<script>
import Banner from "@/components/Banner/Banner.vue";
import BurgerForm from "@/components/BurgerForm/BurgerForm.vue";

export default {
  components: {
    Banner,
    BurgerForm,
  },
};
</script>

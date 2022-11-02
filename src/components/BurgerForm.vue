<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form" @submit="createBurger">
        <div class="input-container">
          <label for="name">Nome do cliente:</label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="name"
            placeholder="Digite o seu nome"
          />
        </div>
        <div class="input-container">
          <label for="bread">Escolha o pão:</label>
          <select name="bread" id="bread" v-model="bread">
            <option value="">Selecione o seu pão</option>
            <option v-for="bread in breads" :key="bread.cod" :value="bread.name">
              {{ bread.name }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="meat">Escolha a carne:</label>
          <select name="meat" id="meat" v-model="meat">
            <option value="">Selecione o tipo de carne</option>
            <option v-for="meat in meats" :key="meat.cod" :value="meat.name">
              {{ meat.name }}
            </option>
          </select>
        </div>
        <div id="optinal-container" class="input-container">
          <label id="optional-title" for="optional"
            >Selecione os opcionais:</label
          >
          <div
            class="checkbox-container"
            v-for="opt in optionalData"
            :key="opt.cod"
          >
            <input
              type="checkbox"
              name="optional"
              id="optional"
              v-model="optional"
              :value="opt.name"
            />
            <span>{{ opt.name }}</span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" value="Create Burger!" class="submit-btn" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "BurgerForm",
  data() {
    return {
      breads: null,
      meats: null,
      optionalData: null,
      name: null,
      bread: null,
      meat: null,
      optional: [],
      msg: null,
    };
  },
  methods: {
    async getIngredients() {
      const req1 = await fetch("https://make-your-burger-api.herokuapp.com/ingredients/?type=Pão")
        .then((result) => result.json())
        .then((paes) => (this.breads = paes));

        const req2 = await fetch("https://make-your-burger-api.herokuapp.com/ingredients/?type=Carne")
        .then((result) => result.json())
        .then((paes) => (this.meats = paes));

        const req3 = await fetch("https://make-your-burger-api.herokuapp.com/ingredients/?type=Opcionais")
        .then((result) => result.json())
        .then((paes) => (this.optionalData = paes));  
    },
    async createBurger(e) {
      e.preventDefault();

      const data = {
        name: this.name,
        meat: this.meat,
        bread: this.bread,
        optional: Array.from(this.optional),
        status: "Solicitado",
      };

      const dataJson = JSON.stringify(data);

      const req = await fetch("https://make-your-burger-api.herokuapp.com/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      const res = await req.json();

      this.msg = `Pedido do cliente ${this.name} realizado com sucesso`;

      setTimeout(() => (this.msg = ""), 3000);

      this.name = "";
      this.meat = "";
      this.bread = "";
    },
  },
  mounted() {
    this.getIngredients();
  },
  components: {
    Message,
  },
};
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#optinal-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#optinal-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
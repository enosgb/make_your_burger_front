import Message from "../Message/Message.vue";

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
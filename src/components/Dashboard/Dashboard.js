import Message from "../Message/Message.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
      msg: null,
    };
  },
  components: {
    Message,
  },
  methods: {
    async getBurgers() {
      const req = await fetch("https://make-your-burger-api.herokuapp.com/burgers");

      const data = await req.json();

      this.burgers = data;
      this.getStatus();
    },
    async getStatus() {
      const req = await fetch("https://make-your-burger-api.herokuapp.com/status");

      const data = await req.json();

      this.status = data;
    },
    async deleteBurger(id) {
      const req = await fetch(`https://make-your-burger-api.herokuapp.com/burgers/${id}`, {
        method: "DELETE",
      });

      const res = await req.json();

      this.msg = `Pedido cancelado com sucesso!`;

      setTimeout(() => (this.msg = ""), 3000);

      this.getBurgers();
    },
    async updateBurger(event, id) {
      const option = event.target.value;

      for (let i = 0; i < this.burgers.length; i++) {
        if (this.burgers[i]._id == id) {
          const data = {
            name: this.burgers[i].name,
            meat: this.burgers[i].meat,
            bread: this.burgers[i].bread,
            optional: Array.from(this.burgers[i].optional),
            status: option,
          };
          const dataJson = JSON.stringify(data);
          const req = await fetch(`https://make-your-burger-api.herokuapp.com/burgers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: dataJson,
          });

          const res = await req.json();

          this.msg = `status do pedido N ${id} foi atualizado para ${option}!`;

          setTimeout(() => (this.msg = ""), 3000);
          break;
        }
      }
    },
  },
  mounted() {
    this.getBurgers();
  },
};
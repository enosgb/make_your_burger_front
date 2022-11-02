<template>
  <div id="burger-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.name }}</div>
        <div>{{ burger.bread }}</div>
        <div>{{ burger.meat }}</div>
        <div>
          <ul>
            <li v-for="(optional, index) in burger.optional" :key="index">
              {{ optional }}
            </li>
          </ul>
        </div>
        <div>
          <select
            name="status"
            class="status"
            @change="updateBurger($event, burger._id)"
          >
            <option value="">Selecione</option>
            <option
              v-for="s in status"
              :key="s.cod"
              :value="s.status"
              :selected="burger.status == s.status"
            >
              {{ s.status }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger._id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
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
</script>

<style scoped>
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
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

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
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

<script src="./Dashboard.js">
</script>

<style src="./Dashboard.css" scoped>

</style>
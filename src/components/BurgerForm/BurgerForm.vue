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

<script src="./BurgerFrom.js">

</script>

<style src="./BurgerForm.css" scoped>

</style>
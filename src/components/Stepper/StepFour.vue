<script>
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import Hexagon from "@components/Loading/Hexagon.vue";

export default {
  components: { Hexagon },
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    const showLoading = ref(false);

    const previousStep = () => {
      emit("previousStep");
    };

    const submit = async () => {
      try {
        showLoading.value = true;

        const response = await fetch("http://localhost:300/registration", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props.data),
        });

        showLoading.value = false;

        notify({
          text: "Formulário cadastrado com sucesso.",
          title: "Sucesso!",
          type: "success",
          duration: 10000,
        });

        emit("submitSuccess");
      } catch (error) {
        showLoading.value = false;
        notify({
          text: "Erro ao enviar formulário. Por favor, tente novamente.",
          title: "Error!",
          type: "error",
          duration: 10000,
        });
      }
    };

    return {
      previousStep,
      submit,
      showLoading,
    };
  },
};
</script>

<template>
  <hexagon v-if="showLoading"></hexagon>
  <h3>Revise suas informações</h3>
  <label>Endereço de e-mail</label>
  <input type="email" id="email" class="textInput" :value="data.email" />

  <div v-show="data.name">
    <label>Nome</label>
    <input type=" text" class="textInput" :value="data.name" />
  </div>

  <div v-show="data.reasonSocial">
    <label>Razão Social</label>
    <input type="text" class="textInput" :value="data.reasonSocial" />
  </div>

  <div v-show="data.cpf">
    <label>CPF</label>
    <input type="text" class="textInput" :value="data.cpf" />
  </div>

  <div v-show="data.cnpj">
    <label>CNPJ</label>
    <input type="text" class="textInput" :value="data.cnpj" />
  </div>

  <div v-show="data.birthDate">
    <label>Data de nascimento</label>
    <input type="text" class="textInput" :value="data.birthDate" />
  </div>

  <div v-show="data.openingDate">
    <label>Data de abertura</label>
    <input type="text" class="textInput" :value="data.openingDate" />
  </div>

  <label>Telefone</label>
  <input type="text" class="textInput" :value="data.phone" />

  <label>Senha</label>
  <input type="password" class="textInput" :value="data.password" />

  <div class="btnContainer mt-2">
    <button class="btn-border-warning" @click="previousStep">Voltar</button>
    <button class="btn-warning" @click="submit">Cadastrar</button>
  </div>
</template>

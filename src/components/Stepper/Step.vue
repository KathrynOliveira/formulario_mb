<script>
import { ref } from "vue";

export default {
  props: {
    type: String,
  },
  setup(props, { emit }) {
    const type = ref("pf");
    const email = ref("");
    const errors = ref({});

    const emitData = () => {
      emit("stepData", {
        email: email.value,
        type: type.value,
      });
    };
    const nextStep = () => {
      emit("nextStep");
      emitData();
    };
    const previousStep = () => {
      emit("previousStep");
      emitData();
    };

    const validate = () => {
      errors.value = {};
      if (!email.value) {
        errors.value["email"] = "O e-mail é obrigatório.";
      } else if (!validEmail(email.value)) {
        errors.value["email"] = "Utilize um e-mail válido.";
      } else {
        nextStep();
      }
    };

    const validEmail = (email) => {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    return {
      type,
      email,
      errors,
      emitData,
      nextStep,
      previousStep,
      validate,
    };
  },
};
</script>

<template>
  <h3>Seja bem vindo(a)</h3>
  <label>Endereço de e-mail</label>
  <input type="email" id="email" class="textInput" v-model="email" />
  <p v-if="errors && errors['email']" class="text-danger mb-3">
    {{ errors["email"] }}
  </p>
  <div class="radioGroup">
    <input type="radio" id="pf" value="pf" v-model="type" />
    <label for="pf">Pessoa Física</label>
    <input type="radio" id="pj" value="pj" v-model="type" />
    <label for="pj">Pessoa Jurídica</label>
  </div>
  <button class="btn-warning mt-2" @click="validate">Continuar</button>
</template>

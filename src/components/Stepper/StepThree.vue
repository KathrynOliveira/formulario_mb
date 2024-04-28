<script>
import { ref } from "vue";

export default {
  setup(props, { emit }) {
    const password = ref("");
    const errors = ref({});

    const emitData = () => {
      emit("stepThreeData", {
        password: password.value,
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
      if (!password.value) {
        errors.value["password"] = "A senha é obrigatória.";
      } else {
        const passwordError = validPassword(password.value);
        if (passwordError) {
          errors.value["password"] = passwordError;
        } else {
          nextStep();
        }
      }
    };
    const validPassword = (password) => {
      // Verifica se a senha tem pelo menos 8 caracteres
      if (password.length < 8) {
        return "A senha precisa ter no mínimo 8 caracteres";
      }
      // Verifica se a senha contém pelo menos uma letra maiúscula
      const uppercaseRegex = /[A-Z]/;
      if (!uppercaseRegex.test(password)) {
        return "A senha precisa ter uma letra maíuscula";
      }
      // Verifica se a senha contém pelo menos um caractere especial
      const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialCharsRegex.test(password)) {
        return "A senha precisa ter um caracter especial";
      }
      return;
    };

    return {
      password,
      errors,
      validate,
      nextStep,
      previousStep,
    };
  },
};
</script>

<template>
  <h3>Senha de acesso</h3>
  <label>Sua senha</label>
  <input type="password" class="textInput" v-model="password" />
  <p v-if="errors && errors['password']" class="text-danger mb-3">
    {{ errors["password"] }}
  </p>
  <div class="btnContainer mt-2">
    <button class="btn-border-warning" @click="previousStep">Voltar</button>
    <button class="btn-warning" @click="validate">Continuar</button>
  </div>
</template>

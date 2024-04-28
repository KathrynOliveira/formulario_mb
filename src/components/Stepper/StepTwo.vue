<script>
import { ref } from "vue";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props: {
    type: String,
  },
  setup(props, { emit }) {
    const step = ref(2);
    const name = ref("");
    const cpf = ref("");
    const birthDate = ref("");
    const phone = ref("");
    const reasonSocial = ref("");
    const cnpj = ref("");
    const openingDate = ref("");
    const errors = ref({});

    const emitData = () => {
      emit("stepTwoData", {
        name: name.value,
        cpf: cpf.value,
        birthDate: birthDate.value,
        phone: phone.value,
        reasonSocial: reasonSocial.value,
        cnpj: cnpj.value,
        openingDate: openingDate.value,
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

    const validate = function () {
      errors.value = {};

      if (props.type === "pf") {
        validatePhone();
        validatePerson();
      } else if (props.type === "pj") {
        validatePhone();
        validateCompany();
      }

      if (Object.keys(errors.value).length === 0) {
        nextStep();
      }
    };

    const validatePhone = () => {
      if (!phone.value) {
        errors.value["phone"] = "O telefone é obrigatório.";
      }
    };

    const validatePerson = () => {
      if (!name.value) {
        errors.value["name"] = "O nome é obrigatório.";
      }
      if (!cpf.value) {
        errors.value["cpf"] = "O CPF é obrigatório.";
      }
      if (!birthDate.value) {
        errors.value["birthDate"] = "A data de nascimento é obrigatória.";
      }
    };

    const validateCompany = () => {
      if (!reasonSocial.value) {
        errors.value["reasonSocial"] = "A razão social é obrigatória.";
      }
      if (!cnpj.value) {
        errors.value["cnpj"] = "O CNPJ é obrigatório.";
      }
      if (!openingDate.value) {
        errors.value["openingDate"] = "A data de abertura é obrigatória.";
      }
    };
    return {
      name,
      cpf,
      birthDate,
      phone,
      reasonSocial,
      cnpj,
      openingDate,
      errors,
      validate,
      emitData,
      nextStep,
      previousStep,
    };
  },
};
</script>

<template>
  <div v-if="type === 'pf'">
    <h3>Pessoa Física</h3>
    <label>Nome</label>
    <input type=" text" class="textInput" v-model="name" />
    <p v-if="errors && errors['name']" class="text-danger mb-3">
      {{ errors["name"] }}
    </p>
    <label>CPF</label>
    <input
      type="text"
      class="textInput"
      v-model="cpf"
      v-mask="'###.###.###-##'"
    />
    <p v-if="errors && errors['cpf']" class="text-danger mb-3">
      {{ errors["cpf"] }}
    </p>
    <label>Data de nascimento</label>
    <input
      type="text"
      class="textInput"
      v-model="birthDate"
      v-mask="'##/##/####'"
    />
    <p v-if="errors && errors['birthDate']" class="text-danger mb-3">
      {{ errors["birthDate"] }}
    </p>
  </div>
  <div v-else>
    <h3>Pessoa Jurídica</h3>
    <label>Razão Social</label>
    <input type="text" class="textInput" v-model="reasonSocial" />
    <p v-if="errors && errors['reasonSocial']" class="text-danger mb-3">
      {{ errors["reasonSocial"] }}
    </p>
    <label>CNPJ</label>
    <input
      type="text"
      class="textInput"
      v-model="cnpj"
      v-mask="'##.###.###/####-##'"
    />
    <p v-if="errors && errors['cnpj']" class="text-danger mb-3">
      {{ errors["cnpj"] }}
    </p>
    <label>Data de abertura</label>
    <input
      type="text"
      class="textInput"
      v-model="openingDate"
      v-mask="'##/##/####'"
    />
    <p v-if="errors && errors['openingDate']" class="text-danger mb-3">
      {{ errors["openingDate"] }}
    </p>
  </div>
  <label>Telefone</label>
  <input
    type="text"
    class="textInput"
    v-model="phone"
    v-mask="['(##)#####-####', '(##)####-####']"
  />
  <p v-if="errors && errors['phone']" class="text-danger mb-3">
    {{ errors["phone"] }}
  </p>
  <div class="btnContainer mt-2">
    <button class="btn-border-warning" @click="previousStep">Voltar</button>
    <button class="btn-warning" @click="validate">Continuar</button>
  </div>
</template>

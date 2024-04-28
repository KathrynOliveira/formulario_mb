<script>
import { ref, reactive } from "vue";
import Step from "@components/Stepper/Step.vue";
import StepTwo from "@components/Stepper/StepTwo.vue";
import StepThree from "@components/Stepper/StepThree.vue";
import StepFour from "@components/Stepper/StepFour.vue";

export default {
  components: {
    Step,
    StepTwo,
    StepThree,
    StepFour
  },

  setup() {
    const step = ref(1);
    const errors = ref({});
    const dataSet = reactive({
      email: "",
      type: "",
      name: "",
      cpf: "",
      birthDate: "",
      phone: "",
      reasonSocial: "",
      cnpj: "",
      openingDate: "",
      password: "",
    });

    const nextStep = () => {
      step.value++;
    };

    const previousStep = () => {
      step.value--;
    };

    const handleStepData = (data) => {
      dataSet.email = data.email;
      dataSet.type = data.type;
    }

    const handleStepTwoData = (data) => {
      dataSet.name = data.name;
      dataSet.cpf = data.cpf;
      dataSet.birthDate = data.birthDate;
      dataSet.phone = data.phone;
      dataSet.reasonSocial = data.reasonSocial;
      dataSet.cnpj = data.cnpj;
      dataSet.openingDate = data.openingDate;
    };

    const handleStepThreeData = (data) => {
      dataSet.password = data.password;
    };

    const saveSuccess = () => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    };

    return {
      step,
      dataSet,
      errors,
      nextStep,
      previousStep,
      handleStepData,
      handleStepTwoData,
      handleStepThreeData,
      saveSuccess
    };
  },
};
</script>

<template>
  <div class="wrapper-home">
    <div class="container">
        <h6> Etapa <span class="text-orange">{{ step }}</span> de 4</h6>
        <div v-show="step === 1">
          <Step 
            @stepData="handleStepData"
            @nextStep="nextStep"
            @previousStep="previousStep"
          />
        </div>
        <div v-show="step === 2">
          <StepTwo
            :type="dataSet.type"
            @stepTwoData="handleStepTwoData"
            @nextStep="nextStep"
            @previousStep="previousStep"
          />
        </div>
        <div v-show="step === 3" class="w-100">
          <StepThree
            @stepThreeData="handleStepThreeData"
            @nextStep="nextStep"
            @previousStep="previousStep"
          />
        </div>
        <div v-show="step === 4">
          <StepFour
            :data="dataSet"
            @previousStep="previousStep"
            @submitSuccess="saveSuccess"
          />
        </div>
      </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

import ShowCompanys from './showCompanys.vue';
import ShowTeachers from './showTeachers.vue';
import UserProfile from './userProfile.vue';
import CompanyProfile from './companyProfile.vue';
import LastAnnotations from './lastAnnotations.vue';

const props = defineProps({
  section: {
    type: String,
    required: true,
  },
});

</script>
<template>
        <section class="main">

                <section class="data">
                  <ShowCompanys v-if="props.section == 'empresas'" />
                  <ShowTeachers v-if="props.section=='profesores'" />
                  <UserProfile v-if="props.section=='perfil'" />
                  <CompanyProfile v-if="props.section=='empresa'" />
                  <LastAnnotations v-if="props.section=='dashboard'" />
                </section>

               </section>
</template>
<style scoped>
        section.main{
            height: 100%;
        }

        section.data{
            height: 100%;
            width: 100%;

            display: flex;
            flex-direction: column;
        }

</style>

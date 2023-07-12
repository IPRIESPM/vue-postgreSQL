<template>
    <section class="loading" v-if="loading">
        Cargando empresa
        <div class="loading"></div>
    </section>
    <section v-else>
        <h1> {{ profile.nombre }}</h1>
        <p><font-awesome-icon :icon="['fas', 'building']" />
            {{ profile.direccion }}  {{ profile.localidad }}, {{ profile.comunidad }}</p>
        <p class="encargado">
            <span>
                <font-awesome-icon :icon="['fas', 'mobile']" /> {{ profile.telefono }}
            </span>
            <span>
                <font-awesome-icon :icon="['fas', 'user-graduate']" /> {{ profile.nombre_profesor }}
            </span>
        </p>

        <section class="contacts">
            <h2>Contactos</h2>
            <ul v-if="contacts">
                <li v-for="contact in contacts" :key="contact.n">
                    <p>{{ contact.nombre }}</p>
                    <p>{{ contact.email }}</p>
                    <p>{{ contact.telefono }}</p>
                </li>
            </ul>
            <section v-else>No hay contactos</section>
        </section>
        <section class="puestos">
            <h2>Puestos</h2>
            <ul v-if="puestos">
                <li v-for="puesto in puestos" :key="puesto.cod">
                    <p>{{ puesto.nombre }}</p>
                    <p>{{ puesto.descripcion }}</p>
                    <p>{{ puesto.requisitos }}</p>
                </li>
            </ul>
            <section v-else>No hay puestos</section>
        </section>
    </section>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import companyStore from '../../store/perfilEmpresa';
import companyProfile from '../../controllers/api/companyProfile';

const router = useRouter();
const companyStored = companyStore();

const selectedCompany = ref('');
const rawData = ref('');
const profile = ref('');
const contacts = ref('');
const puestos = ref('');

const loading = ref(true);

const getCompanyProfile = async () => {
  const profileApi = await companyProfile(companyStored.getEmpresaSelected);
  rawData.value = profileApi;
  profile.value = profileApi.empresa;
  contacts.value = profileApi.contactos;
  puestos.value = profileApi.puestos;
};

onBeforeMount(() => {
  if (companyStored.getEmpresaSelected === '') {
    router.push({ name: 'empresas' });
  }
});

onMounted(async () => {
  if (companyStored.getEmpresaSelected !== '') {
    loading.value = true;
    selectedCompany.value = companyStored.getEmpresaSelected;
    await getCompanyProfile();
    loading.value = false;
  }
});
</script>
<style scoped>
    section.loading{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        height: 100%
    }
    p.encargado{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>

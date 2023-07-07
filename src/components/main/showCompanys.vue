<template>
    <section class="loading" v-if="loading">
        Cargando <div class="loading"></div>
    </section>
    <section class="tableData" v-else-if="localData.length > 0">
        <table>
            <thead>
                <tr>
                    <th>Empresa</th>
                    <th>Contacto</th>
                    <th>Localidad</th>
                    <th>Vacantes</th>
                    <th>Puestos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="company in localData" :key="company.id">
                    <td>{{ company.nombre }}</td>
                    <td>-</td>
                    <td>{{ company.localidad }}</td>
                    <td>{{ company.vacantes }}</td>
                    <td>{{ company.puestos }}</td>
                </tr>
            </tbody>
        </table>
    </section>
    <div class="noData" v-else>
        <p>No hay datos</p>
    </div>

    <section class="modal" :class="{ 'is-active': newData }" v-if="newData">
        <form class="test" @submit="onSubmit">

            <h3>Nueva Empresa</h3>
            <section class="container">
            <section class="personal">
                <fieldset>
                    <label for="cif">Cif</label>
                    <input type="text" name="cif" id="cif" placeholder="A12345678" required>
                </fieldset>
                <fieldset>
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" placeholder="Teralco" required>
                </fieldset>
                <fieldset>
                    <label for="telefono">Telefono</label>
                    <input
                        type="tel"
                        name="telefono"
                        id="telefono"
                        placeholder="965331234"
                    required>
                </fieldset>
            </section>
            <section class="contact">
                <fieldset>
                    <label for="direccion">Direccion</label>
                    <input type="text" name="direccion" id="direccion" placeholder="calle" required>
                </fieldset>
                <fieldset>
                    <label for="localidad">Localidad</label>
                    <input type="text" name="localidad" id="localidad" placeholder="Alcoy" required>
                </fieldset>
                <fieldset>
                    <label for="comunidad">Comunidad</label>
                    <input
                        type="text"
                        name="comunidad"
                        id="comunidad"
                        placeholder="Alicante"
                    required>
                </fieldset>

            </section>
            <section class="buttons">
                <input type="submit" value="Crear">
            </section>
            </section>
        </form>
        <button type="button" class="add variant" @click="buttonAdd">
            <font-awesome-icon v-if="newData" :icon="['fas', 'minus']" />
            <font-awesome-icon v-else :icon="['fas', 'plus']" />
        </button>
</section>

<button type="button" class="add" @click="buttonAdd">
  <font-awesome-icon v-if="newData" :icon="['fas', 'minus']" />
  <font-awesome-icon v-else :icon="['fas', 'plus']" />
</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import getAllData from '../../controllers/data';
import addLocalStorage from '../../controllers/localStorage';
import { newCompany } from '../../controllers/api/companys';

const loading = ref(true);
const localData = ref([]);
const newData = ref(false);

async function updateData(data) {
  const { datos } = await getAllData('companys');
  localData.value = datos;
  console.log('Los datos son: ', datos);
  loading.value = false;
}

onMounted(async () => {
  await updateData();
});

const buttonAdd = () => {
  newData.value = !newData.value;
};

const onSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const responseData = await newCompany(data);
  if (responseData) {
    localData.value.push(responseData);
    addLocalStorage('companys', responseData);
    console.log('Empresa añadida Correctamente', responseData);
    newData.value = false;
  } else {
    console.log('Error al añadir la empresa');
    // marcar el campo que ha fallado

    // mostrar un mensaje de error
  }
};
</script>

<style scoped>
section.tableData {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

section.tableData table thead {
    color: var(--color-text-muted);
    text-align: left;
    margin-bottom: 0.5rem;
    /* Add margin-bottom to create space */
}

table thead th {
    font-weight: inherit;
    border-bottom: 1px solid var(--color-text-muted);
    text-align: left;
}

section.tableData table tbody td {
    color: var(--color-text-muted);
    border-bottom: 1px solid var(--color-text-muted);
}

button.add {
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    width: 50px;
    height: 52px;

    border-radius: 100%;
    outline: none;
    border: none;
}

button.add.variant {
    position: relative;
    top: -180px;
    border-radius: 100%;
    outline: none;
    border: none;
}

section.modal {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

}

section.modal.is-active {
    display: flex;
    justify-content: center;
    align-items: center;
}

form{
        width: max-content;
        padding: 15px;
        background: var(--color-background-soft);

        border: 1px solid black;
        border-radius: 5px;
    }

    section.container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    section.personal,
    section.contact{
        display: flex;
        flex-direction: row;
    }
    section.personal fieldset,
    section.contact fieldset{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    section.buttons{
        display: flex;
        justify-content: space-between;
        align-self: center;
    }

    section.buttons input[type="button"]{
        background-color: aliceblue;
    }
</style>

<script setup>
import {
    newTeacher,
} from '../controllers/api/teachers';


const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const loginData = await newTeacher(data);
    if (loginData) {
        console.log(`Login correcto ${data}`);
    }
};
</script>

<template>
    <section>
        <figure>
            <h1>CRM</h1>
        </figure>
        <form @submit="onSubmit">
            <fieldset>
            <fieldset>
                <label for="dni">DNI del usuario</label>
                <input type="text" name="dni" id="dni" placeholder="11111111T">
            </fieldset>
            <fieldset>
                <label for="password">Contraseña</label>
                <input type="password" name="contrasena" id="password" placeholder="********"  >
            </fieldset>
            <fieldset>
                <label for="nombre">Nombre</label>
                <input type="text" name="nombre" id="nombre" placeholder="Silvia Amorós">
            </fieldset>
            <fieldset>
                <label for="correo">Correo electrónico</label>
                <input type="email" name="correo" id="correo" placeholder="example@example">
            </fieldset>
            <fieldset>
                <label for="telefono">Teléfono</label>
                <input type="tel" name="telefono" id="telefono" placeholder="635535989">
            </fieldset>
        </fieldset>
            <input type="submit" value="Acceder">
        </form>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 22px;

    width: 480px;
    height: min-content;
    padding: 38px 39px;

    background: var(--color-background-soft);
    border-radius: 4px;
}

figure {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
}

fieldset {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 15px;
}
</style>

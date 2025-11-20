<template>
    <div class="card">
        <div class="description">
            <p>{{ descripcion }}</p>
        </div>
        <h3>{{ nombre }}</h3>
        <hr class="division"></hr>
        <div class="boton">
            <button @click="$emit('editar', id)" class="btn editar">
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="rgb(245, 245, 245)" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
            </svg>
            </button>
            <button @click="$emit('eliminar', id)" class="btn eliminar">
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="rgb(245, 245, 245)" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </button>
        </div>
       
    </div>
</template>

<script setup>
    const props = defineProps({
        id: Number,
        nombre: String,
        descripcion: String
    })

    defineEmits(['editar', 'eliminar'])
</script>

<style scoped>
    .card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        break-inside: avoid;
    }

    .card h3 {
        margin-bottom: 1rem;
        color: #333;
    }

    .card p {
        margin-bottom: 0.5rem;
        color: #666;
    }

    .boton{
        display: flex;
        justify-content: end;
        gap: 3px;
    }

    .btn.eliminar{
        background-color: rgb(252, 114, 114);
        border: none;
        border-radius: 10%;
        padding: 2px;
        right: 0;
    }

    .btn.editar{
        background-color: rgb(250, 191, 63);
        border: none;
        border-radius: 10%;
        padding: 2px;
        right: 0;
    }
    .btn.eliminar:hover{
        background-color: rgba(150, 2, 2, 0.74);
        cursor: pointer;
    }

    .btn.editar:hover{
        background-color: rgba(168, 115, 0, 0.856);
        cursor: pointer;
    }

    .division{
        margin-bottom: 10px;
    }

</style>
<template>
  <div class="modal">
    <div class="content-modal">
      <span class="cerrar" @click="emit('close')">&times;</span>
      <h1>CREAR PRODUCTO</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Nombre</label>
          <input 
            v-model="nombreLocal"
            type="text"
            placeholder="Nombre del producto"
            required
          />
        </div>

        <div class="form-group">
          <label>Descripción</label>
          <textarea
            v-model="descripcionLocal"
            type="text"
            placeholder="Descripción"
          />
        </div>

        <button type="submit">
          {{ props.modo === 'editar' ? 'Actualizar Producto' : 'Crear Producto' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
   
    const props = defineProps({
      id: Number,
      nombre: String,
      descripcion: String,
      modo: {
          type: String,
          default: "crear" 
      }
    })
    console.log(props.id)
    const emit = defineEmits(["close", "submit"])

    
    const nombreLocal = ref(props.nombre || "")
    const descripcionLocal = ref(props.descripcion || "")

   
    watch(() => props.nombre, v => nombreLocal.value = v)
    watch(() => props.descripcion, v => descripcionLocal.value = v)

 
    function handleSubmit() {
      emit("submit", {
          id: props.id,
          nombre: nombreLocal.value,
          descripcion: descripcionLocal.value
      })
    }
</script>

<style scoped>
    .modal {
        display: flex;
        position: fixed;
        justify-content: center;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100vmax;
        height: 100vmax;
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    }

    .content-modal {
        position: relative;
        background-color: #fff;
        gap: 5px;;
        height: 30%;
        padding: 20px;
        border-radius: 8px;
        width: 50%;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        margin-top: 10%;
    }


    .cerrar {
        float: right;
        font-size: 24px;
        cursor: pointer;
    }

    .form-group {
      margin-bottom: 1%;
    }

    label {
    display: block;
    margin-bottom: 0.5%;
    color: #555;
    font-weight: 500;
    }

    input {
    width: 100%;
    padding: 0.75%;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
    }

    h1{
      padding-bottom: 10px;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover:not(:disabled) {
      background: #45a049;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    textarea{
      width: 100%;
      height: 30vh;
    }

    @media (max-width: 1400px) {
      *{
        font-size: 14px;
      }
      input{
        font-size: 14px;
      }
      textarea{
        height: 12rem;
        font-size: 14px;
      }

      .modal{
        width: 100%;
        height: 100%;
      }
      .content-modal{
        position: absolut;
        width: 90%;
        height: 53vh;
      }
      button {
        width: 100%;
        padding: 0.4rem;
      }
    }

    @media (max-width: 1024px) {
      *{
        font-size: 14px;
      }
      input{
        font-size: 14px;
      }
      textarea{
        height: 12rem;
        font-size: 14px;
      }

      .modal{
        width: 100%;
        height: 100%;
      }
      .content-modal{
        position: absolut;
        width: 90%;
        height: 53vh;
      }
      button {
        width: 100%;
        padding: 0.4rem;
      }
    }

    @media (max-width: 640px) {
      *{
        font-size: 14px;
      }
      input{
        font-size: 14px;
      }
      textarea{
        height: 12rem;
        font-size: 14px;
      }

      .modal{
        width: 100%;
        height: 100%;
      }
      .content-modal{
        position: absolut;
        width: 90%;
        height: 53vh;
      }
      button {
        width: 100%;
        padding: 0.4rem;
      }
    }
</style>
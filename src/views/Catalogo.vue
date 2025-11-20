<template>
  <div class="catalogo">
    <nav class="navbar">
      <h1>Catalogo</h1>
      <div class="user-info">
        <span>Bienvenido, {{ user?.name }}</span>
        <button @click="mostrarCrear = true" class="btn-crear">Crear Producto</button>
        <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
      </div>
    </nav>

    <div class="content">
      <CardProduct
        v-for="p in productos"
        :key="p.id"
        :id="p.id"
        :nombre="p.nombre"
        :descripcion="p.descripcion"
        @editar="editarProducto"
        @eliminar="eliminarProducto"
      />
    </div>

    <ModalProducto
      v-if="mostrarCrear"
      modo="crear"
      @close="mostrarCrear = false"
      @submit="crearProducto"
    />
    
    <ModalProducto 
      v-if="mostrarEditar"
      modo="editar"
      :id="producto.id"
      :nombre="producto.nombre"
      :descripcion="producto.descripcion"
      @close="mostrarEditar = false"
      @submit="actualizarProducto"
    />
    
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/auth'
import CardProduct from '@/components/CardProduct.vue'
import apiActions from '@/services/api-actions'
import ModalProducto from '@/components/ModalProducto.vue'

const router = useRouter()
const user = ref(null)
const productos = ref([])
const mostrarCrear = ref(false)
const mostrarEditar = ref(false)
const producto = ref({})

onMounted(async () => {
  try {
    user.value = await authService.getUser()
    const response = await apiActions.getProductos();
    
    productos.value = response.data
  } catch (err) {
    console.error(err)
    router.push('/login')
  }
})

async function crearProducto(params){
  try {
    const response = await apiActions.createProductos(params.nombre, params.descripcion)
    productos.value.push(response.data.product)
    mostrarCrear.value = false
  } catch (err) {
    console.error(err)
  }
  
}

async function actualizarProducto(data){
  try {
    const response = await apiActions.updateProducto(data.id, data.nombre, data.descripcion)
    
    productos.value = productos.value.map((p) => {
      return p.id === response.data.product.id ? response.data.product : p
    })

    mostrarEditar.value = false
  } catch (err) {
    console.error(err)
  }
}

function editarProducto(id){
    producto.value = productos.value.find(p => p.id === id)
    mostrarEditar.value = true
}

async function eliminarProducto(id){
  try {
    const response = await apiActions.deleteProductos(id)

    productos.value = productos.value.filter(p => p.id !== id)
  } catch (err) {
    console.error(err)
    router.push('/catalogo')
  }
}

const handleLogout = async () => {
  try {
    await authService.logout()
    router.push('/login')
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.catalogo {
  min-height: 100vh;
  background: #f5f5f5;
}

.navbar {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 {
  color: #333;
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info span {
  color: #666;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #d32f2f;
}

.content {
  padding: 1rem;
  margin: 0 auto;
  max-width: 100%;
  column-count: 4; /* Número de columnas */
  column-gap: 13px;
}

.content > * {
  break-inside: avoid; /* Evita que las tarjetas se corten entre columnas */
  margin-bottom: 16px;
  display: inline-block;
  width: 100%;
}

@media (max-width: 1400px) {
  .content {
    column-count: 3;
  }
}

@media (max-width: 1024px) {
  .content {
    column-count: 2;
  }
}

@media (max-width: 640px) {
  .content {
    column-count: 1;
  }
}

.btn-crear{
  background: #45a049;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  z-index: 2;
}
</style>
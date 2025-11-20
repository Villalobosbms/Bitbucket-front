<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Registro</h2>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            id="name"
            v-model="form.name"
            type="name"
            required
            placeholder="Ingresa el nombre"
          />
        </div>

        <div class="form-group">
          <label for="username">Usuario</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Cargando...' : 'Registrarse' }}
        </button>
      </form>

      <p class="register-link">
        ¿Iniciar session? <router-link to="/Login">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import authService from '@/services/auth';

    const router = useRouter();
    const loading = ref(false);
    const error = ref('');

    const form = ref({
      username: '',
      password: '',
      name: ''
    });

    const handleRegister = async () => {
    loading.value = true;
    error.value = '';

    try {
        await authService.register(form.value);
        router.push('/catalogo');
    } catch (err) {
        error.value = err.message || 'Error al iniciar sesión';
        console.error('Error de login:', err);
    } finally {
        loading.value = false;
    }
    };
</script>

<style scoped>
    .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
    }

    .login-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    }

    h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
    }

    .form-group {
    margin-bottom: 1rem;
    }

    label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
    }

    input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
    }

    input:focus {
    outline: none;
    border-color: #4CAF50;
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

    .error-message {
    background: #ffebee;
    color: #c62828;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
    }

    .register-link {
    text-align: center;
    margin-top: 1rem;
    color: #666;
    }

    .register-link a {
    color: #4CAF50;
    text-decoration: none;
    }

    .register-link a:hover {
    text-decoration: underline;
    }
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

// Default Credentials for Testing
const DEFAULT_USER = 'admin'
const DEFAULT_PASS = 'admin123'

const handleLogin = () => {
  loading.value = true
  errorMsg.value = ''

  // Static Login Logic (Override Backend for ease)
  setTimeout(() => {
    if (username.value === DEFAULT_USER && password.value === DEFAULT_PASS) {
      // Dummy token save kar rahe hain taake frontend ko lage login ho gaya
      sessionStorage.setItem('token', 'dummy-token-for-demo')
      router.push('/admin')
    } else {
      errorMsg.value = 'Invalid credentials! Use admin / admin123'
    }
    loading.value = false
  }, 500)
}
</script>

<template>
  <div class="login-page">
    <Card class="login-card shadow-lg">
      <template #header>
        <div class="login-header">
          <i class="pi pi-lock" style="font-size: 2rem; color: #6366f1"></i>
          <h2>Admin Access</h2>
          <p style="font-size: 0.8rem; color: #94a3b8">Use default creds from README</p>
        </div>
      </template>
      <template #content>
        <div class="form-container">
          <div class="input-wrap">
            <label>Username</label>
            <InputText
              v-value="username"
              v-model="username"
              class="w-full"
              placeholder="admin"
              @keyup.enter="handleLogin"
            />
          </div>

          <div class="input-wrap">
            <label>Password</label>
            <InputText
              v-model="password"
              type="password"
              class="w-full"
              placeholder="admin123"
              @keyup.enter="handleLogin"
            />
          </div>

          <Message v-if="errorMsg" severity="error" class="mb-4">{{ errorMsg }}</Message>

          <Button
            label="Sign In"
            icon="pi pi-sign-in"
            :loading="loading"
            class="w-full signin-btn"
            @click="handleLogin"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-color: #f8fafc;
}
.login-card {
  width: 100%;
  max-width: 380px;
  border-radius: 20px;
  border: none;
  overflow: hidden;
}
.login-header {
  padding: 2.5rem 2rem 1rem;
  text-align: center;
}
.login-header h2 {
  margin: 0.5rem 0 0;
  color: #1e293b;
}
.input-wrap {
  margin-bottom: 1.5rem;
}
.input-wrap label {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.w-full {
  width: 100%;
}
.signin-btn {
  padding: 0.75rem;
  border-radius: 10px;
  background: #6366f1;
}
</style>

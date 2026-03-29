<template>
  <div class="layout-wrapper">
    <nav class="main-nav">
      <div class="nav-content">
        <div class="brand" @click="$router.push('/')">LOGO</div>
        <div class="menu">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="nav-item">Login</router-link>
          <router-link v-if="isLoggedIn" to="/admin" class="nav-item">Dashboard</router-link>
          <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = computed(() => !!sessionStorage.getItem('token'))
const logout = () => {
  sessionStorage.removeItem('token')
  router.push('/')
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
}
.main-nav {
  background: #0f172a;
  color: white;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand {
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
  color: #ffffff;
}
.menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.nav-item {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}
.nav-item:hover,
.router-link-active {
  color: white;
}
.logout-btn {
  background: #ef4444;
  border: none;
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '../services/api'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import ProgressSpinner from 'primevue/progressspinner'

const posts = ref([])
const totalRecords = ref(0)
const rows = ref(6)
const first = ref(0)
const search = ref('')
const loading = ref(false)

const loadPosts = async () => {
  loading.value = true
  try {
    const page = first.value / rows.value + 1
    const res = await api.get(`/posts?page=${page}&limit=${rows.value}&search=${search.value}`)
    posts.value = res.data.items
    totalRecords.value = res.data.total
  } catch (error) {
    console.error('Fetch error:', error)
  } finally {
    loading.value = false
  }
}

watch(search, () => {
  first.value = 0
  loadPosts()
})

onMounted(loadPosts)
</script>

<template>
  <div class="public-container">
    <div class="page-header">
      <h1 class="text-title">Latest Blogs</h1>
      <p class="subtitle">Exploring the latest insights and engineering stories.</p>

      <div class="search-box">
        <div class="search-wrapper">
          <i class="pi pi-search search-icon" />
          <InputText v-model="search" placeholder="Search articles..." class="search-input" />
        </div>
      </div>
    </div>

    <div v-if="loading" class="loader-wrap">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
    </div>

    <div v-else class="blog-grid">
      <Card v-for="post in posts" :key="post.id" class="blog-card shadow-sm">
        <template #title>
          <div class="card-title">{{ post.title }}</div>
        </template>
        <template #subtitle>
          <div class="card-meta">
            <i class="pi pi-user icon-sm" /> <span>{{ post.author }}</span>
            <i class="pi pi-calendar icon-sm ml-3" />
            <span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
          </div>
        </template>
        <template #content>
          <p class="card-text">{{ post.content }}</p>
        </template>
      </Card>
    </div>

    <div v-if="!loading && posts.length === 0" class="no-data">
      <i class="pi pi-info-circle" style="font-size: 2rem; color: #94a3b8"></i>
      <p>No posts found matching your search.</p>
    </div>

    <Paginator
      v-model:first="first"
      :rows="rows"
      :totalRecords="totalRecords"
      @page="loadPosts"
      class="mt-8 custom-paginator"
    />
  </div>
</template>

<style scoped>
.public-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.text-title {
  font-size: 3rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2.5rem;
}

/* --- Search Box Styling (Fixed) --- */
.search-box {
  max-width: 480px;
  margin: 0 auto;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: #94a3b8;
  font-size: 1rem;
  z-index: 10;
  pointer-events: none;
}

.search-input {
  width: 100%;
  border-radius: 50px;
  padding: 0.85rem 1rem 0.85rem 3.2rem !important; /* Left padding for icon space */
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  outline: none;
}

/* --- Blog Grid & Cards --- */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.blog-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
}

.card-meta {
  font-size: 0.85rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
}

.icon-sm {
  font-size: 0.9rem;
  margin-right: 0.4rem;
}

.ml-3 {
  margin-left: 1.25rem;
}

.card-text {
  color: #475569;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
  font-size: 0.95rem;
}

.loader-wrap {
  display: flex;
  justify-content: center;
  padding: 5rem;
}

.no-data {
  text-align: center;
  padding: 5rem;
  color: #64748b;
}

.mt-8 {
  margin-top: 3.5rem;
}

/* Pagination Style */
:deep(.p-paginator) {
  background: transparent;
  border: none;
}
</style>

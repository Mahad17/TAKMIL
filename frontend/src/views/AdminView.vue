<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

const posts = ref([])
const postDialog = ref(false)
const isEdit = ref(false)
const post = ref({ id: null, title: '', content: '', author: '' })

const loadPosts = async () => {
  const res = await api.get('/posts')
  posts.value = res.data.items
}

const openNew = () => {
  post.value = { id: null, title: '', content: '', author: '' }
  isEdit.value = false
  postDialog.value = true
}

const editPost = (data: any) => {
  post.value = { ...data }
  isEdit.value = true
  postDialog.value = true
}

const savePost = async () => {
  try {
    if (isEdit.value) {
      await api.patch(`/posts/${post.value.id}`, post.value)
    } else {
      const { id, ...newPostData } = post.value
      await api.post('/posts', newPostData)
    }
    postDialog.value = false
    loadPosts()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Operation failed')
  }
}

const deletePost = async (id: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    await api.delete(`/posts/${id}`)
    loadPosts()
  }
}

onMounted(loadPosts)
</script>

<template>
  <div class="admin-view">
    <div class="admin-toolbar shadow-sm">
      <div class="title-block">
        <h2 class="m-0 text-slate-900">Admin Dashboard</h2>
        <span class="text-secondary text-sm">Create, Update and Manage all blog entries</span>
      </div>
      <Button
        label="Add Article"
        icon="pi pi-plus"
        class="p-button-primary rounded-btn"
        @click="openNew"
      />
    </div>

    <div class="table-card shadow-sm">
      <DataTable
        :value="posts"
        stripedRows
        paginator
        :rows="10"
        class="custom-table"
        responsiveLayout="scroll"
      >
        <template #empty> <div class="p-4 text-center">No articles found.</div> </template>
        <Column field="title" header="Article Title" sortable style="min-width: 250px"></Column>
        <Column field="author" header="Author" sortable></Column>
        <Column header="Actions" alignFrozen="right" frozen style="width: 140px">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-text p-button-info p-button-rounded mr-2"
              @click="editPost(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-danger p-button-rounded"
              @click="deletePost(slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="postDialog"
      :header="isEdit ? 'Edit Article' : 'Compose New Article'"
      :modal="true"
      class="p-fluid modern-dialog"
    >
      <div class="dialog-body">
        <div class="field mb-5">
          <label class="font-bold block mb-2">Title</label>
          <InputText v-model="post.title" placeholder="e.g. Mastering NestJS" />
        </div>
        <div class="field mb-5">
          <label class="font-bold block mb-2">Author</label>
          <InputText v-model="post.author" placeholder="Your name" />
        </div>
        <div class="field mb-5">
          <label class="font-bold block mb-2">Content</label>
          <Textarea v-model="post.content" rows="10" placeholder="Type your content here..." />
        </div>
      </div>
      <template #footer>
        <Button
          label="Discard"
          icon="pi pi-times"
          class="p-button-text p-button-secondary"
          @click="postDialog = false"
        />
        <Button
          :label="isEdit ? 'Save Changes' : 'Publish Article'"
          icon="pi pi-check"
          class="p-button-primary"
          @click="savePost"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.admin-view {
  padding: 3rem 2rem;
  background: #f1f5f9;
  min-height: 100vh;
}
.admin-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem 2.5rem;
  border-radius: 16px;
  margin-bottom: 2.5rem;
}
.text-slate-900 {
  color: #0f172a;
  font-weight: 800;
  font-size: 1.6rem;
}
.text-secondary {
  color: #64748b;
}
.text-sm {
  font-size: 0.9rem;
}
.rounded-btn {
  border-radius: 12px;
  font-weight: 600;
}
.table-card {
  background: white;
  border-radius: 16px;
  padding: 0.5rem;
  overflow: hidden;
}
.custom-table :deep(.p-datatable-header) {
  background: white;
  border: none;
}
.custom-table :deep(.p-column-title) {
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.mb-5 {
  margin-bottom: 2rem;
}
.modern-dialog {
  max-width: 600px;
}
.dialog-body {
  padding: 1.5rem 0.5rem;
}
.shadow-sm {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>

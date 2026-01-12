<script lang="ts" setup>
import Card from "@/components/Card.vue";
import { ideas } from "./ideas";
</script>

<template>
  <!-- Home View -->
  <div class="min-h-screen p-8">
    <header class="mb-16 text-center pt-8">
      <h1
        class="text-5xl font-extrabold tracking-tight text-slate-900 mb-6 font-display"
      >
        Canvas 演练场
      </h1>
    </header>

    <main class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        <Card v-for="idea in ideas" :key="idea.name" :idea="idea" />
      </div>
    </main>
  </div>
</template>

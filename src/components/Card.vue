<template>
  <div
    class="group relative bg-white rounded-2xl overflow-hidden outline outline-gray-950/5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ring-1 ring-slate-100 flex flex-col h-full cursor-pointer"
    @click="open"
  >
    <div class="p-5 flex-1 flex flex-col relative">
      <div class="mb-3">
        <h3
          class="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors"
        >
          {{ idea.meta.title }}
        </h3>
        <p class="text-slate-500 leading-relaxed text-sm line-clamp-2">
          {{ idea.meta.desc }}
        </p>
      </div>

      <div
        class="mt-auto pt-3 flex items-center justify-between cursor-pointer"
      >
        <span
          class="text-xs font-medium text-slate-400 group-hover:text-indigo-500 transition-colors uppercase tracking-wider"
          >Open</span
        >

        <div
          class="h-8 w-8 rounded-full bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-slate-400 group-hover:text-indigo-600 transition-colors"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  idea: {
    meta: {
      title: string;
      desc: string;
      path: string;
      name: string;
    };
  };
}>();

const router = useRouter();

function open() {
  router.push({ name: props.idea.meta.name });
}
</script>

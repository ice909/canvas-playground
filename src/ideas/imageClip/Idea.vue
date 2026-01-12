<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Cropper } from "./cropper";

const imageCanvas = ref<HTMLCanvasElement | null>(null);
const maskCanvas = ref<HTMLCanvasElement | null>(null);

const imageUrl = `/img1.webp`;

onMounted(async () => {
  const cropper = new Cropper(
    imageCanvas.value!,
    maskCanvas.value!,
    imageCanvas.value!.parentElement!
  )

  await cropper.init(imageUrl)
});
</script>

<template>
  <div class="w-full h-full relative cursor-pointer bg-black">
    <canvas ref="imageCanvas" class="absolute inset-0" />
    <canvas ref="maskCanvas" class="absolute inset-0" />
  </div>
</template>

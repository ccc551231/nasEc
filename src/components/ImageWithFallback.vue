<script setup lang="ts">
import { computed, ref } from "vue";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    class?: string;
  }>(),
  {
    alt: "",
    class: "",
  }
);

const didError = ref(false);
const currentSrc = computed(() => (didError.value ? ERROR_IMG_SRC : props.src));
</script>

<template>
  <img :src="currentSrc" :alt="props.alt" :class="props.class" @error="didError = true" />
</template>

<script setup lang="ts">
defineProps<{
  checked: boolean;
  solid?: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all',
      checked ? (solid ? 'border-white bg-transparent' : 'border-[#2D74B5] bg-transparent') : 'border-gray-300 bg-transparent',
    ]"
  >
    <svg
      v-if="checked"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="['w-4 h-4', solid ? 'text-white' : 'text-[#2D74B5]']"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
</template>

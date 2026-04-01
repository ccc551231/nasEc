<script setup lang="ts">
defineProps<{
  checked: boolean;
  label: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <label :class="['flex items-center gap-3 group', disabled ? 'cursor-not-allowed' : 'cursor-pointer']" @click="!disabled && emit('click')">
    <div
      :class="[
        'w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center transition-all',
        disabled ? (checked ? 'border-[#CBD5E1] bg-[#F8FAFC]' : 'border-[#CBD5E1] bg-[#F8FAFC]') : checked ? 'border-[#2D74B5]' : 'border-gray-300',
      ]"
    >
      <div v-if="checked" :class="['w-[14px] h-[14px] rounded-full', disabled ? 'bg-[#94A3B8]' : 'bg-[#2D74B5]']" />
    </div>
    <span :class="['text-lg font-bold', disabled ? 'text-gray-500' : checked ? 'text-black' : 'text-gray-500']">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

defineProps<{
  label?: string;
  required?: boolean;
  options: Array<string | number>;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
}>();
</script>

<template>
  <div class="space-y-3 flex-1">
    <label v-if="label" class="text-black font-bold text-lg flex items-center gap-0.5">
      <span v-if="required" class="text-[#EF4444] font-black">*</span>
      {{ label }}
    </label>
    <div class="relative group">
      <select
        :disabled="disabled"
        :class="[
          'appearance-none w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none placeholder:text-[#94A3B8] placeholder:font-normal h-[60px] cursor-pointer',
          disabled ? '!bg-[#F8FAFC] !text-[#64748B] border-[#E5EDF5] cursor-not-allowed pointer-events-none focus:border-[#E5EDF5]' : '',
        ]"
      >
        <option value="">{{ value ?? placeholder ?? "請選擇" }}</option>
        <option v-for="option in options" :key="String(option)" :value="option">
          {{ option }}
        </option>
      </select>
      <ChevronDown v-if="!disabled" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D74B5] pointer-events-none" :size="20" />
    </div>
  </div>
</template>

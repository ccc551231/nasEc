<script setup lang="ts">
import { EyeOff } from "lucide-vue-next";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    value?: string;
    modelValue?: string;
    required?: boolean;
    type?: string;
    fullWidth?: boolean;
    suffixText?: string;
    password?: boolean;
    trackingWide?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: "",
    placeholder: "",
    value: "",
    modelValue: undefined,
    required: false,
    type: "text",
    fullWidth: false,
    suffixText: "",
    password: false,
    trackingWide: false,
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const showPassword = ref(!props.password);
const inputType = computed(() => {
  if (!props.password) return props.type;
  return showPassword.value ? "text" : "password";
});
</script>

<template>
  <div :class="['space-y-3', props.fullWidth ? 'md:col-span-2' : '']">
    <label v-if="label" class="text-black font-bold text-lg flex items-center gap-0.5">
      <span v-if="required" class="text-[#EF4444] font-black">*</span>
      {{ label }}
      <slot name="label-extra" />
    </label>
    <div class="relative">
      <input
        :type="inputType"
        :value="props.modelValue ?? props.value"
        :placeholder="placeholder"
        :disabled="props.disabled"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none placeholder:text-[#94A3B8] placeholder:font-normal h-[60px]',
          props.password || props.trackingWide ? 'tracking-[0.5em]' : '',
          props.disabled ? '!bg-[#F8FAFC] !text-[#64748B] border-[#E5EDF5] cursor-not-allowed pointer-events-none focus:border-[#E5EDF5]' : '',
        ]"
      />
      <button
        v-if="props.password && !props.disabled"
        type="button"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
        @click="showPassword = !showPassword"
      >
        <EyeOff :size="24" />
      </button>
      <div v-else-if="props.suffixText" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
        {{ props.suffixText }}
      </div>
      <slot name="suffix" />
    </div>
  </div>
</template>

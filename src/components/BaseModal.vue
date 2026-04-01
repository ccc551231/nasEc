<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    subtitle?: string;
    maxWidth?: string;
    contentClass?: string;
  }>(),
  {
    subtitle: "",
    maxWidth: "max-w-4xl",
    contentClass: "p-8 overflow-y-auto space-y-6 bg-slate-50/50",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const close = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <div
    v-if="props.modelValue"
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    @click="close"
  >
    <div
      :class="['bg-white w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative', props.maxWidth]"
      @click.stop
    >
      <div class="bg-gradient-to-r from-[#005CAF] to-[#007CEE] text-white p-5">
        <h3 class="text-2xl font-bold">{{ props.title }}</h3>
        <p v-if="props.subtitle" class="text-blue-100 text-base mt-1">{{ props.subtitle }}</p>
      </div>

      <button
        class="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-xl shadow-lg border border-white/30"
        @click="close"
      >
        &times;
      </button>

      <div :class="props.contentClass">
        <slot />
      </div>

      <div class="p-5 bg-white border-t border-gray-100 flex justify-end">
        <slot name="footer">
          <button class="px-8 py-2.5 bg-[#005CAF] text-white font-bold rounded-2xl text-base" @click="close">
            我已了解
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, X } from "lucide-vue-next";
import BaseModal from "@/components/BaseModal.vue";

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const popularBrands = ["Altis", "Infiniti", "Lexus", "MG HS", "Sentra", "BMW", "HONDA(國產)", "Benz", "Mitsubishi(中華汽車)", "福特(國產)"];
const mockData = [
  { id: "ZRE172L-GEXEKR", name: "ALTIS 1.8 尊爵版", year: "2024", price: "79.5 萬" },
  { id: "ZRE172L-GEXMKR", name: "ALTIS 1.8 經典版", year: "2024", price: "72.5 萬" },
  { id: "ZRE172L-GEXGKR", name: "ALTIS 1.8 豪華版", year: "2024", price: "75.5 萬" },
];
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    title="查詢廠牌車型"
    max-width="max-w-4xl"
    content-class="p-8 space-y-8 overflow-y-auto flex-1 custom-scrollbar"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-3">
      <label class="text-black font-bold text-lg">廠牌查詢</label>
      <div class="flex gap-4">
        <div class="flex-1 relative group">
          <select
            class="appearance-none w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none placeholder:text-[#94A3B8] placeholder:font-normal h-[60px] cursor-pointer"
          >
            <option value="">輸入廠牌名稱查詢</option>
            <option value="TOYOTA">TOYOTA</option>
          </select>
          <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D74B5] pointer-events-none" :size="20" />
        </div>
        <button class="bg-[#2D74B5] text-white px-10 h-[60px] rounded-xl font-bold shrink-0">查詢</button>
      </div>
    </div>
    <div class="space-y-4">
      <label class="text-black font-bold text-lg">常見車款/品牌</label>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="brand in popularBrands"
          :key="brand"
          class="px-5 py-2.5 bg-[#F1F7FF] text-[#2D74B5] rounded-full text-base font-bold border border-transparent hover:border-[#2D74B5] transition-all"
        >
          {{ brand }}
        </button>
      </div>
    </div>
    <div class="space-y-3">
      <label class="text-black font-bold text-lg">關鍵字查詢</label>
      <div class="flex gap-4">
        <input
          type="text"
          placeholder="請輸入關鍵字，如：Altis"
          class="w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none placeholder:text-[#94A3B8] placeholder:font-normal h-[60px]"
        />
        <button class="bg-[#2D74B5] text-white px-10 h-[60px] rounded-xl font-bold shrink-0">查詢</button>
      </div>
    </div>
    <div class="rounded-xl border border-gray-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#2D74B5] text-white">
            <th class="px-6 py-4 font-bold text-base text-nowrap">車型代號</th>
            <th class="px-6 py-4 font-bold text-base text-nowrap">車型名稱</th>
            <th class="px-6 py-4 font-bold text-base text-nowrap">出廠年份</th>
            <th class="px-6 py-4 font-bold text-base text-nowrap">重製價</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in mockData" :key="item.id" class="hover:bg-blue-50/50 cursor-pointer transition-colors group">
            <td class="px-6 py-5 text-gray-500 font-medium font-mono text-base">{{ item.id }}</td>
            <td class="px-6 py-5 text-black font-bold group-hover:text-[#2D74B5]">{{ item.name }}</td>
            <td class="px-6 py-5 text-gray-600 font-bold">{{ item.year }}</td>
            <td class="px-6 py-5 text-[#F97316] font-black">{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <button
        class="px-10 py-3.5 border-2 border-gray-300 text-gray-500 rounded-full font-bold hover:bg-white transition shadow-none"
        @click="emit('update:modelValue', false)"
      >
        取消關閉
      </button>
    </template>
  </BaseModal>
</template>

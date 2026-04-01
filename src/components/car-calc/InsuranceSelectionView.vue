<script setup lang="ts">
import { ref } from "vue";
import { AlertCircle, Calculator, Check, ChevronDown, ChevronLeft, ChevronRight, HelpCircle } from "lucide-vue-next";

type InputType = "checkbox" | "radio";

type SubItem = {
  label: string;
  value: string;
  isInput?: boolean;
};

type InsuranceRow = {
  inputType?: InputType;
  checked: boolean;
  title: string;
  subItems: SubItem[];
  hasInfo?: boolean;
  tooltipText?: string;
  isCompulsory?: boolean;
  disabled?: boolean;
  indent?: boolean;
};

const emit = defineEmits<{
  back: [];
  next: [];
}>();

const rootEl = ref<HTMLElement | null>(null);

defineExpose({
  rootEl,
});

const compulsoryTooltip =
  "被保險人因使用或管理被保險汽車發生交通事故，致乘客或車外第三人傷害或死亡者，不論被保險人有無過失，本公司應依本保險契約之約定，對請求權人給付保險金。";

const passengerTooltip =
  "保障因被保險汽車發生交通事故，致被保險汽車上乘客受有體傷或死亡之損失。";

const mainRows: InsuranceRow[] = [
  {
    checked: true,
    isCompulsory: true,
    title: "強制汽車責任保險",
    hasInfo: true,
    tooltipText: compulsoryTooltip,
    subItems: [
      { label: "強制汽車責任保險", value: "20萬" },
      { label: "每一個一人體傷醫療最高", value: "20萬" },
      { label: "每一個一人失能最高", value: "200萬" },
      { label: "每一個一人死亡定額給付", value: "200萬" },
    ],
  },
  {
    checked: false,
    title: "強制汽車責任保險駕駛人傷害附加條款(汽車單一交通事故)-限車主本人(網路版)",
    subItems: [
      { label: "強制汽車責任保險駕駛人傷害附加條款(汽車單一交通事故)-限車主本人(網路版)", value: "" },
      { label: "每人傷害/每人死亡及失能", value: "" },
    ],
  },
  {
    checked: true,
    title: "第三人責任保險",
    subItems: [
      { label: "傷害責任險 - 每一每人傷害", value: "200 萬", isInput: true },
      { label: "每一意外事故傷害", value: "400 萬", isInput: true },
      { label: "財產責任險 - 每一意外事故財損", value: "50 萬", isInput: true },
    ],
  },
  {
    checked: true,
    title: "第三人責任保險乘客體傷責任附加條款",
    hasInfo: true,
    tooltipText: passengerTooltip,
    subItems: [
      { label: "每一每人傷害", value: "100 萬", isInput: true },
      { label: "每一意外事故總額", value: "100 萬", isInput: true },
    ],
  },
  {
    checked: true,
    title: "第三人責任保險超額責任附加條款(經濟型)",
    subItems: [{ label: "每一意外事故第三人體傷/財損最高賠償責任", value: "500 萬", isInput: true }],
  },
  {
    checked: true,
    title: "汽車保險道路救援費用附加條款",
    subItems: [{ label: "保險期間內累積最高賠償金額", value: "3萬" }],
  },
  {
    checked: true,
    title: "第三人責任保險慰問金費用附加條款",
    subItems: [{ label: "住院/身故慰問金及累計最高賠償", value: "5千/1萬/50萬", isInput: true }],
  },
];

const bodyRows: InsuranceRow[] = [
  {
    inputType: "radio",
    checked: false,
    disabled: true,
    indent: true,
    title: "汽車車體損失保險乙式(自用車)",
    hasInfo: true,
    subItems: [{ label: "自負額", value: "3千/5千/7千", isInput: true }],
  },
  {
    inputType: "radio",
    checked: false,
    disabled: true,
    indent: true,
    title: "汽車車體損失險丙式-免自負額",
    subItems: [{ label: "免自負額", value: "萬" }],
  },
  {
    checked: false,
    disabled: true,
    indent: true,
    title: "汽車車體損失險代車費用",
    subItems: [{ label: "每日賠償金額/累計最高給付日數", value: "1,000/30天" }],
  },
];

const theftRows: InsuranceRow[] = [
  {
    inputType: "radio",
    checked: false,
    disabled: true,
    indent: true,
    title: "汽車竊盜損失保險(自用車)",
    hasInfo: true,
    subItems: [{ label: "自負額", value: "10%", isInput: true }],
  },
  {
    checked: false,
    disabled: true,
    indent: true,
    title: "汽車竊盜損失保險零件、配件被竊",
    subItems: [{ label: "", value: "萬" }],
  },
  {
    checked: false,
    disabled: true,
    indent: true,
    title: "汽車竊盜損失保險代步費用(環型)",
    subItems: [{ label: "每日賠償金額/累計最高給付日數", value: "500/30天" }],
  },
];

const getInputClass = (row: InsuranceRow) => {
  if (row.inputType === "radio") {
    return [
      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
      row.checked ? "border-[#2D74B5]" : "border-gray-300",
      row.disabled ? "bg-gray-50 border-gray-200 cursor-not-allowed" : "cursor-pointer",
    ];
  }

  return [
    "w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0",
    row.checked ? "bg-[#2D74B5] border-[#2D74B5]" : "bg-transparent border-gray-300",
    row.disabled ? "bg-gray-100 border-gray-200 cursor-not-allowed" : "cursor-pointer",
  ];
};
</script>

<template>
  <div ref="rootEl" class="w-full space-y-6 sm:space-y-12">
    <div class="bg-white rounded-xl border border-[#E2E8F0] shadow-none overflow-visible">
      <div class="bg-white border-t-[5px] border-[#F97316] px-4 sm:px-10 py-8 sm:py-10 rounded-xl relative">
        <div class="flex items-center gap-4 mb-6 sm:mb-8">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white shadow-sm">
            <Calculator :size="22" />
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-gray-800 tracking-tight">選擇保險內容</h2>
        </div>

        <div class="bg-[#F8FAFC] border-l-4 border-[#2D74B5] p-4 sm:p-5 rounded-r-xl space-y-2 mb-8">
          <div class="flex items-start gap-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
            <div class="w-1.5 h-1.5 rounded-full bg-[#2D74B5] mt-2 shrink-0" />
            <p>以下欄位均為必填，請依真實資料填寫，方能提供您正確的保費資訊。</p>
          </div>
          <div class="flex items-start gap-2 text-[#2D74B5] text-[14px] sm:text-[15px] font-bold leading-relaxed">
            <AlertCircle :size="18" class="mt-0.5 shrink-0" />
            <p>要保險人與行照車主及持卡人需為同一人，請依真實資料及行照資料填寫，方能提供您正確的保費資訊，謝謝！</p>
          </div>
        </div>

        <div class="-mx-4 sm:-mx-10 bg-[#F1F7FF] px-4 sm:px-10 pt-0 pb-4 sm:pb-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 sm:py-8 border-b border-dashed border-gray-200">
            <div class="flex items-center gap-5">
              <span class="text-gray-400 font-bold text-base sm:text-lg">保險期間</span>
              <span class="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">一年期</span>
            </div>
            <div class="flex items-center gap-6 sm:gap-8">
              <span class="text-gray-400 font-bold text-sm underline cursor-pointer hover:text-[#2D74B5]">保障內容</span>
              <button class="bg-[#F97316] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-xl font-black text-lg sm:text-xl shadow-none hover:bg-orange-600 transition">
                自由配
              </button>
            </div>
          </div>

          <div class="m-0 pt-4 sm:pt-6 pb-0 text-right">
            <span class="text-gray-400 text-[12px] sm:text-[13px] font-bold tracking-wide">保險金額（單位：新台幣元）</span>
          </div>
        </div>

        <div class="px-0 relative z-10">
          <div
            v-for="row in mainRows"
            :key="row.title"
            :class="[
              'grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 py-6 sm:py-8 border-b border-gray-100 transition-all',
              row.isCompulsory ? '-mx-4 sm:-mx-10 px-4 sm:px-10' : '',
              row.disabled ? 'select-none' : 'hover:bg-gray-50/50',
              row.indent ? 'lg:pl-16' : '',
            ]"
          >
            <div class="lg:col-span-5 flex items-center gap-4 pr-4">
              <div>
                <div :class="getInputClass(row)">
                  <Check v-if="row.inputType !== 'radio' && row.checked" :size="14" class="text-white" :stroke-width="4" />
                  <div v-else-if="row.inputType === 'radio' && row.checked" class="w-3 h-3 rounded-full bg-[#2D74B5]" />
                </div>
              </div>
              <span :class="['text-[16px] sm:text-[17px] font-bold leading-tight', row.disabled ? 'text-gray-400' : 'text-gray-800']">
                {{ row.title }}
                <span v-if="row.hasInfo" class="relative inline-block ml-2 align-text-bottom group/tooltip">
                  <HelpCircle :size="17" :class="[row.disabled ? 'text-gray-400' : 'text-[#2D74B5]', 'cursor-pointer shrink-0 inline-block']" />
                  <div
                    v-if="row.tooltipText"
                    class="absolute z-[500] hidden group-hover/tooltip:block bottom-full left-[-20px] sm:left-1/2 sm:-translate-x-1/2 mb-4 w-[280px] sm:w-[420px]"
                  >
                    <div class="relative bg-white border-2 border-[#2D74B5] p-5 rounded-xl shadow-[0_10px_24px_-12px_rgba(147,197,253,0.7)]">
                      <p class="text-[14px] text-gray-700 leading-relaxed font-normal text-left">{{ row.tooltipText }}</p>
                      <div class="absolute top-full left-6 sm:left-1/2 sm:-translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#2D74B5]" />
                      <div class="absolute top-[calc(100%-1.5px)] left-6 sm:left-1/2 sm:-translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-white" />
                    </div>
                  </div>
                </span>
              </span>
            </div>

            <div class="lg:col-span-7 flex flex-col gap-4">
              <div
                v-for="item in row.subItems"
                :key="`${row.title}-${item.label}-${item.value}`"
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 min-h-0 sm:min-h-[40px]"
              >
                <div :class="['text-[16px] leading-relaxed flex-1', row.disabled ? 'text-gray-400' : 'text-gray-600']">
                  {{ item.label }}
                </div>
                <div class="w-full sm:w-auto sm:min-w-[200px] text-left sm:text-right shrink-0">
                  <template v-if="item.value !== ''">
                    <div v-if="item.isInput" class="relative inline-block w-full">
                      <select
                        :disabled="row.disabled"
                        :class="[
                          'appearance-none w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 font-bold text-gray-700 text-[15px] outline-none h-10 text-right pr-10 cursor-pointer focus:border-[#2D74B5]',
                          row.disabled ? 'bg-gray-50 text-gray-400' : '',
                        ]"
                      >
                        <option>{{ item.value }}</option>
                      </select>
                      <ChevronDown v-if="!row.disabled" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" :size="16" />
                    </div>
                    <span v-else :class="['font-black text-lg sm:text-xl tracking-tighter', row.disabled ? 'text-gray-400' : 'text-[#2D74B5]']">
                      {{ item.value }}
                    </span>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-10 sm:pt-12 pb-6 border-b border-gray-100">
            <div class="flex items-center gap-4 mb-6 sm:mb-8">
              <div class="w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0 bg-gray-100 border-gray-200 cursor-not-allowed" />
              <h3 class="text-base sm:text-lg font-black text-gray-500 uppercase tracking-tight">車體損失險 (保額未達門檻)</h3>
            </div>
            <div class="bg-[#F8FAFC] overflow-hidden">
              <div
                v-for="row in bodyRows"
                :key="row.title"
                class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 px-6 sm:px-8 py-6 sm:py-8 border-b border-gray-100 transition-all select-none last:border-b-0"
              >
                <div class="lg:col-span-5 flex items-center gap-4 pr-4">
                  <div>
                    <div :class="getInputClass(row)">
                      <div v-if="row.inputType === 'radio' && row.checked" class="w-3 h-3 rounded-full bg-[#2D74B5]" />
                    </div>
                  </div>
                  <span class="text-[16px] sm:text-[17px] font-bold leading-tight text-gray-400">{{ row.title }}</span>
                </div>
                <div class="lg:col-span-7 flex flex-col gap-4">
                  <div v-for="item in row.subItems" :key="`${row.title}-${item.label}-${item.value}`" class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                    <div class="text-[16px] leading-relaxed flex-1 text-gray-400">{{ item.label }}</div>
                    <div class="w-full sm:w-auto sm:min-w-[200px] text-left sm:text-right shrink-0">
                      <div v-if="item.isInput" class="relative inline-block w-full">
                        <select disabled class="appearance-none w-full bg-gray-50 border border-[#E2E8F0] rounded-lg px-4 py-2 font-bold text-gray-400 text-[15px] outline-none h-10 text-right pr-10">
                          <option>{{ item.value }}</option>
                        </select>
                      </div>
                      <span v-else class="font-black text-lg sm:text-xl tracking-tighter text-gray-400">{{ item.value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-8 pb-12">
            <div class="flex items-center gap-4 mb-6 sm:mb-8">
              <div class="w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0 bg-gray-100 border-gray-200 cursor-not-allowed" />
              <h3 class="text-base sm:text-lg font-black text-gray-500 uppercase tracking-tight">汽車竊盜損失保險 (保額未達門檻)</h3>
            </div>
            <div class="bg-[#F8FAFC] overflow-hidden">
              <div
                v-for="row in theftRows"
                :key="row.title"
                class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 px-6 sm:px-8 py-6 sm:py-8 border-b border-gray-100 transition-all select-none last:border-b-0"
              >
                <div class="lg:col-span-5 flex items-center gap-4 pr-4">
                  <div>
                    <div :class="getInputClass(row)">
                      <div v-if="row.inputType === 'radio' && row.checked" class="w-3 h-3 rounded-full bg-[#2D74B5]" />
                    </div>
                  </div>
                  <span class="text-[16px] sm:text-[17px] font-bold leading-tight text-gray-400">{{ row.title }}</span>
                </div>
                <div class="lg:col-span-7 flex flex-col gap-4">
                  <div v-for="item in row.subItems" :key="`${row.title}-${item.label}-${item.value}`" class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                    <div class="text-[16px] leading-relaxed flex-1 text-gray-400">{{ item.label }}</div>
                    <div class="w-full sm:w-auto sm:min-w-[200px] text-left sm:text-right shrink-0">
                      <div v-if="item.isInput" class="relative inline-block w-full">
                        <select disabled class="appearance-none w-full bg-gray-50 border border-[#E2E8F0] rounded-lg px-4 py-2 font-bold text-gray-400 text-[15px] outline-none h-10 text-right pr-10">
                          <option>{{ item.value }}</option>
                        </select>
                      </div>
                      <span v-else class="font-black text-lg sm:text-xl tracking-tighter text-gray-400">{{ item.value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto w-full px-4 mt-8 pb-8 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center shrink-0">
      <button
        class="w-full sm:w-60 h-[65px] border-2 rounded-full transition font-black text-xl flex items-center justify-center gap-2 bg-white border-gray-300 text-[#2D74B5] hover:bg-blue-50"
        @click="emit('back')"
      >
        <ChevronLeft :size="24" />
        上一步
      </button>
      <button
        class="w-full sm:w-60 h-[65px] font-black text-2xl rounded-full bg-[#E6162D] text-white hover:bg-[#c11226] transition flex items-center justify-center gap-3 shadow-none"
        @click="emit('next')"
      >
        下一步
        <ChevronRight :size="28" />
      </button>
    </div>
  </div>
</template>

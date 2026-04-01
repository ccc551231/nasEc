<script setup lang="ts">
import { ref } from "vue";
import { Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, CreditCard, FileText, HelpCircle, Mail, MapPin, Phone, ShieldCheck, UserRound, CarFront } from "lucide-vue-next";
import CustomRadio from "@/components/car-calc/CustomRadio.vue";
import FormInputField from "@/components/car-calc/FormInputField.vue";
import FormSelectField from "@/components/car-calc/FormSelectField.vue";
import ModernCheck from "@/components/car-calc/ModernCheck.vue";

const props = withDefaults(
  defineProps<{
    activeStepIndex?: number;
    readOnly?: boolean;
    nextLabel?: string;
  }>(),
  {
    activeStepIndex: 0,
    readOnly: false,
    nextLabel: "車輛確認",
  }
);

const emit = defineEmits<{
  back: [];
  next: [];
}>();

const rootEl = ref<HTMLElement | null>(null);
const maritalStatus = ref("single");
const gender = ref("male");
const editablePhone = ref("");
const occupation = ref("");
const postalCode = ref("106");
const address = ref("台北市大安區忠孝東路四段 100 號");
const purposeProperty = ref(true);
const purposeLiability = ref(true);
const purposeInjury = ref(false);
const purposeOther = ref(false);
const purposeOtherText = ref("");
const callMorning = ref(false);
const callAfternoon = ref(false);
const smsConfirm = ref(false);
const activeAgreementTab = ref<"law" | "statement">("law");
defineExpose({
  rootEl,
});

const years = ["73", "74", "75", "76"];
const months = Array.from({ length: 12 }, (_, index) => String(index + 1));
const days = Array.from({ length: 31 }, (_, index) => String(index + 1));
const stepItems = [
  { id: 1, title: "資料輸入", icon: FileText },
  { id: 2, title: "資料確認", icon: ClipboardCheck },
  { id: 3, title: "繳費", icon: CreditCard },
  { id: 4, title: "完成投保", icon: CheckCircle2 },
];

type CoverageSubItem = {
  label: string;
  value: string;
  isInput?: boolean;
};

type CoverageRow = {
  inputType?: "checkbox" | "radio";
  checked: boolean;
  title: string;
  subItems: CoverageSubItem[];
  hasInfo?: boolean;
  tooltipText?: string;
  isCompulsory?: boolean;
  disabled?: boolean;
};

const coverageRows: CoverageRow[] = [
  {
    checked: true,
    isCompulsory: true,
    title: "強制汽車責任保險",
    hasInfo: true,
    tooltipText: "被保險人因使用或管理被保險汽車發生交通事故，致乘客或車外第三人傷害或死亡者，本公司依契約約定給付保險金。",
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
    disabled: true,
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
    tooltipText: "保障因被保險汽車發生交通事故，致被保險汽車上乘客受有體傷或死亡之損失。",
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

const getCoverageInputClass = (row: CoverageRow) => [
  "w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0",
  props.readOnly || row.disabled
    ? row.checked
      ? "bg-[#CBD5E1] border-[#CBD5E1] cursor-not-allowed"
      : "bg-[#F8FAFC] border-[#CBD5E1] cursor-not-allowed"
    : row.checked
      ? "bg-[#2D74B5] border-[#2D74B5] cursor-not-allowed"
      : "bg-transparent border-gray-300 cursor-not-allowed",
];

const otherCheckboxClass = (checked: boolean, disabled = false) => [
  "w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0",
  disabled
    ? checked
      ? "bg-[#CBD5E1] border-[#CBD5E1] cursor-not-allowed"
      : "bg-[#F8FAFC] border-[#CBD5E1] cursor-not-allowed"
    : checked
      ? "bg-[#2D74B5] border-[#2D74B5]"
      : "bg-transparent border-gray-300",
];

const otherInputClass = [
  "w-full max-w-[320px] bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none placeholder:text-[#94A3B8] placeholder:font-normal h-[52px]",
  props.readOnly ? "!bg-[#F8FAFC] !text-[#64748B] border-[#E5EDF5] cursor-not-allowed pointer-events-none" : "",
];
</script>

<template>
  <div ref="rootEl" class="w-full space-y-8 sm:space-y-10">
    <div class="py-0">
        <div class="px-0 py-0">
          <div class="relative flex items-start justify-between">
            <div class="absolute top-7 left-[12.5%] right-[12.5%] h-1.5 bg-slate-200 -translate-y-1/2 z-0" />
            <div
              class="absolute top-7 left-[12.5%] h-1.5 bg-[#2D74B5] -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
              :style="{ width: `calc(75% * ${activeStepIndex / (stepItems.length - 1)})` }"
            />

            <div v-for="(step, index) in stepItems" :key="step.id" class="relative z-10 flex flex-col items-center flex-1">
              <button
                type="button"
                :disabled="index > activeStepIndex"
                :class="[
                  'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-4',
                  index === activeStepIndex
                    ? 'bg-[#2D74B5] border-[#2D74B5] text-white shadow-lg scale-110 shadow-[#2D74B5]/10'
                    : index < activeStepIndex
                      ? 'bg-[#2D74B5] border-[#2D74B5] text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-400 cursor-not-allowed',
                ]"
              >
                <CheckCircle2 v-if="index < activeStepIndex" class="w-7 h-7" />
                <component :is="step.icon" v-else class="w-6 h-6" />
              </button>

              <div class="mt-5 text-center whitespace-nowrap">
                <p :class="['text-[11px] font-bold uppercase tracking-widest', index <= activeStepIndex ? 'text-[#2D74B5]' : 'text-slate-400']">
                  Step 0{{ step.id }}
                </p>
                <p :class="['text-base font-semibold hidden md:block', index <= activeStepIndex ? 'text-slate-900' : 'text-slate-400']">
                  {{ step.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>

    <section class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-none">
      <div class="border-t-[5px] border-[#F97316] px-6 sm:px-10 pt-8 sm:pt-10 pb-0">
        <div class="flex items-center gap-4 mb-6 sm:mb-8">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white shadow-sm">
            <UserRound :size="22" />
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-gray-800">車主資料</h3>
            <p class="text-sm sm:text-base text-gray-400 mt-1">基本資料與聯絡資料</p>
          </div>
        </div>

        <div class="bg-[#F8FAFC] border-l-4 border-[#2D74B5] px-6 py-5 mb-8">
          <p class="text-base font-bold text-[#2D74B5]">ⓘ 要保險人與行照車主及持卡人需為同一人，請依真實資料填寫，方能提供您正確的保費資訊，謝謝！</p>
        </div>
      </div>

      <div class="px-6 sm:px-10 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInputField label="姓名" required value="王小明" disabled />
          <FormInputField label="身分證字號" required value="A123456789" disabled />
          <div class="space-y-3">
            <label class="text-black font-bold text-lg block">性別</label>
            <div class="flex flex-wrap gap-6">
              <CustomRadio label="男" :checked="gender === 'male'" disabled @click="gender = 'male'" />
              <CustomRadio label="女" :checked="gender === 'female'" disabled @click="gender = 'female'" />
            </div>
          </div>
          <div class="space-y-3">
            <label class="text-black font-bold text-lg block">出生日期</label>
            <div class="flex gap-3">
              <FormSelectField :options="years" value="73" disabled />
              <FormSelectField :options="months" value="12" disabled />
              <FormSelectField :options="days" value="12" disabled />
            </div>
          </div>
          <FormInputField label="Email" required value="name@example.com" disabled>
            <template #label-extra>
              <Mail :size="16" class="ml-2 text-[#2D74B5]" />
            </template>
          </FormInputField>
          <FormInputField label="行動電話" required value="0912-345-678" disabled>
            <template #label-extra>
              <Phone :size="16" class="ml-2 text-[#2D74B5]" />
            </template>
          </FormInputField>
        </div>

        <hr class="my-8 border-0 border-t border-[#E2E8F0]" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <label class="text-black font-bold text-lg block">婚姻狀態</label>
            <div class="flex flex-wrap gap-6">
              <CustomRadio label="未婚" :checked="maritalStatus === 'single'" :disabled="props.readOnly" @click="maritalStatus = 'single'" />
              <CustomRadio label="已婚" :checked="maritalStatus === 'married'" :disabled="props.readOnly" @click="maritalStatus = 'married'" />
            </div>
          </div>
          <FormInputField label="聯絡電話(非必填)" v-model="editablePhone" placeholder="請輸入聯絡電話" :disabled="props.readOnly" />
          <FormInputField label="職業" v-model="occupation" placeholder="請輸入職業" :disabled="props.readOnly" />
          <div class="space-y-3">
            <label class="text-black font-bold text-lg block">聯絡地址</label>
            <div class="grid grid-cols-[140px_1fr] gap-3">
              <FormInputField v-model="postalCode" :disabled="props.readOnly" />
              <FormInputField v-model="address" :disabled="props.readOnly" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-none">
      <div class="border-t-[5px] border-[#F97316] px-6 sm:px-10 pt-8 sm:pt-10 pb-0">
        <div class="flex items-center gap-4 mb-6 sm:mb-8">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white shadow-sm">
            <CarFront :size="22" />
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-gray-800">車籍資料</h3>
            <p class="text-sm sm:text-base text-gray-400 mt-1">系統帶入，可再確認</p>
          </div>
        </div>

        <div class="bg-[#F8FAFC] border-l-4 border-[#2D74B5] px-6 py-5 mb-8">
          <p class="text-base font-bold text-[#2D74B5]">ⓘ 要保險人與行照車主及持卡人需為同一人，請依造真實資料及行照資料填寫，方能提供您正確的保費資訊，謝謝！</p>
        </div>
      </div>

      <div class="px-6 sm:px-10 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <FormInputField label="車牌號碼" value="ABC-1234" disabled />
          <FormInputField label="廠牌" value="TOYOTA" disabled />
          <FormInputField label="承載數" value="5 人" disabled />
          <FormInputField label="排氣量" value="1998 CC" disabled />
          <FormInputField label="車輛種類" value="自用小客車" disabled />
          <FormInputField label="製造年份" value="2024 年 12 月" disabled />
          <FormInputField label="發照年月日" value="112 年 07 月 08 日" disabled />
          <FormInputField label="車重" value="1,420 KG" disabled />
          <FormInputField label="引擎/車身號碼" value="依行照顯示" disabled />
        </div>
      </div>
    </section>

    <section class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-none">
      <div class="border-t-[5px] border-[#F97316] px-6 sm:px-10 pt-8 sm:pt-10 pb-0">
        <div class="flex items-center gap-4 mb-6 sm:mb-8">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white shadow-sm">
            <ShieldCheck :size="22" />
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-gray-800">選擇保險內容</h3>
            <p class="text-sm sm:text-base text-gray-400 mt-1">最重要的投保條件設定</p>
          </div>
        </div>

        <div class="bg-[#F8FAFC] border-l-4 border-[#2D74B5] px-6 py-5 mb-8">
          <p class="text-base font-bold text-[#2D74B5]">ⓘ 以下保險內容為前一頁已選資料帶入，若需調整請返回上一步重新選擇保險內容。</p>
        </div>
      </div>

      <div class="px-6 sm:px-10 py-8 space-y-8">
        <div class="-mx-6 sm:-mx-10 bg-[#F1F7FF] px-6 sm:px-10 pt-0 pb-4 sm:pb-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 sm:py-8 border-b border-dashed border-gray-200">
            <div class="flex items-center gap-5">
              <span class="text-gray-400 font-bold text-base sm:text-lg">保險期間</span>
              <span class="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">一年期</span>
            </div>
            <div class="flex items-center gap-8">
              <span class="text-gray-400 font-bold text-sm">起保日</span>
              <span class="text-base sm:text-lg font-black text-gray-700">2026 / 03 / 27</span>
            </div>
          </div>

          <div class="m-0 pt-4 sm:pt-6 pb-0 text-right">
            <span class="text-gray-400 text-[12px] sm:text-[13px] font-bold tracking-wide">保險金額（單位：新台幣元）</span>
          </div>
        </div>

        <div class="px-0 relative z-10">
          <div
            v-for="row in coverageRows"
            :key="row.title"
            :class="[
              'grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 py-6 sm:py-8 border-b border-gray-100',
              row.isCompulsory ? '-mx-6 sm:-mx-10 px-6 sm:px-10' : '',
            ]"
          >
            <div class="lg:col-span-5 flex items-center gap-4 pr-4">
              <div :class="getCoverageInputClass(row)">
                <Check v-if="row.checked" :size="14" class="text-white" :stroke-width="4" />
              </div>
              <span :class="['text-[16px] sm:text-[17px] font-bold leading-tight', row.disabled ? 'text-gray-400' : 'text-gray-800']">
                {{ row.title }}
                <span v-if="row.hasInfo" class="relative inline-block ml-2 align-text-bottom group/tooltip">
                  <HelpCircle :size="17" :class="[row.disabled ? 'text-gray-400' : 'text-[#2D74B5]', 'shrink-0 inline-block']" />
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
                        disabled
                        class="appearance-none w-full !bg-[#F8FAFC] !text-[#64748B] border border-[#E5EDF5] rounded-lg px-4 py-2 font-bold text-[15px] outline-none h-10 text-right pr-10 cursor-not-allowed pointer-events-none"
                      >
                        <option>{{ item.value }}</option>
                      </select>
                    </div>
                    <span v-else :class="['font-black text-lg sm:text-xl tracking-tighter', row.disabled ? 'text-gray-400' : 'text-[#2D74B5]']">
                      {{ item.value }}
                    </span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-none">
      <div class="border-t-[5px] border-[#F97316] px-6 sm:px-10 pt-8 sm:pt-10 pb-0">
        <div class="flex items-center gap-4 mb-6 sm:mb-8">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white shadow-sm">
            <MapPin :size="22" />
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-gray-800">其他事項</h3>
            <p class="text-sm sm:text-base text-gray-400 mt-1">投保需求與聯繫偏好設定</p>
          </div>
        </div>

        <div class="bg-[#F8FAFC] border-l-4 border-[#2D74B5] px-6 py-5 space-y-5 mb-0">
          <p class="text-[15px] leading-8 text-gray-500 font-bold">
            依據
            <span class="text-[#F97316]">「保險業招攬及核保理賠辦法」</span>
            規範，保險公司須了解並評估您保險需求及適合度。
          </p>
          <p class="text-[15px] leading-8 text-gray-500 font-bold">
            依據
            <span class="text-[#F97316]">「保險業辦理電子商務應注意事項」</span>
            規定，為了保障您的權益，並確保您已充分了解投保內容與商品特性，本公司將隨機抽樣進行投保意願之確認。
          </p>
        </div>
      </div>

      <div class="px-6 sm:px-10 pt-8 pb-10 sm:pb-12 grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16">
        <div class="space-y-10">
          <div>
            <p class="text-base font-black text-[#2D74B5] mb-6">投保目的與需求</p>
            <div class="space-y-5">
              <label :class="['flex items-center gap-3 text-[16px] font-bold text-gray-800', props.readOnly ? 'cursor-not-allowed' : 'cursor-pointer']">
                <span :class="otherCheckboxClass(purposeProperty, props.readOnly)">
                  <Check v-if="purposeProperty" :size="14" class="text-white" :stroke-width="4" />
                </span>
                <span>為財產及利益作風險規劃</span>
              </label>
              <label :class="['flex items-center gap-3 text-[16px] font-bold text-gray-800', props.readOnly ? 'cursor-not-allowed' : 'cursor-pointer']">
                <span :class="otherCheckboxClass(purposeLiability, props.readOnly)">
                  <Check v-if="purposeLiability" :size="14" class="text-white" :stroke-width="4" />
                </span>
                <span>依法應負之賠償責任作風險規劃</span>
              </label>
              <label :class="['flex items-center gap-3 text-[16px] font-bold text-gray-800', props.readOnly ? 'cursor-not-allowed' : 'cursor-pointer']">
                <span :class="otherCheckboxClass(purposeInjury, props.readOnly)">
                  <Check v-if="purposeInjury" :size="14" class="text-white" :stroke-width="4" />
                </span>
                <span>可能承受之傷害作風險規劃</span>
              </label>
              <div class="flex items-center gap-3">
                <span :class="otherCheckboxClass(purposeOther, props.readOnly)">
                  <Check v-if="purposeOther" :size="14" class="text-white" :stroke-width="4" />
                </span>
                <span class="text-[16px] font-bold text-gray-800 shrink-0">其他</span>
                <input
                  v-model="purposeOtherText"
                  type="text"
                  placeholder="請輸入"
                  :disabled="props.readOnly"
                  :class="otherInputClass"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-12">
          <div>
            <p class="text-base font-black text-[#2D74B5] mb-6">一般人士（方便電話訪問時間）</p>
            <div class="space-y-5">
              <label :class="['flex items-center gap-3 text-[16px] font-bold text-gray-800', props.readOnly ? 'cursor-not-allowed' : 'cursor-pointer']">
                <span :class="otherCheckboxClass(callMorning, props.readOnly)">
                  <Check v-if="callMorning" :size="14" class="text-white" :stroke-width="4" />
                </span>
                <span>AM 9:00 ~ PM 12:30</span>
              </label>
              <label :class="['flex items-center gap-3 text-[16px] font-bold text-gray-800', props.readOnly ? 'cursor-not-allowed' : 'cursor-pointer']">
                <span :class="otherCheckboxClass(callAfternoon, props.readOnly)">
                  <Check v-if="callAfternoon" :size="14" class="text-white" :stroke-width="4" />
                </span>
                <span>PM 1:30 ~ PM 5:00</span>
              </label>
            </div>
          </div>

          <div>
            <p class="text-base font-black text-[#2D74B5] mb-6">聽語障礙人士</p>
            <label :class="['flex items-center gap-3 text-[16px] font-bold text-gray-800', props.readOnly ? 'cursor-not-allowed' : 'cursor-pointer']">
              <span :class="otherCheckboxClass(smsConfirm, props.readOnly)">
                <Check v-if="smsConfirm" :size="14" class="text-white" :stroke-width="4" />
              </span>
              <span>同意以簡訊方式進行投保意願確認</span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <section v-if="props.readOnly" class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-none">
      <div class="px-6 sm:px-10 py-10 sm:py-12">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-black text-[#F97316] tracking-widest">我已詳閱並同意</h2>
        </div>

        <div class="flex flex-col md:flex-row gap-6 mb-6">
          <button
            type="button"
            :class="[
              'flex-1 py-4 px-6 rounded-[16px] border-2 transition-all flex items-center gap-4',
              activeAgreementTab === 'law' ? 'bg-[#2D74B5] text-white border-[#2D74B5]' : 'bg-white text-[#2D74B5] border-[#2D74B5]',
            ]"
            @click="activeAgreementTab = 'law'"
          >
            <ModernCheck :checked="true" :solid="activeAgreementTab === 'law'" />
            <span class="text-base font-bold leading-tight">產險業履行個人資料保護法告知義務內容</span>
          </button>

          <button
            type="button"
            :class="[
              'flex-1 py-4 px-6 rounded-[16px] border-2 transition-all flex items-center gap-4',
              activeAgreementTab === 'statement' ? 'bg-[#2D74B5] text-white border-[#2D74B5]' : 'bg-white text-[#2D74B5] border-[#2D74B5]',
            ]"
            @click="activeAgreementTab = 'statement'"
          >
            <ModernCheck :checked="true" :solid="activeAgreementTab === 'statement'" />
            <span class="text-base font-bold leading-tight">網路投保聲明事項</span>
          </button>
        </div>

        <div class="text-center mb-6">
          <p class="text-gray-600 font-black text-base tracking-wide">(請滑動頁面詳閱完整內容)</p>
        </div>

        <div class="bg-[#F8FAFC] p-8 sm:p-10 rounded-[16px] h-[500px] overflow-y-auto border border-[#E2E8F0] font-normal text-gray-600 text-base leading-relaxed shadow-inner">
          <div v-if="activeAgreementTab === 'law'" class="space-y-8">
            <div>
              <p class="font-bold text-gray-800 text-lg">
                南山產物保險股份有限公司(以下稱本公司)依據個人資料保護法（以下稱個資法）第六條第二項、第八條第一項及第九條第一項規定，向 台端告知下列事項，請 台端詳閱：
              </p>
            </div>
            <div class="space-y-4">
              <p><span class="font-bold text-gray-800">一、</span>蒐集之目的：人身保險、行銷、金融服務業依法令規定及金融監理需要所為之蒐集處理及利用、財產保險、消費者管理與服務及其他經營合於營業登記項目之業務。</p>
              <p><span class="font-bold text-gray-800">二、</span>蒐集之個人資料類別：姓名、身分證字號、出生年月日、性別、聯絡方式、汽機車牌照號碼、行照資料、財務資料及其他得以直接或間接識別該個人之資料。</p>
              <p><span class="font-bold text-gray-800">三、</span>個人資料之來源：要保人、被保險人，或其法定代理人、輔助人。</p>
              <p><span class="font-bold text-gray-800">四、</span>個人資料利用之期間、對象、地區、方式：因執行業務所必須及依法令規定應保存之期間內，提供予本公司、產壽險公會、保險事業發展中心、再保公司、依法有調查權機關或金融監理機關等於法令允許範圍內利用。</p>
              <p><span class="font-bold text-gray-800">五、</span>依據個資法第三條規定，台端得向本公司查詢、閱覽、製給複製本、補充、更正、停止蒐集處理利用及刪除個人資料。</p>
              <p><span class="font-bold text-gray-800">六、</span>台端不提供個人資料所致權益之影響：本公司將可能延後或無法進行必要之審核及處理作業，因此可能婉謝承保、遲延或無法提供相關服務或給付。</p>
              <p><span class="font-bold text-gray-800">七、</span>台端應事先取得其他法定代理人之同意授權始得提供未成年子女之個人資料予本公司。</p>
            </div>
          </div>

          <div v-else class="space-y-8">
            <div>
              <p class="font-bold text-gray-800 text-xl mb-4 underline decoration-[#2D74B5] underline-offset-4">【要保人與被保險人聲明事項】</p>
              <div class="space-y-4">
                <p><span class="font-bold text-gray-800">一、</span>本人(要保人、被保險人)已審閱並瞭解南山產物所提供之「投保須知」，另依「產險業履行個人資料保護法告知義務內容」，本人已瞭解並同意南山產物蒐集、處理及利用個人資料之目的及用途。</p>
                <p><span class="font-bold text-gray-800">二、</span>本人知悉南山產物得依個人資料保護法之相關規定，於特定目的範圍內對個人資料，有蒐集、處理及利用之權利。</p>
                <p><span class="font-bold text-gray-800">三、</span>本人同意南山產物將本要保書上所載個人資料轉送產、壽險公會建立電腦系統連線，供會員公司查詢作為核保及理賠之參考。</p>
              </div>
            </div>
            <div>
              <p class="font-bold text-gray-800 text-xl mb-4 underline decoration-[#2D74B5] underline-offset-4">【南山產物聲明事項】</p>
              <div class="space-y-4">
                <p><span class="font-bold text-gray-800">一、</span>本商品經南山產物合格簽署人員檢視其內容業已符合保險精算原則及保險法令，消費者仍應詳加閱讀保險單條款與相關文件，審慎選擇保險商品。</p>
                <p><span class="font-bold text-gray-800">二、</span>保險契約各項權利義務皆詳列於保單條款，消費者務必詳加閱讀了解。</p>
                <p><span class="font-bold text-gray-800">三、</span>投保後解約或不繼續繳費可能不利消費者，請慎選符合需求之保險商品。</p>
                <p><span class="font-bold text-gray-800">四、</span>南山產物保留承保與否之權利。其他未盡詳細事項，依保單條款辦理。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-6xl mx-auto w-full px-4 pb-8 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center shrink-0">
      <button
        class="w-full sm:w-60 h-[65px] border-2 rounded-full transition font-black text-xl flex items-center justify-center gap-2 bg-white border-gray-300 text-[#2D74B5] hover:bg-blue-50"
        @click="emit('back')"
      >
        <ChevronLeft :size="24" />
        上一步
      </button>
      <button
        :class="[
          'font-black rounded-full bg-[#E6162D] text-white hover:bg-[#c11226] transition flex items-center justify-center shadow-none text-center',
          props.readOnly ? 'w-full sm:w-auto min-h-[65px] px-8 py-4 text-lg sm:text-xl leading-tight gap-2 sm:gap-3' : 'w-full sm:w-60 h-[65px] text-2xl gap-3',
        ]"
        @click="emit('next')"
      >
        <span>{{ props.nextLabel }}</span>
        <ChevronRight :size="28" />
      </button>
    </div>
  </div>
</template>

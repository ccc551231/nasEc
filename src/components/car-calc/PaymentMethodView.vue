<script setup lang="ts">
import { ref } from "vue";
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, CreditCard, FileText, ShieldCheck } from "lucide-vue-next";

const emit = defineEmits<{
  back: [];
  next: [];
}>();

const rootEl = ref<HTMLElement | null>(null);
const selectedMethod = ref<"bank" | "credit">("credit");

defineExpose({
  rootEl,
});

const stepItems = [
  { id: 1, title: "資料輸入", icon: FileText },
  { id: 2, title: "資料確認", icon: ClipboardCheck },
  { id: 3, title: "繳費", icon: CreditCard },
  { id: 4, title: "完成投保", icon: CheckCircle2 },
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
            :style="{ width: `calc(75% * ${2 / (stepItems.length - 1)})` }"
          />

          <div v-for="(step, index) in stepItems" :key="step.id" class="relative z-10 flex flex-col items-center flex-1">
            <button
              type="button"
              :class="[
                'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-4',
                index === 2
                  ? 'bg-[#2D74B5] border-[#2D74B5] text-white shadow-lg scale-110 shadow-[#2D74B5]/10'
                  : index < 2
                    ? 'bg-[#2D74B5] border-[#2D74B5] text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-400 cursor-not-allowed',
              ]"
            >
              <CheckCircle2 v-if="index < 2" class="w-7 h-7" />
              <component :is="step.icon" v-else class="w-6 h-6" />
            </button>

            <div class="mt-5 text-center whitespace-nowrap">
              <p :class="['text-[11px] font-bold uppercase tracking-widest', index <= 2 ? 'text-[#2D74B5]' : 'text-slate-400']">
                Step 0{{ step.id }}
              </p>
              <p :class="['text-base font-semibold hidden md:block', index <= 2 ? 'text-slate-900' : 'text-slate-400']">
                {{ step.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-20px_rgba(30,41,59,0.08)] overflow-hidden mb-8">
      <div class="px-6 md:px-10 py-8 md:py-12">
        <div class="flex flex-col lg:flex-row justify-between items-start mb-10 gap-6">
          <div class="space-y-1">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-8 bg-[#2D74B5] rounded-full" />
              <h3 class="text-3xl font-black text-[#1E293B] tracking-tight">選擇繳費方式</h3>
            </div>
            <p class="text-sm text-[#64748B] font-bold ml-[18px] uppercase tracking-widest">
              Secure Payment Selection
            </p>
          </div>

          <div class="bg-[#FFF7ED] border border-[#FFEDD5] px-6 py-3 rounded-xl flex items-start sm:items-center gap-3 shadow-sm">
            <AlertCircle :size="20" class="text-[#F97316] shrink-0 mt-0.5 sm:mt-0" />
            <p class="text-[#EA580C] font-bold text-sm leading-relaxed">
              為保障您的權益，請於
              <span class="text-lg underline underline-offset-4 decoration-2">30分鐘內</span>
              完成繳費。
            </p>
          </div>
        </div>

        <div class="flex items-start sm:items-center gap-2 text-[#64748B] text-[16px] mb-8 ml-1">
          <ShieldCheck :size="16" class="text-[#2D74B5] shrink-0 mt-0.5 sm:mt-0" />
          <span>本網站使用 SSL 安全金鑰加密機制，您可以放心使用線上繳款服務。</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <button
            type="button"
            class="group relative border-2 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col text-left"
            :class="selectedMethod === 'bank' ? 'border-[#2D74B5] bg-white ring-4 ring-[#2D74B5]/5 shadow-xl' : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'"
            @click="selectedMethod = 'bank'"
          >
            <div class="py-3 text-center text-sm font-bold tracking-widest text-white transition-colors" :class="selectedMethod === 'bank' ? 'bg-[#2D74B5]' : 'bg-[#94A3B8]'">
              推薦使用
            </div>

            <div class="p-8 md:p-10 flex-grow space-y-8">
              <div class="flex justify-between items-start gap-4">
                <div class="space-y-2">
                  <h4 class="text-2xl font-black transition-colors" :class="selectedMethod === 'bank' ? 'text-[#2D74B5]' : 'text-[#475569]'">輸入銀行帳號</h4>
                  <p class="text-[#94A3B8] font-medium">(不需 VISA 功能)</p>
                </div>
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 shrink-0"
                  :class="selectedMethod === 'bank' ? 'bg-[#2D74B5] border-[#2D74B5] text-white' : 'bg-[#F1F5F9] border-[#E2E8F0] text-transparent'"
                >
                  <CheckCircle2 :size="24" />
                </div>
              </div>

              <ul class="space-y-4">
                <li class="flex items-center gap-3 text-[#64748B] font-bold">
                  <div class="w-2 h-2 rounded-full" :class="selectedMethod === 'bank' ? 'bg-[#2D74B5]' : 'bg-[#CBD5E1]'" />
                  免手續費、讀卡機
                </li>
                <li class="flex items-center gap-3 text-[#64748B] font-bold">
                  <div class="w-2 h-2 rounded-full" :class="selectedMethod === 'bank' ? 'bg-[#2D74B5]' : 'bg-[#CBD5E1]'" />
                  輸入銀行帳號即可繳費
                </li>
              </ul>

              <div
                class="w-full py-4 rounded-full font-black text-xl transition-all shadow-md text-center"
                :class="selectedMethod === 'bank' ? 'bg-[#2D74B5] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'"
              >
                選擇此項
              </div>
            </div>
          </button>

          <button
            type="button"
            class="group relative border-2 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col text-left"
            :class="selectedMethod === 'credit' ? 'border-[#2D74B5] bg-white ring-4 ring-[#2D74B5]/5 shadow-xl' : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'"
            @click="selectedMethod = 'credit'"
          >
            <div class="py-3 text-center text-sm font-bold tracking-widest transition-colors" :class="selectedMethod === 'credit' ? 'bg-[#2D74B5] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'">
              信用卡支付
            </div>

            <div class="p-8 md:p-10 flex-grow space-y-8">
              <div class="flex justify-between items-start gap-4">
                <div class="space-y-2">
                  <h4 class="text-2xl font-black transition-colors" :class="selectedMethod === 'credit' ? 'text-[#2D74B5]' : 'text-[#475569]'">信用卡線上刷卡</h4>
                  <p class="text-[#94A3B8] font-medium">支援各行各業發卡行</p>
                </div>
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 shrink-0"
                  :class="selectedMethod === 'credit' ? 'bg-[#2D74B5] border-[#2D74B5] text-white' : 'bg-[#F1F5F9] border-[#E2E8F0] text-transparent'"
                >
                  <CheckCircle2 :size="24" />
                </div>
              </div>

              <ul class="space-y-4">
                <li class="flex items-center gap-3 text-[#64748B] font-bold">
                  <div class="w-2 h-2 rounded-full" :class="selectedMethod === 'credit' ? 'bg-[#2D74B5]' : 'bg-[#CBD5E1]'" />
                  免手續費、讀卡機
                </li>
                <li class="flex items-center gap-3 text-[#64748B] font-bold">
                  <div class="w-2 h-2 rounded-full" :class="selectedMethod === 'credit' ? 'bg-[#2D74B5]' : 'bg-[#CBD5E1]'" />
                  輸入卡號、到期日、安全碼繳費
                </li>
              </ul>

              <div
                class="w-full py-4 rounded-full font-black text-xl transition-all shadow-md text-center"
                :class="selectedMethod === 'credit' ? 'bg-[#2D74B5] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'"
              >
                選擇此項
              </div>
            </div>
          </button>
        </div>

        <div class="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
          <button
            type="button"
            class="w-full sm:w-60 h-[65px] border-2 rounded-full transition font-black text-xl flex items-center justify-center gap-2 bg-white border-gray-300 text-[#2D74B5] hover:bg-blue-50"
            @click="emit('back')"
          >
            <ChevronLeft :size="24" />
            上一步
          </button>
          <button
            type="button"
            class="w-full sm:w-60 h-[65px] font-black text-2xl rounded-full bg-[#E6162D] text-white hover:bg-[#c11226] transition flex items-center justify-center gap-3 shadow-none"
            @click="emit('next')"
          >
            下一步
            <ChevronRight :size="28" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, ClipboardCheck, ExternalLink, FileText, Home, Info, MessageCircle, ShieldCheck, Smartphone, CreditCard } from "lucide-vue-next";
import { ref } from "vue";

const rootEl = ref<HTMLElement | null>(null);

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
          <div class="absolute top-7 left-[12.5%] h-1.5 bg-[#2D74B5] -translate-y-1/2 z-0 transition-all duration-500 ease-in-out" :style="{ width: '75%' }" />

          <div v-for="(step, index) in stepItems" :key="step.id" class="relative z-10 flex flex-col items-center flex-1">
            <button
              type="button"
              :class="[
                'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-4',
                index === 3 ? 'bg-[#2D74B5] border-[#2D74B5] text-white shadow-lg scale-110 shadow-[#2D74B5]/10' : 'bg-[#2D74B5] border-[#2D74B5] text-white shadow-md',
              ]"
            >
              <CheckCircle2 v-if="index < 3" class="w-7 h-7" />
              <component :is="step.icon" v-else class="w-6 h-6" />
            </button>

            <div class="mt-5 text-center whitespace-nowrap">
              <p class="text-[11px] font-bold uppercase tracking-widest text-[#2D74B5]">Step 0{{ step.id }}</p>
              <p class="text-base font-semibold hidden md:block text-slate-900">{{ step.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="bg-white rounded-2xl shadow-2xl shadow-blue-900/5 overflow-hidden border border-slate-100 mb-8">
      <div class="bg-[#2D74B5] py-14 px-8 text-center relative overflow-hidden">
        <div class="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div class="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-black/10 rounded-full blur-2xl" />

        <div class="relative z-10 flex flex-col items-center gap-4">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
            <CheckCircle2 :size="40" class="text-[#2D74B5]" />
          </div>
          <div class="space-y-1">
            <h2 class="text-3xl font-black text-white tracking-tight">完成投保</h2>
            <p class="text-white/80 font-medium">感謝您選擇本公司所提供之網路投保服務</p>
          </div>
        </div>
      </div>

      <div class="p-8 md:p-12 space-y-8">
        <div class="bg-[#F1F7FD] border border-[#D9E9F7] p-5 rounded-xl text-center">
          <p class="text-[#1E293B] font-medium">
            您於
            <span class="text-[#2D74B5] font-black text-lg mx-1">民國 115 年 03 月 27 日 17 時 38 分</span>
            申請投保之保險契約
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white border border-[#E2E8F0] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 mb-4">
              <div class="bg-[#2D74B5]/10 p-2 rounded-lg text-[#2D74B5]">
                <ShieldCheck :size="20" />
              </div>
              <span class="text-xs font-black text-[#64748B] uppercase tracking-widest">強制證號</span>
            </div>
            <p class="text-xl font-black text-[#1E293B] font-mono tracking-tight">TEST-CAR-CTPL-0001</p>
          </div>

          <div class="bg-white border border-[#E2E8F0] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 mb-4">
              <div class="bg-[#2D74B5]/10 p-2 rounded-lg text-[#2D74B5]">
                <FileText :size="20" />
              </div>
              <span class="text-xs font-black text-[#64748B] uppercase tracking-widest">任意險保單號碼</span>
            </div>
            <p class="text-xl font-black text-[#1E293B] font-mono tracking-tight">TEST-CAR-VOL-0001</p>
          </div>
        </div>

        <div class="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
          <Info class="text-[#2D74B5] shrink-0" :size="24" />
          <p class="text-slate-600 text-sm leading-relaxed">
            核保並取得扣款完成後將以簡訊通知您，電子保險單、電子式強制證將於交易日起
            <span class="text-[#1E293B] font-bold mx-1">四個工作天內</span>
            透過 email 提供給您，如未收到請洽本公司客服中心辦理，謝謝！
          </p>
        </div>

        <div class="bg-[#F0FFF4] border border-[#C6F6D5] p-6 rounded-xl flex flex-col md:flex-row items-center gap-4">
          <div class="bg-[#1D9C39] p-3 rounded-2xl text-white">
            <MessageCircle :size="32" fill="white" />
          </div>
          <div class="flex-grow text-center md:text-left">
            <h4 class="text-[#1A531B] font-black tracking-tight">【南山60，感謝有你】</h4>
            <p class="text-[#22543D] text-sm mt-1">
              加入南山產物 LINE 官方帳號並綁定，讓保單查詢及理賠進度查詢等服務與您隨行。
            </p>
          </div>
          <a
            href="https://lin.ee/i8wgZRv"
            target="_blank"
            rel="noreferrer"
            class="bg-[#1D9C39] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#16802e] transition-colors flex items-center gap-2"
          >
            立即加入
            <ExternalLink :size="14" />
          </a>
        </div>

        <div class="pt-6 border-t border-slate-100 text-center md:text-left space-y-4">
          <div class="space-y-1">
            <h3 class="text-[#2D74B5] font-black text-xl italic">祝 闔家平安 順心如意！</h3>
            <p class="text-slate-700 font-bold">南山產物保險股份有限公司 敬上</p>
          </div>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-slate-400 text-xs font-medium">
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <Smartphone :size="14" />
              <span>諮詢電話：0800-020-060 按 2</span>
              <span class="mx-2">|</span>
              <span>營業時間：早上 9:00 ~ 下午 5:30</span>
            </div>
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <ShieldCheck :size="14" />
              <span class="tracking-widest uppercase">Certified Transaction</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center pt-6">
          <RouterLink
            to="/"
            class="w-full md:w-auto px-20 py-4 bg-[#2D74B5] text-white rounded-full font-black text-xl shadow-xl shadow-blue-100 hover:bg-[#1e5a91] transition-all flex items-center justify-center gap-2"
          >
            <Home :size="22" />
            回首頁
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

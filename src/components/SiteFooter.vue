<script setup lang="ts">
import { Home, PhoneCall } from "lucide-vue-next";

withDefaults(
  defineProps<{
    showContacts?: boolean;
  }>(),
  {
    showContacts: false,
  }
);
</script>

<template>
  <footer>
    <div v-if="showContacts" class="bg-[#007AC1] text-white py-8 px-4 rounded-t-[60px]">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
        <div class="flex items-center gap-5">
          <div class="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center shrink-0">
            <PhoneCall class="w-7 h-7 text-white" />
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-black tracking-tight mb-1">0800-020-060#2</div>
            <div class="text-blue-100 text-sm font-bold opacity-80">網路投保服務專線</div>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <div class="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center shrink-0">
            <PhoneCall class="w-7 h-7 text-white" />
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-black tracking-tight mb-1">0800-005-678</div>
            <div class="text-blue-100 text-sm font-bold opacity-80">理賠服務專線</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#0054A6] py-12 px-4">
      <div class="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-6 text-sm md:text-base font-bold text-white/90">
        <a href="#" class="hover:text-white transition">電子商務自律規範</a>
        <a href="#" class="hover:text-white transition">主管機關網站</a>
        <a href="#" class="hover:text-white transition">隱私權保護聲明</a>
        <a href="#" class="hover:text-white transition">會員服務條款(含個資告知)</a>
        <a href="#" class="hover:text-white transition">網路使用條款</a>
        <a href="#" class="hover:text-white transition">服務據點</a>
      </div>
    </div>

    <div class="bg-[#001D3D] py-12 px-4 md:px-12 text-white/50 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
        <div class="space-y-3 text-left w-full">
          <p class="text-sm md:text-base font-bold text-blue-200/80 text-nowrap">
            南山產物總公司 台北市中正區忠孝西路一段6號19樓
          </p>
          <p class="text-xs md:text-sm font-bold">電話客服中心：0800-020-060按2 (營業時間：早上9：00~下午5：30)</p>
          <p class="text-[10px] md:text-xs font-medium tracking-wide">
            Copyright © Nan Shan General Insurance Company, Ltd. All rights reserved. 建議瀏覽器：Chrome, Safari,
            Edge 最新版本
          </p>
        </div>
        <div class="flex items-center gap-4 shrink-0">
          <div class="w-10 h-10 rounded-full bg-blue-200/10 flex items-center justify-center hover:bg-blue-200/20 cursor-pointer transition">
            <div class="text-[10px] font-black text-white bg-[#00B900] px-1 rounded-sm">LINE</div>
          </div>
          <div class="w-10 h-10 rounded-full bg-blue-200/10 flex items-center justify-center hover:bg-blue-200/20 cursor-pointer transition">
            <Home class="w-[18px] h-[18px] text-white/80" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

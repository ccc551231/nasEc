<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ChevronRight, Clock, DollarSign, Zap } from "lucide-vue-next";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import BaseModal from "@/components/BaseModal.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import carProtectionImg from "@/assets/ce42f02af2734e04a1167ed3728f2508ae67e8a4.png";
import bannerImg from "@/assets/dd2ed3489ce1cb59f5bce0358874607288061a2e.png";
import bannerCarImg from "@/assets/636f04834e2136edf4119e9dd250cf094506d71f.png";

type ModalType = "modal-rules" | "modal-scope" | "modal-payment" | null;

const router = useRouter();
const openModal = ref<ModalType>(null);
const activeTab = ref("section-features");

watch(openModal, (value) => {
  document.body.style.overflow = value ? "hidden" : "auto";
});

const faqItems = [
  {
    question: "Q1：我想要申請網路投保該如何辦理？須具備哪些資格？",
    answer: '答：只要您年滿18歲以上且具有行為能力並為本國籍，請至本網站完成<a href="#" class="text-blue-500 underline mx-1 font-bold">「會員註冊」</a>，即可進行投保。',
  },
  {
    question: "Q2：強制責任保險投保後，中途能否辦理退保？",
    answer:
      "答：依據【強制汽車責任保險法】第 21 條規定，除有特定情事外，要保人不得終止保險契約。常見情況包含牌照繳銷、報廢或所有權移轉後重複投保。",
  },
  {
    question: "Q3：「強制汽車責任保險」與「汽車第三人責任保險」有何不同？",
    answer:
      "答：強制汽車責任保險為法定保險，提供受害者基本保障；汽車第三人責任保險則能補足超過強制險額度的賠償責任，並涵蓋財物損害。",
  },
  {
    question: "Q4：若汽車保險生效日期已中斷，應於何時起保？",
    answer: "答：建議起保日期為要保當日，若要保日過中午12時，請以隔一日為主。",
  },
  {
    question: "Q5：網路投保完成後，何時可以去監理站辦理「驗車」？",
    answer:
      "答：建議收到本公司寄發的保險證後再前往監理站；若急需驗車，可先下載電子式保險證或親洽服務據點出單。",
  },
  {
    question: "Q6：保險即將到期，要如何續保？",
    answer:
      "答：登入會員後點選「我要續保」，系統會帶出前一年度保單資料，您可以直接續保或調整內容後重新投保。",
  },
];

const scopeModalOpen = computed({
  get: () => openModal.value === "modal-scope",
  set: (value: boolean) => {
    openModal.value = value ? "modal-scope" : null;
  },
});

const rulesModalOpen = computed({
  get: () => openModal.value === "modal-rules",
  set: (value: boolean) => {
    openModal.value = value ? "modal-rules" : null;
  },
});

const paymentModalOpen = computed({
  get: () => openModal.value === "modal-payment",
  set: (value: boolean) => {
    openModal.value = value ? "modal-payment" : null;
  },
});
</script>

<template>
  <div class="antialiased bg-[#F8FAFC] text-[#2D3748]">
    <AppHeader :show-calc-link="true" cta-to="/car-insurance-calc" />

    <section class="relative w-full min-h-[520px] md:min-h-[600px] bg-[#EAF5FF] overflow-hidden mt-20 py-8">
      <div class="absolute inset-0 z-0 pointer-events-none opacity-60">
        <svg viewBox="0 0 1440 400" class="w-full h-full">
          <circle cx="1200" cy="80" r="40" fill="white" />
          <circle cx="1240" cy="90" r="30" fill="white" />
          <circle cx="200" cy="150" r="50" fill="white" />
          <circle cx="240" cy="160" r="40" fill="white" />
          <path d="M1100 200 Q1150 150 1200 200 T1300 200" stroke="#0054A6" stroke-width="1" fill="none" opacity="0.2" />
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10 h-full flex items-center justify-between gap-4">
        <div class="space-y-6 max-w-xl py-8">
          <div class="inline-block bg-[#005CAF] text-white px-4 py-2 rounded-md text-sm font-bold">車體險線上自動核保</div>
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">一站式全方位</h1>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-[#005CAF] leading-tight">車險守護</h1>
          </div>
          <div class="space-y-1 text-gray-700">
            <p class="text-base font-medium">強制險 + 駕駛人傷害險更全面。</p>
            <p class="text-base font-medium">結合智慧自動核算，給您最放心的行車保障。</p>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-white/90 backdrop-blur-sm rounded-[16px] p-4">
              <Clock class="w-8 h-8 text-[#005CAF] mb-2" />
              <h3 class="font-bold text-gray-900 mb-1">極速省時</h3>
              <p class="text-xs text-gray-600 leading-relaxed">免付照片人工審，投保不中斷。</p>
            </div>
            <div class="bg-white/90 backdrop-blur-sm rounded-[16px] p-4">
              <DollarSign class="w-8 h-8 text-[#005CAF] mb-2" />
              <h3 class="font-bold text-gray-900 mb-1">超值省錢</h3>
              <p class="text-xs text-gray-600 leading-relaxed">多種方案，最高享 85 折優惠。</p>
            </div>
            <div class="bg-white/90 backdrop-blur-sm rounded-[16px] p-4">
              <Zap class="w-8 h-8 text-[#005CAF] mb-2" />
              <h3 class="font-bold text-gray-900 mb-1">理賠迅速</h3>
              <p class="text-xs text-gray-600 leading-relaxed">30 分鐘啟動服務，一通電話即應。</p>
            </div>
          </div>
          <button
            class="group bg-[#0054A6] text-white px-10 py-3.5 rounded-full font-black text-lg border-2 border-[#0054A6] hover:bg-[#00458a] transition-all flex items-center gap-2"
            @click="router.push('/car-insurance-calc')"
          >
            立即開始
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>

        <div class="hidden lg:block w-[600px] absolute right-0 top-0 bottom-0 flex-shrink-0">
          <img :src="bannerCarImg" alt="汽車保險插圖" class="w-full h-full object-contain object-center" />
        </div>
      </div>
    </section>

    <div class="sticky top-20 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-center space-x-12 h-20 items-center text-gray-500 font-medium">
          <a
            href="#section-features"
            :class="['h-full flex items-center px-10 transition-all', activeTab === 'section-features' ? 'text-[#005CAF] font-bold border-b-4 border-[#005CAF]' : 'hover:text-[#005CAF]']"
            @click="activeTab = 'section-features'"
          >
            商品特色
          </a>
          <button class="h-full flex items-center px-10 hover:text-[#005CAF]" @click="openModal = 'modal-rules'">投保規則</button>
          <button class="h-full flex items-center px-10 hover:text-[#005CAF]" @click="openModal = 'modal-scope'">保障範圍</button>
          <a
            href="#section-faq"
            :class="['h-full flex items-center px-10 transition-all', activeTab === 'section-faq' ? 'text-[#005CAF] font-bold border-b-4 border-[#005CAF]' : 'hover:text-[#005CAF]']"
            @click="activeTab = 'section-faq'"
          >
            常見問題
          </a>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-6 py-20 space-y-24">
      <section id="section-features" class="scroll-mt-40 space-y-24">
        <div class="bg-white rounded-2xl p-12 shadow-sm border border-gray-50 grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <h2 class="text-2xl md:text-3xl font-black mb-4 text-[#0054A6] border-l-8 border-[#0054A6] pl-4">車體損失險</h2>
            <h4 class="text-lg md:text-xl font-bold mb-6 text-gray-800">全方位保障愛車</h4>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
              行車發生交通事故，有強制險及加保的第三人責任險能賠償對方，自己的愛車則需要有車體險才能獲得保障。
            </p>
            <div class="flex items-center text-[#0054A6] font-bold mb-4 text-sm md:text-base">下表秒懂車體險比較</div>
            <div class="overflow-x-auto border border-gray-100 rounded-2xl">
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">險別/承保範圍</th>
                    <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">乙式</th>
                    <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">丙式</th>
                    <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">丙式限額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="bg-white p-3 border border-gray-100 font-bold text-base text-center">賠償對象</td>
                    <td colspan="3" class="bg-white p-3 border border-gray-100 text-red-500 font-bold text-base text-center">我方車輛</td>
                  </tr>
                  <tr class="bg-[#F8FAFC]">
                    <td class="p-3 border border-gray-100 text-left font-medium px-4 text-base">車對車碰撞</td>
                    <td class="p-3 border border-gray-100 text-center text-base"><span class="text-red-500 font-black text-lg">O</span></td>
                    <td class="p-3 border border-gray-100 text-center text-base"><span class="text-red-500 font-black text-lg">O</span></td>
                    <td class="p-3 border border-gray-100 text-center text-base"><span class="text-red-500 font-black text-sm">O(限額賠償)</span></td>
                  </tr>
                  <tr>
                    <td class="bg-white p-3 border border-gray-100 text-left font-medium px-4 text-base">碰撞、傾覆</td>
                    <td class="bg-white p-3 border border-gray-100 text-center text-base"><span class="text-red-500 font-black text-lg">O</span></td>
                    <td class="bg-white p-3 border border-gray-100 text-center text-base">X</td>
                    <td class="bg-white p-3 border border-gray-100 text-center text-base">X</td>
                  </tr>
                  <tr class="bg-[#F8FAFC]">
                    <td class="p-3 border border-gray-100 text-left font-medium px-4 text-base">火災、雷擊、爆炸、墜落物</td>
                    <td class="p-3 border border-gray-100 text-center text-base"><span class="text-red-500 font-black text-lg">O</span></td>
                    <td class="p-3 border border-gray-100 text-center text-base">X</td>
                    <td class="p-3 border border-gray-100 text-center text-base">X</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex flex-col items-center justify-end">
            <img :src="carProtectionImg" alt="Car Insurance Protection" class="w-[500px] h-[500px] object-cover rounded-[16px]" />
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center overflow-hidden">
          <div class="w-full overflow-hidden rounded-t-2xl">
            <img :src="bannerImg" alt="Car Protection Banner" class="w-full h-full object-cover" />
          </div>
          <div class="w-full p-12 max-w-6xl space-y-16 text-left">
            <div class="grid md:grid-cols-3 gap-12">
              <section>
                <h3 class="text-2xl md:text-3xl font-black mb-4 text-[#0054A6] border-l-8 border-[#0054A6] pl-4">竊盜損失險</h3>
                <p class="text-sm text-gray-500 pl-4">保障愛車遭受強盜、搶奪、竊盜所致之損失。</p>
              </section>
              <section>
                <h3 class="text-2xl md:text-3xl font-black mb-4 text-[#0054A6] border-l-8 border-[#0054A6] pl-4">第三人責任險</h3>
                <p class="text-sm text-gray-500 pl-4">造成第三人之財物受損，必須加保第三人責任險。</p>
              </section>
              <section>
                <h3 class="text-2xl md:text-3xl font-black mb-4 text-[#0054A6] border-l-8 border-[#0054A6] pl-4">強制責任險</h3>
                <p class="text-sm text-gray-500 pl-4">凡汽車及行駛道路之動力機械，都必須投保。</p>
              </section>
            </div>

            <div>
              <div class="flex items-center text-[#0054A6] font-bold mb-8 text-xl">
                <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#0054A6" opacity="0.1" />
                  <path d="M7 12L10 15L17 8" stroke="#0054A6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0054A6" stroke-width="1.5" />
                </svg>
                下表秒懂車險賠償對象
              </div>
              <div class="overflow-x-auto rounded-2xl border border-gray-100">
                <table class="w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="bg-[#005CAF] text-white py-4 px-4 border border-white/20 text-base">險別/賠償對象</th>
                      <th class="bg-[#005CAF] text-white py-4 px-4 border border-white/20 text-base">我方駕駛</th>
                      <th class="bg-[#005CAF] text-white py-4 px-4 border border-white/20 text-base">我方乘客</th>
                      <th class="bg-[#005CAF] text-white py-4 px-4 border border-white/20 text-base">我方車輛</th>
                      <th class="bg-[#005CAF] text-white py-4 px-4 border border-white/20 text-base">對方駕駛及乘客、行人</th>
                      <th class="bg-[#005CAF] text-white py-4 px-4 border border-white/20 text-base">對方車輛及其他財產</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="bg-white text-left font-bold px-4 py-3 border border-gray-100 text-base">強制險</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                    </tr>
                    <tr class="bg-[#F8FAFC]">
                      <td class="text-left font-bold px-4 py-3 border border-gray-100 text-sm leading-tight">
                        強制險駕駛人傷害附加條款
                        <br />
                        <span class="font-normal text-xs">(汽車車主-交通意外)-限車主本人</span>
                      </td>
                      <td class="text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                    </tr>
                    <tr>
                      <td class="bg-white text-left font-bold px-4 py-3 border border-gray-100 text-base">第三人責任險(體傷/財損)</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                    </tr>
                    <tr class="bg-[#F8FAFC]">
                      <td class="text-left font-bold px-4 py-3 border border-gray-100 text-base">超額責任附加條款</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                    </tr>
                    <tr>
                      <td class="bg-white text-left font-bold px-4 py-3 border border-gray-100 text-base">駕駛人傷害保險(汽車車主-交通意外)</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                    </tr>
                    <tr class="bg-[#F8FAFC]">
                      <td class="text-left font-bold px-4 py-3 border border-gray-100 text-base">乘客體傷責任附加條款</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                    </tr>
                    <tr>
                      <td class="bg-white text-left font-bold px-4 py-3 border border-gray-100 text-base">道路救援費用附加條款</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                    </tr>
                    <tr class="bg-[#F8FAFC]">
                      <td class="text-left font-bold px-4 py-3 border border-gray-100 text-base">車體損失保險</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="text-center py-3 border border-gray-100 text-base">X</td>
                    </tr>
                    <tr>
                      <td class="bg-white text-left font-bold px-4 py-3 border border-gray-100 text-base">車體竊盜保險</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base"><span class="text-green-600 font-black text-lg">O</span></td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                      <td class="bg-white text-center py-3 border border-gray-100 text-base">X</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
        <div class="mb-10">
          <h2 class="text-3xl md:text-4xl font-black text-[#0054A6] mb-2">條款須知</h2>
          <p class="text-gray-500 text-sm">投保前請詳細閱讀以下資訊</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-10">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200/50 hover:shadow-md transition-all group">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-[#0054A6] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">保單條款</h3>
                  <p class="text-xs text-gray-500 mt-1">Policy Terms</p>
                </div>
              </div>
            </div>
            <button class="mt-4 w-full bg-white text-[#0054A6] py-2.5 rounded-lg font-bold hover:bg-[#0054A6] hover:text-white transition-all text-sm shadow-sm" @click="openModal = 'modal-scope'">
              了解更多 →
            </button>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200/50 hover:shadow-md transition-all group">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-[#0054A6] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">投保規則</h3>
                  <p class="text-xs text-gray-500 mt-1">Insurance Rules</p>
                </div>
              </div>
            </div>
            <button class="mt-4 w-full bg-white text-[#0054A6] py-2.5 rounded-lg font-bold hover:bg-[#0054A6] hover:text-white transition-all text-sm shadow-sm" @click="openModal = 'modal-rules'">
              了解更多 →
            </button>
          </div>
        </div>

        <div class="bg-amber-50 rounded-xl p-6 border-2 border-amber-200 mb-8">
          <div class="flex items-start">
            <div class="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center mr-4 shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke-width="2.5" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 10h18M7 14h2" />
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-bold text-gray-800 mb-2">僅限要保人信用卡/銀行帳戶繳費</h4>
              <button class="text-[#0054A6] text-sm font-bold hover:underline inline-flex items-center" @click="openModal = 'modal-payment'">
                信用卡/銀行帳戶說明
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
          <div class="flex items-start mb-4">
            <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3 shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 class="text-xl font-bold text-red-900">重要注意事項</h4>
          </div>

          <div class="space-y-3 text-sm leading-relaxed">
            <div class="flex items-start">
              <span class="text-red-500 mr-2 font-bold shrink-0">※</span>
              <p class="text-gray-700">消費者於投保前，應審慎閱覽本保險商品之承保範圍、除外不保事項及商品限額。</p>
            </div>

            <div class="flex items-start">
              <span class="text-red-500 mr-2 font-bold shrink-0">※</span>
              <p class="text-gray-700">
                本商品經金管會符合投保資料具裝置已符合保險業務員資格及保險法令，惟為確保權益，
                <span class="font-bold text-red-600">其於保險契約與理賠審慎審對書面原則</span>
                ，消費者仍應詳加閱讀保險條款修改與同意文件，審慎選擇保險商品。本商品如有虛偽不實或違法隱事，應由本公司及負責人依法負責。
              </p>
            </div>

            <div class="flex items-start">
              <span class="text-red-500 mr-2 font-bold shrink-0">※</span>
              <p class="text-gray-700">投保後將約定不繼續繳費可能不利消費者，請慎選符合需求之保險商品。</p>
            </div>

            <div class="flex items-start">
              <span class="text-red-500 mr-2 font-bold shrink-0">※</span>
              <p class="text-gray-700">保險契約各項權利義務詳列於保單條款，消費者務必詳細閱讀了解。</p>
            </div>

            <div class="flex items-start">
              <span class="text-red-500 mr-2 font-bold shrink-0">※</span>
              <p class="text-gray-700">本商品為保險商品，依保險法及其他相關規定，受保險安定基金之保障，但不受存款保險之保障。</p>
            </div>

            <div class="flex items-start">
              <span class="text-red-500 mr-2 font-bold shrink-0">※</span>
              <p class="text-gray-700">本商品一切權利義務，悉依保單條款為準。本公司保有承保與否的權利。</p>
            </div>

            <div class="flex items-start">
              <span class="text-red-500 mr-2 font-bold shrink-0">※</span>
              <p class="text-gray-700">
                消費者於購買前，應詳閱各種銷售文件內容，本商品之預定費用率(預定附加費用率)最高
                <span class="font-bold text-red-600">35%</span>
                ，最低
                <span class="font-bold text-red-600">23.17%</span>
                ；如要詳細了解詳他相關資訊，請洽本公司業務員、服務據點(免付費電話：
                <a href="tel:0800-020-060" class="text-[#0054A6] font-bold hover:underline">0800-020-060 按2</a>
                )或網站(
                <a href="https://www.nanshangeneral.com.tw" target="_blank" rel="noopener noreferrer" class="text-[#0054A6] font-bold hover:underline">www.nanshangeneral.com.tw</a>
                )，以保障您的權益。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="section-faq" class="scroll-mt-40 max-w-5xl mx-auto">
        <div class="mb-10 text-center">
          <h2 class="text-3xl md:text-4xl font-black text-[#0054A6] mb-2">常見問題</h2>
          <p class="text-gray-500 text-sm">投保及理賠相關問題解答</p>
        </div>

        <div class="px-2 space-y-3">
          <details
            v-for="item in faqItems"
            :key="item.question"
            class="bg-white rounded-2xl mb-3 border-l-6 border-transparent transition-all shadow-sm group open:border-l-[#005CAF] open:shadow-md"
          >
            <summary class="flex justify-between items-center p-6 cursor-pointer list-none">
              <span class="font-bold text-gray-700">{{ item.question }}</span>
              <span class="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div class="px-8 pb-6 text-gray-500 text-sm border-t border-gray-50 pt-4 leading-relaxed" v-html="item.answer" />
          </details>
        </div>
      </section>
    </main>

    <SiteFooter />

    <BaseModal v-model="scopeModalOpen" title="保障範圍說明" subtitle="詳細了解各項保險商品的承保對象與限制">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 class="font-bold text-blue-900 mb-4 flex items-center text-2xl">商品承保內容</h4>
        <table class="w-full border-collapse text-base">
          <thead>
            <tr class="bg-slate-50">
              <th class="p-3 border border-gray-100 text-left">商品名稱</th>
              <th class="p-3 border border-gray-100 text-left">承保範圍摘要</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-bold px-4 py-3 border border-gray-100 bg-white">強制汽車責任險</td>
              <td class="text-left px-4 border border-gray-100 bg-white">保障車外第三人或乘客傷亡。</td>
            </tr>
            <tr class="bg-[#F8FAFC]">
              <td class="font-bold px-4 py-3 text-blue-600 border border-gray-100">車體損失保險</td>
              <td class="text-left px-4 border border-gray-100">保障我方愛車之碰撞、損壞。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseModal>

    <BaseModal v-model="rulesModalOpen" title="投保規則" subtitle="請確認您的資格符合以下規定" max-width="max-w-2xl" content-class="p-8 space-y-6">
      <div class="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 border-dashed">
        <ul class="space-y-4 text-gray-700 text-base">
          <li class="flex items-start">
            <span class="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] mr-3 mt-0.5 shrink-0 font-bold">1</span>
            <div><span class="font-bold block mb-1">要保人限制</span><p class="text-gray-500 italic">限車主本人（即行照登記之車主）。</p></div>
          </li>
          <li class="flex items-start">
            <span class="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] mr-3 mt-0.5 shrink-0 font-bold">2</span>
            <div><span class="font-bold block mb-1">年齡規範</span><p class="text-gray-500">強制險：18足歲以上；任意險：20 ~ 70足歲。</p></div>
          </li>
        </ul>
      </div>
      <template #footer>
        <button class="w-full py-3 bg-[#005CAF] text-white font-bold rounded-2xl text-base" @click="openModal = null">確認關閉</button>
      </template>
    </BaseModal>

    <BaseModal v-model="paymentModalOpen" title="信用卡/銀行帳戶說明" subtitle="網路投保目前開放配合之繳費方式" max-width="max-w-5xl">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 class="text-2xl font-bold text-[#0054A6] mb-4">網路投保目前有開放配合信用卡繳費之發卡銀行</h4>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-base text-gray-700">
          <div class="space-y-2"><p>（004）台灣銀行</p><p>（008）華南銀行</p><p>（013）國泰世華</p><p>（050）台灣企銀</p></div>
          <div class="space-y-2"><p>（005）土地銀行</p><p>（009）彰化銀行</p><p>（016）高雄銀行</p><p>（052）渣打銀行</p></div>
          <div class="space-y-2"><p>（006）合作金庫</p><p>（011）上海商銀</p><p>（017）兆豐銀行</p><p>（053）台中銀行</p></div>
          <div class="space-y-2"><p>（007）第一銀行</p><p>（012）台北富邦</p><p>（081）匯豐(台灣)</p><p>（822）中國信託</p></div>
        </div>
      </div>
      <template #footer>
        <button class="px-12 py-3 bg-[#005CAF] text-white font-bold rounded-2xl text-base hover:bg-[#004385] transition-all" @click="openModal = null">
          我已了解
        </button>
      </template>
    </BaseModal>
  </div>
</template>

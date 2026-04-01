<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ChevronRight, Clock, DollarSign, Zap } from "lucide-vue-next";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import BaseModal from "@/components/BaseModal.vue";
import MotorcycleFooter from "@/components/MotorcycleFooter.vue";
import motorcycleHeroImg from "@/assets/6d03e9a52328e49b42c006933b6811e0f02cc674.png";
import motorcycleFeatureIllustrationImg from "@/assets/motorcycle-feature-illustration.png";
import motorcycleScopeBannerImg from "@/assets/motorcycle-scope-banner.png";

type ModalType = "modal-rules" | "modal-scope" | "modal-payment" | null;

const router = useRouter();
const openModal = ref<ModalType>(null);
const activeTab = ref("section-features");

watch(openModal, (value) => {
  document.body.style.overflow = value ? "hidden" : "auto";
});

const faqItems = [
  {
    question: "Q1：機車強制險一定要保嗎？",
    answer: "答：是的，所有在道路上行駛的機車都必須投保強制險，否則可能遭受罰鍰與牌照扣留。",
  },
  {
    question: "Q2：第三人責任險有必要加保嗎？",
    answer: "答：強烈建議加保，能補足強制險額度不足時對第三人的體傷與財損賠償。",
  },
  {
    question: "Q3：機車保險可以線上投保嗎？",
    answer: "答：可以，只要準備身分證、駕照及行照資料，即可於網站上完成投保。",
  },
  {
    question: "Q4：機車保險何時生效？",
    answer: "答：通常自保險期間開始日的午夜12時起生效，建議提前投保避免中斷。",
  },
  {
    question: "Q5：發生事故後應如何申請理賠？",
    answer: "答：先報案、保留現場證據、交換資料，若有人傷亡請立即報警，之後備齊文件申請理賠。",
  },
  {
    question: "Q6：機車保險到期前會提醒續保嗎？",
    answer: "答：會，保險到期前通常會透過簡訊或電子郵件提醒續保。",
  },
];

const rulesModalOpen = computed({
  get: () => openModal.value === "modal-rules",
  set: (value: boolean) => {
    openModal.value = value ? "modal-rules" : null;
  },
});

const scopeModalOpen = computed({
  get: () => openModal.value === "modal-scope",
  set: (value: boolean) => {
    openModal.value = value ? "modal-scope" : null;
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
    <AppHeader />

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
          <div class="inline-block bg-[#005CAF] text-white px-4 py-2 rounded-md text-sm font-bold">機車保險線上投保</div>
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">機車族必備</h1>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-[#005CAF] leading-tight">安心保障</h1>
          </div>
          <div class="space-y-1 text-gray-700">
            <p class="text-base font-medium">強制險 + 第三人責任險，給您最完整的騎行保障。</p>
            <p class="text-base font-medium">簡單投保流程，線上輕鬆完成。</p>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-white/90 backdrop-blur-sm rounded-[16px] p-4">
              <Clock class="w-8 h-8 text-[#005CAF] mb-2" />
              <h3 class="font-bold text-gray-900 mb-1">快速投保</h3>
              <p class="text-xs text-gray-600 leading-relaxed">線上完成，方便快捷。</p>
            </div>
            <div class="bg-white/90 backdrop-blur-sm rounded-[16px] p-4">
              <DollarSign class="w-8 h-8 text-[#005CAF] mb-2" />
              <h3 class="font-bold text-gray-900 mb-1">價格優惠</h3>
              <p class="text-xs text-gray-600 leading-relaxed">網路投保享優惠價格。</p>
            </div>
            <div class="bg-white/90 backdrop-blur-sm rounded-[16px] p-4">
              <Zap class="w-8 h-8 text-[#005CAF] mb-2" />
              <h3 class="font-bold text-gray-900 mb-1">保障完整</h3>
              <p class="text-xs text-gray-600 leading-relaxed">多種方案任您選擇。</p>
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
          <img :src="motorcycleHeroImg" alt="機車保險插圖" class="w-full h-full object-contain object-center" />
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
        <div class="bg-white rounded-2xl p-12 shadow-sm border border-gray-50 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-2xl md:text-3xl font-black mb-8 text-[#0054A6] border-l-8 border-[#0054A6] pl-4">產品特色</h2>
            <div class="space-y-8">
              <div>
                <h3 class="text-xl md:text-2xl font-bold mb-4 text-gray-800">符合政府法令，安心免受罰</h3>
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">
                  依據「強制汽車責任保險法」，凡汽車及行駛道路之動力機械，必須投保強制責任險。
                </p>
              </div>
              <div>
                <h3 class="text-xl md:text-2xl font-bold mb-4 text-gray-800">全方位保障，保障自己也保障別人</h3>
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">
                  建議增加投保機車責任綜合保險及駕駛人傷害險，與強制責任險搭配，保障更全。
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center overflow-hidden rounded-2xl">
            <img
              :src="motorcycleFeatureIllustrationImg"
              alt="Motorcycle Insurance Protection"
              class="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center overflow-hidden">
          <div class="w-full overflow-hidden rounded-t-2xl">
            <img :src="motorcycleScopeBannerImg" alt="Motorcycle Protection Banner" class="w-full h-full object-cover" />
          </div>
          <div class="w-full p-12 space-y-8">
            <div class="mb-8">
              <h2 class="text-2xl md:text-3xl font-black mb-4 text-[#0054A6] border-l-8 border-[#0054A6] pl-4">保障範圍</h2>
              <p class="text-sm text-gray-500 pl-4">清楚了解各項保險涵蓋範圍</p>
            </div>

            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4">強制險</h3>
              <div class="overflow-x-auto border border-gray-100 rounded-2xl">
                <table class="w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">承保項目</th>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">承保對象</th>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">承保範圍</th>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">保障金額(新台幣；元)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="bg-white p-3 border border-gray-100 font-bold text-base text-[#0054A6]">強制責任保險</td>
                      <td class="bg-white p-3 border border-gray-100 text-base">第三人及乘客</td>
                      <td class="bg-white p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div>每一個人醫療費</div>
                          <div>每一個人失能</div>
                          <div>每一個人死亡</div>
                        </div>
                      </td>
                      <td class="bg-white p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div>最高20萬</div>
                          <div>最高200萬</div>
                          <div>定額給付200萬</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-4">任意險</h3>
              <div class="overflow-x-auto border border-gray-100 rounded-2xl">
                <table class="w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">承保項目</th>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">承保對象</th>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">承保範圍</th>
                      <th class="bg-[#005CAF] text-white p-3 font-medium border border-white/20 text-base">保障金額(新台幣；元)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="bg-white p-3 border border-gray-100 font-bold text-base text-[#0054A6]">
                        強制汽車責任保險被保險人傷害責任附加條款(限車主一交過車主)
                        <br />
                        <span class="text-red-500 text-sm">-附第三人本人(機兩險)</span>
                      </td>
                      <td class="bg-white p-3 border border-gray-100 text-base">駕駛人本人</td>
                      <td class="bg-white p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div>每一個人醫療費</div>
                          <div>每一個人失能</div>
                          <div>每一個人死亡</div>
                        </div>
                      </td>
                      <td class="bg-white p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div>最高20萬</div>
                          <div>最高200萬</div>
                          <div>定額給付200萬</div>
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-[#F8FAFC]">
                      <td class="p-3 border border-gray-100 font-bold text-base text-[#0054A6]" rowspan="2">機車責任綜合保險-交通意外事故責任保險</td>
                      <td class="p-3 border border-gray-100 text-base" rowspan="2">第三人</td>
                      <td class="p-3 border border-gray-100 text-base">
                        <div class="font-semibold mb-1">傷害責任險</div>
                        <div class="space-y-1">
                          <div>每一個人傷害</div>
                          <div>每一意外事故之傷害</div>
                        </div>
                      </td>
                      <td class="p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div class="mt-5">100 萬</div>
                          <div>200 萬</div>
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-[#F8FAFC]">
                      <td class="p-3 border border-gray-100 text-base">
                        <div class="font-semibold mb-1">財產責任險</div>
                        <div>每一意外事故之財損</div>
                      </td>
                      <td class="p-3 border border-gray-100 text-base">
                        <div class="mt-5">20 萬</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-white p-3 border border-gray-100" />
                      <td class="bg-white p-3 border border-gray-100 text-base">乘客</td>
                      <td class="bg-white p-3 border border-gray-100 text-base">
                        <div class="font-semibold mb-1">傷害責任險</div>
                        <div class="space-y-1">
                          <div>每一個人傷害</div>
                          <div>每一意外事故之傷害</div>
                        </div>
                      </td>
                      <td class="bg-white p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div class="mt-5">50 萬</div>
                          <div>100 萬</div>
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-[#F8FAFC]">
                      <td class="p-3 border border-gray-100 font-bold text-base text-[#0054A6]">機車責任綜合保險-駕駛人費用醫療保險</td>
                      <td class="p-3 border border-gray-100 text-base">第三人及乘客</td>
                      <td class="p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div>住院慰問金</div>
                          <div>身故慰問金</div>
                          <div>保險期間最高限額限額</div>
                        </div>
                      </td>
                      <td class="p-3 border border-gray-100 text-base">
                        <div class="space-y-1">
                          <div>5,000 元</div>
                          <div>5 萬</div>
                          <div>50 萬</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section id="section-faq" class="scroll-mt-40 max-w-5xl mx-auto">
        <div class="mb-10 text-center">
          <h2 class="text-3xl md:text-4xl font-black text-[#0054A6] mb-2">常見問題</h2>
          <p class="text-gray-500 text-sm">機車保險投保及理賠相關問題解答</p>
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
            <div class="px-8 pb-6 text-gray-500 text-sm border-t border-gray-50 pt-4 leading-relaxed">{{ item.answer }}</div>
          </details>
        </div>
      </section>
    </main>

    <MotorcycleFooter />

    <BaseModal v-model="rulesModalOpen" title="投保規則" subtitle="請確認您的資格符合以下規定" max-width="max-w-2xl" content-class="p-8 space-y-6">
      <div class="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 border-dashed">
        <ul class="space-y-4 text-gray-700 text-base">
          <li>要保人須年滿18歲以上之中華民國國民。</li>
          <li>持有有效之機車駕駛執照。</li>
          <li>機車須領有牌照且已完成監理站登記。</li>
          <li>機車使用性質為自用（非營業用）。</li>
        </ul>
      </div>
    </BaseModal>

    <BaseModal v-model="scopeModalOpen" title="保障範圍說明" subtitle="詳細了解各項保險商品的承保對象與限制">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 class="font-bold text-blue-900 mb-4 text-2xl">強制責任險</h4>
        <div class="bg-blue-50 p-4 rounded-lg space-y-2 text-gray-700 text-base">
          <p><strong>傷害醫療給付：</strong>每人最高20萬元</p>
          <p><strong>失能給付：</strong>依失能程度，每人最高200萬元</p>
          <p><strong>死亡給付：</strong>每人200萬元</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 class="font-bold text-blue-900 mb-4 text-2xl">第三人責任險</h4>
        <div class="bg-green-50 p-4 rounded-lg space-y-2 text-gray-700 text-base">
          <p><strong>體傷責任：</strong>保障對方駕駛、乘客、行人之體傷</p>
          <p><strong>財損責任：</strong>保障對方車輛及其他財產損失</p>
        </div>
      </div>
    </BaseModal>

    <BaseModal v-model="paymentModalOpen" title="信用卡/銀行帳戶說明" subtitle="網路投保目前開放配合之繳費方式" max-width="max-w-5xl">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 class="text-2xl font-bold text-[#0054A6] mb-4">網路投保目前有開放配合信用卡繳費之發卡銀行</h4>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-base text-gray-700">
          <div class="space-y-2"><p>（004）台灣銀行</p><p>（008）華南銀行</p><p>（013）國泰世華</p></div>
          <div class="space-y-2"><p>（005）土地銀行</p><p>（009）彰化銀行</p><p>（016）高雄銀行</p></div>
          <div class="space-y-2"><p>（006）合作金庫</p><p>（011）上海商銀</p><p>（017）兆豐銀行</p></div>
          <div class="space-y-2"><p>（007）第一銀行</p><p>（012）台北富邦</p><p>（822）中國信託</p></div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

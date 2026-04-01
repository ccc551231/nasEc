<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { Calculator, ChevronDown, ChevronRight, HelpCircle } from "lucide-vue-next";
import AppHeader from "@/components/AppHeader.vue";
import BrandModelPopup from "@/components/car-calc/BrandModelPopup.vue";
import CustomRadio from "@/components/car-calc/CustomRadio.vue";
import FormInputField from "@/components/car-calc/FormInputField.vue";
import FormSelectField from "@/components/car-calc/FormSelectField.vue";
import InsuranceSelectionView from "@/components/car-calc/InsuranceSelectionView.vue";
import ModernCheck from "@/components/car-calc/ModernCheck.vue";
import CompletePurchaseView from "@/components/car-calc/CompletePurchaseView.vue";
import PaymentMethodView from "@/components/car-calc/PaymentMethodView.vue";
import QuoteSummaryView from "@/components/car-calc/QuoteSummaryView.vue";
import SiteFooter from "@/components/SiteFooter.vue";

type SelectionViewExpose = {
  rootEl: HTMLElement | null;
};

const currentStep = ref<1 | 2 | 3 | 4 | 5 | 6>(1);
const insureBody = ref(false);
const carType = ref("fuel");
const isPopupOpen = ref(false);
const activeTab = ref<"law" | "statement">("law");
const lawAgreed = ref(false);
const statementAgreed = ref(false);
const scrollBox = ref<HTMLElement | null>(null);
const selectionViewRef = ref<SelectionViewExpose | null>(null);
const summaryViewRef = ref<SelectionViewExpose | null>(null);
const confirmViewRef = ref<SelectionViewExpose | null>(null);
const paymentViewRef = ref<SelectionViewExpose | null>(null);
const completeViewRef = ref<SelectionViewExpose | null>(null);

const months = Array.from({ length: 12 }, (_, index) => index + 1);
const days = Array.from({ length: 31 }, (_, index) => index + 1);

watch(isPopupOpen, (value) => {
  document.body.style.overflow = value ? "hidden" : "auto";
});

watch(activeTab, async () => {
  await nextTick();
  if (scrollBox.value) scrollBox.value.scrollTop = 0;
});

const handleScroll = (event: Event) => {
  const element = event.target as HTMLElement;
  if (element.scrollHeight - element.scrollTop <= element.clientHeight + 15) {
    if (activeTab.value === "law") lawAgreed.value = true;
    if (activeTab.value === "statement") statementAgreed.value = true;
  }
};

const scrollToStepRoot = (targetRef: { value: SelectionViewExpose | null }) => {
  nextTick(() => {
    requestAnimationFrame(() => {
      const element = targetRef.value?.rootEl;
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
};

const goToSelectionStep = () => {
  if (isReady.value) {
    currentStep.value = 2;
    scrollToStepRoot(selectionViewRef);
  }
};

const goToSummaryStep = () => {
  currentStep.value = 3;
  scrollToStepRoot(summaryViewRef);
};

const goToConfirmStep = () => {
  currentStep.value = 4;
  scrollToStepRoot(confirmViewRef);
};

const goToPaymentStep = () => {
  currentStep.value = 5;
  scrollToStepRoot(paymentViewRef);
};

const goToCompleteStep = () => {
  currentStep.value = 6;
  scrollToStepRoot(completeViewRef);
};

const isReady = computed(() => lawAgreed.value && statementAgreed.value);
</script>

<template>
  <div class="antialiased bg-[#F8FAFC] text-[#2D3748] min-h-screen flex flex-col">
    <AppHeader />

    <BrandModelPopup v-model="isPopupOpen" />

    <section class="relative w-full h-[180px] bg-[#2869AC] flex items-center px-4 md:px-12 lg:px-24 overflow-hidden border-none shadow-none shrink-0 mt-20">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <svg viewBox="0 0 1903 171.86" preserveAspectRatio="none" class="w-full h-full">
          <rect x="-5.39" y="-3.52" width="1908.39" height="178.01" fill="#2869AC" />
          <polygon points="264.23 59.7 159.2 174.33 369.25 174.33 264.23 59.7" fill="#0C467A" opacity="0.4" />
          <polygon points="387.26 8.2 234.91 174.49 539.61 174.49 387.26 8.2" fill="#369CD1" opacity="0.4" />
          <polygon points="500.62 59.7 395.59 174.33 605.65 174.33 500.62 59.7" fill="#0C467C" opacity="0.4" />
          <polygon points="1718.59 117.52 1829.41 -3.44 1607.77 -3.44 1718.59 117.52" fill="#0C467A" opacity="0.4" />
          <polygon points="1588.77 171.86 1749.53 -3.61 1428.02 -3.61 1588.77 171.86" fill="#369CD1" opacity="0.4" />
          <polygon points="1469.16 117.52 1579.98 -3.44 1358.34 -3.44 1469.16 117.52" fill="#0C467C" opacity="0.4" />
          <polygon points="754.24 62 651.33 174.33 857.15 174.33 754.24 62" fill="#0C467C" opacity="0.4" />
          <polygon points="906.13 84.57 823.89 174.33 988.36 174.33 906.13 84.57" fill="#369CD1" opacity="0.4" />
          <polygon points="1022.21 105.15 958.83 174.33 1085.6 174.33 1022.21 105.15" fill="#0C467C" opacity="0.4" />
          <polygon points="1249.76 114.92 1358.34 -3.61 1141.17 -3.61 1249.76 114.92" fill="#0C467A" opacity="0.4" />
          <polygon points="1089.49 91.1 1176.26 -3.61 1002.72 -3.61 1089.49 91.1" fill="#369CD1" opacity="0.4" />
          <polygon points="967 69.39 1033.88 -3.61 900.12 -3.61 967 69.39" fill="#0C467C" opacity="0.4" />
        </svg>
      </div>
      <div class="relative z-10 max-w-6xl mx-auto w-full">
        <h1 class="text-4xl font-black text-white mb-2 tracking-tight">汽車保險</h1>
        <p class="text-white/80 font-bold text-lg">提供完整、精確的法律告知與保費試算服務。</p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto mt-12 px-4 space-y-12 flex-1 w-full">
      <CompletePurchaseView v-if="currentStep === 6" ref="completeViewRef" />
      <PaymentMethodView v-else-if="currentStep === 5" ref="paymentViewRef" @back="currentStep = 4" @next="goToCompleteStep" />
      <QuoteSummaryView
        v-else-if="currentStep === 4"
        ref="confirmViewRef"
        :active-step-index="1"
        :read-only="true"
        next-label="確認投保並進行身份驗證"
        @back="currentStep = 3"
        @next="goToPaymentStep"
      />
      <QuoteSummaryView
        v-else-if="currentStep === 3"
        ref="summaryViewRef"
        :active-step-index="0"
        next-label="下一步"
        @back="currentStep = 2"
        @next="goToConfirmStep"
      />
      <InsuranceSelectionView v-else-if="currentStep === 2" ref="selectionViewRef" @back="currentStep = 1" @next="goToSummaryStep" />
      <template v-else>
      <div class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-none">
        <div class="bg-white border-t-[5px] border-[#F97316] px-10 pt-6 pb-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center text-white">
              <Calculator :size="22" />
            </div>
            <h2 class="text-2xl font-black text-gray-700 tracking-tight">保費試算</h2>
          </div>
          <div class="mt-6 bg-[#F8FAFC] px-6 py-5 border-l-4 border-[#2D74B5]">
            <div class="space-y-3">
              <p class="text-base font-normal text-gray-700">• 以下欄位均為必填，請依行車執照資料填寫，方能提供您正確的保費資訊。</p>
              <p class="text-base font-bold text-[#2D74B5]">ⓘ 要保人與行照車主及持卡人需為同一人，請依真實資料及行照資料填寫，方能提供您正確的保費資訊，謝謝！</p>
            </div>
          </div>
        </div>

        <div class="p-10 space-y-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <FormInputField label="身分證字號" placeholder="............" :password="true">
              <template #label-extra>
                <button class="ml-4 bg-[#F1F5F9] text-gray-500 px-3 py-1 rounded text-xs font-bold border border-gray-200">帶入會員資料</button>
              </template>
            </FormInputField>
            <div class="space-y-3">
              <label class="text-black font-bold text-lg block">出生日期 (民國)</label>
              <div class="flex gap-2">
                <FormSelectField :options="['73', '74', '75']" placeholder="73" />
                <FormSelectField :options="months" placeholder="12" />
                <FormSelectField :options="days" placeholder="12" />
              </div>
            </div>
          </div>

          <hr class="w-full border-0 border-t border-[#E2E8F0]" />

          <div class="space-y-4">
            <label class="text-black font-bold text-lg">牌照號碼</label>
            <div class="flex flex-col md:flex-row gap-5">
              <div class="flex items-center gap-3 w-full md:w-[450px]">
                <input
                  type="text"
                  class="w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none h-[60px] text-center text-xl uppercase"
                  placeholder="ABC"
                />
                <div class="w-6 h-0.5 bg-gray-300 shrink-0" />
                <input
                  type="text"
                  class="w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none h-[60px] text-center text-xl uppercase"
                  placeholder="1234"
                />
              </div>
              <button class="bg-[#2D74B5] text-white px-8 h-[60px] rounded-xl font-bold text-base hover:bg-[#25639b] transition shadow-none">
                自動查詢並填入車籍資料
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="space-y-3">
              <label class="text-black font-bold text-lg">出廠年月 (西元)</label>
              <div class="flex gap-3">
                <FormSelectField :options="['2024', '2023']" placeholder="2024" />
                <FormSelectField :options="months" placeholder="12" />
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <label class="text-black font-bold text-lg">排氣量</label>
                <span class="text-[#F97316] text-xs font-bold">(暫不承接電動車)</span>
              </div>
              <div class="flex items-center gap-6">
                <CustomRadio label="燃油汽車" :checked="carType === 'fuel'" @click="carType = 'fuel'" />
                <div class="relative flex-1">
                  <input
                    type="text"
                    class="w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 text-gray-700 font-medium focus:border-[#2D74B5] outline-none transition-colors shadow-none h-[60px]"
                    placeholder="1998"
                  />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">CC</span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-10">
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <label class="text-black font-bold text-lg">廠牌/車型</label>
                <HelpCircle :size="16" class="text-[#F97316] cursor-pointer" />
              </div>
              <div class="flex flex-col md:flex-row gap-6">
                <button class="bg-[#2D74B5] text-white px-8 h-[60px] rounded-xl font-bold text-base shrink-0 hover:bg-[#25639b] transition shadow-none" @click="isPopupOpen = true">
                  廠牌及車型選擇
                </button>
                <div class="flex-1 flex gap-4">
                  <div class="relative flex-1">
                    <input type="text" class="w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 h-[60px]" placeholder="廠牌" />
                    <span class="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-gray-400">廠牌</span>
                  </div>
                  <div class="relative flex-1">
                    <input type="text" class="w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 h-[60px]" placeholder="車型" />
                    <span class="absolute -top-3 left-4 bg-white px-2 text-xs font-black text-gray-400">車型</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FormSelectField label="乘載人數(含駕駛)" :options="['5 人', '7 人', '9 人以上']" placeholder="5 人" />
              <FormInputField label="引擎號碼" placeholder="請依照行照填入">
                <template #suffix>
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-normal text-xs">(或車身號碼)</span>
                </template>
              </FormInputField>
            </div>

            <div class="space-y-3">
              <label class="text-black font-bold text-lg block">發照年月日 (民國)</label>
              <div class="flex items-center gap-3 max-w-lg">
                <div class="flex-1 flex items-center gap-2">
                  <div class="flex-1 relative group">
                    <select class="appearance-none w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 h-[60px]"><option>112</option></select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D74B5] pointer-events-none" :size="20" />
                  </div>
                  <span class="text-black font-bold shrink-0">年</span>
                </div>
                <div class="flex-1 flex items-center gap-2">
                  <div class="flex-1 relative group">
                    <select class="appearance-none w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 h-[60px]"><option>7</option></select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D74B5] pointer-events-none" :size="20" />
                  </div>
                  <span class="text-black font-bold shrink-0">月</span>
                </div>
                <div class="flex-1 flex items-center gap-2">
                  <div class="flex-1 relative group">
                    <select class="appearance-none w-full bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 h-[60px]"><option>8</option></select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D74B5] pointer-events-none" :size="20" />
                  </div>
                  <span class="text-black font-bold shrink-0">日</span>
                </div>
              </div>
              <p class="text-[#F97316] text-base font-bold mt-1 tracking-tight">發照日期不能小於出廠年月</p>
            </div>

            <label class="flex items-center gap-3 cursor-pointer">
              <ModernCheck :checked="insureBody" />
              <span class="font-bold text-gray-700">我要加保車體險</span>
              <input v-model="insureBody" type="checkbox" class="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[16px] border border-[#E2E8F0] overflow-hidden shadow-none">
        <div class="px-10 py-12">
          <div class="text-center mb-6"><h2 class="text-2xl font-black text-[#F97316] tracking-widest">我已詳閱並同意</h2></div>

          <div class="flex flex-col md:flex-row gap-6 mb-6">
            <div
              :class="[
                'flex-1 py-4 px-6 rounded-[16px] border-2 transition-all cursor-pointer flex items-center gap-4',
                activeTab === 'law' ? 'ring-4 ring-blue-50' : '',
                lawAgreed ? 'bg-[#2D74B5] text-white border-[#2D74B5]' : 'bg-white text-[#2D74B5] border-[#2D74B5]',
              ]"
              @click="activeTab = 'law'"
            >
              <ModernCheck :checked="lawAgreed" :solid="lawAgreed" />
              <span class="text-base font-bold leading-tight">產險業履行個人資料保護法告知義務內容</span>
            </div>
            <div
              :class="[
                'flex-1 py-4 px-6 rounded-[16px] border-2 transition-all cursor-pointer flex items-center gap-4',
                activeTab === 'statement' ? 'ring-4 ring-blue-50' : '',
                statementAgreed ? 'bg-[#2D74B5] text-white border-[#2D74B5]' : 'bg-white text-[#2D74B5] border-[#2D74B5]',
              ]"
              @click="activeTab = 'statement'"
            >
              <ModernCheck :checked="statementAgreed" :solid="statementAgreed" />
              <span class="text-base font-bold leading-tight">網路投保聲明事項</span>
            </div>
          </div>

          <div class="text-center mb-6">
            <p class="text-gray-600 font-black text-base tracking-wide">(請滑動頁面詳閱完整內容)</p>
          </div>

          <div
            ref="scrollBox"
            class="bg-[#F8FAFC] p-10 rounded-[16px] h-[500px] overflow-y-auto border border-[#E2E8F0] font-normal text-gray-600 text-base leading-relaxed shadow-inner scroll-smooth"
            @scroll="handleScroll"
          >
            <div v-if="activeTab === 'law'" class="space-y-10">
              <div>
                <p class="font-bold text-gray-800 text-lg">
                  南山產物保險股份有限公司(以下稱本公司)依據個人資料保護法（以下稱個資法）第六條第二項、第八條第一項及第九條第一項規定，向 台端告知下列事項，請 台端詳閱：
                </p>
              </div>

              <div>
                <div class="space-y-4">
                  <div>
                    <p><span class="font-bold text-gray-800">一、</span>蒐集之目的： 人身保險(ＯＯ一)、行銷(Ｏ四Ｏ)、金融服務業依法令規定及金融監理需要，所為之蒐集處理及利用(Ｏ五九)、非公務機關依法定義務所進行個人資料之蒐集處理及利用(Ｏ六三)、契約、類似契約或其他法律關係事務(Ｏ六九)、消費者、客戶管理與服務(Ｏ九Ｏ)、財產保險(Ｏ九三)、調查、統計與研究分析(一五七)及其他經營合於營業登記項目或組織章程所定之業務(一八一)。</p>
                  </div>
                  <div>
                    <p><span class="font-bold text-gray-800">二、</span>蒐集之個人資料類別： 姓名、身分證統一編號、護照號碼、出生年月日、性別、聯絡方式、病歷、醫療、健康檢查、旅行細節、汽機車牌照號碼、行照資料、財務資料、家庭成員及其姓名、身分證統一編號與出生年月日、以及網站瀏覽、查詢或付款時伺服器自行產生的相關紀錄（包括但不限於 台端網站瀏覽及點選資料紀錄等）及其他得以直接或間接方式識別該個人之資料，詳如相關業務申請書或契約書內容。</p>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">三、個人資料之來源（個人資料非由當事人提供間接蒐集之情形適用）：</p>
                    <div class="pl-4 space-y-2">
                      <p><span class="font-bold text-gray-800">(一)</span> 要保人、被保險人</p>
                      <p><span class="font-bold text-gray-800">(二)</span> 當事人之法定代理人、輔助人</p>
                    </div>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">四、個人資料利用之期間、對象、地區、方式：</p>
                    <div class="pl-4 space-y-3">
                      <div>
                        <p><span class="font-bold text-gray-800">(一)</span> 期間：</p>
                        <p class="pl-6">因執行業務所必須及依法令規定應為保存之期間。</p>
                      </div>
                      <div>
                        <p><span class="font-bold text-gray-800">(二)</span> 對象：</p>
                        <p class="pl-6">本(分)公司、與本公司合作推廣 台端保險契約之保險代理人公司或保險經紀人公司(透過保險代理人或保險經紀人公司投保者)、中華民國產物保險商業同業公會、中華民國人壽保險商業同業公會、財團法人保險事業發展中心、財團法人保險安定基金、財團法人住宅地震保險基金、財團法人汽車交通事故特別補償基金、財團法人金融消費評議中心、財團法人金融聯合徵信中心、財團法人聯合信用卡中心、台灣票據交換所、財金資訊公司、關貿網路股份有限公司、衛生福利部中央健康保險署、業務委外機構、與本公司有再保業務往來之公司、依法有調查權機關或金融監理機關、本公司母公司、本公司母公司之監理或主管機構、與要保人或被保險人有旅遊契約關係之旅行社人員。</p>
                      </div>
                      <div>
                        <p><span class="font-bold text-gray-800">(三)</span> 地區：</p>
                        <p class="pl-6">上述對象所在之地區。</p>
                      </div>
                      <div>
                        <p><span class="font-bold text-gray-800">(四)</span> 方式：</p>
                        <p class="pl-6">合於法令規定之利用方式。</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">五、依據個資法第三條規定，台端就本公司保有台端之個人資料得行使之權利及方式：</p>
                    <div class="pl-4 space-y-3">
                      <div>
                        <p><span class="font-bold text-gray-800">(一)</span> 得向本公司行使之權利：</p>
                        <div class="pl-6 space-y-2">
                          <p><span class="font-bold text-gray-800">1.</span> 向本公司查詢、請求閱覽或請求製給複製本。</p>
                          <p><span class="font-bold text-gray-800">2.</span> 向本公司請求補充或更正。</p>
                          <p><span class="font-bold text-gray-800">3.</span> 向本公司請求停止蒐集、處理或利用及請求刪除。</p>
                        </div>
                      </div>
                      <div>
                        <p><span class="font-bold text-gray-800">(二)</span> 行使權利之方式：</p>
                        <p class="pl-6">請提出書面申請或可透過Info@NSGeneral.com.tw電子郵件信箱與本公司聯繫。</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p><span class="font-bold text-gray-800">六、</span>台端不提供個人資料所致權益之影響：台端若未能提供相關個人資料時，本公司將可能延後或無法進行必要之審核及處理作業，因此可能婉謝承保、遲延或無法提供台端相關服務或給付。</p>
                  </div>
                  <div>
                    <p><span class="font-bold text-gray-800">七、</span>台端應事先取得其他法定代理人之同意授權始得提供未成年子女之個人資料予本公司，且 台端已詳閱並代未成年子女同意「履行個人資料保護法告知義務內容」之內容。</p>
                  </div>
                </div>
              </div>

              <div>
                <p class="font-bold text-gray-800 text-xl mb-4 underline decoration-[#2D74B5] underline-offset-4">【南山產物聲明事項】</p>
                <div class="space-y-4">
                  <div>
                    <p><span class="font-bold text-gray-800">一、</span>本商品經南山產物合格簽署人員檢視其內容業已符合保險精算原則及保險法令，惟為確保權益，基於保險公司與消費者衡平對等原則，消費者仍應詳加閱讀保險單條款與相關文件，審慎選擇保險商品。本商品如有虛偽不實或違法情事，應由南山產物及南山產物負責人依法負責。</p>
                  </div>
                  <div>
                    <p><span class="font-bold text-gray-800">二、</span>保險契約各項權利義務皆詳列於保單條款，消費者務必詳加閱讀了解。</p>
                  </div>
                  <div>
                    <p><span class="font-bold text-gray-800">三、</span>投保後解約或不繼續繳費可能不利消費者，請慎選符合需求之保險商品。</p>
                  </div>
                  <div>
                    <p><span class="font-bold text-gray-800">四、</span>南山產物保留承保與否之權利。其他未盡詳細事項，依保單條款辦理。</p>
                  </div>
                  <div>
                    <p><span class="font-bold text-gray-800">五、</span>如需參考其他相關商品資訊，可查閱南山產物網站或洽南山產物客服人員辦理。</p>
                  </div>
                </div>
              </div>

              <div>
                <p class="font-bold text-gray-800 text-xl mb-4 underline decoration-[#2D74B5] underline-offset-4">【要保人/被保險人確認事項】</p>
                <div class="space-y-4">
                  <div><p><span class="font-bold text-gray-800">一、</span>要保人/被保險人已充分告知基本資料。</p></div>
                  <div><p><span class="font-bold text-gray-800">二、</span>要保人/被保險人已瞭解投保條件、投保目的及需求程度，並將交由南山產物核保人員進行相關核保程序。</p></div>
                  <div><p><span class="font-bold text-gray-800">三、</span>要保人/被保險人已瞭解所交付保險費係用以購買保險商品。</p></div>
                  <div><p><span class="font-bold text-gray-800">四、</span>要保人/被保險人已瞭解投保之險種、保險金額與保險費支出與自身實際需求具相當性。</p></div>
                  <div><p><span class="font-bold text-gray-800">五、</span>要保人/被保險人已正確提供要保人及被保險人之行動電話號碼、電子郵件信箱或其他經主管機關認可足資傳遞電子文件之聯絡方式。</p></div>
                  <div><p><span class="font-bold text-gray-800">六、</span>要保人/被保險人之投保目的為財產及利益作風險規劃或依法應負之賠償責任作風險規劃或為所屬員工可能承受之傷害作風險規劃。</p></div>
                  <div><p><span class="font-bold text-gray-800">七、</span>要保人/被保險人已確認繳交保險費之資金來源為工作或營業收入、存款、及其他非為貸款或保險單借款。</p></div>
                  <div><p><span class="font-bold text-gray-800">八、</span>要保人/被保險人已評估收入、財務狀況、職業、健康狀況與保險費之負擔能力及保險金額的相當性。</p></div>
                </div>
              </div>

              <div class="pb-12">
                <p class="font-bold text-[#F97316] text-xl mb-4 underline decoration-[#F97316] underline-offset-4">【投保須知】</p>
                <p class="mb-4">您好！歡迎您（即要保人）向南山產物保險股份有限公司（下稱「南山產物」）申辦投保，為有利於您充分瞭解南山產物保險商品之重要內容及相關風險，南山產物特別提醒您於投保前應注意下列事項，請您務必注意並於簽訂保險契約前詳為閱讀，如果您有任何不明瞭處，請您向南山產物服務人員洽詢：</p>
                <div class="space-y-4">
                  <div>
                    <p class="font-bold text-gray-800">1. 您對本保險商品之權利行使、變更、解除及終止之方式及限制</p>
                    <p>請您或被保險人於知悉保險事故發生後5日內或於保險契約規定之期間內，通知南山產物辦理出險手續。您或被保險人可隨時以書面通知南山產物依保險契約約定終止或經南山產物同意變更保險契約，另契約若約定須經抵押人同意始得變更或終止保險契約者，從其約定。未依約定交付保險費者，本保險契約自始不生效力。</p>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">2. 南山產物對本保險商品重要權利、義務及責任</p>
                    <p>南山產物依保險契約收取保險費，於承保危險事故發生時，依承保之責任，負擔賠償之義務。</p>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">3. 您應負擔之費用及違約金，包括收取時點、計算及收取方式</p>
                    <p>除應繳保險費外，無須繳交其他費用及違約金。</p>
                  </div>
                  <div><p class="font-bold text-gray-800">4. 本保險商品受財團法人保險安定基金保障並應依保險相關法令辦理。</p></div>
                  <div><p class="font-bold text-gray-800">5. 南山產物將EMAIL提醒您保障通知或續保通知，若您不想收到此訊息請來信讓南山產物知道。</p></div>
                  <div><p class="font-bold text-gray-800">6. 您完成網路投保後，南山產物於保單寄發前將以抽樣電訪方式(您同意南山產物全程錄音並備份存檔)或以簡訊方式進行投保意願之確認。</p></div>
                  <div><p class="font-bold text-gray-800">7. 本保險商品所生紛爭之處理及申訴之管道，如您或被保險人對本保險商品有任何申訴，請撥打南山產物客戶服務専線：0800-020-060。</p></div>
                  <div><p class="font-bold text-gray-800">8. 查詢南山產物資訊公開說明文件，請上南山產物網站，網址：www.nanshangeneral.com.tw，或至南山產物索取。</p></div>
                </div>
              </div>
            </div>

            <div v-else class="space-y-10">
              <div>
                <p class="font-bold text-gray-800 text-xl mb-4 underline decoration-[#2D74B5] underline-offset-4">【要保人與被保險人聲明事項】</p>
                <div class="space-y-4">
                  <div><p><span class="font-bold text-gray-800">一、</span>本人(要保人、被保險人)已審閱並瞭解 南山產物保險股份有限公司（下稱「南山產物」）所提供之「投保須知」，另依「產險業履行個人資料保護法告知義務內容」，本人已瞭解並同意 南山產物蒐集、處理及利用個人資料之目的及用途。</p></div>
                  <div><p><span class="font-bold text-gray-800">二、</span>本人(要保人、被保險人)知悉 南山產物得依「個人資料保護法」之相關規定，於特定目的範圍內對要保人或被保險人之個人資料，有蒐集、處理及利用之權利。</p></div>
                  <div><p><span class="font-bold text-gray-800">三、</span>本人(被保險人、要保人)同意 南山產物將本要保書上所載個人資料轉送產、壽險公會建立電腦系統連線，並同意產、壽險公會之會員公司查詢本人在該系統之資料以作為核保及理賠之參考，但各該公司仍應依其本身之核保或理賠標準決定是否承保或理賠，不得僅以前開資料作為承保或理賠之依據。</p></div>
                  <div><p><span class="font-bold text-gray-800">四、</span>要保人應事先取得其他法定代理人之同意授權，始得以未滿七歲之未成年子女作為被保險人，為其投保南山產物之旅行綜合保險。要保人同意於投保過程完成身分確認作業時，即為代未滿七歲之未成年子女為投保之意思表示。</p></div>
                </div>
              </div>

              <div>
                <p class="font-bold text-gray-800 text-xl mb-4 underline decoration-[#2D74B5] underline-offset-4">【南山產物聲明事項】</p>
                <div class="space-y-4">
                  <div><p><span class="font-bold text-gray-800">一、</span>本商品經南山產物合格簽署人員檢視其內容業已符合保險精算原則及保險法令，惟為確保權益，基於保險公司與消費者衡平對等原則，消費者仍應詳加閱讀保險單條款與相關文件，審慎選擇保險商品。本商品如有虛偽不實或違法情事，應由南山產物及南山產物負責人依法負責。</p></div>
                  <div><p><span class="font-bold text-gray-800">二、</span>保險契約各項權利義務皆詳列於保單條款，消費者務必詳加閱讀了解。</p></div>
                  <div><p><span class="font-bold text-gray-800">三、</span>投保後解約或不繼續繳費可能不利消費者，請慎選符合需求之保險商品。</p></div>
                  <div><p><span class="font-bold text-gray-800">四、</span>南山產物保留承保與否之權利。其他未盡詳細事項，依保單條款辦理。</p></div>
                  <div><p><span class="font-bold text-gray-800">五、</span>如需參考其他相關商品資訊，可查閱南山產物網站或洽南山產物客服人員辦理。</p></div>
                </div>
              </div>

              <div>
                <p class="font-bold text-gray-800 text-xl mb-4 underline decoration-[#2D74B5] underline-offset-4">【要保人/被保險人確認事項】</p>
                <div class="space-y-4">
                  <div><p><span class="font-bold text-gray-800">一、</span>要保人/被保險人已充分告知基本資料。</p></div>
                  <div><p><span class="font-bold text-gray-800">二、</span>要保人/被保險人已瞭解投保條件、投保目的及需求程度，並將交由南山產物核保人員進行相關核保程序。</p></div>
                  <div><p><span class="font-bold text-gray-800">三、</span>要保人/被保險人已瞭解所交付保險費係用以購買保險商品。</p></div>
                  <div><p><span class="font-bold text-gray-800">四、</span>要保人/被保險人已瞭解投保之險種、保險金額與保險費支出與自身實際需求具相當性。</p></div>
                  <div><p><span class="font-bold text-gray-800">五、</span>要保人/被保險人已正確提供要保人及被保險人之行動電話號碼、電子郵件信箱或其他經主管機關認可足資傳遞電子文件之聯絡方式。</p></div>
                  <div><p><span class="font-bold text-gray-800">六、</span>要保人/被保險人之投保目的為財產及利益作風險規劃或依法應負之賠償責任作風險規劃或為所屬員工可能承受之傷害作風險規劃。</p></div>
                  <div><p><span class="font-bold text-gray-800">七、</span>要保人/被保險人已確認繳交保險費之資金來源為工作或營業收入、存款、及其他非為貸款或保險單借款。</p></div>
                  <div><p><span class="font-bold text-gray-800">八、</span>要保人/被保險人已評估收入、財務狀況、職業、健康狀況與保險費之負擔能力及保險金額的相當性。</p></div>
                </div>
              </div>

              <div class="pb-12">
                <p class="font-bold text-[#F97316] text-xl mb-4 underline decoration-[#F97316] underline-offset-4">【投保須知】</p>
                <p class="mb-4">您好！歡迎您（即要保人）向南山產物保險股份有限公司（下稱「南山產物」）申辦投保，為有利於您充分瞭解南山產物保險商品之重要內容及相關風險，南山產物特別提醒您於投保前應注意下列事項，請您務必注意並於簽訂保險契約前詳為閱讀，如果您有任何不明瞭處，請您向南山產物服務人員洽詢：</p>
                <div class="space-y-4">
                  <div>
                    <p class="font-bold text-gray-800">1. 您對本保險商品之權利行使、變更、解除及終止之方式及限制</p>
                    <p>請您或被保險人於知悉保險事故發生後5日內或於保險契約規定之期間內，通知南山產物辦理出險手續。您或被保險人可隨時以書面通知南山產物依保險契約約定終止或經南山產物同意變更保險契約，另契約若約定須經抵押人同意始得變更或終止保險契約者，從其約定。未依約定交付保險費者，本保險契約自始不生效力。</p>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">2. 南山產物對本保險商品重要權利、義務及責任</p>
                    <p>南山產物依保險契約收取保險費，於承保危險事故發生時，依承保之責任，負擔賠償之義務。</p>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">3. 您應負擔之費用及違約金，包括收取時點、計算及收取方式</p>
                    <p>除應繳保險費外，無須繳交其他費用及違約金。</p>
                  </div>
                  <div><p class="font-bold text-gray-800">4. 本保險商品受財團法人保險安定基金保障並應依保險相關法令辦理</p></div>
                  <div><p class="font-bold text-gray-800">5. 南山產物將EMAIL提醒您保障通知或續保通知，若您不想收到此訊息請來信讓南山產物知道。</p></div>
                  <div><p class="font-bold text-gray-800">6. 您完成網路投保後，南山產物於保單寄發前將以抽樣電訪方式(您同意南山產物全程錄音並備份存檔)或以簡訊方式進行投保意願之確認。</p></div>
                  <div>
                    <p class="font-bold text-gray-800">7. 本保險商品所生紛爭之處理及申訴之管道</p>
                    <p>如您或被保險人對本保險商品有任何申訴，請撥打南山產物客戶服務専線：0800-020-060。</p>
                  </div>
                  <div><p class="font-bold text-gray-800">8. 查詢南山產物資訊公開說明文件，請上南山產物網站，網址：www.nanshangeneral.com.tw，或至南山產物索取。</p></div>
                </div>
              </div>
            </div>

            <div class="h-24 flex items-center justify-center text-gray-400 border-t mt-12 font-black shrink-0">
              {{ activeTab === 'law' ? (lawAgreed ? '✓ 告知義務已完成詳閱' : '滑動到底部解鎖打勾狀態') : (statementAgreed ? '✓ 聲明事項已完成詳閱' : '滑動到底部解鎖打勾狀態') }}
            </div>
          </div>
        </div>
      </div>
      </template>
    </div>

    <div v-if="currentStep === 1" class="max-w-6xl mx-auto w-full px-4 mt-8 pb-8 flex flex-col md:flex-row gap-8 items-center justify-center shrink-0">
      <RouterLink
        to="/car-insurance"
        class="w-60 h-[65px] bg-white border-2 border-gray-300 text-gray-400 font-black text-xl rounded-full transition hover:bg-gray-50 shadow-none text-nowrap flex items-center justify-center"
      >
        上一步
      </RouterLink>
      <button
        :disabled="!isReady"
        :class="[
          'w-60 h-[65px] font-black text-2xl rounded-full transition flex items-center justify-center gap-3 shadow-none text-nowrap',
          isReady ? 'bg-[#E6162D] text-white hover:bg-[#c11226]' : 'bg-gray-300 text-white cursor-not-allowed opacity-80',
        ]"
        @click="goToSelectionStep"
      >
        {{ isReady ? "下一步" : "請詳閱並勾選" }}
        <ChevronRight v-if="isReady" :size="28" />
      </button>
    </div>

    <SiteFooter />
  </div>
</template>

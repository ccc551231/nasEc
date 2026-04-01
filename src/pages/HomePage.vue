<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  ArrowRight,
  Bike,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  PhoneCall,
  Plane,
  ShieldCheck,
  Zap,
} from "lucide-vue-next";
import AppHeader from "@/components/AppHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import carInsuranceImg from "@/assets/f3c5b33b12277a5736bf70a7a263bd09e152fd0e.png";
import bikeInsuranceImg from "@/assets/09c228bec338a640285b5672d3140043b54714da.png";
import evBikeInsuranceImg from "@/assets/dee91f6e8ffd37e2a3eb86415f0505a440e1e4e2.png";
import travelInsuranceImg from "@/assets/478450621ac19b3ed8680663f58ae41169c9410b.png";
import homeInsuranceImg from "@/assets/f4e430c49225389c609edd9323068db63363c008.png";
import accidentInsuranceImg from "@/assets/46f3bcdfce5f13cff21273f1d467c1917ebbc50c.png";
import bikeIcon from "@/assets/8f5c5fb1c29a1c6c457a7ee76e7bfa10d2ec698b.png";
import carIcon from "@/assets/3276b9bb3aa1f3152aabfe2523c8b5d640606766.png";
import planeIcon from "@/assets/5cae1e9a4c60128c66665e6ece92a7a6d8270fc4.png";
import homeIcon from "@/assets/5903b8566f8d73783c58db9c8240a789ca4d5e24.png";
import phoneServiceIcon from "@/assets/4e132c48b92b82def8b6035a25298e68e705ed3a.png";
import qaIcon from "@/assets/1986bedbccce9f2c0f385812022aa0d54550c273.png";
import heroTravelBannerImg from "@/assets/6e1201152f39bfe409d869d09ad513f5d8c6b638.png";
import heroCarBannerImg from "@/assets/home-hero-car.png";
import heroBikeBannerImg from "@/assets/home-hero-bike.png";

type TabId = "travel" | "car" | "bike" | "ev";
type ServiceTab = "progress" | "claim";

const activeTab = ref<TabId>("travel");
const serviceTab = ref<ServiceTab>("progress");
const activeHeroIndex = ref(0);

const heroSlides = [
  {
    id: "travel",
    title: "旅遊保險",
    headline: ["新旅遊御守", "全心守護"],
    points: ["小保費、大保障，線上即時保", "出發前 1 小時投保，突發狀況有依靠", "出國旅行全程守護，保障隨行"],
    img: heroTravelBannerImg,
    alt: "旅遊保險插圖",
  },
  {
    id: "car",
    title: "汽車保險",
    headline: ["開車上路", "保障同步到位"],
    points: ["強制險與任意險一次搞定", "線上快速投保，保單資訊清楚好確認", "出門前先備妥保障，駕駛更安心"],
    img: heroCarBannerImg,
    alt: "汽車保險插圖",
  },
  {
    id: "bike",
    title: "機車保險",
    headline: ["機車出發前", "先把保障準備好"],
    points: ["通勤代步、雙載出遊都能安心上路", "強制險搭配任意險，保障更完整", "線上投保流程簡單，隨時可快速完成"],
    img: heroBikeBannerImg,
    alt: "機車保險插圖",
  },
] as const;

const productSummaries = {
  travel: {
    title: "旅遊保險",
    stats: [
      { label: "投保天數最長", value: "180", unit: "天" },
      { label: "旅程更改最高理賠", value: "3", unit: "萬" },
      { label: "旅程取消最高理賠", value: "6", unit: "萬" },
    ],
  },
  ev: {
    title: "電動機車險",
    stats: [
      { label: "強制險最高省", value: "330", unit: "元" },
      { label: "任意險最高折", value: "15", unit: "%" },
      { label: "專屬道路救援", value: "24", unit: "hr" },
    ],
  },
  bike: {
    title: "機車保險",
    stats: [
      { label: "強制險最高折", value: "215", unit: "元" },
      { label: "任意險享折扣", value: "85", unit: "折" },
      { label: "保障範圍涵蓋", value: "全台", unit: "區" },
    ],
  },
  car: {
    title: "汽車保險",
    stats: [
      { label: "線上投保最高折", value: "330", unit: "元" },
      { label: "任意險享折扣", value: "82", unit: "折" },
      { label: "事故處理時效", value: "30", unit: "min" },
    ],
  },
};

const productTabs = [
  { id: "travel" as const, icon: Plane, label: "旅遊保險" },
  { id: "car" as const, icon: Car, label: "汽車保險" },
  { id: "bike" as const, icon: Bike, label: "機車保險" },
  { id: "ev" as const, icon: Zap, label: "電動機車險" },
];

const bestSellers = [
  {
    id: "car",
    title: "汽車保險",
    price: "NT$330",
    priceSuffix: "最高折扣",
    benefits: ["上述為強制險最高折扣優惠", "投保任意險享85折優惠"],
    img: carInsuranceImg,
  },
  {
    id: "travel",
    title: "旅遊保險",
    price: "NT$216",
    priceSuffix: "5日保費",
    benefits: ["出發前1小時投保，立即生效", "旅平+不便險，出國保障最齊全"],
    img: travelInsuranceImg,
  },
  {
    id: "ev",
    title: "電動機車保險",
    price: "NT$215",
    priceSuffix: "最高折扣",
    benefits: ["上述為強制險最高折扣優惠", "投保任意險享85折優惠"],
    img: evBikeInsuranceImg,
  },
  {
    id: "bike",
    title: "機車保險",
    price: "NT$215",
    priceSuffix: "最高折扣",
    benefits: ["上述為強制險最高折扣優惠", "投保任意險享85折優惠"],
    img: bikeInsuranceImg,
  },
  {
    id: "home",
    title: "住宅火險",
    price: "線上試算",
    priceSuffix: "即時報價",
    benefits: ["保障房屋結構與裝潢", "包含居家責任與財物險"],
    img: homeInsuranceImg,
  },
  {
    id: "accident",
    title: "意外傷害險",
    price: "保費超省",
    priceSuffix: "每日不到1元",
    benefits: ["保障意外身故與殘廢", "小資族必備基礎防護"],
    img: accidentInsuranceImg,
  },
];

const progressItems = [
  { label: "機車險", icon: bikeIcon, to: "/motorcycle-insurance" },
  { label: "汽車險", icon: carIcon, to: "/car-insurance" },
  { label: "旅遊險保單", icon: planeIcon },
  { label: "居家綜合險", icon: homeIcon },
];

const claimItems = [
  { label: "旅行延誤事故通知", icon: planeIcon },
  { label: "海外緊急救援專線", icon: phoneServiceIcon },
  { label: "理賠QA", icon: qaIcon },
];

const currentSummary = computed(() => productSummaries[activeTab.value]);
const currentHero = computed(() => heroSlides[activeHeroIndex.value]);
const learnMoreTo = computed(() => {
  if (activeTab.value === "car") return "/car-insurance";
  if (activeTab.value === "bike") return "/motorcycle-insurance";
  if (activeTab.value === "travel") return "/car-insurance";
  return "/motorcycle-insurance";
});

const setHeroSlide = (index: number) => {
  activeHeroIndex.value = (index + heroSlides.length) % heroSlides.length;
};

const nextHeroSlide = () => setHeroSlide(activeHeroIndex.value + 1);
const prevHeroSlide = () => setHeroSlide(activeHeroIndex.value - 1);

let heroTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  heroTimer = setInterval(() => {
    nextHeroSlide();
  }, 5000);
});

onBeforeUnmount(() => {
  if (heroTimer) {
    clearInterval(heroTimer);
  }
});
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    <AppHeader />

    <section class="relative w-full h-[460px] md:h-[560px] bg-[#EAF5FF] overflow-hidden mt-20">
      <div class="absolute inset-0 z-0 pointer-events-none opacity-60">
        <svg viewBox="0 0 1440 400" class="w-full h-full">
          <circle cx="1200" cy="80" r="40" fill="white" />
          <circle cx="1240" cy="90" r="30" fill="white" />
          <circle cx="200" cy="150" r="50" fill="white" />
          <circle cx="240" cy="160" r="40" fill="white" />
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-4 relative z-10 h-full flex items-start justify-between gap-8 pt-8 md:pt-10">
        <div class="max-w-xl">
          <div class="relative overflow-hidden min-h-[216px] md:min-h-[260px]">
            <Transition name="hero-slide" mode="out-in">
              <div :key="currentHero.id" class="hero-slide-panel">
                <div class="inline-flex items-center rounded-full bg-[#6DBB2E] px-4 py-1.5 text-sm font-black text-white shadow-sm mb-5">
                  {{ currentHero.title }}
                </div>
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-[#0054A6] mb-6 leading-tight">
                  {{ currentHero.headline[0] }}<br />
                  {{ currentHero.headline[1] }}
                </h1>
                <div class="space-y-3 text-gray-700">
                  <div v-for="point in currentHero.points" :key="point" class="flex items-center gap-3">
                    <ShieldCheck class="w-5 h-5 text-[#0054A6]" />
                    <span class="font-bold text-sm md:text-base">{{ point }}</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <div class="flex items-center gap-3 mt-8">
            <button
              class="w-11 h-11 rounded-full border border-[#0054A6]/15 bg-white/90 text-[#0054A6] flex items-center justify-center hover:bg-white transition"
              @click="prevHeroSlide"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>
            <button
              v-for="(slide, index) in heroSlides"
              :key="slide.id"
              :class="[
                'h-2.5 rounded-full transition-all',
                activeHeroIndex === index ? 'w-8 bg-[#0054A6]' : 'w-2.5 bg-[#0054A6]/25 hover:bg-[#0054A6]/50',
              ]"
              :aria-label="`切換到${slide.title}`"
              @click="setHeroSlide(index)"
            />
            <button
              class="w-11 h-11 rounded-full border border-[#0054A6]/15 bg-white/90 text-[#0054A6] flex items-center justify-center hover:bg-white transition"
              @click="nextHeroSlide"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="hidden lg:block w-[650px] h-full flex-shrink-0 relative overflow-hidden -translate-y-12">
          <Transition name="hero-slide" mode="out-in">
            <div :key="`${currentHero.id}-image`" class="hero-slide-panel h-full">
              <img :src="currentHero.img" :alt="currentHero.alt" class="w-full h-full object-contain object-right" />
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto -mt-20 px-4 relative z-20">
      <div class="bg-white rounded-xl shadow-[0_20px_60px_rgba(0,44,102,0.22)] border border-gray-100 overflow-hidden">
        <div class="flex bg-white">
          <button
            v-for="tab in productTabs"
            :key="tab.id"
            :class="[
              'flex-1 flex items-center justify-center gap-3 py-6 font-bold text-sm md:text-base transition-all border-b-4',
              activeTab === tab.id ? 'bg-[#0054A6] text-white border-[#0054A6]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border-transparent',
            ]"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            {{ tab.label }}
          </button>
        </div>

        <div class="p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div class="md:w-1/4 text-center md:text-left">
            <div class="text-[#0054A6] font-black text-2xl md:text-3xl mb-2">{{ currentSummary.title }}</div>
            <a href="#" class="text-sm text-gray-400 underline font-bold hover:text-[#0054A6]">商品內容詳情</a>
          </div>

          <div class="flex-1 grid grid-cols-3 gap-4 w-full text-center">
            <div v-for="stat in currentSummary.stats" :key="stat.label">
              <div class="text-gray-400 text-xs md:text-sm mb-3 font-bold">{{ stat.label }}</div>
              <div class="flex items-baseline justify-center">
                <span class="text-3xl md:text-5xl font-black text-[#0054A6]">{{ stat.value }}</span>
                <span class="text-sm md:text-xl font-bold text-[#0054A6] ml-1">{{ stat.unit }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4 shrink-0">
            <RouterLink
              :to="learnMoreTo"
              class="bg-[#0054A6] text-white px-10 py-3.5 rounded-full font-black text-lg border-2 border-[#0054A6] hover:bg-[#00458a] transition-all flex items-center justify-center gap-2"
            >
              了解更多
              <ChevronRight class="w-5 h-5" />
            </RouterLink>
            <RouterLink
              to="/car-insurance-calc"
              class="bg-[#E6162D] text-white px-10 py-3.5 rounded-full font-black text-lg hover:bg-[#c11226] transition-all flex items-center justify-center gap-2"
            >
              我要投保
              <ChevronRight class="w-5 h-5" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto py-24 px-4">
      <h2 class="text-3xl font-black text-center text-[#0054A6] mb-16 relative">
        南山網路投保熱銷商品
        <div class="w-16 h-1.5 bg-[#6DBB2E] mx-auto mt-4 rounded-full" />
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="card in bestSellers"
          :key="card.id"
          class="bg-white rounded-2xl border border-gray-100 shadow-[0_6px_18px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_44px_rgba(0,44,102,0.18)] transition-all flex flex-col overflow-hidden group"
        >
          <div class="aspect-[16/10] overflow-hidden relative">
            <img :src="card.img" :alt="card.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>

          <div class="p-8 flex-1 flex flex-col items-center text-center">
            <h3 class="text-2xl font-black text-gray-800 mb-6">{{ card.title }}</h3>
            <div class="mb-8">
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-4xl font-black text-[#0054A6]">{{ card.price }}</span>
                <span class="text-sm font-bold text-gray-400">{{ card.priceSuffix }}</span>
              </div>
            </div>
            <ul class="space-y-4 mb-10 w-full text-left inline-block">
              <li v-for="benefit in card.benefits" :key="benefit" class="flex items-start gap-3 text-gray-600 font-bold text-sm">
                <CheckCircle2 class="w-[18px] h-[18px] text-[#A3E635] mt-0.5 shrink-0" />
                {{ benefit }}
              </li>
            </ul>
            <RouterLink
              to="/car-insurance-calc"
              class="w-full py-4 bg-[#f05a6d] text-white rounded-full font-black text-lg hover:bg-[#e6162d] transition-colors shadow-md shadow-pink-100 flex items-center justify-center gap-2 mt-auto"
            >
              我要投保
              <ArrowRight class="w-5 h-5" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 py-24 px-4">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16">
        <div class="lg:w-1/3 text-center lg:text-left">
          <h2 class="text-4xl font-black text-[#0054A6] mb-8">我想了解...</h2>
          <div class="bg-white p-1.5 rounded-full flex shadow-inner border border-gray-100 mb-8 max-w-xs mx-auto lg:mx-0">
            <button
              :class="[
                'flex-1 py-3 rounded-full font-black text-sm transition-all',
                serviceTab === 'progress' ? 'bg-[#0054A6] text-white' : 'text-gray-400 hover:text-gray-600',
              ]"
              @click="serviceTab = 'progress'"
            >
              投保進度
            </button>
            <button
              :class="[
                'flex-1 py-3 rounded-full font-black text-sm transition-all',
                serviceTab === 'claim' ? 'bg-[#0054A6] text-white' : 'text-gray-400 hover:text-gray-600',
              ]"
              @click="serviceTab = 'claim'"
            >
              理賠服務
            </button>
          </div>
        </div>

        <div v-if="serviceTab === 'progress'" class="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <component
            :is="item.to ? RouterLink : 'div'"
            v-for="item in progressItems"
            :key="item.label"
            :to="item.to"
            class="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#0054A6] hover:shadow-lg transition-all cursor-pointer flex flex-col items-center gap-4 text-center"
          >
            <div class="w-14 h-14 flex items-center justify-center">
              <img :src="item.icon" :alt="item.label" class="w-full h-full object-contain" />
            </div>
            <span class="font-black text-gray-700">{{ item.label }}</span>
          </component>
        </div>
        <div v-else class="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4 w-full place-items-center">
          <div
            v-for="item in claimItems"
            :key="item.label"
            class="w-full max-w-[220px] bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#0054A6] hover:shadow-lg transition-all cursor-pointer flex flex-col items-center gap-4 text-center"
          >
            <div class="w-14 h-14 flex items-center justify-center">
              <img :src="item.icon" :alt="item.label" class="w-full h-full object-contain" />
            </div>
            <div class="font-black text-gray-800">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter :show-contacts="true" />
  </div>
</template>

<style scoped>
.hero-slide-panel {
  width: 100%;
}

.hero-slide-enter-active,
.hero-slide-leave-active {
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease;
}

.hero-slide-enter-from {
  transform: translateX(72px);
  opacity: 0;
}

.hero-slide-leave-to {
  transform: translateX(-72px);
  opacity: 0;
}

.hero-slide-enter-to,
.hero-slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>

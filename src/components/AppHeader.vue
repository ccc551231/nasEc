<script setup lang="ts">
import { ChevronDown, ArrowRight, ExternalLink } from "lucide-vue-next";
import logoImg from "@/assets/2ed7c0a690320968452b8b8b2e657f304dd00f14.png";

type MenuLink = {
  label: string;
  to?: string;
  href?: string;
};

type MenuSection = {
  title: string;
  items: MenuLink[];
  titleClass?: string;
};

withDefaults(
  defineProps<{
    showCalcLink?: boolean;
    ctaTo?: string;
    ctaLabel?: string;
  }>(),
  {
    showCalcLink: false,
    ctaTo: "",
    ctaLabel: "試算 / 投保",
  }
);

const hotProducts: MenuSection[] = [
  {
    title: "商品一覽",
    items: [
      { label: "汽車保險", to: "/car-insurance" },
      { label: "機車保險", to: "/motorcycle-insurance" },
      { label: "電動機車險", href: "#" },
      { label: "旅遊保險", href: "#" },
    ],
  },
];

const insuranceSections: MenuSection[] = [
  {
    title: "我要投保",
    items: [
      { label: "汽車保險", to: "/car-insurance" },
      { label: "機車保險", to: "/motorcycle-insurance" },
      { label: "電動機車險", href: "#" },
      { label: "旅遊保險", href: "#" },
    ],
  },
  {
    title: "我要續保",
    items: [
      { label: "汽車保險", href: "#" },
      { label: "機車保險", href: "#" },
    ],
  },
];

const customerServiceSections: MenuSection[] = [
  {
    title: "易家保服務",
    titleClass: "text-[#005bab]",
    items: [{ label: "申請", href: "#" }, { label: "我要出發", href: "#" }, { label: "管理", href: "#" }],
  },
  {
    title: "繳費專區",
    titleClass: "text-[#005bab]",
    items: [{ label: "我要繳費", href: "#" }, { label: "查詢繳費狀況", href: "#" }],
  },
  {
    title: "保單專區",
    titleClass: "text-[#005bab]",
    items: [
      { label: "我的保單", href: "#" },
      { label: "我要續保", href: "#" },
      { label: "保單變更/加保", href: "#" },
      { label: "強制證下載", href: "#" },
      { label: "強制險到期提醒", href: "#" },
    ],
  },
  {
    title: "理賠專區",
    titleClass: "text-[#005bab]",
    items: [
      { label: "我要理賠", href: "#" },
      { label: "理賠進度與紀錄查詢", href: "#" },
      { label: "數位身分驗證", href: "#" },
      { label: "保全/理賠聯盟鏈", href: "#" },
      { label: "理賠醫起通", href: "#" },
    ],
  },
  {
    title: "線上投保訂單",
    titleClass: "text-[#005bab]",
    items: [{ label: "上傳要保書", href: "#" }, { label: "訂單查詢", href: "#" }],
  },
];

const footerLinks = [
  { label: "常見問題", href: "#", icon: "arrow" },
  { label: "服務據點", href: "#", icon: "external" },
] as const;
</script>

<template>
  <nav class="bg-white border-b border-gray-100 fixed top-0 w-full z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <RouterLink to="/" class="flex items-center gap-3 shrink-0">
          <img :src="logoImg" alt="南山產物" class="h-8" />
          <div class="h-6 w-px bg-gray-300" />
          <span class="text-base text-[#0054A6] font-medium leading-none">網路投保中心</span>
        </RouterLink>

        <div class="hidden md:flex items-center">
          <div class="relative group px-3 py-7">
            <button class="flex items-center text-gray-600 text-sm font-medium hover:text-[#005bab] transition-colors">
              熱賣商品
              <ChevronDown class="ml-1 w-4 h-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0"
            >
              <div class="bg-white border border-gray-100 rounded-2xl shadow-xl min-w-[320px] flex flex-col overflow-hidden">
                <div class="p-6">
                  <div v-for="section in hotProducts" :key="section.title">
                    <h3 class="text-[#005bab] font-bold text-sm mb-3 border-b border-gray-50 pb-2">{{ section.title }}</h3>
                    <ul class="space-y-2">
                      <li v-for="item in section.items" :key="item.label">
                        <RouterLink
                          v-if="item.to"
                          :to="item.to"
                          class="text-gray-500 hover:text-[#005bab] text-[16px] block py-0.5"
                        >
                          {{ item.label }}
                        </RouterLink>
                        <a v-else :href="item.href || '#'" class="text-gray-500 hover:text-[#005bab] text-[16px] block py-0.5">
                          {{ item.label }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="bg-[#f0f7ff] p-5 flex gap-4 rounded-b-2xl">
                  <a
                    v-for="link in footerLinks"
                    :key="link.label"
                    :href="link.href"
                    class="flex-1 bg-white rounded-xl p-3 flex justify-between items-center hover:shadow-md transition-shadow border border-transparent hover:border-blue-100"
                  >
                    <span class="text-gray-700 font-medium text-sm">{{ link.label }}</span>
                    <ArrowRight v-if="link.icon === 'arrow'" class="w-4 h-4 text-[#005bab]" />
                    <ExternalLink v-else class="w-4 h-4 text-[#005bab]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="relative group px-3 py-7">
            <button class="flex items-center text-gray-600 text-sm font-medium hover:text-[#005bab] transition-colors">
              投保/續保
              <ChevronDown class="ml-1 w-4 h-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0"
            >
              <div class="bg-white border border-gray-100 rounded-2xl shadow-xl min-w-[440px] flex flex-col overflow-hidden">
                <div class="p-7 flex gap-10">
                  <div v-for="section in insuranceSections" :key="section.title" class="flex-1">
                    <h3 class="text-[#005bab] font-bold text-sm mb-3 border-b border-gray-50 pb-2">{{ section.title }}</h3>
                    <ul class="space-y-2">
                      <li v-for="item in section.items" :key="item.label">
                        <RouterLink
                          v-if="item.to"
                          :to="item.to"
                          class="text-gray-500 hover:text-[#005bab] text-[16px] block py-0.5"
                        >
                          {{ item.label }}
                        </RouterLink>
                        <a v-else :href="item.href || '#'" class="text-gray-500 hover:text-[#005bab] text-[16px] block py-0.5">
                          {{ item.label }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="bg-[#f0f7ff] p-5 flex gap-4 rounded-b-2xl">
                  <a
                    v-for="link in footerLinks"
                    :key="link.label"
                    :href="link.href"
                    class="flex-1 bg-white rounded-xl p-3 flex justify-between items-center hover:shadow-md transition-shadow border border-transparent hover:border-blue-100"
                  >
                    <span class="text-gray-700 font-medium text-sm">{{ link.label }}</span>
                    <ArrowRight v-if="link.icon === 'arrow'" class="w-4 h-4 text-[#005bab]" />
                    <ExternalLink v-else class="w-4 h-4 text-[#005bab]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="relative group px-3 py-7">
            <button class="flex items-center text-gray-600 text-sm font-medium hover:text-[#005bab] transition-colors">
              保戶服務
              <ChevronDown class="ml-1 w-4 h-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>
            <div
              class="fixed inset-x-0 top-20 flex justify-center pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 pointer-events-none"
            >
              <div
                class="bg-white border border-gray-100 rounded-2xl shadow-xl w-[min(1080px,calc(100vw-48px))] mx-6 pointer-events-auto flex flex-col overflow-hidden"
              >
                <div class="p-8 flex flex-wrap gap-x-10 gap-y-8 justify-start">
                  <div v-for="section in customerServiceSections" :key="section.title" class="min-w-[150px]">
                    <h3 :class="['font-bold mb-4 text-sm', section.titleClass || 'text-[#005bab]']">{{ section.title }}</h3>
                    <ul class="space-y-3">
                      <li v-for="item in section.items" :key="item.label">
                        <a :href="item.href || '#'" class="text-gray-500 hover:text-[#005bab] text-[16px] block font-normal leading-tight">
                          {{ item.label }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="bg-[#f0f7ff] p-5 flex gap-4 rounded-b-2xl">
                  <a
                    v-for="link in footerLinks"
                    :key="link.label"
                    :href="link.href"
                    class="flex-1 bg-white rounded-xl p-3 flex justify-between items-center hover:shadow-md transition-shadow border border-transparent hover:border-blue-100"
                  >
                    <span class="text-gray-700 font-medium text-sm">{{ link.label }}</span>
                    <ArrowRight v-if="link.icon === 'arrow'" class="w-4 h-4 text-[#005bab]" />
                    <ExternalLink v-else class="w-4 h-4 text-[#005bab]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <RouterLink
            v-if="showCalcLink"
            to="/car-insurance-calc"
            class="px-3 py-7 text-sm font-medium text-gray-600 hover:text-[#005bab] transition-colors"
          >
            保費試算
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <button
          class="hidden md:inline-flex items-center justify-center bg-[#155DA8] text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-[#124f90] transition-all shadow-sm"
        >
          註冊
        </button>
        <button
          class="hidden md:inline-flex items-center justify-center bg-[#6DBB2E] text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-[#5ea128] transition-all shadow-sm"
        >
          登入
        </button>
      </div>
    </div>
  </nav>
</template>

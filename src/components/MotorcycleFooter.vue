<template>
  <footer class="bg-[#003D82] text-white py-12 mt-24">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="font-bold mb-4">關於南山</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="#" class="hover:text-white transition">公司簡介</a></li>
            <li><a href="#" class="hover:text-white transition">服務據點</a></li>
            <li><a href="#" class="hover:text-white transition">最新消息</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">商品資訊</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><RouterLink to="/car-insurance" class="hover:text-white transition">汽車保險</RouterLink></li>
            <li><a href="#" class="hover:text-white transition">機車保險</a></li>
            <li><a href="#" class="hover:text-white transition">旅遊保險</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">客戶服務</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="#" class="hover:text-white transition">理賠申請</a></li>
            <li><a href="#" class="hover:text-white transition">保單查詢</a></li>
            <li><a href="#" class="hover:text-white transition">常見問題</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">聯絡我們</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>客服專線：0800-020-060</li>
            <li>服務時間：週一至週五 9:00-18:00</li>
            <li>Email: service@nanshan.com.tw</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/20 pt-8 text-center text-sm text-gray-400">
        <p>© 2024 南山產物保險股份有限公司 版權所有</p>
      </div>
    </div>
  </footer>
</template>

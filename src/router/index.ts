import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import CarInsurancePage from "@/pages/CarInsurancePage.vue";
import MotorcycleInsurancePage from "@/pages/MotorcycleInsurancePage.vue";
import CarInsuranceCalcPage from "@/pages/CarInsuranceCalcPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/car-insurance",
      name: "car-insurance",
      component: CarInsurancePage,
    },
    {
      path: "/motorcycle-insurance",
      name: "motorcycle-insurance",
      component: MotorcycleInsurancePage,
    },
    {
      path: "/car-insurance-calc",
      name: "car-insurance-calc",
      component: CarInsuranceCalcPage,
    },
  ],
});

export default router;

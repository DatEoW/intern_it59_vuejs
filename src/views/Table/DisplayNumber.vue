<template>
  <div id="formTo_C">
    <div id="fromTo" class="text-end mb-2" v-if="userStore?.user?.total < 10 &&userStore?.user?.total >1">
      Hiển thị từ {{ userStore?.user?.from }} ~
      {{ userStore?.user?.total }} trong tổng số
      <strong>{{ userStore?.user?.total }}</strong> user
    </div>
    <div
      id="fromTo"
      class="text-end mb-2"
      v-if="userStore?.user?.total === 1"
    >
      Hiển thị {{ userStore?.user?.from }} trong tổng số
      <strong>{{ userStore?.user?.total }}</strong> user
    </div>
    <div
      id="fromTo"
      class="text-end mb-2"
      v-if="userStore?.user?.total >= 10"
    >
      Hiển thị từ {{ userStore?.user?.from }} ~ {{ userStore?.user?.to }} trong
      tổng số <strong>{{ userStore?.user?.total }}</strong> user
    </div>
    <div
      id="fromTo"
      class="text-end mb-2"
      v-if="userStore?.user?.total === 0"
    >
      <p style="text-align: right">
        <strong>Không có user hiển thị</strong>
      </p>
    </div>
  </div>
</template>
<script setup>
  import { useUserStore } from "@/stores/user";
  const userStore = useUserStore();
</script>

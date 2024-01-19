<template>
  <div id="formTo_C">
    <div
      id="fromTo"
      class="text-right mb-2"
      v-if="userStore?.user?.total === 10"
    >
      Hiển thị từ {{ userStore?.user?.from }} ~ {{ userStore?.user?.to }} trong
      tổng số <strong>{{ userStore?.user?.total }}</strong> user
    </div>
    <div id="fromTo" class="text-right mb-2" v-if="userStore?.user?.to === 1">
      Hiển thị từ {{ userStore?.user?.from }} ~ {{ userStore?.user?.to }} trong
      tổng số <strong>{{ userStore?.user?.total }}</strong> user
    </div>
    <div id="fromTo" class="text-right mb-2" v-if="userStore?.user?.to >= 10">
      Hiển thị từ {{ userStore?.user?.from }} ~ {{ userStore?.user?.to }} trong
      tổng số <strong>{{ userStore?.user?.total }}</strong> user
    </div>
    <div id="fromTo" class="text-right mb-2" v-if="userStore?.user?.to === 0">
      <p style="text-align: right">
        <strong>không có sản phẩm hiển thị</strong> user
      </p>
    </div>
  </div>
</template>
<script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/user";
  const disPlayNumber = ref();
  const userStore = useUserStore();
</script>

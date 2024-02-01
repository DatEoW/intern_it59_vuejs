<template>
  <div class="col-10- col-sm-10 col-md-6 col-lg-6 col-xl-6">
    <div class="d-flex align-items-center gap-2">
      <label for="perPage">Hiển thị</label>
      <select
        class="form-select form-select-sm w-auto"
        id="perPage"
        @change="changePerPage"
        v-model="perpage"
      >
        <option value="10" selected>10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <label for="perPage">đơn vị</label>
    </div>
  </div>
</template>
<script setup>
  import { useUserStore } from "@/stores/user";
  import { ref } from "vue";
  const perpage = ref(10);
  const userStore = useUserStore();

  const changePerPage = (event) => {
    //kiểm tra số lượng lý thuyết total phải có,
    // từ đó so sánh với total từ response,
    // nếu bé hơn total trên lý thuyết --> trả về page cuối
    let total = Number(event.target.value) * userStore.user.current_page;
    console.log({
      page: perpage.value,
      current_page: userStore.user.current_page,
      total: total,
      totalresponse: userStore.user.total,
      last_page: Number(userStore.user.total) / Number(perpage.value),
    });
    let page = 1;
    let last_page = Math.ceil(
      Number(userStore.user.total) / Number(perpage.value)
    );
    if (userStore.user.total < total) {
      page = last_page;
    } else {
      page = userStore.user.current_page;
    }
    userStore.getAllUser({
      perPage: Number(perpage.value),
      page: page,
    });
  };
</script>

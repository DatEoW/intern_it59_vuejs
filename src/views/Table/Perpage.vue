<template>
  <div class="col-10- col-sm-10 col-md-6 col-lg-6 col-xl-6">
    <div class="d-flex align-items-center gap-2">
      <label for="perPage">Hiển thị</label>
      <select
        class="form-select form-select-sm w-auto"
        id="perPage"
        @change="changePerPage"
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <label for="perPage">đơn vị</label>
    </div>
  </div>
</template>
<script setup>
  import { useUserStore } from "@/stores/user";
  const userStore = useUserStore();

  const changePerPage = (event) => {
    let total = Number(event.target.value) * userStore.user.current_page;
    let page = 1;
    if (userStore?.user?.total < total) {
      page = 1;
    } else {
      page = userStore.user.current_page;
    }
    userStore.getAllUser({
      perPage: Number(event.target.value),
      page: page,
      name: userStore?.detailUser?.name,
      email: userStore?.detailUser?.email,
      is_active: userStore?.detailUser?.is_active,
      group_role: userStore?.detailUser?.group_role,
    });
  };
</script>

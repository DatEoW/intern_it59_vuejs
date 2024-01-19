<template>
  <!-- {{-- header --}} -->
  <nav class="navbar bg-body-tertiary container-fluid">
    <div class="container-fluid text-center" style="background-color: black">
      <a class="navbar-brand" href="#">
        <img
          src="/img/logo.png"
          alt="Logo"
          class="d-inline-block align-text-top"
        />
      </a>

      <form
        action=""
        method="post"
        @submit.prevent="logout()"
        class="d-flex align-items-center"
        style="gap: 20px"
      >
        <span style="color: white; padding-right: 20px"
          >Chào {{ authStore?.authUser?.user?.name }}</span
        >
        <button class="btn btn-primary" style="margin: 0">Đăng Xuất</button>
      </form>
    </div>
  </nav>
</template>
<script setup>
  import { useAuthStore } from "../stores/auth";
  import { useRouter } from "vue-router";
  const router = useRouter();
  const authStore = useAuthStore();

  async function logout() {
    await authStore.logout().then(router.push("/login"));
  }
</script>

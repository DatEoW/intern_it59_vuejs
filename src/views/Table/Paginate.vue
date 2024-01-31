<template>
  <div class="col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6">
    <nav aria-label="Page user management navigation">
      <ul class="pagination justify-content-end" id="paginate">
        <li
          class="page-item"
          v-for="(item, index) in userStore?.user?.links"
          :key="item.label"
          @click="handlePaginate(handleUrlLink(item.url))"
        >
          <a
            :class="{ active: item.active }"
            class="page-link"
            href="#!"
            v-if="index === 0"
          >
            <span>&lt;</span>
          </a>
          <a
            :class="{ active: item.active }"
            class="page-link"
            href="#!"
            v-else-if="index === userStore?.user?.links?.length - 1"
          >
            <span>&gt;</span>
          </a>
          <a
            :class="{ active: item.active }"
            class="page-link"
            href="#!"
            v-else
          >
            <span>{{ index }}</span>
          </a>
        </li>
        <li
          :class="{ active: userStore?.user?.links?.active }"
          @click="handlePaginate(userStore?.user?.last_page)"
        >
          <a class="page-link" href="#!">
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  import { useUserStore } from "@/stores/user";

  const userStore = useUserStore();

  const handleUrlLink = (link) => {
    const page = link?.split("page=").at(1);
    return page;
  };

  const handlePaginate = (page) => {
    if (!page) return;
   
    userStore.getAllUser({
      page,
      perPage: userStore.user.per_page,
     
    });
  };
</script>

<template>
  <div class="table-responsive">
    <table class="table" id="user-table">
      <form action="">
        <input type="hidden" value="" id="idUser" />
        <input type="hidden" value="" id="roleUser" />
      </form>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="text-truncate" style="max-width: 50px">Tên</th>
          <th scope="col" class="text-truncate" style="max-width: 50px">
            Email
          </th>
          <th scope="col">Nhóm</th>
          <th scope="col">Trạng Thái</th>
          <th scope="col">Hành Động</th>
        </tr>
      </thead>
      <tbody id="tbody-table">
        <tr v-for="(item, index) in userStore?.user?.data" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td class="text-truncate" style="max-width: 150px">
            {{ item.name }}
          </td>
          <td class="text-truncate" style="max-width: 150px">
            {{ item.email }}
          </td>
          <td v-html="item.group_text"></td>
          <td v-html="item.active_text"></td>
          <td>
            <a href="javascript:void(0)" class="btn btn-primary editButton"
              ><i class="fas fa-edit"></i
            ></a>
            <a href="javascript:void(0)" class="btn btn-danger toDelete"
              ><i class="fa-solid fa-trash-can"></i
            ></a>
            <a href="javascript:void(0)" class="btn btn-info toLock"
              ><i
                class="fas fa-user"
                style="color: white"
                v-if="item.is_active"
              ></i
              ><i class="fas fa-user-slash" style="color: red" v-else></i
            ></a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="text-truncate" style="max-width: 50px">Tên</th>
          <th scope="col" class="text-truncate" style="max-width: 50px">
            Email
          </th>
          <th scope="col">Nhóm</th>
          <th scope="col">Trạng Thái</th>
          <th scope="col">Hành Động</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script setup>
  import { useUserStore } from "../stores/user";

  const userStore = useUserStore();
</script>

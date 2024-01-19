<template>
  <Nav />
  <!-- {{-- modal add --}} -->
  <div
    class="modal fade ajax-modal"
    id="addModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form action="" id="ajaxForm" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal-title">
              Form thêm mới thành viên
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label for="">Tên</label>
              <input type="text" name="name" id="name" class="form-control" />
              <span id="nameError" class="text-danger error-messages"></span>
            </div>
            <div class="form-group mb-3">
              <label for="">Email</label>
              <input type="text" name="email" id="email" class="form-control" />
              <span id="emailError" class="text-danger error-messages"></span>
            </div>
            <div class="form-group mb-3">
              <label for="">Mật khẩu</label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-control"
              />
              <span
                id="passwordError"
                class="text-danger error-messages"
              ></span>
            </div>
            <div class="form-group mb-3">
              <p>Nhóm</p>
              <select name="group_role" class="form-select" id="getGroup_role">
                <option value="" disabled selected hidden>Chọn nhóm</option>
                <option value="0">Admin</option>
                <option value="1">Editor</option>
                <option value="2">Reviwer</option>
              </select>
              <span id="groupError" class="text-danger error-messages"></span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button type="button" class="btn btn-primary" id="addBtn" >
              Thêm thành viên
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- {{-- modal update --}} -->

  <div
    class="modal fade ajax-modal"
    id="updateModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form action="" id="ajaxForm-update">
      <input type="hidden" id="idUpdateUser" />
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal-title-u">
              Form cập nhật thành viên
            </h1>
            <p id="userPoli"></p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label for="">Tên</label>
              <input type="text" name="name" id="name-1" class="form-control" />
              <span id="nameError-1" class="text-danger error-messages"></span>
            </div>
            <div class="form-group mb-3">
              <label for="">Email</label>
              <input
                type="text"
                name="email"
                id="email-1"
                class="form-control"
              />
              <span id="emailError-1" class="text-danger error-messages"></span>
            </div>
            <div class="form-group mb-3">
              <label for="">Mật khẩu</label>
              <input
                type="password"
                name="password"
                id="password-1"
                class="form-control"
              />
              <span
                id="passwordError-1"
                class="text-danger error-messages"
              ></span>
            </div>
            <div class="form-group mb-3">
              <p>Nhóm</p>
              <select name="group_role" class="form-select" id="group_role-1">
                <option value="" disabled selected hidden>Chọn nhóm</option>
                <option value="0">Admin</option>
                <option value="1">Editor</option>
                <option value="2">Reviwer</option>
              </select>
              <span
                id="groupdError-1"
                class="text-danger error-messages"
              ></span>
            </div>
            <div class="form-group">
              <p>Trạng thái</p>
              <select name="is_active" class="form-select" id="is-active-1">
                <option value="" disabled selected hidden>
                  Chọn trạng thái
                </option>
                <option value="1">Hoạt động</option>
                <option value="0">Tạm khóa</option>
              </select>
              <span
                id="status_Error-1"
                class="text-danger error-messages"
              ></span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button type="button" class="btn btn-primary" id="updateBtn">
              Cập Nhật thành viên
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- {{-- modal delete --}} -->
  <div
    class="modal fade ajax-modal"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    role="dialog"
  >
    <form action="" id="ajaxForm-delete">
      <input type="hidden" id="idDeleteUser" />

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" style="text-align: center">
            <div id="deleteIcon"></div>

            <h1
              class="modal-title fs-5"
              id="modal-title-d"
              style="text-align: center"
            ></h1>
          </div>
          <div class="modal-footer" style="justify-content: center">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="deleteNo"
            >
              Không
            </button>
            <button type="button" class="btn btn-danger" id="deleteBtn">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- {{-- modal Lock --}} -->
  <div
    class="modal fade ajax-modal"
    id="lockModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    role="dialog"
  >
    <form action="" id="ajaxForm-lock">
      <input type="hidden" id="idLockUser" />
      <input type="hidden" id="activeUser" />
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" style="text-align: center">
            <div id="lockIcon"></div>

            <h1
              class="modal-title fs-5"
              id="modal-title-l"
              style="text-align: center"
            ></h1>
          </div>
          <div class="modal-footer" style="justify-content: center">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="lockNo"
            >
              Không
            </button>
            <button type="button" class="btn btn-danger" id="lockBtn"></button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- {{-- search --}} -->
  <div class="row justify-content-center" style="width: 100%">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <form id="ajaxForm-search" style="margin-top: 30px">
        <div style="" class="form_search">
          <div class="form-group">
            <p>Tên</p>
            <input
              type="text"
              placeholder="Nhập họ tên"
              name="name"
              id="getName"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <p>Email</p>
            <input
              type="text"
              placeholder="Nhập Email"
              name="email"
              id="getEmail"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <p>Nhóm</p>
            <select name="group_role" class="form-select" id="">
              <option value="" disabled selected hidden>Chọn nhóm user</option>
              <option value="0">Admin</option>
              <option value="1">Editor</option>
              <option value="2">Reviwer</option>
              <option value="3">Tất cả</option>
            </select>
          </div>
          <div class="form-group">
            <p>Trạng thái</p>
            <select name="is_active" class="form-select" id="getIs_status">
              <option value="" disabled selected hidden>Chọn trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="0">Tạm khóa</option>
              <option value="2">Tất cả</option>
            </select>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap" class="form_search">
          <div>
            <a
              href="javascript:void(0)"
              style="margin-bottom: 40px !important; margin-top: 40px"
              data-role=""
              data-bs-target="#addModal"
              class="btn btn-info mb-3 toAdd"
              @click="showAddModalForm"
            >
              <i class="fa-solid fa-user-plus" style="color: white"></i>
              Thêm thành viên</a
            >
          </div>

          <div>
            <button
              type="submit"
              id="searchBtn"
              class="btn btn-info mb-3"
              style="margin-bottom: 40px !important; margin-top: 40px"
            >
              <i class="fas fa-search" style="color: white"></i> Tìm kiếm
            </button>
            <button
              id="resetBtn"
              type="reset"
              class="btn btn-info mb-3"
              style="margin-bottom: 40px !important; margin-top: 40px"
            >
              <i class="fa-solid fa-circle-xmark" style="color: white"></i> Xóa
              tìm kiếm
            </button>
          </div>
        </div>
      </form>
      <div id="formTo_C">
        <div id="fromTo"></div>
      </div>
      <DisplayNumber />
      <!-- table-->
      <Table />

      <div class="row">
        <!-- hien thi so record-->
        <Perpage />

        <!--Hien thi phan trang-->
        <Paginate />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <AddModal
      :show="showAddModal"
    >
      <template #header>
        <h3>Add Todo</h3>
      </template>
      <template #input>
        <span>Text Todo : </span>
        <input type="text"/>
      </template>
    </AddModal>
  </Teleport>

  <main class="">
    <h6 class="text-center" style="font-weight: bold">@ Trần Phát Đạt</h6>
  </main>
</template>
<script>
  import Table from "./Table.vue";
  import Perpage from "./Perpage.vue";
  import Nav from "./Nav.vue";
  import DisplayNumber from "./DisplayNumber.vue";
  import Paginate from "./Paginate.vue";
  export default {
    components: { Table, Nav, Perpage, DisplayNumber, Paginate },
  };
</script>
<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/user";
  import AddModal from "../views/AddModal.vue";

  const showAddModal = ref(false);

  const userStore = useUserStore();

  const showAddModalForm = () => {
    console.log('123124');
    showAddModal.value = true;
  };
  userStore.getAllUser({});
</script>

<template>
  <div>
    <Loading v-if="loadingOverlayStore.value" />

    <Nav />

    <!-- {{-- search --}} -->
    <div class="row justify-content-center" style="width: 100%">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <form
          id="ajaxForm-search"
          style="margin-top: 30px"
          @submit.prevent="onSubmitSearch"
        >
          <div style="" class="form_search">
            <div class="form-group">
              <p>Tên</p>
              <input
                type="text"
                placeholder="Nhập họ tên"
                name="name"
                id="getName"
                class="form-control"
                v-model="nameSearch"
                @input="onInputNameSearch"
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
                v-model="emailSearch"
              />
            </div>
            <div class="form-group">
              <p>Nhóm</p>
              <select
                name="group_role"
                class="form-select"
                id=""
                v-model="group_roleSearch"
              >
                <option value="" disabled selected hidden>
                  Chọn nhóm User
                </option>
                <option value="0">Admin</option>
                <option value="1">Editor</option>
                <option value="2">Reviwer</option>
                <option value="3">Tất cả</option>
              </select>
            </div>
            <div class="form-group">
              <p>Trạng thái</p>
              <select
                name="is_active"
                class="form-select"
                id="getIs_status"
                v-model="is_activeSearch"
              >
                <option value="" disabled selected hidden>
                  Chọn trạng thái
                </option>
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
                @click="showCreateModalForm"
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
                @click="resetSearch"
              >
                <i class="fa-solid fa-circle-xmark" style="color: white"></i>
                Xóa tìm kiếm
              </button>
            </div>
          </div>
        </form>
        <div id="formTo_C">
          <div id="fromTo"></div>
        </div>
        <DisplayNumber />
        <!-- table-->
        <Table
          :showUpdateModalForm="showUpdateModalFormInTable"
          :showChangeModalForm="showChangeModalFormInTable"
        />
        <div class="row">
          <!-- hien thi so record-->
          <Perpage />

          <!--Hien thi phan trang-->
          <Paginate />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <!-- create modal-->
      <CreateModal
        :show="showCreateModal"
        @close="closeModal"
        @create="onSubmitCreateModal"
      >
        <template #header>
          <h1 class="modal-title fs-5" id="modal-title">
            Form thêm thành viên
          </h1>
        </template>
        <template #input>
          <div class="form-group mb-3">
            <label for="">Tên</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              v-model="name"
              v-bind="nameAttrs"
            />
            <span id="nameError" class="text-danger error-messages">{{
              errors.name
            }}</span>
          </div>
          <div class="form-group mb-3">
            <label for="">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              class="form-control"
              v-model="email"
              v-bind="emailAttrs"
            />
            <span id="emailError" class="text-danger error-messages"
              >{{ errors.email }}{{ errorMessages.email }}</span
            >
          </div>
          <div class="form-group mb-3">
            <label for="">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              v-model="password"
              v-bind="passwordAttrs"
            />
            <span id="passwordError" class="text-danger error-messages">{{
              errors.password
            }}</span>
          </div>
          <div class="form-group mb-3">
            <p>Nhóm</p>
            <select
              name="group_role"
              class="form-select"
              id="getGroup_role"
              v-model="group_role"
              v-bind="group_roleAttrs"
            >
              <option value="" disabled selected hidden>Chọn nhóm</option>
              <option value="0">Admin</option>
              <option value="1">Editor</option>
              <option value="2">Reviwer</option>
            </select>
            <span id="groupError" class="text-danger error-messages">{{
              errors.group_role
            }}</span>
          </div>
        </template>
      </CreateModal>
      <!-- update modal-->
      <UpdateModal
        :show="showUpdateModal"
        @close="closeModal"
        @update="onSubmitUpdateModal"
      >
        <template #header>
          <h1 class="modal-title fs-5" id="modal-title">
            Form cập nhật thành viên
          </h1>
        </template>
        <template #input>
          <input type="hidden" v-model="id" v-bind="idAttrs" />
          <div class="form-group mb-3">
            <label for="">Tên</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              v-model="name"
              v-bind="nameAttrs"
            />
            <span id="nameError" class="text-danger error-messages">{{
              errors.name
            }}</span>
          </div>
          <div class="form-group mb-3">
            <label for="">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              class="form-control"
              v-model="email"
              v-bind="emailAttrs"
            />
            <span id="emailError" class="text-danger error-messages"
              >{{ errors.email }}{{ errorMessages.email }}</span
            >
          </div>
          <div class="form-group mb-3">
            <label for="">Mật khẩu</label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              v-model="password"
              v-bind="passwordAttrs"
            />
            <span id="passwordError" class="text-danger error-messages">{{
              errors.password
            }}</span>
          </div>
          <div class="form-group mb-3">
            <p>Nhóm</p>
            <select
              name="group_role"
              class="form-select"
              id="getGroup_role"
              v-model="group_role"
              v-bind="group_roleAttrs"
            >
              <option value="" disabled selected hidden>Chọn nhóm</option>
              <option value="0">Admin</option>
              <option value="1">Editor</option>
              <option value="2">Reviwer</option>
            </select>
            <span id="groupError" class="text-danger error-messages">{{
              errors.group_role
            }}</span>
          </div>
          <div class="form-group">
            <p>Trạng thái</p>
            <select
              name="is_active"
              class="form-select"
              id="is-active-1"
              v-model="is_active"
              v-bind="is_activeAttrs"
            >
              <option value="" disabled selected hidden>Chọn trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="0">Tạm khóa</option>
            </select>
            <span id="status_Error-1" class="text-danger error-messages">{{
              errors.is_active
            }}</span>
          </div>
        </template>
      </UpdateModal>
      <ChangeModal
        :show="showChangeModal"
        @close="closeModal"
        @delete="onSubmitChangeModal"
      >
        <!-- <template #header>  </template> -->
        <template #icon>
          <i
            class="fa-regular fa-circle-question"
            style="color: yellow; font-size: 50px"
            v-if="userCheck"
          ></i>
          <i
            class="fa-solid fa-triangle-exclamation"
            style="color: red; font-size: 50px"
            v-else
          ></i>
        </template>
        <template #title>
          <h1
            class="modal-title fs-5"
            id="modal-title-d"
            style="text-align: center"
          >
            <span v-if="userCheck && phuongThuc == 'delete'"
              >Bạn có chắc muốn xóa User
              <strong>{{ idUserDelete }}</strong></span
            >

            <span v-if="userCheck && phuongThuc == 'lock'"
              >Bạn có chắc muốn khóa User
              <strong>{{ idUserDelete }}</strong></span
            >

            <span v-if="userCheck && phuongThuc == 'unlock'"
              >Bạn có chắc muốn mở khóa User
              <strong>{{ idUserDelete }}</strong></span
            >
            <span v-else-if="!userCheck"
              >Bạn không thể tác động lên User
              <strong>{{ idUserDelete }}</strong></span
            >
          </h1>
        </template>
        <template #button>
          <button
            type="submit"
            class="btn btn-danger"
            v-if="userCheck && phuongThuc == 'delete'"
          >
            Xóa
          </button>
          <button
            type="submit"
            class="btn btn-success"
            v-if="userCheck && phuongThuc == 'lock'"
          >
            Khóa
          </button>
          <button
            type="submit"
            class="btn btn-success"
            v-if="userCheck && phuongThuc == 'unlock'"
          >
            Mở Khóa
          </button>
        </template>
      </ChangeModal>
    </Teleport>

    <main class="">
      <h6 class="text-center" style="font-weight: bold">@ Trần Phát Đạt</h6>
    </main>
  </div>
</template>

<script>
  import Table from "./Table/Table.vue";
  import Perpage from "./Table/Perpage.vue";
  import Loading from "./Loading/Loading.vue";
  import Nav from "./Table/Nav.vue";
  import DisplayNumber from "./Table/DisplayNumber.vue";
  import Paginate from "./Table/Paginate.vue";
  export default {
    components: { Table, Nav, Perpage, DisplayNumber, Paginate },
  };
</script>
<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/user";
  import { useAuthStore } from "../stores/auth";
  import { useIsLoading } from "../stores/loading";
  import CreateModal from "../views/Modal/CreateModal.vue";
  import UpdateModal from "../views/Modal/UpdateModal.vue";
  import ChangeModal from "../views/Modal/ChangeModal.vue";
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  // khởi tạo các giá trị show modal
  const showCreateModal = ref(false);
  const showChangeModal = ref(false);
  const showUpdateModal = ref(false);
  // khởi tạo id form để lấy dữ liệu form
  const userCheck = ref(true);
  const activeForm = ref("");
  //khởi tạo phuongthuc và id để truyền vào function userchange
  const phuongThuc = ref();
  const idUserDelete = ref();

  // khởi tạo state loading

  const loadingOverlayStore = useIsLoading();
  // khởi tạo state user
  const userStore = useUserStore();
  const renderTable = async () => {
    await userStore.getAllUser({});
  };
  renderTable();

  const authStore = useAuthStore();

  const showCreateModalForm = () => {
    showCreateModal.value = true;
    document.body.style.overflow = "hidden";
  };
  const showUpdateModalFormInTable = async (idUser) => {
    await userStore.getUser(idUser);
    name.value = userStore.detailUser.name;
    email.value = userStore.detailUser.email;
    group_role.value = userStore.detailUser.group_role;
    is_active.value = userStore.detailUser.is_active;
    id.value = idUser;
    showUpdateModal.value = true;
    document.body.style.overflow = "hidden";
  };
  const showChangeModalFormInTable = async (idUser, phuongThucText) => {
    await userStore.getUser(idUser);
    phuongThuc.value = phuongThucText;
    idUserDelete.value = userStore.detailUser.id;
    if (Number(idUser) === Number(authStore.authUser.id)) {
      userCheck.value = false;
    }
    showChangeModal.value = true;
    document.body.style.overflow = "hidden";
  };

  const errorMessages = ref({
    name: "",
    email: "",
    password: "",
    group_role: "",
  });

  const closeModal = () => {
    // selectedItemId.value = null;
    showChangeModal.value = false;
    showUpdateModal.value = false;
    showCreateModal.value = false;
    resetForm();
    document.body.style.overflow = "";
  };

  const createValidationSchema = () => {
    return yup.object({
      email: yup
        .string()
        .email("Email sai định dạng")
        .required("Email không được bỏ trống"),
      password: yup.string().required("Mật khẩu không được để trống"),
      name: yup.string().required("Tên không được để trống"),
      group_role: yup.string().required("Nhóm không được để trống"),
    });
  };

  const updateValidationSchema = () => {
    return yup.object({
      email: yup
        .string()
        .email("Email sai định dạng")
        .required("Email không được bỏ trống"),
      password: yup.string().required("Mật khẩu không được để trống"),
      name: yup.string().required("Tên không được để trống"),
      group_role: yup.string().required("Nhóm không được để trống"),
      is_active: yup.string().required("Trạng thái không được để trống"),
      id: yup.number().required(),
    });
  };
  const searchValidationSchema = () => {
    return yup.object({
      email: yup.string(),
      name: yup.string(),
      group_role: yup.number(),
      is_active: yup.number(),
    });
  };

  const { errors, handleSubmit, defineField, controlledValues, resetForm } =
    useForm({
      validationSchema: () => {
        if (activeForm.vale === "update") {
          return updateValidationSchema();
        }
        if (activeForm.value === "search") {
          return searchValidationSchema();
        }
        if (activeForm.value === "create") {
          return createValidationSchema();
        }
      },
    });
  const [name, nameAttrs] = defineField("name");
  const [password, passwordAttrs] = defineField("password");
  const [email, emailAttrs] = defineField("email");
  const [is_active, is_activeAttrs] = defineField("is_active");
  const [group_role, group_roleAttrs] = defineField("group_role");
  const [id, idAttrs] = defineField("id");

  const onSubmitCreateModal = handleSubmit(async () => {
    showCreateModal.value = false;
    activeForm.value = ref("create");
    try {
      await userStore.createUser(controlledValues.value);
      await userStore.getAllUser({});
      Swal.fire({
        title: "Thêm thành công",
        text: "Thêm thành viên mới thành công",
        icon: "success",
        timer: 2000,
      });
      closeModal();
      resetForm();
    } catch (errors) {
      errorMessages.value.email = errors.message || "";
    }
  });
  const onSubmitUpdateModal = handleSubmit(async () => {
    showUpdateModal.value = false;
    activeForm.value = ref("update");
    try {
      await userStore.updateUser(controlledValues.value);
      await userStore.getAllUser({});

      Swal.fire({
        title: "Sửa thành công",
        text: "Sửa thành viên mới thành công",
        icon: "success",
        timer: 2000,
      });
      closeModal();
      resetForm();
    } catch (errors) {
      errorMessages.value.email = errors.message || "";
    }
  });
  const onSubmitChangeModal = async () => {
    showChangeModal.value = false;
    try {
      await userStore.changeUser({
        id: idUserDelete.value,
        phuongThuc: phuongThuc.value,
      });
      await userStore.getAllUser({});
      if (phuongThuc.value === "delete") {
        Swal.fire({
          title: "Xóa thành công",
          text: `Bạn đã xóa thành công User có id: ${idUserDelete.value}`,
          icon: "success",
          timer: 2000,
        });
      } else if (phuongThuc.value === "lock") {
        Swal.fire({
          title: "Khóa thành công",
          text: `Bạn đã khóa thành công User có id: ${idUserDelete.value}`,
          icon: "success",
          timer: 2000,
        });
      } else if (phuongThuc.value === "unlock") {
        Swal.fire({
          title: "Mở khóa thành công",
          text: `Bạn đã mở khóa thành công User có id: ${idUserDelete.value}`,
          icon: "success",
          timer: 2000,
        });
      }
      closeModal();
    } catch (errors) {
      Swal.fire({
        title: errors,
        text: ``,
        icon: "success",
        timer: 2000,
      });
    }
  };

  const nameSearch = ref();
  const emailSearch = ref();
  const group_roleSearch = ref("");
  const is_activeSearch = ref("");
  const onSubmitSearch = handleSubmit(async () => {
    activeForm.value = ref("search");
    try {
      await userStore.getAllUser({
        page: 1,
        perPage: 10,
        name: nameSearch.value,
        email: emailSearch.value,
        group_role: group_roleSearch.value,
        is_active: is_activeSearch.value,
      });
    } catch (errors) {
      alert(errors);
    }
  });
  const resetSearch = async () => {
    await userStore.getAllUser({});
    nameSearch.value = "";
    emailSearch.value = "";
    is_activeSearch.value = "";
    group_roleSearch.value = "";
  };

  let debounceTimer = 500;

  const onInputNameSearch = () => {
    clearTimeout(debounceTimer);
    let isWaiting = true;

    debounceTimer = setTimeout(() => {
      onNameSearch();
      isWaiting = false;
    }, 500);
    if (!isWaiting) {
      return;
    }
  };
  const onNameSearch = async () => {
    loadingOverlayStore.hide();
    await userStore.searchNameUser(nameSearch.value);
    loadingOverlayStore.hide();
    userStore.detailUser.name = nameSearch.value;
  };
</script>

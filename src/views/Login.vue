<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Trang Đăng Nhập!</h1>
                    </div>
                    <form class="user" @submit.prevent="handelSubmitLogin">
                      <div
                        class="form-group"
                        :class="{ remove_margin_bottom: errorEmail }"
                      >
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          v-model="email"
                          v-bind="emailAttrs"
                          placeholder="Nhập Email ..."
                          @keyup="validate"
                        />
                      </div>
                      <!-- <span>{{ errorEmail }}</span> -->
                      <!-- <span v-else="isValidEmail == true"></span> -->
                      <span class="text-danger">{{ errors.email }}</span>
                      <div
                        class="form-group"
                        :class="{ remove_margin_bottom: errorPassword }"
                      >
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          v
                          v-model="password"
                          v-bind="passwordAttrs"
                          placeholder="Mật Khẩu"
                        />
                      </div>

                      <span class="text-danger">{{ errors.password }}</span>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck"
                          />
                          <label class="custom-control-label" for="customCheck"
                            >Remember Me</label
                          >
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary btn-user btn-block"
                      >
                        Đăng Nhập
                      </button>
                      <span class="text-danger">
                        {{ errorMessage }}
                      </span>
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axiosInstance from "../axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth";
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  const authStore = useAuthStore();
  const errorMessage = ref(null);
  const errorEmail = ref(null);
  const errorPassword = ref(null);
  const router = useRouter();
  const form = ref({
    email: "",
    password: "",
  });
  const { errors, handleSubmit, defineField, controlledValues, resetForm } =
    useForm({
      validationSchema: yup.object({
        email: yup
          .string()
          .email("Email sai định dạng")
          .required("Email không được bỏ trống"),
        password: yup.string().required("Mật khẩu không được để trống"),
      }),
    });
  const [email, emailAttrs] = defineField("email");
  const [password, passwordAttrs] = defineField("password");

  const handelSubmitLogin = handleSubmit(async () => {
    errorMessage.value = null;
    try {
      const user = await authStore.login(controlledValues.value);
      // console.log('đã login');
      router.push("/user");
    } catch (errors) {
      resetForm();
      errorMessage.value = errors.message || '';
    }
  });
</script>

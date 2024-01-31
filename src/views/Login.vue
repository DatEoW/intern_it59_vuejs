<template>
  <Loading v-if="loadingOverlayStore.value" />
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
                        :class="{ remove_margin_bottom: errors.email }"
                      >
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          v-model="email"
                          v-bind="emailAttrs"
                          placeholder="Nhập Email ..."
                        />
                      </div>
                      <!-- <span>{{ errorEmail }}</span> -->
                      <!-- <span v-else="isValidEmail == true"></span> -->
                      <span class="text-danger">{{ errors.email }}</span>
                      <div
                        class="form-group"
                        :class="{ remove_margin_bottom: errors.password }"
                      >
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          v-model="password"
                          v-bind="passwordAttrs"
                          placeholder="Mật Khẩu"
                        />
                      </div>

                      <span class="text-danger">{{ errors.password }}</span>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small d-flex align-items-center">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck"
                            v-model="remember_me"
                            v-bind="remember_meAttrs"
                            true-value="true"
                            undefined-value="false"
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
<script>
  import Loading from "./Loading/Loading.vue";
  export default {
    components: { Loading },
  };
</script>
<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth";
  import { useForm } from "vee-validate";
  import * as yup from "yup";
  import { useIsLoading } from "../stores/loading";
  const authStore = useAuthStore();
  const loadingOverlayStore = useIsLoading();
  const errorMessage = ref(null);
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
        remember_me: yup.string().nullable(),
      }),
    });
  const [email, emailAttrs] = defineField("email");
  const [password, passwordAttrs] = defineField("password");
  const [remember_me, remember_meAttrs] = defineField("remember_me");

  const handelSubmitLogin = handleSubmit(async () => {
    errorMessage.value = null;
    controlledValues.value.remember_me = controlledValues.value.remember_me
      ? true
      : false;
    try {
      await authStore.login(controlledValues.value);
      router.push("/user");
    } catch (errors) {
      resetForm();
      errorMessage.value = errors.message || "";
    }
  });
</script>

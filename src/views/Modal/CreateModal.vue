<script setup>
  defineProps({
    show: Boolean,
  });
</script>

<template>
  <transition name="modal">
    <div
      v-if="show"
      class="modal fade ajax-modal show"
      id="createModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form action="" id="ajaxForm" @submit.prevent="$emit('create')">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header"></slot>
              <button
                type="button"
                class="btn-close"
                @click="$emit('close')"
              ></button>
            </div>
            <div class="modal-body">
              <slot name="input"></slot>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="$emit('close')"
              >
                Đóng
              </button>
              <button type="submit" class="btn btn-primary">
                Thêm thành viên
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </transition>
</template>
<style>
  .show {
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
    transition: opacity 0.3s ease;
  }

  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .modal-container-show {
    overflow: hidden;
  }
</style>

<template>
  <div class="modal d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop show"></div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String,
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

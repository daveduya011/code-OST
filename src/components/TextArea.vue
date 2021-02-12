<template>
  <textarea :value="modelValue"
            ref="txtArea"
            @input="$emit('update:modelValue', $event.target.value)"
            @submit="$emit('update:modelValue', modelValue?.trim())"
            class="form-control"></textarea>
</template>

<script>
export default {
  name: "TextArea",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  updated() {
    this.updateHeight();
  },
  methods: {
    updateHeight() {
      let element = this.$refs.txtArea;
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight+8}px`;
    },
  }
}
</script>

<style scoped>
textarea {
  overflow: hidden;
}
</style>
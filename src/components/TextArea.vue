<template>
  <textarea :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @scroll="onScroll"
            @submit="$emit('update:modelValue', modelValue?.trim())"
            class="form-control"></textarea>
</template>

<script>
export default {
  name: "TextArea",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    onScroll(e) {
      let element = e.target;
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  }
}
</script>

<style scoped>
textarea {
  overflow: hidden;
}
</style>
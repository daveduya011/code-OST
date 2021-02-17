<template>
  <!-- Modal -->
  <div class="modal fade"
       tabindex="-1"
       aria-labelledby="zoomModalLabel"
       aria-hidden="true"
       ref="refModal">
    <div class="modal-dialog model-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
<!--          <h5 class="modal-title" id="zoomModalLabel">Question Updated</h5>-->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="img" class="image"/>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  name: "ZoomModal",
  data(){
    return {
      modal: null,
    }
  },
  props: ['img'],
  methods: {
    hideModal(){
      this.modal.hide();
      this.$emit('questionChangedConfirm');
    },
    showModal(){
      this.modal.show();
    }
  },
  mounted(){
    let modalEl = this.$refs.refModal;
    this.modal = new Modal(modalEl, {
    });
  }
}
</script>

<style scoped lang="scss">
.image {
  max-width: 100%;
  max-height:50%;
}

.modal-dialog {
  max-width: 100%;
  position: relative;
  width: fit-content;
}
</style>
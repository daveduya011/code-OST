<template>
  <div class="modal fade"
       id="deleteModal"
       tabindex="-1"
       aria-labelledby="deleteModalLabel"
       aria-hidden="true"
       ref="refModal">
    <div class="modal-dialog model-dialog-scrollable modal-dialog-centered" id="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Confirm</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this question?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
          <button type="button" class="btn btn-primary"
            @click="$emit('confirmDelete')"
            data-bs-dismiss="modal"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  name: "ConfirmDelete",
  emits: ['confirmDelete'],
  modal: null,
  methods: {
    showModal(){
      this.modal?.show();
    }
  },
  mounted(){
    let modalEl = document.getElementById('deleteModal');
    this.modal = new Modal(modalEl, {
    });
  }
}
</script>

<style scoped>

</style>
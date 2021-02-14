<template>
  <!-- Modal -->
  <div class="modal fade" id="modalQuestionChanged"
       tabindex="-1"
       aria-labelledby="modalQuestionChangedLabel"
       aria-hidden="true"
       ref="refModal">
    <div class="modal-dialog model-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalQuestionChangedLabel">Question Updated</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          The question that you are currently viewing has been edited.
          <form @submit.prevent="hideModal">
<!--          Body-->
            <button type="submit"
                    class="btn btn-primary d-flex ms-auto me-4 mt-2"
                    @click.prevent="hideModal"
            >Okay</button>
          </form>
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
  name: "QuestionIsChangedModal",
  inject: ['store'],
  emits: ['questionChangedConfirm'],
  data(){
    return {
      modal: null,
    }
  },
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
    let modalEl = document.getElementById('modalQuestionChanged');
    this.modal = new Modal(modalEl, {
    });
  }
}
</script>

<style scoped lang="scss">
</style>
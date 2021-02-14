<template>
  <!-- Modal -->
  <div class="modal fade" id="modalCreateProject"
       tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
       ref="refModal">
    <div class="modal-dialog model-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create new project</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm" autocomplete="off">
<!--          Body-->
            <div class="form-group px-4 pt-2 pb-2">
              <label for="inputProjectName">Project Name</label>
              <input type="text" class="form-control" id="inputProjectName"
                     v-model="projectName" @input="onInput"
              />
            </div>
            <div class="projectUrl" v-if="projectName">url: {{ host }}/project/{{ projectUrl }}</div>
            <button type="submit"
                    class="btn btn-primary d-flex ms-auto me-4 mt-2"
                    @click.prevent="submitForm"
                    :disabled="isExistingProject"
            >Submit</button>
          </form>


          <div class="alert-danger warning m-4" v-if="isExistingProject">
            <div v-if="isExistingProject">Project already exists.</div>
          </div>
          <div class="alert-danger warning m-4" v-else-if="warningEmpty">
            <div >Project name cannot be empty.</div>
          </div>

        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {trimAll} from "@/modules/methods";
import Modal from "bootstrap/js/dist/modal";

export default {
  name: "CreateProjectModal",
  inject: ['store'],
  data(){
    return {
      projectName: '',
      projectUrl: '',
      isNameValid: false,
      warningEmpty: false,
      host: location.host,
      modal: null,
      isExistingProject: false,
      enableSubmit: false,
    }
  },
  methods: {
    submitForm(){
      this.projectName = trimAll(this.projectName);

      if (!this.projectName) {
        this.warningEmpty = true;
        return;
      }

      if (!this.enableSubmit){
        return;
      }

      this.store.addProject(this.projectName, this.projectUrl);
      this.modal.hide();
      this.$router.push('/project/' + this.projectUrl);
    },
    async onInput(){
      this.isExistingProject = false;
      this.warningEmpty = false;
      this.enableSubmit = false;

      this.projectUrl = this.generateProjectURL();
      let collection = this.store.getProjects();

      if (this.projectUrl) {
        let query = collection.doc(this.projectUrl).get();
        query.then(value => {
          if (value.exists) {
            this.isExistingProject = true;
            this.enableSubmit = false;
          } else {
            this.enableSubmit = true;
          }
        })
      }
    },

    generateProjectURL() {
      return this.projectName.toLowerCase().trim().replace(/ +/g, "-");
    },
    showModal(){
      this.modal.show();
    }
  },
  mounted(){
    let modalEl = document.getElementById('modalCreateProject');
    this.modal = new Modal(modalEl, {
    });
  }
}
</script>

<style scoped lang="scss">
.projectUrl {
  position: absolute;
  left: 50px;
  width: 60%;
  font-size: 12px;
  word-break: break-word;
  color: $color-label;
}
</style>
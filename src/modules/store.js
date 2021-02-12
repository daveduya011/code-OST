import { reactive } from 'vue';
import { db } from '@/firebaseDb'

export const store = reactive({
    projectID: null,
    projectName: '',
    isExistingProject: false,
    isLoading: true,
    question: null,
    setProjectID : async (projectID) => {
        store.projectID = projectID;
        let project = await store.getProject().get();
        if (project.exists) {
            store.isExistingProject = true;
            store.projectName = project.data().projectName;
        }
        store.isLoading = false;
        return project;
    },
    getProject : () => {
        return db.collection('Projects').doc(store.projectID)
    },
    getQuestions : () => {
      return store.getProject().collection('Questions');
    },
    getProjectName : () => {
        return store.projectName;
    },
    changeQuestion : (question) => {
        store.question = question;
        return question;
    }
});

export default { store }
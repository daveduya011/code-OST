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
            document.title = store.projectName;
        }
        store.isLoading = false;
        return project;
    },
    getProject : () => {
        return store.getProjects().doc(store.projectID)
    },
    getProjects : () => {
        return db.collection('Projects');
    },
    addProject: async (name) => {
        let url = name.replace(/\s+/g, '-').toLowerCase();
        return await store.getProjects().doc(url).set({
            name: name
        })
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
    },
    reset: ()=>{
        store.projectID = null;
        store.projectName = '';
        store.isExistingProject = false;
        store.isLoading = true;
        store.question = null;
    }
});

export default { store }
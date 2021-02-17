import { reactive } from 'vue';
import { db } from '@/firebaseDb'
import firebase from "firebase/app";

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
    addProject: async (name, url) => {
        return await store.getProjects().doc(url).set({
            projectName: name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    },
    deleteProject: () => {
        store.getProject().delete();
    },
    getQuestions : () => {
      return store.getProject().collection('Questions');
    },
    getQuestion : () => {
        return store.getQuestions().doc(store.question?.key);
    },
    getProjectName : () => {
        return store.projectName;
    },
    changeQuestion : (question) => {
        store.question = question;
        return question;
    },
    deleteQuestion: (question) => {
        let del = store.getQuestions().doc(question.key).delete();
        del.then(() => {
            store.changeQuestion(null);
        });
    },
    reset: ()=>{
        store.projectID = null;
        store.projectName = '';
        store.isExistingProject = false;
        store.isLoading = true;
        store.question = null;
    }
});

export const retrieveImageFromClipboardAsBlob = (pasteEvent, callback) => {
    if(pasteEvent.clipboardData === false){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    }

    const items = pasteEvent.clipboardData.items;

    if(items === undefined){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    }

    for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") === -1) continue;
        // Retrieve image on clipboard as blob
        let blob = items[i].getAsFile();

        if(typeof(callback) == "function"){
            callback(blob);
        }
    }
}

export default { store }
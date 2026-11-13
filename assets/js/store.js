/* Work Browser data layer. Keep persistence and migrations in this file. */
(() => {
  const KEY = "work-browser-data-v1";
  const starter = {
    version: 1,
    projects: [
      {id:"pixelix",name:"Pixelix",description:"Open-world grid game development",color:"#8b7cff",icon:"▦",createdAt:Date.now()},
      {id:"school",name:"School",description:"Assignments, research and class work",color:"#55c6a0",icon:"▤",createdAt:Date.now()},
      {id:"personal",name:"Personal",description:"Ideas and things to keep track of",color:"#e5a85b",icon:"◇",createdAt:Date.now()}
    ],
    tasks: [
      {id:"task-1",title:"Plan the next Pixelix milestone",projectId:"pixelix",done:false,priority:"High",createdAt:Date.now()},
      {id:"task-2",title:"Organize current school assignments",projectId:"school",done:false,priority:"Normal",createdAt:Date.now()}
    ],
    notes: [{id:"note-1",title:"Workspace note",body:"Use projects to keep related tasks, notes and links together. Add a short summary before starting a new project.",projectId:"personal",updatedAt:Date.now()}],
    bookmarks: []
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  function load(){
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if(saved && saved.version === 1) return {...clone(starter),...saved};
    } catch(error){ console.warn("Could not load workspace data:",error); }
    return clone(starter);
  }
  let data = load();
  const save = () => { localStorage.setItem(KEY,JSON.stringify(data)); window.dispatchEvent(new CustomEvent("workspace:changed")); };
  const id = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2);
  window.WorkStore = {
    all: () => data,
    projects: () => data.projects,
    tasks: () => data.tasks,
    notes: () => data.notes,
    bookmarks: () => data.bookmarks,
    addProject: values => {const item={id:id(),createdAt:Date.now(),color:"#8b7cff",icon:"▦",...values};data.projects.push(item);save();return item;},
    updateProject: (pid,values) => {const p=data.projects.find(x=>x.id===pid);if(p){Object.assign(p,values);save();}},
    deleteProject: pid => {data.projects=data.projects.filter(x=>x.id!==pid);data.tasks=data.tasks.filter(x=>x.projectId!==pid);data.notes=data.notes.filter(x=>x.projectId!==pid);save();},
    addTask: values => {const item={id:id(),done:false,priority:"Normal",createdAt:Date.now(),...values};data.tasks.unshift(item);save();return item;},
    toggleTask: tid => {const t=data.tasks.find(x=>x.id===tid);if(t){t.done=!t.done;save();}},
    deleteTask: tid => {data.tasks=data.tasks.filter(x=>x.id!==tid);save();},
    addNote: values => {const item={id:id(),updatedAt:Date.now(),...values};data.notes.unshift(item);save();return item;},
    updateNote: (nid,values) => {const n=data.notes.find(x=>x.id===nid);if(n){Object.assign(n,values,{updatedAt:Date.now()});save();}},
    deleteNote: nid => {data.notes=data.notes.filter(x=>x.id!==nid);save();},
    addBookmark: values => {const item={id:id(),createdAt:Date.now(),...values};data.bookmarks.unshift(item);save();return item;},
    deleteBookmark: bid => {data.bookmarks=data.bookmarks.filter(x=>x.id!==bid);save();},
    export: () => JSON.stringify(data,null,2),
    import: incoming => {if(!incoming || incoming.version!==1 || !Array.isArray(incoming.projects)||!Array.isArray(incoming.tasks)||!Array.isArray(incoming.notes)||!Array.isArray(incoming.bookmarks)) throw new Error("This file is not a valid Work Browser backup.");data=incoming;save();},
    reset: () => {data=clone(starter);save();}
  };
})();
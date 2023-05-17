const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.getElementById('bAdd');
const itTask = document.getElementById('itTask');
const form = document.getElementById('form');
const taskContainer = document.getElementById('taskContainer');
form.addEventListener('submit', e => {
          e.preventDefault();
          if(itTask.value != ''){
          createTask(itTask.value);
          itTask.value = '';
          // if(taskContainer.childNodes.values){
          //                         taskContainer.removeChild(divSuperMain);
          // }
          // renderTask();
  }
})

// creacion del objeto tarea para nosotros
function createTask(value){
          console.log('sdfsdfsdf');
          const newTask = {
                    id: (Math.random() * 100).toString(36).slice(3),
                    title: value,
                    completed: false
          };
          tasks.unshift(newTask);
          renderTask(newTask)
   
}

//Funcion para agregar el contenido a la lista del pomodoro
const renderTask = (task) => { //se cambio esto a una funcion archer puesto que no estamos usando inner hacer un metodo como el forEach o el Map es peligroso a la hora de impactar en todo el codigo de creacion de tareas. Se dejo un arreglo con todas las tareas en caso de que se quera acceder mas adelante
         const divMain = document.createElement('div'); 
          const  div1 = document.createElement('div');
                    const div2 = document.createElement('div');
                    const startTask = document.createElement('button');
                    const doneTask = document.createElement('span');
                    const clases = ['task', 'complete', 'title','start-button', 'done'];
                    const containers = [divMain, div1, div2, startTask, doneTask];
                    console.log(containers);
                    for(let i = 0; i < clases.length; i++){
                              containers[i].classList.add(clases[i]);
                    }
                    doneTask.textContent = 'done';
                    startTask.setAttribute('id', `${task.id}`)
                    startTask.textContent = 'start task';
                    task.completed ? div1.appendChild(doneTask) : div1.appendChild(startTask);
                    div2.textContent = task.title;
                    divMain.appendChild(div1);
                      divMain.appendChild(div2);
       taskContainer.appendChild(divMain);
       console.log(tasks);
       const starButtons = document.querySelectorAll('.start-button');
       
       //Interaccion de los botones star con las tareas
       starButtons.forEach(button => {
        button.addEventListener('click', (e)=> {
            if(!timer){
                const id = button.getAttribute('data-id')
                starButtonsHandler(id);
                button.textContent = 'In progres...'
            }
        })
       })
}
// funcion usada cerca de la linea 65
function starButtonsHandler(value){
    time = 25 * 60; //agregamos el tiempo total 25 minutos x 60 segundos
    current = id; //se agarra el id de la tarea actual
    const taskIndex = tasks.findIndex(task => task.id == id); //se esta encontrando el ID, el metodo findIndex da el index del primer elemento que cumple la condicion
    const taskName = document.querySelector('#time #taskName');
    taskName.textContent = tasks[taskIndex].title;

}
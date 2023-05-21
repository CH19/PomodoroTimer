const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.getElementById('bAdd');
const itTask = document.getElementById('itTask');
const form = document.getElementById('form');
const taskContainer = document.getElementById('taskContainer');
const taskName = document.getElementById('taskname')

// const taskName = document.querySelector('#time #taskName');
renderTime();


form.addEventListener('submit', e => {
          e.preventDefault();
          if(itTask.value != ''){
          createTask(itTask.value);
          itTask.value = '';

  }
})

// creacion del objeto tarea para nosotros
function createTask(value){
          const newTask = {
                    id: (Math.random() * 100).toString(36).slice(3),
                    title: value,
                    completed: false,
          };
          tasks.unshift(newTask);
          renderTask(newTask)
   
}

//Funcion para agregar el contenido a la lista del pomodoro
const renderTask = (task) => { //se cambio esto a una funcion archer puesto que no estamos usando inner hacer un metodo como el forEach o el Map es peligroso a la hora de impactar en todo el codigo de creacion de tareas. Se dejo un arreglo con todas las tareas en caso de que se quera acceder mas adelante
         const divMain = document.createElement('div'); 
         divMain.classList.add('d-flex')
         const  div1 = document.createElement('div');
                    const div2 = document.createElement('div');
                    let startTask = document.createElement('button');
                    const doneTask = document.createElement('span');
                    const clases = ['task', 'complete', 'title','start-button', 'done'];
                    const containers = [divMain, div1, div2, startTask, doneTask];
                    for(let i = 0; i < clases.length; i++){
                              containers[i].classList.add(clases[i]);
                    }
                    doneTask.textContent = 'DONE!!!';
                    div1.classList.add('m-2');
                    startTask.classList.add('m-2')
                    startTask.setAttribute('id', `${task.id}`)
                    startTask.textContent = 'start task';
                    div1.appendChild(doneTask); 
                    doneTask.classList.add('d-none');
                    div1.appendChild(startTask);
                    div2.textContent = task.title;
                    divMain.appendChild(div2);
                    divMain.appendChild(div1);
       taskContainer.appendChild(divMain);
    //    console.log(tasks);
       const starButtons = document.querySelectorAll('.start-button');
       console.log(starButtons);
       //Interaccion de los botones star con las tareas
       starButtons.forEach(button => {
        button.classList.add('btn');
        button.classList.add('btn-danger')
        button.addEventListener('click', (e)=> {
         console.log('funciona tambien sfdsdf')
            if(!timer){
                console.log('funciona');
                const id = button.getAttribute('id');
                starButtonsHandler(id);
                button.textContent = 'In progres...';
            }
        });
       });
};

function starButtonsHandler(identificator){

    console.log('funciono tambien');
    time = 25 * 60 ; //agregamos el tiempo total 25 minutos x 60 segundos
    current = identificator; //se agarra el identificator de la tarea actual
    const taskIndex = tasks.findIndex((task) => task.id == identificator); //se esta encontrando el ID, el metodo findIndex da el index del primer elemento que cumple la condicion
    console.log(document.getElementById('taskname'));
    document.querySelector("#taskname").textContent = `${tasks[taskIndex].title}`;
   
   
    timer = setInterval(() => {//funcion para que el codigo de reduccion del tiempo se reduzca muchooo
        timeHandler(tasks[taskIndex], identificator);     
    }, 1000)
}

function timeHandler(task, ID){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timer);
        current = null;
        task.title.textContent = '';
        task.completed = true;
        timer = null;
        const bActual = document.getElementById(`${ID}`);
        bActual.textContent = 'Done!!!!'
        

        renderTime();
        startBreak();
    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutos = parseInt(time / 60);
    const seconds = parseFloat(time % 60);

    timeDiv.textContent = `${mostrarTime(minutos)}:${mostrarTime(seconds)}`
}

function mostrarTime(time){
    return `${Number(time) < 10 ? `0${time}` : `${time}`}`
}

function startBreak(){
    time = 5 * 60;
    taskName.textContent = 'Break';
    timerBreak = setInterval(()=>{
        timeBreakHandler();
    }, 1000)
}

function timeBreakHandler(task){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timerBreak);
        current = null;
        task.title.textContent = '';
        timerBreak = null;
    
        renderTime();
    }
}
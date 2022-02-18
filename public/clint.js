
const api = 'http://localhost:8080/api/task'
const Tasks = $('.tasks')

function showMesg(text, type) {
    let mesg = $('.mesg')
    if (type === 'error') {

    } else if (type == '') {
        mesg.html(`<i class='bx bx-check-square'></i><h1>${text}</h1>`)
        mesg.slideDown(1000).slideUp(940)
    } else if (type == 'delete') {
        mesg.html(`<i class='bx bx-check-square' style='color:#e20c0c'  ></i><h1>${text}</h1>`)
        mesg.slideDown(1000).slideUp(940)
    }
}

async function updateTask(id) {
    let req = await fetch(api + '/update', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            _id: id
        })
    })

    let res = await req.json()
    showMesg('The task has been successfully Updated', '')
    loadTasks()
}

async function deleteTask(id) {
    let req = await fetch(api + '/delete', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            _id: id
        })
    })

    let res = await req.json()
    showMesg('The task has been successfully deleted', 'delete')
    loadTasks()
}

function ControleTasks() {
    let delet = $('.delete')
    delet.click(function () {
        deleteTask($(this).parent().attr('data-id'))
    })

    let update = $('.edit')

    update.click(function () {
        updateTask($(this).parent().attr('data-id'))
    })
}

// load all tasks
async function loadTasks() {
    // update old tasks
    Tasks.html('')
    // send request
    let tasks = await fetch(api + '/getAll', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // add new tasks 
    tasks = await tasks.json()
    tasks = tasks.reverse()

    let html = ''
    for (info of tasks) {
        html += `
        <div class="task done-${info.done}">
            <div class="task-cont ">
                <div class="name-task">${info.name}</div>
                <div class="task-des">${info.des}</div>
                <div class="task-date">${info.date}</div>
            </div>
            <div class="controls" data-id = ${info._id}>
                <div class="delete"><i class='bx bx-x' ></i></div>
                <div class="edit"><i class='bx bx-check-square'></i></div>
            </div>
        </div>
        `

        Tasks.html(html)
        
    }

    ControleTasks()
}

loadTasks()

// add new task
async function addTask(data) {
    let req = await fetch(api + '/add', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let result = await req.json()
    if (result['mesg'] == 'add') {
        loadTasks()
        showMesg('The task has been successfully added', '')
    }
}


$('#add').click((e) => {
    e.preventDefault()
    let taskname = $('#task-name').val()
    let taskdes = $('#task-des').val()
    let taskdate = $('#task-date').val()
    
    if (taskname && taskdes) {
        addTask(({
            name: taskname,
            des: taskdes,
            date: taskdate
        }))
    }

    $('#task-name').val('')
    $('#task-des').val('')
    
})

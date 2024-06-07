import { call, put } from "redux-saga/effects"
import { setAppErrorAC, setAppStatusAC } from "../app_and_store/AppReducer"
import { api, priority, ResponseTasksType, status } from "../api/api"
import { fetchTasksWorkerSaga, setTasksAC } from "../features/pageTodolists/todolist/task/TasksReducer"


let tasks: ResponseTasksType

beforeEach(()=> {
  let data = new Date()
  tasks = {
    totalCount: 2,
    error: '',
    items: [
      {
        title: 'first',
        description: '',
        status: status.new,
        priority: priority.low,
        startDate: null,
        deadline: null,
        id: 'first',
        addedDate: data,
        order:0,
        todoListId: 'idTDL'
      },
      {
        title: 'second',
        description: '',
        status: status.completed,
        priority: priority.low,
        startDate: null,
        deadline: null,
        id: 'second',
        addedDate: data,
        order:0,
        todoListId: 'idTDL'
      }
    ]
  }
})

test('fetchTasksWorkerSaga success', ()=>{
  const gen = fetchTasksWorkerSaga({type:'tasks/FETCH-TASKS', idTDL: 'idTDL'})
  // let  res = gen.next()
  // expect(res.value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(api.getTasks, 'idTDL'))
  expect(gen.next(tasks).value).toEqual(put(setTasksAC(tasks.items.map(t => ({...t, taskStatus: 'idle'})), 'idTDL')))
  expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
})

test('fetchTasksWorkerSaga unsuccess', ()=>{
  const gen = fetchTasksWorkerSaga({type:'tasks/FETCH-TASKS', idTDL: 'idTDL'})
  // let  res = gen.next()
  // expect(res.value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(api.getTasks, 'idTDL'))
  //сгенерировали ошибку через throw передав ожидаемый тип ошибки (попадаем во второй генегатор - обработчик ошибок)
  expect(gen.throw({message: 'some error'}).value).toEqual(put(setAppErrorAC('some error')))

  expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))
})
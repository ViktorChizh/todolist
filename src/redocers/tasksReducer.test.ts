import {TasksStateType} from '../App';
import {addNewTaskslistAC, addTaskAC, changeStatusAC, removeTaskAC, TasksReducer} from './tasksReducer';
import {v1} from 'uuid';

let state: TasksStateType = {
    ['todolistId1']: [
        {id: 'id1', title: 'HTML&CSS', isDone: true},
        {id: 'id2', title: 'JS', isDone: true}
    ],
    ['todolistId2']: [
        {id: 'id1', title: 'Milk', isDone: true},
        {id: 'id2', title: 'React Book', isDone: true}
    ]
}

test('add new tasks list by id', () => {
    // action
    const newTasksId = v1()
    const endState = TasksReducer(state, addNewTaskslistAC(newTasksId))
    // expect result
    expect(endState['todolistId1'].length).toBe(2)
    expect(endState[newTasksId].length).toBe(0)
})

test('remove tasks list by id', () => {
    // action
    const endState = TasksReducer(state, removeTaskAC('id2','todolistId1'))
    // expect result
    expect(endState['todolistId1'].length).toBe(1)
    expect(endState['todolistId1'][0].id).toBe('id1')
    expect(endState['todolistId2'].length).toBe(2)
})

test('add tasks list by id', () => {
    // action
    const endState = TasksReducer(state, addTaskAC('todolistId1', 'newTask'))
    // expect result
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('newTask')
    expect(endState['todolistId2'].length).toBe(2)
})

test('change task status by id', () => {
    // action
    const endState = TasksReducer(state, changeStatusAC('id1', 'todolistId1', false))
    // expect result
    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId1'][0].isDone).toBe(false)
    expect(endState['todolistId2'][1].isDone).toBe(true)
})
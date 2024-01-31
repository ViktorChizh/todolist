import {TasksStateType} from '../App';
import {addTaskAC, changeStatusAC, removeTaskAC, removeTaskslistAC, TasksReducer, updateTaskAC} from './tasksReducer';
import {v1} from 'uuid';

const state: TasksStateType = {
    ['todolistId1']: [
        {id: 'id1', title: 'HTML&CSS', isDone: true},
        {id: 'id2', title: 'JS', isDone: true}
    ],
    ['todolistId2']: [
        {id: 'id1', title: 'Milk', isDone: true},
        {id: 'id2', title: 'React Book', isDone: true}
    ]
}

test('add empty tasks list for new todoList by todolistId', () => {
    // action
    const todolistId = v1()

    const action = {
        type: 'ADD-NEW-TASKSLIST' as const,
        payload: {id: todolistId}
    }

    const endState = TasksReducer(state, action)
    // expect result
    expect(endState['todolistId1'].length).toBe(2)
    expect(endState[todolistId].length).toBe(0)
})

test('remove task by id', () => {
    // action
    const endState = TasksReducer(state, removeTaskAC('id2','todolistId1'))
    // expect result
    expect(endState['todolistId1'].length).toBe(1)
    expect(endState['todolistId1'][0].id).toBe('id1')
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState).toEqual({ // сравнивает не ссылки объектов, а именно свойства и их значения
        ['todolistId1']: [
            {id: 'id1', title: 'HTML&CSS', isDone: true}
        ],
        ['todolistId2']: [
            {id: 'id1', title: 'Milk', isDone: true},
            {id: 'id2', title: 'React Book', isDone: true}
        ]
    })

})

test('add task by id', () => {
    // action
    const endState = TasksReducer(state, addTaskAC('todolistId1', 'newTask'))
    // expect result
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('newTask')
    expect(endState['todolistId1'][0].id).toBeDefined()
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

test('update task by id', () => {
    // action
    const endState = TasksReducer(state, updateTaskAC('id1', 'todolistId1', 'react'))
    // expect result
    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId1'][0].title).toBe('react')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('remove tasks by todolistId', () => {

    const endState = TasksReducer(state, removeTaskslistAC('todolistId1'))
    // expect result
    expect(endState['todolistId1']).toBeUndefined()
    expect(endState['todolistId2']).toBeTruthy()
    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState).length).not.toBe(2)
})
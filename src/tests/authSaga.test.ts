import { call, put } from "redux-saga/effects"
import { meWorkerSaga, setIsLoggedInAC } from "../auth/authReducer"
import { api, ResponseType } from "../api/api"
import { setAppIsInitializedAC, setAppStatusAC } from "../app_and_store/AppReducer"

let response:ResponseType

beforeEach(()=> {
  response = {data:{}, messages: [], resultCode: 0}
})

test('meWorkerSagaTest success', ()=>{
  const gen = meWorkerSaga()
  // let res = gen.next()
  // expect(res.value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(api.me))
  expect(gen.next(response).value).toEqual(put(setIsLoggedInAC(true)))
  expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
  expect(gen.next().value).toEqual(put(setAppIsInitializedAC(true)))
})

test('meWorkerSagaTest unsuccess', ()=>{
  const gen = meWorkerSaga()
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(api.me))
  response.resultCode = 1
  expect(gen.next(response).value).toEqual(put(setAppIsInitializedAC(true)))
})
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { AppStateType } from "app/Store"

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
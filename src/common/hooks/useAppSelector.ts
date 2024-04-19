import { TypedUseSelectorHook, useSelector } from "react-redux"
import { AppState } from "app/Store"

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

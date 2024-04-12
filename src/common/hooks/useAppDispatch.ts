import { useDispatch } from "react-redux"
import { AppDispatchType } from "app/Store"

export const useAppDispatch = useDispatch<AppDispatchType>
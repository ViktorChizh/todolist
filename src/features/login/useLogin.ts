import { useActions, useAppSelector } from "common/hooks"
import { FormikHelpers, useFormik } from "formik"
import { BaseResponse, LoginParams } from "common/api"
import { isLoggedInSelector } from "features/login/loginReducer"

export const useLogin = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  let { loginTC: login } = useActions()

  const formik = useFormik({
    initialValues: {
      email: "free@samuraijs.com",
      password: "free",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: Partial<LoginParams> = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password) {
        errors.password = "Password is required"
      } else if (!/.{4,}/i.test(values.password)) {
        errors.password = "Password must be 4 characters or more"
      }
      return errors
    },
    onSubmit: async (values: LoginParams, formikHelpers: FormikHelpers<LoginParams>) => {
      try {
        await login(values).unwrap()
      } catch (error) {
        let err = error as BaseResponse
        err.fieldsErrors && err.fieldsErrors.forEach((e) => formikHelpers.setFieldError(`${e.field}`, `${e.error}`))
      }
    },
  })
  return { isLoggedIn, formik }
}

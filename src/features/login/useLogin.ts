import { useActions } from "common/hooks"
import { FormikHelpers, useFormik } from "formik"
import { BaseResponseType, LoginParamsType } from "common/api"

export const useLogin = () => {
  let { loginTC: login } = useActions()

  const formik = useFormik({
    initialValues: {
      email: "free@samuraijs.com",
      password: "free",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: LoginParamsType = {}
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
    onSubmit: async (values: LoginParamsType, formikHelpers: FormikHelpers<LoginParamsType>) => {
      try {
        await login(values).unwrap()
      } catch (e) {
        let er = e as BaseResponseType
        er.fieldsErrors && er.fieldsErrors.forEach((er) => formikHelpers.setFieldError(`${er.field}`, `${er.error}`))
      }
    },
  })
  return { formik }
}

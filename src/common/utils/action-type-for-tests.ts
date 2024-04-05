// создаем дженерик для использования во многих тестах
export type ActionTypeForTest<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

export type TodoState = {
    todos: string[],
    isLoading: boolean,
    isError?: string
    addTodoState: {
        isLoading: boolean,
        isError?: string
    },
    input: string
}
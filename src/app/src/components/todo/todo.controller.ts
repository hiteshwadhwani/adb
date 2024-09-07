import { useEffect, useReducer} from "react"
import { getTodos, addTodo } from "../../utils/api/todo";
import { TodoState } from "./todo.types";

const intialState: TodoState = {
    todos: [],
    isLoading: false,
    addTodoState: {
        isLoading: false
    },
    input: ""
}

const reducer = <T>(prevState: T, currState: Partial<T>) => {
    return {...prevState, ...currState}
}

export const useTodoController = () => {
    const [state, dispatchState] = useReducer(reducer<TodoState>, {...intialState})

    useEffect(() => {
        hydrateTodos()
    }, [])

    const hydrateTodos = async () => {
        try{
            dispatchState({
                isLoading: true
            })
            const todos = await getTodos()
            console.log({todos})
            dispatchState({
                todos: todos
            })
        }
        catch(error){
            dispatchState({
                isError: "something went wrong"
            })
        }
        finally{
            dispatchState({
                isLoading: false
            })
        }
    }

    const updateTodo = async (todo: string) => {
        try{
            dispatchState({
                addTodoState: {
                    ...state.addTodoState,
                    isLoading: true
                }
            })
            await addTodo(todo)

            dispatchState({
                todos: [...state.todos, todo]
            })
        }
        catch(error){
            console.log({error})
            dispatchState({
                addTodoState: {
                    ...state.addTodoState,
                    isError: "something went wrong"
                }
            })
        }
        finally{
            dispatchState({
                addTodoState: {
                    ...state.addTodoState,
                    isLoading: false
                }
            })
        }
    }
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchState({
            input: e.target.value
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateTodo(state.input)
    }

    const isInputDisabled = state.addTodoState.isLoading
    const isSubmitDisabled = state.addTodoState.isLoading || state.input === ""

    return {
        ...state,
        addTodo,
        onInputChange,
        onSubmit,
        isInputDisabled,
        isSubmitDisabled
    }
}

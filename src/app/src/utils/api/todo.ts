export const getTodos = async () => {
    try{
        const url = "http://localhost:8000/todos"

        const response = await fetch(url)
        const json = await response.json()
        const todos = json.todos
    
        return todos as string[]
    }
    catch(error){
        throw error
    }
}

export const addTodo = async (todo: string) => {
    try{
        const url = "http://localhost:8000/todos/"
        const payload = {
            todo: todo
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        const response = await fetch(url, options)
        const json = await response.json()

        if(response.status !== 200) throw new Error("failed to add todo")
    }
    catch(error){
        throw error
    }
}
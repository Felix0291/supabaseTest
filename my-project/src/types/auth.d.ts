interface NewUser {
    email: string
    password: string
}

interface User extends NewUser {
    user_id: string
}
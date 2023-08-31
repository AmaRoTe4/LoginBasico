import { v4 as uuidv4 } from 'uuid';

export const newId = () => {
    const id = uuidv4()
    return id.split("-").join("").slice(0, 20)
}
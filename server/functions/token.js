export const createToken = () => {
    return (Math.trunc(Math.random() * 10000000000)).toString().slice(0, 20)
}
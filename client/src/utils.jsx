
export const firstWordBye = (str) => {
    let firstWord = str.split(' ').shift() + ' '
    let resto = str.split(firstWord)[1]
    return resto
}
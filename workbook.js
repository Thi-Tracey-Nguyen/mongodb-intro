const myFunction = async () => {
    try {
        let result = await fetchAPI()
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

myFunction()

function fetchAPI() {
    return new Promise ((resolve, reject) => {
        if (someCondition) {
            resolve('I resolved')
        } else {
            reject('I rejected')
        }
    })
}

fetchAPI.then((message) => console.log(message))
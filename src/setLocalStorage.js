const setlocalStorage = (object, name) => {
    localStorage.setItem(name, JSON.stringify(object));
    console.log("user test has been set in localStorage")
}

export default setlocalStorage;
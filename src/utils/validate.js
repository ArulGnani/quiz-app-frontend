const validate = (state) => {
    const { email, quizName, teamName } = state
    let validEmail = validEmailId(email)
    if (email === "" || quizName === "" || teamName === ""){
        return "all fields are required!..."
    }else if(email.length < 5 || validEmail === false){
        return "enter an valid email!..."
    }else if(quizName.lengt < 3){
        return "quizName should be min 5 char"
    }else if(teamName.length < 5){
        return "teamName should be min 5 char"
    }else {
        return true
    }
}

const validEmailId = (email) => {
    let reg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(String(email).toLowerCase())
}

export default validate


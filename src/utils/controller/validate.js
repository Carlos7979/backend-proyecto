const validate = {
    idMongodb(id) {
        if (id.length !== 24) throw new Error(`${id} no es un id válido`)
    },
    emailValidate(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!re.test(String(email))) throw new Error(`${email} no es un email válido`)
    }
}

module.exports = validate;
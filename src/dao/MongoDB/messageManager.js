const { Messages } = require('./models')

class MessageManager {
    async addMessage(data) {
        const { email } = data
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!re.test(email)) {
            return false
        }
        try {
            return await Messages.create(data)
        } catch (error) {
            console.log(error)
        }
    }
	async getMessages() {
		try {
			return await Messages.find().select('-__v -_id').lean()
		} catch (error) {
			console.log(error)
		}
	}
}

const messages = new MessageManager()
module.exports = messages

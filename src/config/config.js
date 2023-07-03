const {
    argv: [, , mode = 'production']
} = process
require('dotenv').config({ path: `.env.${mode}` })
const {
	env: { PORT, MONGO_URL, SECRET, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, JWT_SECRET },
    argv: [, , , port = PORT || 8081],
    pid
} = process

module.exports = {
    PORT,
    MONGO_URL,
    SECRET,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    JWT_SECRET,
    port,
    pid,
	mode
}

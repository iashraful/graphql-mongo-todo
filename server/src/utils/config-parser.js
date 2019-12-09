export default {
    getDatabase({ config }) {
        return `mongodb://${config.host}/${config.name}`
    }
}
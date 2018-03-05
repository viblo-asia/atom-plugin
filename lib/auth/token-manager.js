/** @babel */
import fs from 'fs-plus'

const { AES, enc } = require('crypto-js')

export default class TokenManager {
    constructor (options = {}) {
        this.homeDir = options.homeDir || fs.getHomeDirectory()
        this.vibloDir = options.vibloDir || `${this.homeDir}/.viblo`
        this.tokenPath = options.tokenPath || `${this.vibloDir}/.api.token`
    }

    saveApiToken (token) {
        return new Promise((resolve, reject) => {
            fs.isDirectory(this.vibloDir, (result) => {
                if (!result) {
                    fs.makeTreeSync(this.vibloDir)
                }

                const writeStream = fs.createWriteStream(this.tokenPath)

                writeStream.end(AES.encrypt(token, this.vibloDir).toString())
                writeStream.on('finish', () => resolve(token))
                writeStream.on('error', (error) => {
                    writeStream.close()
                    this.rollbackSaving()
                    reject(error)
                })
            })
        })
    }

    loadApiToken () {
        return this.accessToken = fs.isFileSync(this.tokenPath)
            ? AES.decrypt(
                String.fromCharCode(...fs.readFileSync(this.tokenPath)),
                this.vibloDir
            ).toString(enc.Utf8)
            : ''
    }

    rollbackSaving () {
        try {
            if (fs.existsSync(this.tokenPath)) {
                fs.unlinkSync(this.tokenPath)
            }
        } catch (e) {
            // Ignored
        }
    }

    getSavedToken () {
        return this.accessToken || ''
    }

    makeSecretString () {
        return (new Array(this.getSavedToken().length)).join('*')
    }
}

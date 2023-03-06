// Save a file from a request to a folder into the server
function saveFile (folder, file) {
    file.mv(`${__dirname.replace("controllers", "public")}\\${folder}\\${file.name}`)
    return `http://localhost:3001/${userId}/${file.name}`
}

module.exports = [
    saveFile,
]
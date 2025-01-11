const express = require("express")
const config = require("config")
const sequelize = require("./config/db")
const mainRoter = require("./router/index.routes")


const app = express()


app.use(express.json())

app.use('/api', mainRoter)


const PORT = config.get("port")
async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter : true})

        app.listen(PORT, ()=>{
            console.log("server running at http://localhost:"+PORT)  
        })

    } catch (error) {
        console.log(error);
    }
}
start();
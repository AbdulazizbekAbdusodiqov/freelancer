const express = require("express")
const config = require("config")
const sequelize = require("./config/db")
const PORT = config.get("port")

const app = express()


app.use(express.json())


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
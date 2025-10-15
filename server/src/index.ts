import e from "express"
import appUse from "./plugins/app.use.ts"

const app = e()

appUse(e, app)




app.listen(5000)
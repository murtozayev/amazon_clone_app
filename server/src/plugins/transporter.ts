import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jahongirmurtozayev777@gmail.com",
        pass: "hzjw gqgz ltll uuzb"
    }
})

export default transporter
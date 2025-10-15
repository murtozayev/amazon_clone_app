import e from 'express'
import error from '../../../errors/error.ts'
import AUTH from '../../../models/user.model.ts'
const { request, response } = e
import bcrypt from "bcrypt"
import CODE from '../../../models/code.model.ts'
import jwt from '../../../plugins/jwt.ts'
import { UserDto } from '../../../plugins/user.dto.ts'
import cookie from '../../../plugins/cookie.ts'
import jwtType from 'jsonwebtoken'
import transporter from '../../../plugins/transporter.ts'

export async function signUp<T>(req: typeof request, res: typeof response): Promise<T | undefined> {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return error(res, "Ma'lumot to'liq emas") as unknown as T
    }

    const existUser = await AUTH.findOne({ email })

    if (existUser) {
      return error(res, "Foydalanuvchi allaqachon ro'yxatdan o'tgan") as unknown as T
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const code = Math.floor(10000 + Math.random() * 90000)

    const html = `
  <div style="
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(145deg, #e6e9f0, #eef1f5);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    text-align: center;
    perspective: 1000px;
  ">
    <div style="
      background: linear-gradient(145deg, #007bff, #00d4ff);
      padding: 25px 0;
      border-radius: 16px;
      color: white;
      font-size: 26px;
      font-weight: bold;
      transform: rotateY(10deg) rotateX(5deg);
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      transition: all 0.4s ease;
      display: inline-block;
      width: 200px;
      text-shadow: 0 2px 5px rgba(0,0,0,0.4);
    ">
      ${code}
    </div>

    <h2 style="color:#222; margin-top:30px;">🔐 Tasdiqlash kodi</h2>
    <p style="font-size:16px; color:#555;">
      Salom, <b>${username || "Foydalanuvchi"}</b>!<br>
      Quyidagi <b>3D kodni</b> 5 daqiqa ichida kiriting va tizimga kirishni tasdiqlang.
    </p>

    <div style="
      margin-top: 40px;
      transform: rotateX(15deg);
      background: linear-gradient(145deg, #ffffff, #e3e7ee);
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      padding: 15px;
      display: inline-block;
    ">
      <p style="color:#555; font-size:14px;">
        ⏱️ Kod amal qilish muddati: <b>5 daqiqa</b><br>
        ✉️ Email: <b>${email}</b>
      </p>
    </div>

    <hr style="margin:30px 0; border:none; border-top:1px solid #ddd;">

    <p style="font-size:13px; color:#999;">
      © ${new Date().getFullYear()} Jahongir Murtozayev • 3D Verification System<br>
      <i>“Har bir tafsilot mukammallikka olib boradi.”</i>
    </p>
  </div>
`;


    await transporter.sendMail({
      from: "Jahongir Murtozayev",
      to: email,
      subject: "Tasdiqlash kodi",
      html
    })

    await CODE.deleteOne({ email });
    await CODE.create({ username, email, password: hashPassword, code })

    return res.status(200).json({ message: "Sizga tasdiqlash kodi jo'natildi" }) as unknown as T

  } catch (err) {
    return error(res, (err as Error).message) as unknown as T
  }
}

export async function signIn<T>(req: typeof request, res: typeof response): Promise<T | undefined> {
  try {
    const { email, password, to } = req.body

    if (to === "dashboard") {
      const adminOrOwner = await AUTH.findOne({ email })

      if (adminOrOwner?.role !== "owner" && adminOrOwner?.role !== "admin") {
        return error(res, "Kechirasiz siz admin yoki owner emassiz", 400) as unknown as T
      }
    }

    if (!email || !password) {
      return error(res, "Ma'lumot to'liq emas") as unknown as T
    }

    const user = await AUTH.findOne({ email })

    if (!user) {
      return error(res, "Foydalanuvchi ro'yxatdan o'tmagan") as unknown as T
    }

    const decode = await bcrypt.compare(password, user.password)

    if (!decode) {
      return error(res, "Parollar mos emas", 400) as unknown as T
    }

    const code = Math.floor(10000 + Math.random() * 90000)

    const html = `
  <div style="
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(145deg, #e6e9f0, #eef1f5);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    text-align: center;
    perspective: 1000px;
  ">
    <div style="
      background: linear-gradient(145deg, #007bff, #00d4ff);
      padding: 25px 0;
      border-radius: 16px;
      color: white;
      font-size: 26px;
      font-weight: bold;
      transform: rotateY(10deg) rotateX(5deg);
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      transition: all 0.4s ease;
      display: inline-block;
      width: 200px;
      text-shadow: 0 2px 5px rgba(0,0,0,0.4);
    ">
      ${code}
    </div>

    <h2 style="color:#222; margin-top:30px;">🔐 Tasdiqlash kodi</h2>
    <p style="font-size:16px; color:#555;">
      Salom, <b>${user.username || "Foydalanuvchi"}</b>!<br>
      Quyidagi <b>3D kodni</b> 5 daqiqa ichida kiriting va tizimga kirishni tasdiqlang.
    </p>

    <div style="
      margin-top: 40px;
      transform: rotateX(15deg);
      background: linear-gradient(145deg, #ffffff, #e3e7ee);
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      padding: 15px;
      display: inline-block;
    ">
      <p style="color:#555; font-size:14px;">
        ⏱️ Kod amal qilish muddati: <b>5 daqiqa</b><br>
        ✉️ Email: <b>${email}</b>
      </p>
    </div>

    <hr style="margin:30px 0; border:none; border-top:1px solid #ddd;">

    <p style="font-size:13px; color:#999;">
      © ${new Date().getFullYear()} Jahongir Murtozayev • 3D Verification System<br>
      <i>“Har bir tafsilot mukammallikka olib boradi.”</i>
    </p>
  </div>
`;


    await transporter.sendMail({
      from: "Jahongir Murtozayev",
      to: email,
      subject: "Tasdiqlash kodi",
      html
    })
    await CODE.deleteOne({ email });
    await CODE.create({ email, password: user.password, username: user.username, code })

    return res.status(200).json({ message: "Sizga tasdiqlash kodi jo'natildi", email }) as unknown as T

  } catch (err) {
    return error(res, (err as Error).message) as unknown as T
  }
}

export async function verifyCode(req: typeof request, res: typeof response) {
  try {
    const { email, code } = req.body;

    const record = await CODE.findOne({ email });
    if (!record) {
      return error(res, "Kod topilmadi yoki yuborilmagan", 404);
    }

    if (Date.now() > record.expires.getTime()) {
      await CODE.deleteOne({ email });
      return error(res, "Kod muddati tugagan", 400);
    }

    if (code !== record.code) {
      return error(res, "Kod noto'g'ri", 400);
    }

    const existUser = await AUTH.findOne({ email });

    if (existUser) {
      const userDto = new UserDto(existUser);
      const token = jwt("sign", { ...userDto });
      cookie("save", res, token as jwtType.JwtPayload);
      await CODE.deleteOne({ email });

      return res.status(200).json({ message: `Tizimga muvaffaqiyatli kirdingiz ${existUser.username}` });
    }

    const newUser = await AUTH.create({
      username: record.username,
      email: record.email,
      password: record.password,
      verified: true,
    });

    const userDto = new UserDto(newUser);
    const token = jwt("sign", { ...userDto });
    cookie("save", res, token as jwtType.JwtPayload);

    await CODE.deleteOne({ email });

    return res.status(200).json({ message: `Xush kelibsiz ${newUser.username}` });
  } catch (err) {
    return error(res, (err as Error).message);
  }
}

export async function signOut(req: typeof request, res: typeof response) {
  cookie("clear", res)

  return res.status(200).json({ message: "Keyinroq ko'rishamiz" })
}

export async function checkAuth(req: typeof request, res: typeof response) {
  try {
    const token = req.cookies["amazon_clone"]

    if (!token) {
      return error(res, "Foydalanuvchi ro'yxatdan o'tmagan", 401)
    }

    const decode = jwt("verify", token as string) as { id: string }

    if (!decode) {
      return error(res, "Foydalanuvchi ro'yxatdan o'tmagan", 401)
    }

    const user = await AUTH.findById(decode.id)

    if (!user) {
      return error(res, "Foydalanuvchi ro'yxatdan o'tmagan", 401)
    }

    return res.status(200).json({ message: "Hammasi joyida" })

  } catch (err) {
    return error(res, (err as Error).message);
  }
}

export async function continueWithGoogle(req: typeof request, res: typeof response) {
  const user = req.user as { _id: string, email: string }
  const token = jwt("sign", { id: user?._id, email: user?.email })
  cookie("save", res, token as jwtType.JwtPayload)

  res.redirect("http://localhost:1420/employee")
}
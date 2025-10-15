import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/server/api"
import { useMutation } from "@tanstack/react-query"
import { Loader, Loader2 } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const FormSchema = z.object({
    code: z.string().min(5, {
        message: "Your one-time password must be 5 characters.",
    }),
})

export default function Login() {

    const [isVerifying, setIsCompare] = useState(false)
    const [email, setEmail] = useState<string>("")

    const { mutateAsync: signInAsync, isPending: isSigning } = useMutation({
        mutationFn: async (payload: object) => {
            const { data } = await api.post("/auth/sign-in", payload, { headers: { "Content-Type": "application/json" } })

            return data
        },
        onSuccess(data: { message: string, email: string }) {
            toast.success(data.message)
            setEmail(data.email)
            setIsCompare(true)
        },
        onError(err) {
            toast.error(err.message)
        }
    })


    const { mutateAsync: verifyAsync, isPending: isVerify } = useMutation({
        mutationFn: async (payload: object) => {
            const { data } = await api.post("/auth/verify", payload, { headers: { "Content-Type": "application/json" } })

            return data
        },
        onSuccess(data: { message: string }) {
            toast.success(data.message)
            window.location.reload()
        },
        onError(err) {
            toast.error(err.message)
        }
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: "",
        },
    })

    const verifySubmit = async (data: z.infer<typeof FormSchema>) => {
        await verifyAsync({ code: data.code, email })
    }

    const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData.entries())

        signInAsync({ to: "dashboard", ...data })

    }

    return (
        <Card className="w-full max-w-sm">
            {!isVerifying ? (
                <div>
                    <CardHeader>
                        <CardTitle>Boshqaruvga kiring</CardTitle>
                        <CardDescription>
                            Bu yerga kirish uchun sizni <strong>owner</strong> <strong>admin</strong> qilgan bo'lishi lozim
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={loginSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        className="cursor-target"
                                        name="email"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Parol</Label>
                                    <Input name="password" id="password" type="password" required className="cursor-target" />
                                </div>
                            </div>
                            <CardFooter className="flex flex-col gap-2 mt-4">
                                <Button type="submit" className="w-full rounded cursor-target">
                                    {isSigning ? <Loader2 className="animate-spin" /> : "Login"}
                                </Button>
                                <span>or</span>
                                <Button
                                    onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
                                    variant="ghost" type="button" className="w-full rounded cursor-target border flex items-center btn btn-outline-danger justify-center">
                                    Google bilan kirish
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </div>
            ) : (
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(verifySubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tasdiqlash kodi</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="cursor-target" index={0} />
                                                    <InputOTPSlot className="cursor-target" index={1} />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot className="cursor-target" index={2} />
                                                    <InputOTPSlot className="cursor-target" index={3} />
                                                    <InputOTPSlot className="cursor-target" index={4} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Sizga (emailinggizga) tasdiqlash kodi jo'natildi shuni kiriting
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant="ghost" className="w-full rounded btn btn-outline-primary flex items-center justify-center cursor-target" type="submit">{isVerify ? <Loader className="animate-spin" /> : "Tasdiqlash"}</Button>
                        </form>
                    </Form>
                </CardContent>
            )}
        </Card>
    )
}

"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/server/api";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const editSchema = z
    .object({
        username: z
            .string()
            .min(4, "Username uzunligi kam")
            .optional()
            .or(z.literal("")),
        email: z
            .string()
            .email("Email xato formatda")
            .optional()
            .or(z.literal("")),
        passwords: z
            .object({
                pass: z
                    .string()
                    .min(4, "Parol 4 tadan kam bo‘lmasin")
                    .max(15, "Parol 16 tadan ko‘p bo‘lmasin")
                    .optional()
                    .or(z.literal("")),
                password: z
                    .string()
                    .min(4, "Parol 4 tadan kam bo‘lmasin")
                    .max(15, "Parol 16 tadan ko‘p bo‘lmasin")
                    .optional()
                    .or(z.literal("")),
            })
            .optional(),
    })
    .refine(
        (data) => {
            const { pass, password } = data.passwords || {};
            if (!pass && !password) return true;
            if (pass && password) return pass === password;
            return false;
        },
        {
            message:
                "Ikkala parolni ham kiriting va ular bir xil bo‘lishi kerak",
            path: ["passwords", "password"],
        }
    );

type EditSchemaType = z.infer<typeof editSchema>;

interface Profile {
    children: ReactNode;
    data: { username: string; email: string };
}

export default function EditProfile({ children, data }: Profile) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditSchemaType>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            username: data?.username || "",
            email: data?.email || "",
            passwords: { pass: "", password: "" },
        },
    });

    const queryClient = useQueryClient()

    const { mutate: update, isPending } = useMutation({
        mutationFn: async (data: object) => {
            const res = await api.put("/profile/update", data, { headers: { "Content-Type": "application/json" } })

            return res.data
        },
        onSuccess(data: { message: string }) {
            toast.success(data.message)
        },
        async onMutate(data) {
            await queryClient.cancelQueries({ queryKey: ["profile"] })
            const oldData = queryClient.getQueryData(["profile"])
            queryClient.setQueryData(["profile"], old => {
                if (!old) return data
                return {
                    ...old,
                    ...data
                }
            })

            return { oldData }
        },
        onError(err: { response: { data: { message: string } } }, _, context) {
            if (context?.oldData) {
                queryClient.setQueryData(["profile"], context.oldData)
            }

            toast.error(err.response.data.message)
        }
    })

    const onChangeProfile = (values: EditSchemaType) => {
        const changed = Object.entries(values).reduce((acc, [key, value]) => {
            if (typeof value === "object" && value !== null) {
                const inner = Object.fromEntries(
                    Object.entries(value).filter(([_, v]) => v)
                );
                if (Object.keys(inner).length > 0) acc[key] = inner;
            } else if (value) {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        update(changed)
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onChangeProfile)}>
                    <DialogHeader>
                        <DialogTitle>Profilni tahrirlash</DialogTitle>
                        <DialogDescription>
                            Faqat o‘zgartirmoqchi bo‘lgan maydonni kiriting
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-3">
                        {/* Username */}
                        <div className="grid gap-2">
                            <Label htmlFor="username">Ism</Label>
                            <Input
                                id="username"
                                {...register("username")}
                                placeholder={data?.username || "Ismingiz"}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                placeholder={data?.email || "Emailingiz"}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Passwords */}
                        <div className="grid gap-2">
                            <Label htmlFor="pass">Parol</Label>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <Input
                                        id="pass"
                                        type="password"
                                        placeholder="Yangi parol"
                                        {...register("passwords.pass")}
                                    />
                                    {errors.passwords?.pass && (
                                        <p className="text-red-500 text-sm">
                                            {errors.passwords.pass.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Parolni tasdiqlang"
                                        {...register("passwords.password")}
                                    />
                                    {errors.passwords?.password && (
                                        <p className="text-red-500 text-sm">
                                            {errors.passwords.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Bekor qilish</Button>
                        </DialogClose>
                        <Button type="submit">{isPending ? <Loader className="animate-spin" /> : "O'zgarishlarni saqlash"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

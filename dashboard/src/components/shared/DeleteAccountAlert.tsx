import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import api from "@/server/api"
import { useMutation } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { ReactNode } from "react"
import { toast } from "sonner"

export default function AlertDialogDemo({ children }: { children: ReactNode }) {

    const { mutate: deleteAccount, isPending } = useMutation({
        mutationFn: async () => {
            const res = await api.delete("/profile/delete")

            return res.data
        },
        onSuccess(data: { message: "String" }) {
            toast.success(data.message)
        },
        onError(err: { response: { data: { message: string } } }) {
            toast.error(err.response.data.message)
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Akkauntinggizni haqiqatdan o'chirmoqchimisiz?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Agar buni tasdiqlasanggiz akkauntinggiz tag tugi bilan o'chadi va agar siz Owner yoki Admin bo'lsanggiz rollar almashadi va keyingi safar kirsanggiz hammasi 0 dan boshlanadi
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteAccount()} className="bg-red-500">{isPending ? <Loader className="animate-spin" /> : "O'chirilsin"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

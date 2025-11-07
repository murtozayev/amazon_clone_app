import AlertDialogDemo from "@/components/shared/DeleteAccountAlert"
import EditProfile from "@/components/shared/EditProfile"
import api from "@/server/api"
import useSettings from "@/store"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const Profile = () => {
    const { data } = useSettings()

    const { mutate: signOut } = useMutation({
        async mutationFn() {
            const { data } = await api.post("/auth/sign-out")

            return data
        },
        onSuccess(data: { message: string }) {
            toast.success(data.message)
            window.location.reload()
        }
    })

    return (
        <div className="flex items-center justify-center w-full">
            <div className="shadow w-[30vw] h-[40vh] rounded-2xl relative">
                <div className="mx-auto w-[10vw] h-[10vw] rounded-full text-blue-500 flex items-center justify-center text-[6vw] font-bold absolute left-0 right-0 top-[-5vw] shadow-border">
                    {/* @ts-ignore */}
                    {data?.username.charAt(0)}
                </div>
                <div className="relative top-20 w-full flex flex-col items-center text-blue-500">
                    {/* @ts-ignore */}
                    <h4>{data?.username}</h4>
                    {/* @ts-ignore */}
                    <h6>{data?.email}</h6>
                    {/* @ts-ignore */}
                    <h6>Role: {data?.role.charAt(0).toUpperCase() + data?.role.slice(1).toLowerCase()}</h6>

                    <div className="flex gap-10">
                        <button onClick={() => signOut()} className="btn btn-outline-danger">
                            Chiqib ketish
                        </button>
                        <EditProfile data={data as { username: string, email: string }}>
                            <button className="btn btn-outline-primary">
                                Profilni tahrirlash
                            </button>
                        </EditProfile>
                    </div>
                    <br />
                    <AlertDialogDemo>
                        <button className="btn btn-danger">Akkauntni o'chirish</button>
                    </AlertDialogDemo>
                </div>
            </div>
        </div>
    )
}

export default Profile
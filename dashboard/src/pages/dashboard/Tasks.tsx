import CreateTaskDialog from "@/components/shared/CreateTaskDialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import api from "@/server/api"
import useSettings from "@/store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CheckCircle, MoreHorizontal, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import TaskDropDown from "@/components/shared/TaskDropdown"

export interface Task {
    title: string
    desc: string
    completed: boolean
    to: string
    _id: string
}

const Tasks = () => {
    const { data: user } = useSettings()

    const {
        data: tasks = [],
        isLoading,
        isError,
    } = useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await api.get("/dashboard/task/get")
            return Array.isArray(res.data) ? res.data : res.data?.tasks || []
        },
    })

    const allTasks = [...tasks].reverse()
    const completedTasks = allTasks.filter((t) => t.completed)
    const uncompletedTasks = allTasks.filter((t) => !t.completed)

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-2">
                <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
                <CardDescription>Vazifalar olinmoqda...</CardDescription>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-center mt-20 text-red-500 font-medium">
                Vazifalarni olishda xatolik yuz berdi ❌
            </div>
        )
    }

    return (
        <div className="p-6 w-[75vw] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">📋 Vazifalar ro‘yxati</h2>
                {/* @ts-ignore */}
                {user?.role === "owner" && (
                    <CreateTaskDialog>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            + Yangi vazifa
                        </Button>
                    </CreateTaskDialog>
                )}
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Barcha vazifalar */}
                <TaskColumn
                    title="Barcha vazifalar"
                    icon={<CheckCircle className="text-blue-500" />}
                    tasks={allTasks}
                    emptyText="Hozircha hech qanday vazifa yo‘q."
                />

                {/* Tugallanmaganlar */}
                <TaskColumn
                    title="Tugallanmaganlar"
                    icon={<XCircle className="text-red-500" />}
                    tasks={uncompletedTasks}
                    emptyText="Hamma vazifalar bajarilgan 🎉"
                />

                {/* Tugallanganlar */}
                <TaskColumn
                    title="Tugallanganlar"
                    icon={<CheckCircle className="text-green-500" />}
                    tasks={completedTasks}
                    emptyText="Tugallangan vazifalar mavjud emas."
                />
            </div>
        </div>
    )
}

export default Tasks

interface TaskColumnProps {
    title: string
    icon: React.ReactNode
    tasks: Task[]
    emptyText: string
}

function TaskColumn({ title, icon, tasks, emptyText }: TaskColumnProps) {

    const queryClient = useQueryClient()

    const { data: profile } = useSettings()

    const { mutate } = useMutation({
        async mutationFn({ id }: { id: string }) {
            const res = await api.patch("/dashboard/task/complete/" + id)

            return res.data
        },
        async onMutate({ id }) {
            await queryClient.cancelQueries({ queryKey: ["tasks"] })
            const oldData = queryClient.getQueryData(["tasks"])
            queryClient.setQueryData(["tasks"], (old: Task[] = []) => {
                return old.map((task) =>
                    task._id === id
                        ? { ...task, completed: !task.completed }
                        : task
                )
            })
            return { oldData }
        },
        onError(err: { response: { data: { message: string } } }, _, context) {
            if (context?.oldData) {
                queryClient.setQueryData(["tasks"], context.oldData)
            }

            toast.error(err.response.data.message)
        }
    })

    const { mutate: clear } = useMutation({
        async mutationFn() {
            const res = await api.delete("/dashboard/task/clear")
            return res.data
        },
        async onMutate() {
            await queryClient.cancelQueries({ queryKey: ["tasks"] })
            const prevData = queryClient.getQueryData(["tasks"])

            queryClient.setQueryData(["tasks"], old => {
                if (old) return old = []
            })

            return { prevData }
        },
        async onError(err: { response: { data: { message: string } } }, _, context) {
            if (context?.prevData) {
                queryClient.setQueryData(["tasks"], context.prevData)
            }

            toast.error(err.response.data.message)
        },
        async onSuccess(data: { message: string }) {
            toast.success(data.message)
        }
    })

    return (
        <Card className="rounded-2xl shadow-sm border border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    <span className="flex items-center gap-2">{icon} {title}</span>
                    {/* @ts-ignore */}
                    {profile?.role === "owner" && <button onClick={() => clear()} className="btn btn-outline-danger">Tozalash</button>}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 max-h-[70vh] overflow-y-auto">
                {tasks.length === 0 && (
                    <CardDescription className="text-center text-slate-500 mt-4">
                        {emptyText}
                    </CardDescription>
                )}

                {tasks.map((task) => (
                    <Card
                        key={task.title}
                        className="p-3 border border-slate-100 hover:shadow-md transition-all duration-200"
                    >
                        <CardTitle className="text-sm flex justify-between items-center text-blue-600">
                            <span>{task.title}</span>
                            {/* @ts-ignore */}
                            {profile?.role === "owner" && (
                                <TaskDropDown data={task}>
                                    <MoreHorizontal className="text-slate-400 w-4 h-4 cursor-pointer" />
                                </TaskDropDown>
                            )}
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-500 mt-1">
                            {task.desc}
                        </CardDescription>
                        <CardContent className="p-0 mt-2 space-y-1">
                            <CardDescription className="text-xs">
                                <span className="font-medium text-slate-700">Status:</span>{" "}
                                {task.completed ? "✅ Tugallangan" : "❌ Tugallanmagan"}
                            </CardDescription>
                            <CardDescription className="text-xs">
                                <span className="font-medium text-slate-700">Kimga:</span> {task.to}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="pt-2">
                            {task.completed ? (
                                <Button onClick={() => mutate({ id: task._id })} variant="outline" className="w-full border-red-400 text-red-600">
                                    Bekor qilish
                                </Button>
                            ) : (
                                <Button onClick={() => mutate({ id: task._id })} variant="outline" className="w-full border-green-400 text-green-600">
                                    Bajarildi
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}

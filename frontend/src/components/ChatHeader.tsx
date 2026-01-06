import { Circle } from "lucide-react"

export const ChatHeader = ({ user, connected }: { user: string; connected: boolean }) => {
    return (
        <div className="p-4 bg-white/10 backdrop-blur-md border-b border-white/20 flex justify-between items-center rounded-t-2xl">
            <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Spectree Chat</h1>
                <p className="text-xs text-gray-400">Logged in as <span className="text-cyan-400 font-mono">{user}</span></p>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
                <Circle size={10} fill={connected ? "#22c55e" : "#ef4444"} className={connected ? "text-green-500" : "text-red-500"} />
                <span className="text-xs font-medium text-gray-300">{connected ? 'Online' : 'Offline'}</span>
            </div>
        </div>
    )
}
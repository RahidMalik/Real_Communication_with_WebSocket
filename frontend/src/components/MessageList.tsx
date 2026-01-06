import { useEffect, useRef } from "react";

interface Msg {
    username: string;
    content: string;
};

export const MessageList = ({ Message, currentUser }: { Message: Msg[], currentUser: string }) => {
    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [Message])

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {Message.map((m, i) => {
                const isMe = m.username === currentUser;
                return (
                    <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${isMe ? 'bg-linear-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-100 border border-white/10 rounded-tl-none'}`}>
                            {!isMe && <p className="text-[10px] font-bold text-cyan-400 uppercase mb-1">{m.username}</p>}
                            <p className="text-sm leading-relaxed">{m.content}</p>
                        </div>
                    </div>
                );
            })}
            <div ref={endRef} />
        </div>
    );

}
import { Send } from 'lucide-react';
interface MessageInputProps {
    value: string;                   // Text hamesha string hota hai
    onChange: (val: string) => void; // Function jo string leta hai aur kuch return nahi karta
    onSend: (e: React.FormEvent) => void; // Form submit event ka type
}
export const MessageInput = ({ value, onChange, onSend }: MessageInputProps) => (
    <form onSubmit={onSend} className="p-4 bg-white/5 border-t border-white/10 flex gap-2 rounded-b-2xl">
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
        />
        <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-black p-2 rounded-xl transition-transform active:scale-95">
            <Send size={20} />
        </button>
    </form>
);
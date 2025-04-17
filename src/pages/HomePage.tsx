import { useState } from "react";
import { usePreferences } from "../common/ctx/preferenceContext";
import Navbar from "../components/Navbar";
import { parseCommand } from "../common/utils/claudeParser";

export default function HomePage() {
    const { preference, update } = usePreferences();
    const [messages, setMessages] = useState<{ sender: "user" | "claude"; text: string }[]>([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages([...messages, { sender: "user", text: userMessage }]);
        setInput("");

        try {
            const parsed = parseCommand(userMessage);

            if (Object.keys(parsed).length === 0) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "claude", text: "Maaf, saya tidak mengerti perintah itu 😅" },
                ]);
                return;
            }

            await update(parsed);
            setMessages((prev) => [
                ...prev,
                { sender: "claude", text: "Preferensi kamu berhasil diperbarui! ✅" },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: "claude", text: "Terjadi kesalahan saat memproses perintah 😥" },
            ]);
        }
    };
    if (!preference) return <p className="mx-auto text-center">Loading preferences...</p>;
    return (
        <>
            <Navbar />
            <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 border rounded shadow-lg p-4">
                <div className="h-60 overflow-y-auto mb-2 space-y-2">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`text-sm p-2 rounded ${msg.sender === "user" ? "bg-blue-100 dark:bg-blue-900 text-right" : "bg-gray-200 dark:bg-gray-700"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Tanyakan ke Claude..."
                        className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                    <button onClick={handleSend} className="bg-blue-600 text-white px-3 py-2 rounded">
                        Kirim
                    </button>
                </div>
            </div>
        </>
    );
}

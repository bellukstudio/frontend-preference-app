import apiService from "../response/apiResponse";

export async function askClaude(message: string): Promise<string> {
    try {
        const response = await apiService.post<{ content: { text: string }[] }>("/claude", { message });

        const aiText = response.data.content?.[0]?.text;

        if (!aiText) {
            throw new Error("Claude tidak mengembalikan pesan.");
        }

        return aiText;
    } catch (error) {
        console.error("Claude API ERROR", error);
        throw new Error("Claude gagal menjawab");
    }
}

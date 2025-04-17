export function parseCommand(text: string): Partial<{
    theme: string;
    language: string;
    notifications: boolean;
}> {
    const lower = text.toLowerCase();
    const prefs: any = {};

    // Theme
    if (lower.includes("theme") || lower.includes("dark") || lower.includes("light")) {
        if (lower.includes("dark")) prefs.theme = "dark";
        if (lower.includes("light")) prefs.theme = "light";
    }

    // Language
    if (lower.includes("language") || lower.includes("bahasa") || lower.includes("spanyol") || lower.includes("indonesia")) {
        if (lower.includes("english")) prefs.language = "en";
        else if (lower.includes("spanish") || lower.includes("spanyol")) prefs.language = "es";
        else if (lower.includes("indonesia") || lower.includes("indo")) prefs.language = "id";
    }

    // Notifications
    if (lower.includes("notification") || lower.includes("notifikasi")) {
        if (lower.includes("on") || lower.includes("nyalakan")) prefs.notifications = true;
        if (lower.includes("off") || lower.includes("matikan")) prefs.notifications = false;
    }

    return prefs;
}

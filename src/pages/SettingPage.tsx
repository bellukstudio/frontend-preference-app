import { usePreferences } from "../common/ctx/preferenceContext";

export default function SettingsPage() {
    const { preference, update } = usePreferences();

    if (!preference) return <p>Loading preferences...</p>;

    return (
        <div className="max-w-md mx-auto rounded transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white ">
            <div className="max-w-xl p-6 ">
                <h2 className="text-2xl font-bold mb-6 mt-10">Settings</h2>

                {/* Theme */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Theme</label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => update({ theme: "light" })}
                            className={`px-4 py-2 rounded border transition-all duration-200 ${preference.theme === "light"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                                }`}
                        >
                            Light
                        </button>
                        <button
                            onClick={() => update({ theme: "dark" })}
                            className={`px-4 py-2 rounded border transition-all duration-200 ${preference.theme === "dark"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                                }`}
                        >
                            Dark
                        </button>
                    </div>
                </div>

                {/* Language */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Language</label>
                    <select
                        value={preference.language}
                        onChange={(e) => update({ language: e.target.value })}
                        className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="id">Bahasa Indonesia</option>
                    </select>
                </div>

                {/* Notifications */}
                <div className="mb-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={preference.notifications}
                            onChange={(e) => update({ notifications: e.target.checked })}
                        />
                        Enable Notifications
                    </label>
                </div>
            </div>
        </div>
    );
}

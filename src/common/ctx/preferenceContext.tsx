import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { getPreference, PreferenceResponse, updatePreference } from '../../actions/preferences';
import { useAuth } from './authContext';


type PreferencesContextType = {
    preference: PreferenceResponse | null;
    update: (newPrefs: Partial<PreferenceResponse>) => void;
}

const PreferenceContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferenceProvider = ({ children }: { children: ReactNode }) => {
    const [preference, setPreference] = useState<PreferenceResponse | null>(null);
    const { token } = useAuth();
    useEffect(() => {
        if (!token) return setPreference(null);
        const fetchPrefs = async () => {
            try {
                const data = await getPreference();
                setPreference(data);
            } catch (err) {
                console.log("failed to load preferences", err);
            }
        };
        fetchPrefs();
    }, [token]);

    useEffect(() => {
        if (!preference) return;

        const root = window.document.documentElement;

        if (preference.theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [preference?.theme]);

    const update = async (newPrefs: Partial<PreferenceResponse>) => {
        if (!preference) return;

        try {
            const merged = { ...preference, ...newPrefs }
            const updated = await updatePreference(merged);
            setPreference(updated);

        } catch (err) {
            console.log("failed to update preference", err);
        }
    }

    const value = useMemo(() => ({ preference, update }), [preference]);

    return (
        <PreferenceContext.Provider value={value}>{children}</PreferenceContext.Provider>
    );
}
export const usePreferences = (): PreferencesContextType => {
    const context = useContext(PreferenceContext);
    if (!context) throw new Error('usePreferences must be used within PreferencesProvider');
    return context;
};
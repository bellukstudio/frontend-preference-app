import { usePreferences } from "../common/ctx/preferenceContext";
import Navbar from "../components/Navbar";

export default function HomePage() {
    const { preference } = usePreferences();

    if (!preference) return <p className="mx-auto text-center">Loading preferences...</p>;
    return (
        <>
            <Navbar />
            <div className="p-10">
                <h1 className="text-2xl font-bold">Welcome to Home</h1>
                <p>Ini halaman utama setelah login.</p>
            </div></>
    );
}

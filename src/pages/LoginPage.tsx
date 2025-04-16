import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/ctx/authContext';
import { loginAction } from '../actions/auth';
import { validateForm } from '../common/validation/validationForm';
import { loginValidationSchema } from '../common/validation/schemaValidation';
import ErrorMessage from '../components/Errors/ErrorMessage';

export default function LoginPage() {
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [errorForm, setErrorForm] = useState<any[]>([]);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const validationResponse = validateForm(loginValidationSchema, { username, password });
            if (!validationResponse.success) {
                setErrorForm(validationResponse.errors);
                throw new Error("Validation failed");
            }

            setErrorForm([]);

            const result = await loginAction(username, password);
            if (result.meta.code === 201 && result.data?.access_token) {
                login(result.data.access_token);
                navigate('/');

            } else {
                console.log('Login failed');
                setError(result.meta.message || "Login failed");
            }
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <input
                    className="w-full mb-3 p-2 border rounded"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <ErrorMessage errors={errorForm} field="username" />
                <input
                    className="w-full mb-3 p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ErrorMessage errors={errorForm} field="password" />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Login
                </button>
                <div className="text-center mt-2">
                    <a href="/register" className="text-blue-500">Register</a>
                </div>
                {error && <p className='text-red-400 text-center'>{error}</p>}
            </form>
        </div>
    );

}

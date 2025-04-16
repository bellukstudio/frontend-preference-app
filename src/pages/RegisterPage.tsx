import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/ctx/authContext';
import { registerAction } from '../actions/auth';
import { registerValidationSchema } from '../common/validation/schemaValidation';
import { validateForm } from '../common/validation/validationForm';
import ErrorMessage from '../components/Errors/ErrorMessage';

export default function RegisterPage() {
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
        try {
            const validationResponse = validateForm(registerValidationSchema, { username, password });
            if (!validationResponse.success) {
                setErrorForm(validationResponse.errors);
                throw new Error("Validation failed");
            }

            setErrorForm([]);

            const result = await registerAction(username, password);
            if (result.meta.code === 201 && result.data?.access_token) {
                login(result.data.access_token);
                navigate('/');

            } else {
                console.log('Register failed');
                setError(result.meta.message || "Register failed");
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
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
                    Register
                </button>
                <div className="text-center mt-2">
                    <a href="/login" className="text-blue-500">Login</a>
                </div>
                {error && <p className='text-red-500 text-center'>{error}</p>}
            </form>
        </div>
    );
}

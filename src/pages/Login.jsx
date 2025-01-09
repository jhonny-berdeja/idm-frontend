const authenticateUser = async (email, password) => {
    const url = 'http://localhost:8080/authenticate';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
    });

    if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Falló la solicitud de autenticación: ${errorText}`);
    }

    const jwtResponse = await response.json(); 
    console.log("authenticateUser response: ", jwtResponse);
    
    if (!jwtResponse) {
        throw new Error('Falló la obtención de jwt');
    }

    const token = jwtResponse.jwt;
    if (!token) {
        throw new Error('Falló la obtención del token');
    }

    return token;
};

const createUser = async (token) => {
    const body = {
        userIdm: {
            email: "test14@jhonnyberdeja.com",
            password: "to_be_encoded",
            roles: ["ROLE_ADMIN"]
        }
    };

    const response = await fetch('http://localhost:8081/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Falló la creación de usuario: ${errorText}`);
    }

    const result = await response.text();
    console.log("createUser response: ", result);
    return result;
};

const Login = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const email = "admin@jhonnyberdeja.com"; 
            const password = "to_be_encoded"; 
            const token = await authenticateUser(email, password);
            const user = await createUser(token);
            console.log("User created: ", user);
        } catch (error) {
            console.log('Falló el proceso:', error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

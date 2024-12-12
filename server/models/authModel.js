import supabase from './createClient.js'; 

export const login = async (credentials) => {
    const { email, password } = credentials;

    // Sign in using email and password
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

    if (error) throw new Error(error.message);
    
    // Retrieve and return the user ID
    const userId = data.user?.id; // Check if `user` exists
    if (!userId) throw new Error("User ID could not be retrieved");
    return { userId };
}

export const signup = async (credentials) => {
    const { email, password } = credentials;

    // Signup using email and password
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })

    if (error) throw new Error(error.message);
    return data;
}


// Example usage
// const credentials = { email: "someone@example.com", password: "pass123" };

// login(credentials)
//     .then((data) => console.log("Signup successful:", data))
//     .catch((error) => console.error("Error during signup:", error.message));
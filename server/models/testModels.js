import supabase from './createClient.js';
import { createProfile, updateProfile, getProfile, deleteProfile } from './profileModel.js';
import { login, signup } from './authModel.js';

const email = "someone@example.com";
const credentials = { email: email, password: "pass123" };

(async () => {
    try {
        // Signup
        const signupData = await signup(credentials, supabase);
        console.log("Signup successful:", signupData);

        // Login
        const loginData = await login(credentials, supabase);
        const userID = loginData.userId;
        console.log('Logged-in user ID:', userID);

        // Create Profile
        const profileData = { 
            id: userID, 
            first_name: "Zaid", 
            last_name: "", 
            email: email, 
            date_of_birth: "2002-11-20" 
        };
        await createProfile(profileData, "student", supabase);
        console.log("Profile created successfully.");

        // Get Profile
        const profile = await getProfile(userID, "student", supabase);
        console.log("Profile:", profile);

    } catch (error) {
        console.error("Error occurred:", error.message);
    }
})();

import fetch from "node-fetch";

const API_URL = "http://localhost:5000/api";
const TEST_USER = {
    name: "Test Sinner",
    email: `test${Date.now()}@hell.com`,
    password: "password123"
};

async function testBackend() {
    console.log("🔥 Starting Backend Verification 🔥\n");

    try {
        // 1. Register
        console.log("1. Testing Registration...");
        const regRes = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(TEST_USER)
        });
        const regData = await regRes.json();
        if (!regRes.ok) throw new Error(regData.message || "Registration failed");
        console.log("✅ Registration Successful:", regData.email);

        // 2. Login
        console.log("\n2. Testing Login...");
        const loginRes = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: TEST_USER.email, password: TEST_USER.password })
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.message || "Login failed");
        const token = loginData.token;
        console.log("✅ Login Successful. Token received.");

        // 3. Confess (Gemini Proxy)
        console.log("\n3. Testing Confession (Gemini)...");
        const confessionText = "I created a bug in production.";
        const prompt = `You are a demon. Respond to this confession: "${confessionText}"`;
        
        const confessRes = await fetch(`${API_URL}/ai/gemini`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ prompt, confessionText })
        });
        const confessData = await confessRes.json();
        if (!confessRes.ok) throw new Error(confessData.error || "Confession failed");
        console.log("✅ Confession Accepted. Response:", confessData.result.substring(0, 50) + "...");

        // 4. Get History
        console.log("\n4. Testing History Fetch...");
        const histRes = await fetch(`${API_URL}/confessions`, {
             headers: { 
                "Authorization": `Bearer ${token}`
            }
        });
        const histData = await histRes.json();
        if (!histRes.ok) throw new Error("History fetch failed");
        
        if (histData.length > 0 && histData[0].confession === confessionText) {
            console.log("✅ History Verified. Found confession:", histData[0].confession);
        } else {
            throw new Error("History verification failed. Confession not found.");
        }

        console.log("\n🎉 ALL TESTS PASSED. The Backend is operational.");

    } catch (error) {
        console.error("\n❌ TEST FAILED:", error.message);
    }
}

testBackend();

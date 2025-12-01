// Debug Helper for Admin Dashboard Issues
// Add this temporarily to your browser console to debug blog/category issues

console.log("=== Portfolio Debug Helper ===");

// Test Blog API
async function testBlogAPI() {
    console.log("\n📝 Testing Blog API...");

    try {
        // Test GET
        const getResponse = await fetch("/api/data/blogs");
        const blogs = await getResponse.json();
        console.log("✅ GET /api/data/blogs:", blogs.length, "blogs found");

        // Test POST (create)
        const testBlog = {
            title: "Test Blog " + Date.now(),
            description: "This is a test blog",
            category: "Data Engineering",
            excerpt: "Test excerpt",
            content: "Test content",
            image: "/test.jpg",
            date: new Date().toISOString().split("T")[0],
            allowComments: true,
            comments: [],
            emojiReactions: {}
        };

        const postResponse = await fetch("/api/data/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testBlog)
        });

        const postResult = await postResponse.json();
        console.log("✅ POST /api/data/blogs:", postResult);

        if (postResult.success) {
            console.log("✅ Blog creation works! ID:", postResult.blog.id);

            // Test DELETE (cleanup)
            const deleteResponse = await fetch(`/api/data/blogs?id=${postResult.blog.id}`, {
                method: "DELETE"
            });
            const deleteResult = await deleteResponse.json();
            console.log("✅ DELETE /api/data/blogs:", deleteResult);
        }

    } catch (error) {
        console.error("❌ Blog API Error:", error);
    }
}

// Test Category API
async function testCategoryAPI() {
    console.log("\n📁 Testing Category API...");

    try {
        // Test GET
        const getResponse = await fetch("/api/data/categories?type=blogs");
        const categories = await getResponse.json();
        console.log("✅ GET /api/data/categories:", categories);

        // Test POST
        const testCategory = "Test Category " + Date.now();
        const postResponse = await fetch("/api/data/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "blogs", category: testCategory })
        });

        const postResult = await postResponse.json();
        console.log("✅ POST /api/data/categories:", postResult);

    } catch (error) {
        console.error("❌ Category API Error:", error);
    }
}

// Test AI API
async function testAIAPI() {
    console.log("\n🤖 Testing AI API...");

    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "text",
                prompt: "Say 'Hello! AI is working!' in a friendly way."
            })
        });

        const result = await response.json();

        if (result.success) {
            console.log("✅ AI API works! Response:", result.response);
        } else {
            console.error("❌ AI API Error:", result.error);
            console.log("💡 Make sure GOOGLE_AI_API_KEY is set in .env.local");
        }

    } catch (error) {
        console.error("❌ AI API Error:", error);
    }
}

// Run all tests
async function runAllTests() {
    console.log("🧪 Running all tests...\n");
    await testBlogAPI();
    await testCategoryAPI();
    await testAIAPI();
    console.log("\n✅ All tests complete!");
}

// Auto-run tests
console.log("Running automated tests in 1 second...");
setTimeout(runAllTests, 1000);

// Export functions for manual testing
window.portfolioDebug = {
    testBlogAPI,
    testCategoryAPI,
    testAIAPI,
    runAllTests
};

console.log("\n💡 Available commands:");
console.log("  portfolioDebug.testBlogAPI()");
console.log("  portfolioDebug.testCategoryAPI()");
console.log("  portfolioDebug.testAIAPI()");
console.log("  portfolioDebug.runAllTests()");

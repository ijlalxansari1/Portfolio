# 🤖 Google AI (Gemini) Setup Guide

## ✅ API Key Added!

Great! You've added your Google AI API key. Here's how to test and use it:

## 🧪 Testing Your API Key

### Method 1: Admin Dashboard Test Button
1. Go to `/admin` and log in
2. Look for the **"Test AI Connection"** button in the top right
3. Click it to verify your API key is working
4. You'll see a success toast if it's working!

### Method 2: Test in Browser Console
Open browser console and run:
```javascript
fetch("/api/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "text",
    prompt: "Write a short title for a data engineering project"
  })
})
.then(r => r.json())
.then(console.log);
```

## 🎯 Using AI Features

### 1. **Generate Project Titles**
- Go to Admin → Projects → Add Project
- Click the **"AI Generate"** button next to Title field
- AI will generate a professional title

### 2. **Generate Descriptions**
- In any form, click **"AI Generate"** next to Description
- AI will create a detailed description

### 3. **Analyze Images**
- Upload an image in the Image Upload component
- AI can analyze the image and generate descriptions

## 🔧 Troubleshooting

### API Key Not Working?
1. **Check `.env.local` file exists** in root directory
2. **Verify the key format**: Should be a long string starting with `AIza...`
3. **Restart dev server** after adding the key:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```
4. **Check console** for error messages
5. **Verify API key** at: https://makersuite.google.com/app/apikey

### Common Errors

**"Google AI API key not configured"**
- Make sure `.env.local` exists
- Check the variable name is exactly: `GOOGLE_AI_API_KEY`
- Restart the dev server

**"AI API request failed"**
- Check your API key is valid
- Verify you have quota/credits
- Check API key permissions

**"Failed to generate content"**
- API might be rate-limited
- Try again in a few seconds
- Check your API quota

## 📝 Example Prompts

### For Projects:
- "Generate a professional title for a data engineering project using Kafka and Spark"
- "Write a description for a machine learning project about churn prediction"

### For Blogs:
- "Create an engaging blog title about ethical AI"
- "Write a blog excerpt about data pipeline automation"

### For Certifications:
- "Generate a professional certification title for AWS Solutions Architect"

## 🚀 Next Steps

1. ✅ Test the connection using the test button
2. ✅ Try generating content in the admin forms
3. ✅ Upload images and test image analysis
4. ✅ Customize prompts for your needs

## 💡 Tips

- **Better prompts = Better results**: Be specific in your prompts
- **Iterate**: Generate multiple times to get the best result
- **Edit after**: AI generates good starting points, but always review and edit
- **Combine**: Use AI for ideas, then refine manually

## 🎉 You're Ready!

Your AI integration is set up! Start using it in the admin dashboard to:
- Generate project titles and descriptions
- Create blog content
- Analyze uploaded images
- Get content suggestions

Happy creating! 🚀


# 🎨 Icons Download Guide - Ijlal Ansari Portfolio

## ✅ Name Updated!
Your name has been changed from "Poono" to **"Ijlal Ansari"** throughout the portfolio.

## 📦 Icons Needed - Please Upload These

I've set up the portfolio to use real technology icons. Please download and upload these SVG files to `/public/icons/`:

### Technologies Section (8 icons):

1. **python.svg** - Python logo
   - Download: https://simpleicons.org/icons/python.svg
   - Or: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg

2. **postgresql.svg** - PostgreSQL logo
   - Download: https://simpleicons.org/icons/postgresql.svg

3. **azure.svg** - Microsoft Azure logo
   - Download: https://simpleicons.org/icons/microsoftazure.svg
   - Rename to: `azure.svg`

4. **aws.svg** - AWS logo
   - Download: https://simpleicons.org/icons/amazonaws.svg
   - Rename to: `aws.svg`

5. **spark.svg** - Apache Spark logo
   - Download: https://simpleicons.org/icons/apachespark.svg
   - Rename to: `spark.svg`

6. **kafka.svg** - Apache Kafka logo
   - Download: https://simpleicons.org/icons/apachekafka.svg
   - Rename to: `kafka.svg`

7. **airflow.svg** - Apache Airflow logo
   - Download: https://simpleicons.org/icons/apacheairflow.svg
   - Rename to: `airflow.svg`

8. **databricks.svg** - Databricks logo
   - Download: https://simpleicons.org/icons/databricks.svg

### Tool Stack Section (8 icons):

1. **confluence.svg** - Confluence logo
   - Download: https://simpleicons.org/icons/confluence.svg

2. **jira.svg** - JIRA logo
   - Download: https://simpleicons.org/icons/jira.svg

3. **dbeaver.svg** - DBeaver logo
   - Download: https://simpleicons.org/icons/dbeaver.svg

4. **azure-synapse.svg** - Azure Synapse logo
   - Note: May need to get from Azure brand assets
   - Or use: https://simpleicons.org/icons/microsoftazure.svg (same as azure.svg)

5. **gitlab.svg** - GitLab logo
   - Download: https://simpleicons.org/icons/gitlab.svg

6. **chatgpt.svg** - ChatGPT/OpenAI logo
   - Download: https://simpleicons.org/icons/openai.svg
   - Rename to: `chatgpt.svg`

7. **ansible.svg** - Ansible logo
   - Download: https://simpleicons.org/icons/ansible.svg

8. **visual-studio.svg** - Visual Studio logo
   - Download: https://simpleicons.org/icons/visualstudio.svg

## 🚀 Quick Download Script

You can use this PowerShell script to download all icons:

```powershell
# Create icons directory
New-Item -ItemType Directory -Force -Path public/icons

# Download icons
$icons = @{
    "python.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg"
    "postgresql.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg"
    "azure.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftazure.svg"
    "aws.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonaws.svg"
    "spark.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apachespark.svg"
    "kafka.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apachekafka.svg"
    "airflow.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apacheairflow.svg"
    "databricks.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/databricks.svg"
    "confluence.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/confluence.svg"
    "jira.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jira.svg"
    "dbeaver.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dbeaver.svg"
    "gitlab.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gitlab.svg"
    "chatgpt.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg"
    "ansible.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ansible.svg"
    "visual-studio.svg" = "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudio.svg"
}

foreach ($icon in $icons.GetEnumerator()) {
    Invoke-WebRequest -Uri $icon.Value -OutFile "public/icons/$($icon.Key)"
    Write-Host "Downloaded: $($icon.Key)"
}
```

## 📋 Manual Download Steps

1. **Go to Simple Icons**: https://simpleicons.org/
2. **Search** for each technology name
3. **Click** the icon to view details
4. **Click** "Download SVG" button
5. **Save** to `/public/icons/` with exact filename

## ✅ After Uploading Icons

Once you upload the icons:
- ✅ Technologies section will show real logos
- ✅ Tool Stack will show real logos instead of letters
- ✅ Everything will match the RyanCV design exactly
- ✅ Icons will have hover effects and animations

## 🔄 Fallback System

If an icon is missing:
- **Technologies**: Shows emoji (🐍, 🗄️, ☁️, etc.)
- **Tool Stack**: Shows letter (C, J, D, A, etc.)

But with real icons, it looks much more professional! 🚀

## 📝 Current Status

✅ Name: Changed to "Ijlal Ansari"  
✅ Icon System: Ready to use real icons  
✅ Fallback: Shows emojis/letters if icons missing  
⏳ Icons: Waiting for you to upload SVG files  

## 💡 Tips

- Use **SVG format** for best quality
- Icons should be **48x48px** or larger
- Ensure icons are **visible on dark backgrounds**
- Use **white or colored** versions (not black)
- Test icons after uploading


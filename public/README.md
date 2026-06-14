# K.I.R.A - Advanced Desktop Voice Assistant 🚀

K.I.R.A is a highly capable, AI-powered desktop voice assistant built in Python. It features a futuristic PyQt5 Graphical User Interface (GUI) and provides complete hands-free control over your Windows PC — just like Siri, but for your Desktop.

Now with **Siri-level intelligence**: conversational memory, mood-based personality, proactive smart alerts, and full Hindi + Gujarati voice support!

---

## 🛠️ Web Landing Page Codebase

The code for the professional landing page website is structured under this directory as a Next.js single page application:

*   `src/app/` - Page routes, layouts, and global design styles.
*   `src/components/` - Interactive landing page sections (Hero, FAQ, Simulator, Navbar, Footer, DeveloperSetup).
*   `public/` - Media assets and installer downloads.

To launch the website dev server locally:

```bash
# Install package dependencies
npm install

# Run hot-reloading development server
npm run dev

# Compile optimized static export
npm run build
```

---

## ✨ What's New — Siri-Level Upgrades

### 🧠 Conversational Memory & Context Awareness
Kira now **remembers your previous commands** within a session. No need to repeat yourself!

*   **Follow-up Queries:** Say `"What's the weather in Mumbai?"` and then just say `"How about Delhi?"` — Kira automatically understands you mean the weather.
*   **Rolling Context Window:** Stores your last 10 interactions with category, arguments, and timestamps.
*   **AI Context Injection:** Your recent conversation history is sent to Gemini AI, making its answers smarter and more relevant.
*   **Supported follow-up phrases:** `"How about..."`, `"What about..."`, `"And..."`, `"Also..."`, `"Same for..."`
    *   Hindi: `"Aur..."`, `"Bhi..."`
    *   Gujarati: `"Ane..."`

### 😄 Mood-Based Personality Engine
Kira dynamically changes its **personality and tone** based on the time of day — just like Siri!

| Time of Day | Mood | Personality |
|-------------|------|-------------|
| ☀️ 5 AM – 12 PM | **Cheerful** | Energetic, enthusiastic — *"Ready to conquer the day!"* |
| 💼 12 PM – 5 PM | **Focused** | Concise, professional — *"On it. Done."* |
| 🌅 5 PM – 10 PM | **Relaxed** | Warm, friendly — *"Take your time."* |
| 🌙 10 PM – 5 AM | **Sleepy** | Gentle, caring — *"It's late. Shall we wrap up?"* |

*   Greetings change based on mood (randomized, never repetitive).
*   Gemini AI responses adapt to the current mood personality.
*   Mood is auto-detected — no configuration needed.

### 🔔 Proactive Smart Alerts (Siri Suggestions)
Kira now **proactively speaks up** with useful suggestions without being asked!

*   **🌅 Morning Briefing (6–11 AM):** Automatically tells you the day, date, weather, and any festival.
*   **⏰ Break Reminders:** Every 2 hours of continuous usage, Kira gently reminds you to take a break.
*   **🪁 Festival & Special Day Wishes:** Auto-detects **18 Indian festivals** (Diwali, Holi, Uttarayan, Republic Day, etc.) and wishes you!
*   **🌙 Late Night Wrap-up:** At 11 PM+, Kira suggests wrapping up and getting rest.
*   *Toggle Commands:* `"Enable alerts"`, `"Disable alerts"`
    *   Gujarati: `"Alerts chalu kar"`, `"Alerts bandh kar"`

### 🗣️ Full Multi-Language Support (Hindi + Gujarati)
Kira now fully understands and responds in **Hindi and Gujarati** — not just English!

*   **200+ Voice Commands:** 80+ Hindi and 80+ Gujarati romanized voice commands across all features.
*   **3-Language Speech Fallback:** If Kira doesn't understand in English, it automatically tries Hindi, then Gujarati.
*   **Language Switch Commands (Fully Supported in Script & Speech):**
    *   **To English:**
        *   English: `"Switch to English"`, `"English mode"`
        *   Gujarati (Romanized/Script): `"English ma bol"`, `"English mode chalu kar"`, `"અંગ્રેજીમાં બોલો"`, `"અંગ્રેજી મોડ"`
        *   Hindi (Romanized/Script): `"English mein bolo"`, `"English mode chalu karo"`, `"अंग्रेजी में बोलो"`, `"इंग्लिश मोड"`
    *   **To Hindi:**
        *   English: `"Switch to Hindi"`, `"Hindi mode"`
        *   Gujarati (Romanized/Script): `"Hindi ma bol"`, `"Hindi mode chalu kar"`, `"હિન્દીમાં બોલો"`, `"હિન્દી મોડ"`
        *   Hindi (Romanized/Script): `"Hindi mein bolo"`, `"Hindi mode chalu karo"`, `"हिंदी में बोलो"`, `"हिंदी मोड"`
    *   **To Gujarati:**
        *   English: `"Switch to Gujarati"`, `"Gujarati mode"`
        *   Gujarati (Romanized/Script): `"Gujarati ma bol"`, `"Gujarati mode chalu kar"`, `"ગુજરાતીમાં બોલો"`, `"ગુજરાતી મોડ"`
        *   Hindi (Romanized/Script): `"Gujarati mein bolo"`, `"Gujarati mode chalu karo"`, `"गुजराती में बोलो"`, `"Gujarati मोड"`
*   **Auto Language Detection:** Detects romanized Hindi/Gujarati words and responds accordingly.
*   **AI Language Matching:** When you speak Hindi/Gujarati to Gemini AI, it replies in the same language.

**Sample Gujarati Commands:**
| Gujarati | English Equivalent |
|----------|--------------------|
| `"Ketla vage che"` | What time is it? |
| `"Havaman kevo che"` | How's the weather? |
| `"Geet vajav"` | Play music |
| `"Screenshot le"` | Take screenshot |
| `"AI ne puchh"` | Ask AI |

**Sample Hindi Commands:**
| Hindi | English Equivalent |
|-------|--------------------|
| `"Samay kya hai"` | What time is it? |
| `"Mausam batao"` | Tell me the weather |
| `"Gaana bajao"` | Play music |
| `"Note likho"` | Take a note |
| `"AI se pucho"` | Ask AI |

---

## 🌟 Core Features & Functionalities

### 1. 🎤 Continuous Voice & Wake Word Activation
*   **Standby Mode:** Kira silently listens in the background. Just say **"Kira"** or **"Hey Kira"** to wake him up.
*   **Continuous Listening:** No need to say "Hey Kira" for every subsequent command! Kira stays active and keeps listening for multiple commands.
*   **Smart Timeout:** If you don't speak for 30 seconds, Kira returns to Standby Mode automatically. You can also manually say `"Sleep"` or `"Go to standby"`.

### 2. 🖥️ Smart Application & Window Control
*   **Dynamic App Launcher:** Scans your Windows Start Menu to dynamically open *any* installed application.
    *   *Command:* `"Open Google Chrome"`, `"Open WhatsApp"`
    *   *Hindi:* `"Chrome kholo"`, *Gujarati:* `"Chrome khol"`
*   **Smart Window Title Closer:** Closes applications gracefully by searching for visible Window Titles (Alt+F4 style). It seamlessly closes UWP/Store apps (like Settings or Calculator) and falls back to background process termination if needed.
    *   *Command:* `"Close Chrome"`, `"Close Settings"`, `"Close Calculator"`
    *   *Hindi:* `"Chrome band karo"`, *Gujarati:* `"Chrome band kar"`

### 3. 🧠 Dual AI Engine (Online Gemini & Offline Ollama)
*   **Online Mode (Gemini):** Ask complex questions and get intelligent answers powered by Gemini 2.5 Flash. Now enhanced with **conversation context** and **mood-aware personality**.
    *   *Command:* `"Ask AI [your question]"` or `"Ask Kira [your question]"`
    *   *Hindi:* `"AI se pucho [question]"`, *Gujarati:* `"AI ne puchh [question]"`
*   **Offline Mode (Ollama):** Switch to 100% offline, local execution using **Ollama (Llama3)**. No internet required!
    *   *Commands:* `"Switch to offline AI"`, `"Switch to online AI"`, followed by `"Ask AI [your question]"` (e.g. *"Ask AI what is Python"*) to ask questions offline!

### 4. 🛡️ Face Detection Auto-Lock & Remote CCTV Guard
*   **Webcam Security (Local Auto-Lock):** When security mode is active, Kira monitors your webcam in the background. If you step away and no authorized face is detected for 5 seconds, Kira instantly locks your Windows PC (`Win + L`) to secure your data.
    *   *Setup:* Automatically triggered on first run to enroll your face, or you can place photos of your face in the `~/.kira/security/` directory.
    *   *Commands:* `"Enable security mode"`, `"Disable security mode"`
    *   *Hindi:* `"Security on karo"`, *Gujarati:* `"Security chalu kar"`
*   **Remote CCTV Stream & Guard (CCTV Mode):** View your PC's live webcam feed directly from your phone's companion portal. Enable Guard Mode to monitor your room remotely. If any motion or unauthorized face is detected, Kira takes an intruder snapshot, saves it to `~/.kira/security/alerts/`, and instantly logs it with a clickable thumbnail on your phone!

### 5. 🎯 Smart Screen Text Clicking (OCR)
*   **Voice Mouse Control:** Tell Kira to click any text visible on your screen. Kira takes a screenshot, scans it using EasyOCR, finds the matching text, and moves the mouse to click it automatically.
    *   *Commands:* `"Click [text]"`, `"Click on [text]"`

### 6. 🚨 Proactive Monitoring & Custom Macros
*   **System Alerts:** A background thread monitors your PC and proactively speaks warnings if CPU usage exceeds 90% or battery drops below 20%.
*   **Work Environment Macro:** Automatically sets up your workspace by opening VS Code, Chrome, and Terminal all at once.
    *   *Commands:* `"Set up my work environment"`, `"Start my work"`
    *   *Hindi:* `"Kaam shuru karo"`, *Gujarati:* `"Kaam sharu kar"`

### 7. 📱 WhatsApp Desktop Integration
*   **Hands-Free Messaging:** Send WhatsApp messages completely via voice. Supports contact lookup from CSV.
    *   *Command:* `"Send a WhatsApp message"`
    *   *Hindi:* `"WhatsApp pe message bhejo"`, *Gujarati:* `"WhatsApp par message mokl"`

### 8. 🎬 YouTube & Media Controls
*   **Direct YouTube Playback:** Plays videos directly.
    *   *Command:* `"Play [Song/Video Name] on YouTube"`
*   **YouTube Video Downloader:** Downloads YouTube videos to your PC.
    *   *Command:* Copy a link, then say `"Download this YouTube video"`
*   **Global Media Controls:** Pause/play/skip any running media (Spotify, YouTube, etc.).
    *   *Commands:* `"Pause the music"`, `"Volume up"`, `"Next track"`
    *   *Hindi:* `"Gaana roko"`, `"Awaaz badhao"`, `"Agla gaana"`

### 9. 👁️ Screen Vision (Gemini AI)
*   **AI-Powered Screen Reading:** Kira takes a screenshot of your PC and uses Gemini Vision AI to describe exactly what's on your screen.
    *   *Command:* `"What is on my screen?"` or `"Read my screen"`
    *   *Hindi:* `"Screen kya hai"`, *Gujarati:* `"Screen shu che"`

### 10. 10. ⌨️ Dictation / Voice Typing Mode
*   **Hands-Free Typing:** Enter a special mode where everything you say gets typed on your keyboard automatically (works inside Word, Notepad, Chrome, etc.).
    *   *Activate:* `"Start typing mode"` or `"Dictation mode"`
    *   *Deactivate:* `"Stop typing"`

### 11. 🔋 System Health & Diagnostics
*   **Full PC Status Report:** Get a voice report of your battery, CPU, RAM, and disk usage.
    *   *Command:* `"System status"`, `"How is my battery?"`
    *   *Hindi:* `"Battery kitni hai"`, *Gujarati:* `"Battery ketli che"`

### 12. 📍 Advanced Geolocation & Weather
*   **Exact Location:** Finds your exact street address using Nominatim Maps API.
    *   *Command:* `"Where am I?"`
    *   *Hindi:* `"Main kahan hoon"`, *Gujarati:* `"Hu kyaan chhu"`
*   **Weather Updates:**
    *   *Command:* `"What is the weather in [City]?"`
    *   *Hindi:* `"Mausam batao"`, *Gujarati:* `"Havaman kevo che"`

### 13. 📖 PDF & Productivity Tools
*   **Read PDF Aloud:** Reads any PDF in your Downloads folder.
    *   *Command:* `"Read my PDF"`
    *   *Hindi:* `"PDF padho"`, *Gujarati:* `"PDF vanch"`
*   **Language Translation:**
    *   *Command:* `"Translate [phrase] to [language]"`
    *   *Hindi:* `"Anuvad karo"`, *Gujarati:* `"Bhashantar kar"`
*   **Take Notes & Set Reminders:**
    *   *Command:* `"Take a note"`, `"Set a reminder"`
    *   *Hindi:* `"Note likho"`, *Gujarati:* `"Note lakh"`

### 14. 💻 Hardware & Power Controls
*   **Screen Brightness Control:**
    *   *Command:* `"Set brightness to 50%"`, `"Increase brightness"`
    *   *Hindi:* `"Brightness badhao"`, *Gujarati:* `"Brightness vadhaar"`
*   **System Power Options:**
    *   *Command:* `"Shutdown the PC"`, `"Restart the computer"`

---

## 🛠️ Step-by-Step Developer & System Commands

Follow these commands step-by-step to set up, run, test, and package Kira on your PC.

### Step 1: Install Python & Build Tools
1. Download and install **Python 3.11** from the official website (ensure "Add Python to PATH" is checked during installation).
2. Install **Visual Studio C++ Build Tools** (needed to compile the face-recognition library `dlib`):
   - Choose the "Desktop development with C++" workload during setup.

### Step 2: Install Required Libraries
Open your terminal/command prompt and run the following commands to install all Python dependencies:
```bash
# Upgrade pip to latest version
python -m pip install --upgrade pip

# Uninstall typing module to prevent PyInstaller packaging conflicts
pip uninstall -y typing

# Install all core libraries
pip install pyttsx3 wikipedia-api PyAutoGUI SpeechRecognition pyjokes requests PyQt5 psutil pyperclip google-genai deep-translator python-dotenv screen-brightness-control PyPDF2 dlib face-recognition opencv-python easyocr fastapi uvicorn
```

### Step 3: Configure Environment Variables
Create a file named `.env` in the root of your project folder and configure it as follows:
```env
GEMINI_API_KEY=your_gemini_api_key_here
NEWS_API_KEY=your_news_api_key_here
KIRA_PORT=8000
FACE_TOLERANCE=0.48
FACE_ENROLLMENT_SAMPLES=10

# Speech Rates
KIRA_SPEECH_RATE=+20%
KIRA_OFFLINE_SPEECH_RATE=190
```

### Step 4: Run Kira Locally (Developer Mode)
To run Kira in developer/source mode:
1. Launch the PyQt5 GUI app using Python:
   ```bash
   python gui.py
   ```
2. Once the GUI window opens, click **⚡ INITIALIZE** to start the voice loops.
3. The system will start a FastAPI server locally and automatically launch a secure SSH reverse tunnel using **localhost.run** (starts instantly with no warning page).
4. Look at the terminal or GUI console logs. You will see connection details like:
   ```text
   ==============================================
   [Mobile Portal]: URL: https://xxxx.lhr.life
   [Mobile Portal]: Connection PIN: 1234
   ==============================================
   ```
5. **How to Connect on Mobile Phone:**
   - Open your mobile browser and go to the printed URL (e.g. `https://xxxx.lhr.life`).
   - Enter the **Connection PIN** to authenticate.
   - Switch to the **"Camera"** navigation tab on the companion portal.
   - Click **Start Stream** to view the live webcam feed of your PC on your phone.
   - Click **Enable Guard** to activate remote room monitoring. If any unrecognized person or motion is detected, Kira will save a snapshot to `~/.kira/security/alerts/` and instantly post an alert logs list with clickable image thumbnails to your phone!

---

### Step 5: Run Automated Tests
You can run these scripts to test specific parts of the system:
```bash
# Test 1: Mobile Companion Portal API endpoints
python scratch/test_mobile_api.py

# Test 2: Voice routing and follow-up interaction loops
python scratch/test_interactive_routing.py

# Test 3: Face Enrollment Wizard and security fallbacks
python scratch/test_security_enrollment.py
```

---

### Step 6: Compile to Standalone Single-File Executable (`Kira.exe`)
To build a protected single-file executable for distribution that embeds your API keys, embeds the HTML templates, and runs without python dependencies:
```bash
# Compile using PyInstaller (excludes torch to save space)
pyinstaller --onefile --windowed --name "Kira" --add-data "Kira;Kira" --exclude-module torch gui.py
```
*The resulting file **`Kira.exe`** will be generated inside the `dist/` directory. You can distribute this single file directly. When the recipient runs it on another computer, they will be automatically prompted by the Face Enrollment Wizard to register their face.*

---

### Step 7: Auto-Start on Windows Boot (Hands-Free Setup)
Kira can launch automatically when Windows boots:
* **To Enable:** The startup shortcut is automatically created in your Windows Startup directory (`shell:startup`).
* **To Disable:** Press `Win+R`, type `shell:startup`, hit Enter, and delete the **"Kira Voice Assistant"** shortcut.

---

## 🗣️ Full Command Reference — Multi-Language

Kira supports more than **200+ voice commands** across English, Hindi, and Gujarati.

### 1. Core Voice Commands (English)

| Category | Voice Command | Description / Example |
|----------|---------------|-----------------------|
| **Wake Up** | `"Kira"`, `"Hey Kira"` | Activates Kira from Standby mode |
| **Standby** | `"Sleep"`, `"Go to standby"`, `"Stop listening"` | Puts Kira back into Standby mode |
| **System Info** | `"System status"`, `"How is my battery?"` | Reports CPU, RAM, Disk, and Battery level |
| **Hardware** | `"Set brightness to 50%"`, `"Increase volume"`, `"Mute"` | Controls monitor brightness and audio volume |
| **App Control** | `"Open Google Chrome"`, `"Close Chrome"`, `"Close Settings"` | Launches installed apps or closes active windows |
| **Web Search** | `"Search Wikipedia for Python"`, `"Search Google for cats"` | Opens a browser with search results |
| **Entertainment** | `"Play [Song] on YouTube"`, `"Download this YouTube video"` | Controls media playback and downloads videos |
| **Productivity** | `"Take a note"`, `"Read my PDF"`, `"Translate hello to French"` | Dictates text, reads PDF files, or translates languages |
| **Smart Vision** | `"What is on my screen?"`, `"Read my screen"`, `"Click [Text]"` | Vision AI captures/reads screen or clicks text via OCR |
| **WhatsApp** | `"Send a WhatsApp message"` | Performs voice-guided WhatsApp messaging |
| **Security Mode** | `"Enable security mode"`, `"Disable security mode"` | Activates webcam-based face recognition locking |
| **AI Mode** | `"Ask AI [your question]"`, `"Switch to offline AI"` | Asks Gemini (online) or Llama3 (offline) a question |
| **Typing Mode** | `"Start typing mode"`, `"Stop typing"` | Enters dictation mode, typing everything you say |
| **Shutdown** | `"Shutdown the PC"`, `"Restart the computer"` | Powers off or restarts Windows |

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

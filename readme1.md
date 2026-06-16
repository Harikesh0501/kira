# J.A.R.V.I.S — Advanced Desktop Voice Assistant & Companion Portal

J.A.R.V.I.S is a highly capable, AI-powered desktop voice assistant and mobile companion portal. It features a futuristic terminal user interface and provides complete hands-free control over your Windows PC — just like Siri, but for your Desktop.

Now with conversational memory, mood-based personality, proactive smart alerts, and full Hindi + Gujarati voice support!

---

## ✨ Features & Functionalities

### 🧠 Conversational Memory & Context Awareness
- **Follow-up Queries:** Kira remembers previous commands. Say *"What's the weather in Mumbai?"* and then just *"How about Delhi?"* — Kira automatically understands the context.
- **Rolling Context:** Stores the last 10 interactions, injecting recent conversation history into Gemini AI for smarter responses.

### 😄 Mood-Based Personality Engine
- Kira dynamically changes its tone and greetings based on the time of day:
  - **Cheerful** (5 AM – 12 PM)
  - **Focused** (12 PM – 5 PM)
  - **Relaxed** (5 PM – 10 PM)
  - **Sleepy** (10 PM – 5 AM)

### 🔔 Proactive Smart Alerts (Siri Suggestions)
- **Morning Briefing:** Automatically reports day, weather, and Indian festivals between 6–11 AM.
- **Health Reminders:** Suggests taking a break every 2 hours of continuous PC usage.
- **Late Night Wrap-up:** Suggests wrapping up and getting rest after 11 PM.

### 📱 Mobile Companion Portal & Auto-Login
- **FastAPI Remote Portal:** Access PC files, view metrics, and send voice commands remotely from your mobile phone.
- **Zero-Password Auto-Login:** Scan the QR Code displayed on the PyQt5 panel to authorize and load the portal instantly without typing a PIN.
- **Auto-Notifications:** Automatically sends the login link directly to the owner's WhatsApp on PC startup.

### 🛡️ Face Detection Auto-Lock & Remote CCTV Guard
- **Local Auto-Lock:** Monitors the webcam. If you step away for 5 seconds, it locks your PC (`Win + L`) to protect your data.
- **Remote CCTV Stream:** View your PC's webcam feed in real time on your phone.
- **Remote Guard Mode:** Detects motion or unrecognized faces, logs alerts on your phone with clickable intruder image thumbnails.

### 🎯 Screen Text Clicking (OCR) & Screen Vision
- **Voice Click:** Click any text visible on your screen by saying `"Click [Text]"`.
- **Screen Reading:** Say `"Read my screen"` to get a Gemini-powered visual explanation of what's currently active.

### 🖥️ 3-Layered Autonomous Desktop GUI Controller
- **Vision-Action Automation Loop**: Executes multi-step GUI workflows autonomously (e.g. *"KIRA, open Chrome, search for fitness tips, and save them"*).
- **Google Search to Notepad Workflow**: Automates opening Chrome, performing a search, selecting and copying all page text, opening Notepad, pasting the text, and saving it as a `.txt` file directly onto your Desktop (e.g., *"search google for fitness tips and save to notepad"*).
  



- **3-Layered Failover Pipeline**:
  - **Layer 1 (Local OCR)**: Instant local text search via EasyOCR (0 tokens, <100ms).
  - **Layer 2 (Local Ollama Vision)**: Fallback search using a local multimodal model (e.g., `llava`) via Ollama (0 tokens, 1-2s).
  - **Layer 3 (Cloud Gemini Vision)**: Ground-truth fallback using cloud-based Gemini Vision API for complex pages (Standard image tokens, 1.5s).
- **Commands & Control Triggers**:
  - `"click [element name]"`: Left click on any button, icon, or text.
  - `"find [element name]"`: Locates the element on the screen and moves the cursor to it.
  - `"type [text]"`: Types text at the current cursor position.
  - `"press [key]"`: Presses keyboard keys (e.g. `enter`, `tab`, `backspace`).
  - `"double click [app]"`: Opens desktop shortcuts or apps.
- **Fail-Safe Emergency Stop**: Move your mouse pointer to any of the 4 screen corners to instantly interrupt the automation.

### 📂 Remote File Manager
- **File Explorer:** Browse directories, download files from PC to phone, or launch media files directly on your PC screen from your phone.

### 🎬 Media & YouTube Controls
- **YouTube Playback:** Plays videos directly on YouTube.
- **Video Downloader:** Copy a link and say `"Download this YouTube video"`.
- **Global Media Controls:** Play, pause, skip tracks, or adjust volume via voice.
---

## 🤖 KIRA Multi-Agent Autonomous Workspace System

KIRA features an autonomous multi-agent hierarchy that works directly within your development workspace. The system orchestrates multiple specialized subagents, routing commands dynamically based on your intent.

### 👥 KIRA Agents & Roles

1. **Workspace Memory Manager:** Tracks the active workspace directory, launch setups, and modified file sets in `~/.jarvis/active_project.json`.
   - *Commands:* `"set active project"`, `"resume yesterday's work"`
2. **Coder Agent (Self-Writing):** Searches, scores, and edits files. Employs GUI key-automation to write code via VS Code/Cursor inline AI, with direct file system I/O fallbacks.
   - *Commands:* `"tell coder agent to [instruction] in [file]"`
3. **Runner & QA Agent (Auto-Debugging):** Auto-detects project setups (Python, Django, Node, React) to launch dev servers in background threads, scans output streams for stack traces, and runs self-healing patch loops. Automatically runs Selenium/EasyOCR page-clicking tests.
   - *Commands:* `"run my project"`, `"start dev server"`, `"stop project"`, `"terminate dev server"`, `"run website test"`, `"test webpage"`
4. **Researcher Agent:** Scrapes pages and compiles Markdown analytics summaries. Automatically converts topics to search queries via Wikipedia/Google Search if a URL is omitted.
   - *Commands:* `"research [topic/url]"`, `"scrape website"`
5. **Web Builder Agent:** Autonomously structures checklists and commands the Coder Agent to build complete responsive websites inside the active workspace.
   - *Commands:* `"build website [topic]"`, `"create website [topic]"` (Interactively prompts for **HTML, React, or Next.js** frameworks)
6. **System Admin Agent:** Automates Windows processes, registers scheduler backups, terminates lagging processes, and performs disk cleanup.
   - *Commands:* `"cleanup system temp"`, `"clean system"`, `"find duplicate files"`, `"check duplicates"`, `"terminate lagging tasks"`, `"clear high cpu"`, `"schedule daily backup"`
7. **Office Document Agent:** Reads Excel/CSV spreadsheets, constructs analytics plots using Matplotlib, and compiles PDF reports via ReportLab.
   - *Commands:* `"compile report from spreadsheet"`
8. **Media Agent:** Orchestrates yt-dlp downloading, extracts audio streams to MP3, runs NVENC GPU transcodes, and applies ID3 metadata tags.
   - *Commands:* `"download playlist [url]"`, `"download video [url]"`, `"extract audio from video"`, `"convert video to mp3"`, `"compress video with gpu"`, `"gpu compress video"`, `"tag audio metadata"`, `"apply metadata tags"`
9. **VS Code Problems Solver:** Automates VS Code/Cursor diagnostics extraction to locate active linter/syntax errors and apply automatic patches.
   - *Commands:* `"solve problems"`, `"fix problems"`, `"fix editor errors"`, `"check problems"`

### 🗣️ Multi-Agent Voice Commands Reference

These workspace and agent-specific commands are executed relative to your active workspace path:

| Agent Voice Command | Targeted Agent / Subsystem | Description |
|---|---|---|
| **"set active project"** | `Workspace Memory` | Sets the current folder as the active workspace. |
| **"resume yesterday's work"** | `Workspace Memory` | Loads the last active project state. |
| **"tell coder agent to [instruction] in [file]"** | `Coder Agent` | Commands the Coder Agent to edit/write code in a specific file. |
| **"run my project" / "start dev server"** | `Runner & QA Agent` | Launches the project server in a background thread. |
| **"stop project" / "terminate dev server"** | `Runner & QA Agent` | Stops the running project server. |
| **"run website test" / "test webpage"** | `Runner & QA Agent` | Performs automated Selenium/OCR click testing on localhost. |
| **"build website [topic]" / "create website [topic]"** | `Web Builder Agent` | Autonomously plans and builds a landing page in the workspace. |
| **"research [topic/url]" / "scrape website"** | `Researcher Agent` | Resolves a topic or URL and compiles a research report in notes. |
| **"cleanup system temp" / "clean system"** | `System Admin Agent` | Clears system temp files and prints saved storage metrics. |
| **"find duplicate files" / "check duplicates"** | `System Admin Agent` | Scans the active workspace directory for duplicates using MD5. |
| **"terminate lagging tasks" / "clear high cpu"** | `System Admin Agent` | Kills resource-hogging background tasks. |
| **"schedule daily backup"** | `System Admin Agent` | Registers a daily project backup job in Windows Task Scheduler. |
| **"compile report from spreadsheet"** | `Office Document Agent` | Prompts for a spreadsheet, generates charts, and compiles a PDF. |
| **"download playlist [url]" / "download video [url]"** | `Media Agent` | Downloads videos or playlists directly via yt-dlp. |
| **"extract audio from video" / "convert video to mp3"** | `Media Agent` | Extracts audio streams to MP3 format. |
| **"compress video with gpu" / "gpu compress video"** | `Media Agent` | Compresses video streams using NVENC GPU codecs. |
| **"tag audio metadata" / "apply metadata tags"** | `Media Agent` | Applies ID3 tag metadata (title, artist, album) to an MP3 file. |
| **"solve problems" / "fix editor errors"** | `VS Code Problems Solver` | Gathers active errors from VS Code diagnostics and patches files. |
| **"fix problems" / "check problems"** | `VS Code Problems Solver` | Scans active problems in editor and applies fixes. |

---

## 🗣️ Full Command Reference — Multi-Language

Kira supports more than **250+ voice commands** across English, Hindi, and Gujarati. Below is the exhaustive list of every supported voice command.

---

### 1. Language Mode Switching Triggers (All Languages/Scripts)
Use these commands to change Kira's active voice response language:

| Voice Command Trigger | Action / Intent |
|---|---|
| **"english chalu kar"** | `SWITCH TO ENGLISH` |
| **"english karo"** | `SWITCH TO ENGLISH` |
| **"english ma bol"** | `SWITCH TO ENGLISH` |
| **"english ma bol"** | `SWITCH TO ENGLISH` |
| **"english mein bolo"** | `SWITCH TO ENGLISH` |
| **"english mode"** | `SWITCH TO ENGLISH` |
| **"switch to english"** | `SWITCH TO ENGLISH` |
| **"अंग्रेजी में बोलो"** | `SWITCH TO ENGLISH` |
| **"अंग्रेजी मोड"** | `SWITCH TO ENGLISH` |
| **"इंग्लिश में बोलो"** | `SWITCH TO ENGLISH` |
| **"इंग्लिश मोड"** | `SWITCH TO ENGLISH` |
| **"स्विच टू इंग्लिश"** | `SWITCH TO ENGLISH` |
| **"અંગ્રેજી કરો"** | `SWITCH TO ENGLISH` |
| **"અંગ્રેજી મોડ"** | `SWITCH TO ENGLISH` |
| **"અંગ્રેજીમાં બોલો"** | `SWITCH TO ENGLISH` |
| **"સ્વિચ ટુ અંગ્રેજી"** | `SWITCH TO ENGLISH` |
| **"gujarati chalu kar"** | `SWITCH TO GUJARATI` |
| **"gujarati karo"** | `SWITCH TO GUJARATI` |
| **"gujarati ma bol"** | `SWITCH TO GUJARATI` |
| **"gujarati ma bol"** | `SWITCH TO GUJARATI` |
| **"gujarati mein bolo"** | `SWITCH TO GUJARATI` |
| **"gujarati mode"** | `SWITCH TO GUJARATI` |
| **"switch to gujarati"** | `SWITCH TO GUJARATI` |
| **"गुजराती में बोलो"** | `SWITCH TO GUJARATI` |
| **"गुजराती मोड"** | `SWITCH TO GUJARATI` |
| **"स्विच टू गुजराती"** | `SWITCH TO GUJARATI` |
| **"ગુજરાતી કરો"** | `SWITCH TO GUJARATI` |
| **"ગુજરાતી મોડ"** | `SWITCH TO GUJARATI` |
| **"ગુજરાતીમાં બોલો"** | `SWITCH TO GUJARATI` |
| **"સ્વિચ ટુ ગુજરાતી"** | `SWITCH TO GUJARATI` |
| **"hindi chalu kar"** | `SWITCH TO HINDI` |
| **"hindi karo"** | `SWITCH TO HINDI` |
| **"hindi ma bol"** | `SWITCH TO HINDI` |
| **"hindi ma bol"** | `SWITCH TO HINDI` |
| **"hindi mein bolo"** | `SWITCH TO HINDI` |
| **"hindi mode"** | `SWITCH TO HINDI` |
| **"switch to hindi"** | `SWITCH TO HINDI` |
| **"स्विच टू हिंदी"** | `SWITCH TO HINDI` |
| **"हिंदी करो"** | `SWITCH TO HINDI` |
| **"हिंदी में बोलो"** | `SWITCH TO HINDI` |
| **"हिंदी मोड"** | `SWITCH TO HINDI` |
| **"સ્વિચ ટુ હિન્દી"** | `SWITCH TO HINDI` |
| **"હિન્દી કરો"** | `SWITCH TO HINDI` |
| **"હિન્દી મોડ"** | `SWITCH TO HINDI` |
| **"હિન્દીમાં બોલો"** | `SWITCH TO HINDI` |
| **"work mode chalu kar"** | `WORK MODE` |
| **"work mode chalu karo"** | `WORK MODE` |

---

### 2. Core English Voice Commands

| English Voice Command Trigger | Action / Intent |
|---|---|
| **"ask ai [prompt] / ask kira [prompt]"** | `AI_CHAT` |
| **"battery"** | `BATTERY` |
| **"brightness"** | `BRIGHTNESS` |
| **"calculate / math / plus / minus / multiply / divide"** | `CALCULATOR` |
| **"change name"** | `CHANGE_NAME` |
| **"clipboard / paste"** | `CLIPBOARD` |
| **"close [app_name]"** | `CLOSE_APP` |
| **"close this app / close the app / close current window"** | `CLOSE_CURRENT_APP` |
| **"date"** | `DATE` |
| **"system status / diagnostics / system health"** | `DIAGNOSTICS` |
| **"typing mode / start typing / dictation"** | `DICTATION_MODE` |
| **"meaning of [word] / dictionary"** | `DICTIONARY` |
| **"fact / interesting / random fact"** | `FACT` |
| **"google / search google for [query] / search on google for [query]"** | `GOOGLE_SEARCH` |
| **"search google for [query] and save to notepad / save on desktop"** | `GOOGLE_SEARCH_TO_NOTEPAD` |
| **"joke / funny"** | `JOKE` |
| **"next track / next song / skip song"** | `MEDIA_NEXT` |
| **"pause [music/song/media/video]"** | `MEDIA_PAUSE` |
| **"previous track / previous song / back song"** | `MEDIA_PREVIOUS` |
| **"resume [music/song/media/video]"** | `MEDIA_RESUME` |
| **"offline mode / offline ai / switch to offline"** | `OFFLINE_AI` |
| **"online mode / online ai / switch to online"** | `ONLINE_AI` |
| **"open [app_name]"** | `OPEN_APP` |
| **"read my notes / show my notes / my notes"** | `READ_NOTES` |
| **"read pdf"** | `READ_PDF` |
| **"screen take / photo / lo / le / lai / capture"** | `SCREENSHOT` |
| **"screenshot"** | `SCREENSHOT` |
| **"look at my screen"** | `SCREEN_VISION` |
| **"read my screen"** | `SCREEN_VISION` |
| **"screen dekho"** | `SCREEN_VISION` |
| **"screen jo"** | `SCREEN_VISION` |
| **"screen kya hai"** | `SCREEN_VISION` |
| **"screen see"** | `SCREEN_VISION` |
| **"screen shu che"** | `SCREEN_VISION` |
| **"what is on my screen"** | `SCREEN_VISION` |
| **"disable security / stop security mode / turn off security"** | `SECURITY_OFF` |
| **"enable security / start security mode / turn on security"** | `SECURITY_ON` |
| **"light / fan / smart home / device [on/off]"** | `SMART_HOME` |
| **"system info / system information / cpu / ram"** | `SYSTEM_INFO` |
| **"shutdown / restart pc / restart laptop / restart computer / cancel shutdown / restart"** | `SYSTEM_POWER` |
| **"take a note / write a note / note down / save a note"** | `TAKE_NOTE` |
| **"time"** | `TIME` |
| **"volume / mute / unmute / louder / silent"** | `VOLUME` |
| **"weather"** | `WEATHER` |
| **"whatsapp [contact] / message [contact]"** | `WHATSAPP` |
| **"wikipedia [query] / wiki [query]"** | `WIKIPEDIA` |
| **"set up my work environment / start my work / work mode"** | `WORK_ENVIRONMENT` |
| **"email [contact] / mail [contact]"** | `SEND_EMAIL` | Composes and sends a Gmail email over SMTP to a contact (or prompts for recipient name/email, draft prompt, and confirmation). |
| **"summarize email" / "summarize my last email"** | `SUMMARIZE_EMAIL` | Fetches the latest unread email, extracts its body and attachments, and reads/prints a 3-point AI summary. |
| **"summarize file" / "summarize document"** | `SUMMARIZE_FILE` | Prompts for a local document file path (PDF/DOCX/TXT) and reads/prints a 3-point AI summary. |
| **"list my unread email" / "unread email list"** | `LIST_UNREAD_EMAILS` | Fetches up to 25 unread emails, speaks the details of the latest 5, and saves all 25 to a text file at `~/.jarvis/unread_emails_list.txt`. |

---

### 3. Full Hindi Voice Commands (90+ Triggers)
Speak these commands in Romanized Hindi or Devanagari Script:

<details>
<summary><b>Click to expand/collapse all Hindi commands</b></summary>

| Voice Command Trigger | Action / Intent |
|---|---|
| **"ai ne puchh"** | `ASK AI` |
| **"ai se pucho"** | `ASK AI` |
| **"question puchh"** | `ASK AI` |
| **"question pucho"** | `ASK AI` |
| **"saval puchh"** | `ASK AI` |
| **"sawaal pucho"** | `ASK AI` |
| **"kira ne puchh"** | `ASK KIRA` |
| **"kira se pucho"** | `ASK KIRA` |
| **"battery batao"** | `BATTERY` |
| **"battery batav"** | `BATTERY` |
| **"battery kitni bachi hai"** | `BATTERY` |
| **"battery kitni hai"** | `BATTERY` |
| **"charge kitna hai"** | `BATTERY` |
| **"brightness badhao"** | `BRIGHTNESS INCREASE` |
| **"alvida"** | `BYE` |
| **"bye bye"** | `BYE` |
| **"bye bye"** | `BYE` |
| **"chalo bye"** | `BYE` |
| **"theek hai bye"** | `BYE` |
| **"hisab lagao"** | `CALCULATE` |
| **"clipboard batav"** | `CLIPBOARD` |
| **"clipboard dikhao"** | `CLIPBOARD` |
| **"clipboard padho"** | `CLIPBOARD` |
| **"hatao"** | `CLOSE` |
| **"date batao"** | `DATE` |
| **"date batav"** | `DATE` |
| **"band ho jao"** | `EXIT` |
| **"bandh thai ja"** | `EXIT` |
| **"chutkula sunao"** | `JOKE` |
| **"funny koi vaat kah"** | `JOKE` |
| **"hansi ka kuch sunao"** | `JOKE` |
| **"hasa do"** | `JOKE` |
| **"kuch funny sunao"** | `JOKE` |
| **"mane hasav"** | `JOKE` |
| **"mazak sunao"** | `JOKE` |
| **"arth batav"** | `MEANING OF` |
| **"matlab batao"** | `MEANING OF` |
| **"matlab batav"** | `MEANING OF` |
| **"shabd ka arth"** | `MEANING OF` |
| **"shabd no arth"** | `MEANING OF` |
| **"meri location"** | `MY LOCATION` |
| **"aaj ki khabar"** | `NEWS` |
| **"aajni khabar"** | `NEWS` |
| **"headlines sunao"** | `NEWS` |
| **"khabar sambhlav"** | `NEWS` |
| **"khabar sunao"** | `NEWS` |
| **"news batao"** | `NEWS` |
| **"news batav"** | `NEWS` |
| **"news sambhlav"** | `NEWS` |
| **"news sunao"** | `NEWS` |
| **"samachar sambhlav"** | `NEWS` |
| **"samachar sunao"** | `NEWS` |
| **"agla gaana"** | `NEXT TRACK` |
| **"next gaana"** | `NEXT TRACK` |
| **"next geet"** | `NEXT TRACK` |
| **"khol"** | `OPEN` |
| **"kholao"** | `OPEN` |
| **"kholo"** | `OPEN` |
| **"gaana bajao"** | `PLAY MUSIC` |
| **"gaana chalao"** | `PLAY MUSIC` |
| **"gaana lagao"** | `PLAY MUSIC` |
| **"gaana suno"** | `PLAY MUSIC` |
| **"geet chalav"** | `PLAY MUSIC` |
| **"geet vajav"** | `PLAY MUSIC` |
| **"kuch music bajao"** | `PLAY MUSIC` |
| **"music chalav"** | `PLAY MUSIC` |
| **"music laga"** | `PLAY MUSIC` |
| **"music lagao"** | `PLAY MUSIC` |
| **"song bajao"** | `PLAY MUSIC` |
| **"pichla gaana"** | `PREVIOUS TRACK` |
| **"notes dikhao"** | `READ MY NOTES` |
| **"notes padhao"** | `READ MY NOTES` |
| **"notes sambhlav"** | `READ MY NOTES` |
| **"notes sunao"** | `READ MY NOTES` |
| **"screen dekho"** | `READ MY SCREEN` |
| **"pdf padhao"** | `READ PDF` |
| **"pdf padho"** | `READ PDF` |
| **"yaad dila dena"** | `REMIND` |
| **"yaad dilana"** | `REMIND` |
| **"reminder lagao"** | `REMINDER` |
| **"reminder mukh"** | `REMINDER` |
| **"photo lo screen ka"** | `SCREENSHOT` |
| **"screen capture lo"** | `SCREENSHOT` |
| **"screen no photo le"** | `SCREENSHOT` |
| **"screenshot lai le"** | `SCREENSHOT` |
| **"screenshot le"** | `SCREENSHOT` |
| **"screenshot lelo"** | `SCREENSHOT` |
| **"screenshot lo"** | `SCREENSHOT` |
| **"so jao"** | `SLEEP` |
| **"sui ja"** | `SLEEP` |
| **"ruk jao"** | `STANDBY` |
| **"standby par ja"** | `STANDBY` |
| **"standby pe jao"** | `STANDBY` |
| **"ubho reh"** | `STANDBY` |
| **"computer ni mahiti"** | `SYSTEM INFO` |
| **"pc info batao"** | `SYSTEM INFO` |
| **"system info batao"** | `SYSTEM INFO` |
| **"system info batav"** | `SYSTEM INFO` |
| **"system ni mahiti"** | `SYSTEM INFO` |
| **"likh lo"** | `TAKE A NOTE` |
| **"likhi le"** | `TAKE A NOTE` |
| **"note banao"** | `TAKE A NOTE` |
| **"note banav"** | `TAKE A NOTE` |
| **"note lakh"** | `TAKE A NOTE` |
| **"note likho"** | `TAKE A NOTE` |
| **"yaad rakh"** | `TAKE A NOTE` |
| **"yaad rakhho"** | `TAKE A NOTE` |
| **"abhi kya time hai"** | `TIME` |
| **"ketla vagyaa"** | `TIME` |
| **"kitne baje hai"** | `TIME` |
| **"kitne baje hain"** | `TIME` |
| **"kya time hua"** | `TIME` |
| **"samay"** | `TIME` |
| **"samay batao"** | `TIME` |
| **"samay batav"** | `TIME` |
| **"samay kya hai"** | `TIME` |
| **"time kya hai"** | `TIME` |
| **"awaaz badhao"** | `VOLUME UP` |
| **"volume badhao"** | `VOLUME UP` |
| **"aaj mausam kaisa hai"** | `WEATHER` |
| **"mausam"** | `WEATHER` |
| **"mausam batao"** | `WEATHER` |
| **"mausam kaisa hai"** | `WEATHER` |
| **"mausam kya hai"** | `WEATHER` |
| **"weather batao"** | `WEATHER` |
| **"weather batav"** | `WEATHER` |
| **"screen kya hai"** | `WHAT IS ON MY SCREEN` |
| **"kahan hoon main"** | `WHERE AM I` |
| **"main kahan hoon"** | `WHERE AM I` |
| **"meri jagah batao"** | `WHERE AM I` |
| **"email bhejo / mail bhejo"** | `SEND_EMAIL` | Sends email. |
| **"email summarize kar / email summary batao"** | `SUMMARIZE_EMAIL` | Summarizes the latest unread email. |
| **"file summarize kar / document summarize kar"** | `SUMMARIZE_FILE` | Summarizes a local document file. |
| **"unread email batao / unread email list"** | `LIST_UNREAD_EMAILS` | Lists and saves unread emails. |

</details>

---

### 4. Full Gujarati Voice Commands (90+ Triggers)
Speak these commands in Romanized Gujarati or Gujarati Script:

<details>
<summary><b>Click to expand/collapse all Gujarati commands</b></summary>

| Voice Command Trigger | Action / Intent |
|---|---|
| **"battery ketli bachi che"** | `BATTERY` |
| **"battery ketli che"** | `BATTERY` |
| **"charge ketlo che"** | `BATTERY` |
| **"brightness kam karo"** | `BRIGHTNESS DECREASE` |
| **"brightness kami kar"** | `BRIGHTNESS DECREASE` |
| **"screen dim kar"** | `BRIGHTNESS DECREASE` |
| **"screen dim karo"** | `BRIGHTNESS DECREASE` |
| **"brightness vadhaar"** | `BRIGHTNESS INCREASE` |
| **"screen bright kar"** | `BRIGHTNESS INCREASE` |
| **"screen bright karo"** | `BRIGHTNESS INCREASE` |
| **"aavjo"** | `BYE` |
| **"tya thik che bye"** | `BYE` |
| **"calculate kar"** | `CALCULATE` |
| **"calculate karo"** | `CALCULATE` |
| **"ganit kar"** | `CALCULATE` |
| **"ganit karo"** | `CALCULATE` |
| **"hisab kar"** | `CALCULATE` |
| **"jod karo"** | `CALCULATE` |
| **"clipboard vanch"** | `CLIPBOARD` |
| **"band kar"** | `CLOSE` |
| **"band kar do"** | `CLOSE` |
| **"band kardo"** | `CLOSE` |
| **"band karo"** | `CLOSE` |
| **"bandh kar"** | `CLOSE` |
| **"close kar"** | `CLOSE` |
| **"close karo"** | `CLOSE` |
| **"aaj ki tarikh"** | `DATE` |
| **"aaj kya tarikh hai"** | `DATE` |
| **"aaje shu tarikh che"** | `DATE` |
| **"aaje tarikh shu che"** | `DATE` |
| **"aajni tarikh"** | `DATE` |
| **"tarikh"** | `DATE` |
| **"tarikh batao"** | `DATE` |
| **"tarikh shu che"** | `DATE` |
| **"alerts bandh kar"** | `DISABLE ALERTS` |
| **"alerts off kar"** | `DISABLE ALERTS` |
| **"security bandh kar"** | `DISABLE SECURITY` |
| **"security off karo"** | `DISABLE SECURITY` |
| **"alerts chalu kar"** | `ENABLE ALERTS` |
| **"alerts on kar"** | `ENABLE ALERTS` |
| **"security chalu kar"** | `ENABLE SECURITY` |
| **"security on karo"** | `ENABLE SECURITY` |
| **"fan bandh kar"** | `FAN OFF` |
| **"fan off karo"** | `FAN OFF` |
| **"fan chalu kar"** | `FAN ON` |
| **"fan on karo"** | `FAN ON` |
| **"joke sambhlav"** | `JOKE` |
| **"joke sunao"** | `JOKE` |
| **"koi joke kah"** | `JOKE` |
| **"mazak kar"** | `JOKE` |
| **"light bandh kar"** | `LIGHT OFF` |
| **"light off karo"** | `LIGHT OFF` |
| **"light chalu kar"** | `LIGHT ON` |
| **"light on karo"** | `LIGHT ON` |
| **"avaj bandh kar"** | `MUTE` |
| **"chup karo"** | `MUTE` |
| **"mute kar"** | `MUTE` |
| **"mute karo"** | `MUTE` |
| **"mari location"** | `MY LOCATION` |
| **"aglu gaanu"** | `NEXT TRACK` |
| **"chalu kar"** | `OPEN` |
| **"chalu karo"** | `OPEN` |
| **"open kar"** | `OPEN` |
| **"open karo"** | `OPEN` |
| **"sharu kar"** | `OPEN` |
| **"shuru karo"** | `OPEN` |
| **"gaana roko"** | `PAUSE MUSIC` |
| **"gaanu rok"** | `PAUSE MUSIC` |
| **"gaanu vajav"** | `PLAY MUSIC` |
| **"koi gaanu vajav"** | `PLAY MUSIC` |
| **"paachlu gaanu"** | `PREVIOUS TRACK` |
| **"notes vanch"** | `READ MY NOTES` |
| **"screen jo"** | `READ MY SCREEN` |
| **"pdf vanch"** | `READ PDF` |
| **"pdf vanchav"** | `READ PDF` |
| **"yaad karav"** | `REMIND` |
| **"yaad karavje"** | `REMIND` |
| **"remind karo"** | `REMINDER` |
| **"dobara chalu karo"** | `RESTART` |
| **"farthi chalu kar"** | `RESTART` |
| **"restart kar"** | `RESTART` |
| **"restart karo"** | `RESTART` |
| **"gaana chalu karo"** | `RESUME MUSIC` |
| **"gaanu chalu kar"** | `RESUME MUSIC` |
| **"computer band karo"** | `SHUTDOWN` |
| **"computer bandh kar"** | `SHUTDOWN` |
| **"pc band karo"** | `SHUTDOWN` |
| **"pc bandh kar"** | `SHUTDOWN` |
| **"thoda aaram karo"** | `SLEEP` |
| **"thodi rest kar"** | `SLEEP` |
| **"kaam sharu kar"** | `START MY WORK` |
| **"kaam shuru karo"** | `START MY WORK` |
| **"computer ki jankari"** | `SYSTEM INFO` |
| **"system ki jankari"** | `SYSTEM INFO` |
| **"abhi samay shu che"** | `TIME` |
| **"ketla vage che"** | `TIME` |
| **"samay shu che"** | `TIME` |
| **"time shu che"** | `TIME` |
| **"anuvad karo"** | `TRANSLATE` |
| **"bhashantar kar"** | `TRANSLATE` |
| **"translate kar"** | `TRANSLATE` |
| **"translate karo"** | `TRANSLATE` |
| **"avaj kami kar"** | `VOLUME DOWN` |
| **"awaaz kam karo"** | `VOLUME DOWN` |
| **"dheere karo"** | `VOLUME DOWN` |
| **"volume kam karo"** | `VOLUME DOWN` |
| **"volume kami kar"** | `VOLUME DOWN` |
| **"avaj vadhaar"** | `VOLUME UP` |
| **"tez karo awaaz"** | `VOLUME UP` |
| **"volume vadhaar"** | `VOLUME UP` |
| **"aaje havaman kevo che"** | `WEATHER` |
| **"havaman batav"** | `WEATHER` |
| **"havaman kaisi che"** | `WEATHER` |
| **"havaman kevo che"** | `WEATHER` |
| **"havaman shu che"** | `WEATHER` |
| **"screen shu che"** | `WHAT IS ON MY SCREEN` |
| **"message bhejo"** | `WHATSAPP` |
| **"message mokl"** | `WHATSAPP` |
| **"whatsapp kar"** | `WHATSAPP` |
| **"whatsapp karo"** | `WHATSAPP` |
| **"whatsapp par message mokl"** | `WHATSAPP` |
| **"whatsapp pe message bhejo"** | `WHATSAPP` |
| **"hu kyaan chhu"** | `WHERE AM I` |
| **"kyaan chhu hu"** | `WHERE AM I` |
| **"mari jagya batav"** | `WHERE AM I` |
| **"email mokl / mail mokl"** | `SEND_EMAIL` | Sends email. |
| **"email summarize kar / email summary batav"** | `SUMMARIZE_EMAIL` | Summarizes the latest unread email. |
| **"file summarize kar / document summarize kar"** | `SUMMARIZE_FILE` | Summarizes a local document file. |
| **"unread email batav / unread email ni list"** | `LIST_UNREAD_EMAILS` | Lists and saves unread emails. |

</details>

## 🛑 How to Stop
- Click the **TERMINATE** button on the GUI.
- Or say: `"Go offline"`, `"Exit"`, `"Stop"`, `"Bye"`, or `"Go to sleep"`.
- Hindi: `"Band ho jao"`, `"Alvida"`
- Gujarati: `"Aavjo"`, `"Bandh thai ja"`
- Close the GUI window — Kira will properly shut down.

---

## 📊 Architecture Overview

```
┌────────────────────────────────────────────────────────┐
│                     gui.py (PyQt5)                     │
│              Futuristic Desktop Terminal               │
│ ├──────────────────────────────────────────────────────┤
│                    jarvis.py (Core)                    │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────┐ │
│  │ Wake Word │  │ Mood      │  │ Context   │  │ Remote│ │
│  │ Detection │  │ Engine    │  │ Memory    │  │ API  │ │
│  └───────────┘  └───────────┘  └───────────┘  └──────┘ │
│ ├──────────────────────────────────────────────────────┤
│               KIRA Autonomous Multi-Agents             │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────┐ │
│  │  Coder    │  │ Runner &  │  │ Web       │  │Media │ │
│  │  Agent    │  │ QA Agent  │  │ Builder   │  │Agent │ │
│  └───────────┘  └───────────┘  └───────────┘  └──────┘ │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────┐ │
│  │ Researcher│  │ SysAdmin  │  │ OfficeDoc │  │Vision│ │
│  │  Agent    │  │  Agent    │  │  Agent    │  │Agent │ │
│  └───────────┘  └───────────┘  └───────────┘  └──────┘ │
└────────────────────────────────────────────────────────┘
```

---
title: "用 Gemini Cli 管理笔记"
date: "2025-08-16"
tags: ["人工智能", "Gemini-CLI", "笔记管理"]
draft: false
---

Notion 很好，Obsidian 很好，其它的笔记软件也都很好。但是，我都不喜欢。所以，就有了这个使用 **Gemini CLI** ，通过其强大的文件处理和上下文管理功能实现笔记管理的尝试。具体步骤和方法如下：

### 1. **安装和设置 Gemini CLI**

在开始使用 Gemini CLI 管理笔记之前，需要确保已正确安装并配置：
- **安装**：根据，确保你有 Node.js（版本 18 或更高）。然后运行以下命令全局安装 Gemini CLI：[Read here...](https://proflead.dev/posts/gemini-cli-tutorial/)
  ```bash
  npm install -g @google/gemini-cli
  ```
  或者使用 npx 临时运行：
  ```bash
  npx https://github.com/google-gemini/gemini-cli
  ```
- **登录**：运行 `gemini` 命令后，使用 Google 账号登录，获取免费的 Gemini Code Assist 许可证（包括每天 1000 次请求和 100 万 token 的上下文窗口）。
- **设置 API 密钥**（可选）：从 Google AI Studio 获取 API 密钥，并设置：
  ```bash
  gemini config set api_key "YOUR_API_KEY_HERE"
  ```

### 2. **使用 GEMINI.md 作为笔记的持久化上下文**

GEMINI.md 文件是 Gemini CLI 的核心功能之一，可用于存储项目或笔记相关的上下文信息，适合长期管理和组织笔记。[Read here...](https://softwareplanetgroup.co.uk/best-practices-for-using-gemini-cli/)[](https://danicat.dev/posts/20250715-gemini-cli-system-prompt/)

- **创建 GEMINI.md 文件**：
  在你的项目根目录或全局目录（`~/.gemini/`）创建一个 `GEMINI.md` 文件，用于存储笔记的结构化信息。例如：
  ```markdown
  # Notes Management
  ## Purpose
  This file serves as a centralized hub for managing personal or project-related notes.

  ## Structure
  - **Daily Notes**: Stored in `notes/daily/`.
  - **Meeting Notes**: Stored in `notes/meetings/`.
  - **Ideas**: Stored in `notes/ideas/`.

  ## Guidelines
  - Use Markdown for formatting.
  - Prefix note files with dates (e.g., `2025-08-17-daily.md`).
  - Summarize key points at the top of each note.
  ```

- **加载和查看上下文**：
  使用以下命令查看当前加载的 GEMINI.md 内容：
  ```bash
  gemini /memory show
  ```
  如果需要更新上下文：
  ```bash
  gemini /memory refresh
  ```

- **作用**：GEMINI.md 提供了一个持久化的“记忆”文件，确保 Gemini CLI 在处理笔记时遵循你的结构和规则，避免生成不一致的内容。

### 3. **创建和编辑笔记**

Gemini CLI 支持直接操作文件，适合创建和编辑 Markdown 格式的笔记。[Read here...](https://www.hackingnote.com/en/cheatsheets/gemini/),[](https://proflead.dev/posts/gemini-cli-tutorial/)

- **创建新笔记**：
  使用 `write-file` 工具创建新笔记。例如：
  ```bash
  gemini -f notes/daily/2025-08-17-daily.md "Write a template for a daily note with sections for Tasks, Reflections, and Ideas."
  ```
  Gemini CLI 会生成一个 Markdown 文件（如 `2025-08-17-daily.md`），内容可能如下：
  ```markdown
  # Daily Note: 2025-08-17
  ## Tasks
  - [ ] Complete project documentation
  - [ ] Review meeting notes

  ## Reflections
  - What went well today?
  - Challenges encountered?

  ## Ideas
  - Brainstorm new project features
  ```

- **编辑现有笔记**：
  使用 `edit` 命令修改已有笔记，并预览更改：
  ```bash
  gemini ask "Add a new task 'Schedule team meeting' to notes/daily/2025-08-17-daily.md"
  ```
  Gemini CLI 会显示更改的差异（diff），需要你确认后应用。

- **安全编辑**：
  启用检查点模式（`gemini -c`）以在每次文件操作前创建快照，允许通过 `/restore` 撤销更改。[Read here...](https://www.geeky-gadgets.com/gemini-cli-pro-tips-and-tricks/)

### 4. **总结和分析笔记**
Gemini CLI 擅长处理和分析文本文件，可用于总结或提取笔记中的关键信息。[](https://www.hackingnote.com/en/cheatsheets/gemini/)

- **总结单篇笔记**：
  ```bash
  gemini -f notes/daily/2025-08-17-daily.md "Summarize the key points of this note."
  ```
  输出可能是：
  ```
  Key points from 2025-08-17-daily.md:
  - Tasks: Complete project documentation, review meeting notes.
  - Reflections: Evaluate daily progress and challenges.
  - Ideas: Brainstorm new project features.
  ```

- **分析多篇笔记**：
  汇总一个文件夹中的所有笔记：
  ```bash
  gemini -f notes/daily/ "Summarize all daily notes from this week."
  ```
  或者使用 `@` 语法：[Read here...](https://gist.github.com/alkimiadev/1a6401a29a7844f6b64fccd826d9bd7a)
  ```bash
  gemini -p "@notes/daily/ Summarize tasks completed this week."
  ```

- **搜索特定内容**：
  使用 `SearchText` 工具查找笔记中的关键词：
  ```bash
  gemini -p "SearchText 'project' in @notes/ List all mentions of 'project' with file paths."
  ```

### 5. **自动化笔记管理**
Gemini CLI 支持自动化任务，可用于定期整理或生成笔记。[Read here...](https://www.geeky-gadgets.com/gemini-cli-pro-tips-and-tricks/)

- **创建自定义命令**：
  在 `~/.gemini/commands/` 或项目根目录的 `.gemini/commands/` 中创建一个 TOML 文件（如 `create_note.toml`）：
  ```toml
  description = "Creates a daily note with a standard template."
  prompt = "Write a Markdown file for today's daily note in notes/daily/ with sections for Tasks, Reflections, and Ideas."
  ```
  然后运行：
  ```bash
  gemini /create_note
  ```

- **自动生成索引**:
  ```bash
  gemini "为整个笔记库生成 index.md，按主题分类，列出文件并加上链接"
   ```

- **建立笔记之间的连接**:
  ```bash
  gemini "分析 knowledge/ 文件夹里的所有笔记，添加合适的 [[双向链接]]"
  ```
- **批量整理笔记**：
  
  使用多文件处理功能整理笔记文件名或内容。例如，重命名所有笔记文件以遵循日期格式：
   ```bash
    gemini -p "@notes/daily/ Rename all files to follow the format  YYYY-MM-DD-daily.md."
   ```

- **自动化总结**：
  
  设置定时任务（结合 cron 或 CI 管道）运行 Gemini CLI 命令，生成每周笔记总结：
  ```bash
  gemini review --input notes/daily/ --output notes/weekly_summary.md "Summarize all tasks and ideas from this week's daily notes."
  ```

### 6. **管理笔记历史**
Gemini CLI 支持会话历史管理，可用于记录与笔记相关的交互历史。[Read here...](https://github.com/google-gemini/gemini-cli/issues/3882)

- **保存交互历史**：
  
  在交互模式（`gemini chat`）中，保存当前会话：
  ```bash
  /chat save notes_2025-08-17
  ```
  历史保存在 `~/.gemini/tmp` 中。

- **恢复历史**：
  
  查看历史列表：
  ```bash
  gemini history list
  ```
  恢复特定会话：
  ```bash
  gemini history show @notes_2025-08-17
  ```

- **自动保存**（待改进）：
  
  当前 Gemini CLI 不自动保存所有会话历史。你需要手动保存，或等待未来版本添加自动保存功能。[](https://github.com/google-gemini/gemini-cli/issues/3882)

### 7. **高级功能：多模态笔记管理**
Gemini CLI 支持多模态输入，可用于处理包含图片的笔记。[Read here...](https://www.geeky-gadgets.com/gemini-cli-pro-tips-and-tricks/)

- **分析图片笔记**：
  
  如果你的笔记包含图片（例如手写笔记扫描件）：
  ```bash
  gemini -f notes/images/meeting_2025-08-17.jpg "Transcribe the text in this image and summarize the key points."
  ```

- **生成可视化笔记**：
  
  要求 Gemini CLI 生成架构图或思维导图（需配合外部工具）：
  ```bash
  gemini -p "@notes/ideas/ Generate a Mermaid.js diagram summarizing the relationships between ideas."
  ```

### 8. **注意事项和最佳实践**
- **明确提示**：避免模糊指令，如“整理我的笔记”。改为具体任务，如“将 notes/daily/ 中的所有任务提取到一个新文件 notes/tasks.md”。[Read here...](https://softwareplanetgroup.co.uk/best-practices-for-using-gemini-cli/)
- **使用检查点**：在批量编辑笔记时，始终启用 `--checkpointing` 以防意外更改。[Read here...](https://www.geeky-gadgets.com/gemini-cli-pro-tips-and-tricks/)
- **定期更新 GEMINI.md**：保持 GEMINI.md 内容的最新性，确保笔记管理规则与项目需求一致。[Read here...](https://softwareplanetgroup.co.uk/best-practices-for-using-gemini-cli/)
- **避免全局编辑**：不要对整个笔记目录执行未经确认的大规模更改，逐步处理以确保准确性。[Read here...](https://softwareplanetgroup.co.uk/best-practices-for-using-gemini-cli/)

### 总结
Gemini CLI 通过文件操作、上下文管理和自动化功能，为笔记管理提供了强大支持。你可以利用 GEMINI.md 组织笔记结构，使用文件处理命令创建和编辑笔记，借助搜索和总结功能提取关键信息，并通过自定义命令自动化任务，结合其多模态支持和检查点功能，Gemini CLI 能高效满足笔记记录、整理和应用的需要。此外，Gemini CLI 内置了Git整合功能，可以将笔记目录转化为 Git 仓库，实现版本追踪。

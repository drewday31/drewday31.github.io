# Triage Notes: Portfolio and Blog
Engineering a Static Site from Scratch | Cybersecurity & IS Portfolio

**Drew Day** - BBA in Cybersecurity and BBA in Information Systems from The University of Texas at San Antonio
<br>
<br>

## Project Overview:
This website was built entirely from scratch to help me learn the fundamentals of a web stack (HTML, CSS, JavaScript). Rather than using a pre-built static site generator, I wanted to do everything myself which also allowed me to learn about GitHub Actions to handel blog page creation.

### The Goal:
The primary objective of this project is to create a centralized platform to document my technical journeyand host my short technical writeups on cybersecurity tools and projects. I decided to build this from the ground up to learn about the "attack surface" and the underlying architecture needed for web development.

> **Note on AI Collaboration:** This project was developed with the assitance of Google Gemini. I utilized AI to help me learn HTML, CSS, and JavaScript and learn web development best practices. I personally went through every script and style rule the AI suggested to make sure I actually understood the math and the logic behind it. I edited a lot of the code to keep it clean, like stripping out a bunch of extra CSS variables I didn't need, to make sure the final product was something I built, not just something I prompted. Essentially, the AI acted as a technical mentor, but I handled the final implementation and optimization.

## Site Framework
To ensure the site is to maintain, I designed a modular framework to separate some of the layout from the cotent. Instead of hard-coding a navigation bar and footer into every single HTML file, I use a centralized layout system and injected it using JavaScript. This ensures 100% consistency accross the site. If I want to add a new social link or change the layout, I just need to edit the header or footer html files, and the change shows up on every page instantly.

Similarly, I did not want to format every single blog post using HTML, so I created a system to do it for me. New blog posts are suthored using Markdown (.md) files which will allow me to focus on wiriting technical content and not HTML tags. Once the file is saved in the /markdown folder and commited to my GitHub page, the automation system takes over.

## GitHub Actions Automation
The automation of the blog posts is powered through a custom GutHub Action triggered by every commit to the main branch. 

### Change Detection & Loop
When a commit is made, the Action triggers a script that loops through the /markdown directory. It checks for new files or updates to existing ones.

### Metadata Extraction & JSON Update
The script parses the Frontmatter (the header section) of each Markdown file to extract:
* Title
* Date
* Summary
* Classification (e.g., Unclassified, Triage, Research)
* Status
* Tags (used for filtering)
* Reading time (calculated as part of the script dividng the total word count by average reading speed)
* URL

All of this data is compiled into a single posts.json file. 

### Role of posts.json
This JSON file acts as the "Database" for the static site. A script on the home page reads the JSON file, sorts it by date, and pulls the two most recent posts to display in the "Recent Activity" section. Similarly, The main blog page uses this file to generate "snippets" or windows for every post I've ever written. I plan to allow users can instantly filter through the entire archive by clicking on specific categories or tags (like #Cybersecurity, #Networking, etc.).

Finally, the Action uses Pandoc to convert the Markdown content into a standalone HTML file. This file is wrapped in a template.html blueprint and placed in the /blog folder using the date as the file name.
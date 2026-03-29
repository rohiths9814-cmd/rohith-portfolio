// Portfolio data — edit this file to customize your portfolio content

export const personalInfo = {
  name: "Rohith S",
  title: "Cybersecurity Specialist",
  tagline: "Ethical Hacker | Security Researcher | Bug Hunter",
  bio: `I'm a passionate cybersecurity student and ethical hacker with a focus on offensive security, web application vulnerabilities, and network penetration testing. I spend my time breaking things responsibly — finding vulnerabilities before the bad guys do.

Currently pursuing a career in cybersecurity with hands-on experience in CTF competitions, bug bounty programs, and real-world penetration testing labs.`,
  email: "rohiths9814@gmail.com",
  github: "https://github.com/rohiths9814-cmd",
  linkedin: "https://linkedin.com/in/rohiths9814",
  twitter: "https://twitter.com/hyy_rohith_",
  location: "India",
  available: true,
};

export const skills = {
  offensive: [
    { name: "Penetration Testing", level: 10 },
    { name: "Bug Bounty Hunting", level: 20 },
    { name: "Web App Security", level: 30 },
    { name: "Network Recon", level: 5 },
    { name: "Social Engineering", level: 5 },
  ],
  programming: [
    { name: "Python", level: 90 },
    { name: "Java", level: 90},
    { name: "OOPS", level: 50},
    { name: "Bash/Shell", level: 50 },
    { name: "JavaScript", level: 50 },
    { name: "SQL", level: 50 },
    { name: "C/C++", level: 70 },
  ],
  tools: [
    { name: "Burp Suite", level: 90 },
    { name: "Nmap / Masscan", level: 70 },
    { name: "Metasploit", level: 50 },
    { name: "Wireshark", level: 70 },
    { name: "SQLMap / ffuf", level: 10 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "WiFi Security Scanner",
    description:
      "Developed a WiFi scanning tool to identify nearby wireless networks and analyze their security configurations. The tool detects SSIDs, signal strength, and encryption types (WEP/WPA/WPA2), helping assess network security posture.",
    tech: ["Python", "Networking"],
    tags: ["WiFi", "Recon", "Network Security", "Wireless Security"],
    github: "https://github.com/rohiths9814-cmd/wifi_scanner_mini_project.git",
    demo: "https://drive.google.com/file/d/1Xcmz0mtVpsYshfdbUf8SMWRt8OVhotps/view",
    featured: true,
    color: "cyber-green",
  },
  {
    id: 2,
    title: "XSS Hunter Lab",
    description:
      "Custom lab environment for testing and demonstrating Cross-Site Scripting vulnerabilities. Includes DOM-based, Reflected, and Stored XSS scenarios with educational writeups.",
    tech: ["JavaScript", "Node.js", "Express", "Docker"],
    tags: ["XSS", "Web Security", "Labs"],
    github: "https://github.com/rohiths9814-cmd",
    demo: null,
    featured: true,
    color: "cyber-blue",
  },
  {
    id: 3,
    title: "SQLi Exploitation Framework",
    description:
      "Educational SQL injection testing framework built from scratch. Supports error-based, blind, and time-based injection with automated payload generation against test targets.",
    tech: ["Python", "MySQL", "SQLite", "Click CLI"],
    tags: ["SQLi", "Database", "Automation"],
    github: "https://github.com/rohiths9814-cmd",
    demo: null,
    featured: false,
    color: "neon-purple",
  },
  {
    id: 4,
    title: "Metasploitable Engagement Report",
    description:
      "Full penetration testing engagement against Metasploitable 2 environment. Complete with reconnaissance, exploitation, privilege escalation, and professional PDF report.",
    tech: ["Metasploit", "Nmap", "Kali Linux", "LaTeX"],
    tags: ["Red Team", "Full Engagement", "Reporting"],
    github: "https://github.com/rohiths9814-cmd",
    demo: null,
    featured: true,
    color: "neon-pink",
  },
  {
    id: 5,
    title: "Network Packet Analyzer",
    description:
      "Custom packet capture and analysis tool using Scapy. Detects anomalous traffic patterns, ARP spoofing attempts, and suspicious DNS queries in real-time.",
    tech: ["Python", "Scapy", "Wireshark", "Linux"],
    tags: ["Network", "DFIR", "Detection"],
    github: "https://github.com/rohiths9814-cmd",
    demo: null,
    featured: false,
    color: "cyber-green",
  },
  {
    id: 6,
    title: "CTF Writeup Collection",
    description:
      "Curated collection of detailed CTF challenge writeups covering crypto, web, pwn, and forensics categories from platforms like HackTheBox, TryHackMe, and PicoCTF.",
    tech: ["Python", "GDB", "Ghidra", "CyberChef"],
    tags: ["CTF", "HackTheBox", "TryHackMe"],
    github: "https://github.com/rohiths9814-cmd",
    demo: null,
    featured: false,
    color: "cyber-blue",
  },
];

export const experience = [
  {
    year: "2022-2023",
    title: "SSLC",
    org: "Sri Vidya Mandir Matriculation School",
    marks: "86.8%",
    description:
      "Completed 10th grade and began exploring the fundamentals of computers and networking. This phase sparked my curiosity about system behavior, security, and how digital systems operate behind the scenes — laying the foundation for my journey into cybersecurity.",
    type: "education",
  },
  {
    year: "2024-2025",
    title: "HSC",
    org: "Kongu Vellalar Matriculation Higher Secondary School",
    marks: "86.5%",
    description:
      "Completed 12th grade while diving into programming with Python and C++. Built a strong foundation in logic, problem-solving, and system-level thinking, which later became the base for exploring cybersecurity and scripting for automation.",
    type: "education",
  },
  {
    year: "2025-present",
    title: "B.E in Computer Science and Engineering(Cyber Security)",
    org: "K.S.R College of Engineering",
    marks: "8.435 CGPA",
    description:
      "Currently pursuing my college degree while actively building practical skills in cybersecurity. Working on hands-on labs using Kali Linux and vulnerable environments, exploring networking, system behavior, and real-world security vulnerabilities to develop an offensive security mindset.",
    type: "education",
  },
  {
    year: "2025",
    title: "Cybersecurity Bootcamp",
    org: "Self-Directed / Udemy / YouTube",
    description:
      "Completed comprehensive ethical hacking curriculum covering networking, web app security, exploit development, and OSCP-prep material.",
    type: "education",
  },
  {
    year: "2025",
    title: "TryHackMe — Top 85%",
    org: "TryHackMe",
    description:
      "Completed 5+ rooms across offensive security, OSINT, and forensics tracks. Ranked in the top 5% globally.",
    type: "platform",
  },
  {
    year: "2026",
    title: "Bug Bounty Hunter",
    org: "HackerOne / Bugcrowd",
    description:
      "Actively participating in bug bounty programs — discovered and responsibly disclosed XSS, IDOR, and authentication bypass vulnerabilities.",
    type: "achievement",
  },
  {
    year: "2026",
    title: "CTF Competitions",
    org: "picoCTF / CTFtime",
    description:
      "Competed in national and international CTF events, placing in top 20% in web exploitation and cryptography categories.",
    type: "competition",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export const terminalCommands = [
  { cmd: "whoami", output: "rohith — ethical hacker & security researcher" },
  { cmd: "nmap -sV --script vuln target.local", output: `Starting Nmap 7.94 at 2026-03-28
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.4
80/tcp open  http    Apache 2.4.6
  |_http-vuln-cve2021-41773: VULNERABLE
443/tcp open https   nginx 1.18.0
NSE: Script Post-scanning.
Nmap done: 1 IP in 4.32s` },
  { cmd: "sqlmap -u 'http://target.local/login' --dbs", output: `[*] Starting SQLMap
[*] Testing connection to target URL
[*] Heuristics detected web page charset 'UTF-8'
[*] Testing if the target URL content is stable
[*] Parameter 'id' appears to be 'MySQL >= 5.0 error-based' injectable
[*] Databases: information_schema, users_db, admin_panel` },
  { cmd: "ls -la /root/flags/", output: `total 32
drwxr-xr-x  2 root root  4096 Mar 28 09:14 .
-rw-r--r--  1 root root    38 Mar 28 09:14 user.txt
-rw-r--r--  1 root root    38 Mar 28 09:14 root.txt
→ user: d3ad{b33f_1s_4lw4ys_c00l}
→ root: fl4g{pwn3d_by_r0h1th}` },
];

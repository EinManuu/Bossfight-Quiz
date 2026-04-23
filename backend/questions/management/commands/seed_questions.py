from django.core.management.base import BaseCommand
from questions.models import Question

QUESTIONS = [
    {
        "department": "IT", "difficulty": "easy", "image": "image.png",
        "question": "What does phishing refer to?",
        "answers": ["Scanning a network for open ports", "Tricking users into revealing credentials via fake communications", "Encrypting files on a target machine", "Brute-forcing a login page"],
        "correct": 1,
        "explanation": "Phishing uses deceptive emails or websites to trick users into handing over sensitive information like passwords or credit card numbers.",
    },
    {
        "department": "IT", "difficulty": "easy", "image": "image.png",
        "question": "Which of the following is the strongest password?",
        "answers": ["password123", "P@ssw0rd", "qX7$mK!2vL#9", "MyDogIsNamedMax"],
        "correct": 2,
        "explanation": "A strong password uses a mix of upper and lowercase letters, numbers, and symbols with no recognisable words or patterns.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "image.png",
        "question": "What is a zero-day vulnerability?",
        "answers": ["A vulnerability that has been patched within 24 hours", "A flaw exploited before the vendor is aware or has issued a fix", "A server that has never been updated", "A virus that deletes files on the day it runs"],
        "correct": 1,
        "explanation": "A zero-day vulnerability is a flaw unknown to the software vendor, meaning there are zero days of protection — patches don't exist yet.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "image.png",
        "question": "What is the purpose of multi-factor authentication (MFA)?",
        "answers": ["To encrypt data at rest", "To require multiple steps when setting a password", "To verify identity using more than one type of credential", "To block access from foreign IP addresses"],
        "correct": 2,
        "explanation": "MFA requires at least two forms of verification (e.g. password + phone code), making it much harder for attackers to access an account even if one factor is compromised.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "",
        "question": "What does a firewall primarily do?",
        "answers": ["Encrypts outgoing network traffic", "Monitors and filters network traffic based on rules", "Backs up data to a remote server", "Detects malware in downloaded files"],
        "correct": 1,
        "explanation": "A firewall controls incoming and outgoing network traffic by applying defined security rules, acting as a barrier between trusted and untrusted networks.",
    },
    {
        "department": "IT", "difficulty": "hard", "image": "",
        "question": "What is a man-in-the-middle (MITM) attack?",
        "answers": ["An attacker physically intercepting a server", "An attacker secretly relaying or altering communication between two parties", "A brute-force attack on a database", "An insider threat from a disgruntled employee"],
        "correct": 1,
        "explanation": "In a MITM attack, the attacker secretly positions themselves between two communicating parties, able to eavesdrop or alter the data being exchanged.",
    },
    {
        "department": "IT", "difficulty": "hard", "image": "",
        "question": "Which protocol is used to securely transfer files over a network?",
        "answers": ["FTP", "HTTP", "SFTP", "SMTP"],
        "correct": 2,
        "explanation": "SFTP (SSH File Transfer Protocol) encrypts both the commands and data, unlike plain FTP which transmits everything including credentials in cleartext.",
    },
    {
        "department": "IT", "difficulty": "easy", "image": "",
        "question": "Which of the following best describes ransomware?",
        "answers": ["Software that steals browser history", "A virus that slows down your computer", "Malware that encrypts your files and demands payment to restore them", "A tool used by IT teams to recover lost data"],
        "correct": 2,
        "explanation": "Ransomware encrypts a victim's files and demands a ransom payment in exchange for the decryption key. It can affect individuals and entire organisations.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "",
        "question": "What is the principle of least privilege?",
        "answers": ["Giving all users admin access to improve productivity", "Restricting user access rights to only what is needed for their role", "Logging out of systems when not in use", "Using the cheapest available security software"],
        "correct": 1,
        "explanation": "The principle of least privilege limits each user or system to the minimum level of access needed, reducing the potential damage from breaches or mistakes.",
    },
    {
        "department": "IT", "difficulty": "hard", "image": "",
        "question": "What does SQL injection allow an attacker to do?",
        "answers": ["Intercept encrypted traffic", "Crash a web server remotely", "Manipulate or extract data from a database by injecting malicious SQL code", "Install a keylogger on a target machine"],
        "correct": 2,
        "explanation": "SQL injection inserts malicious SQL statements into input fields, which the database then executes — potentially exposing, modifying, or deleting data.",
    },
    {
        "department": "Finance", "difficulty": "easy", "image": "",
        "question": "You receive an urgent email from your CEO asking you to wire £50,000 immediately. What should you do?",
        "answers": ["Complete the transfer immediately as it's from the CEO", "Reply to the email asking for more details", "Verify the request through a separate, known communication channel before acting", "Forward it to a colleague to handle"],
        "correct": 2,
        "explanation": "CEO fraud (also called Business Email Compromise) is common in Finance. Always verify large transfer requests through a known phone number or in person — never via the same email chain.",
    },
    {
        "department": "Finance", "difficulty": "easy", "image": "",
        "question": "What is social engineering in a cybersecurity context?",
        "answers": ["Using software to hack into a network", "Manipulating people into divulging confidential information", "Building a company's social media presence", "Installing monitoring software on employee computers"],
        "correct": 1,
        "explanation": "Social engineering exploits human psychology rather than technical vulnerabilities — attackers manipulate people into revealing information or taking harmful actions.",
    },
    {
        "department": "Finance", "difficulty": "medium", "image": "",
        "question": "A supplier emails to say their bank details have changed. What is the correct response?",
        "answers": ["Update the details immediately so payments aren't delayed", "Call the supplier on a previously verified number to confirm the change", "Reply to the email asking them to confirm", "Check if the email address looks correct and proceed if it does"],
        "correct": 1,
        "explanation": "Invoice redirect fraud is a major threat to Finance teams. Always verify bank detail changes via a trusted phone number you already have — not one provided in the suspicious email.",
    },
    {
        "department": "Finance", "difficulty": "medium", "image": "",
        "question": "Which of the following is a sign that a financial email could be fraudulent?",
        "answers": ["The email was sent during business hours", "The email creates a sense of urgency and asks you to bypass normal procedures", "The email is addressed to you by name", "The email comes from a known domain"],
        "correct": 1,
        "explanation": "Urgency and pressure to skip normal approval steps are classic red flags of fraud. Legitimate requests rarely require you to bypass standard controls.",
    },
    {
        "department": "Finance", "difficulty": "medium", "image": "",
        "question": "What is data classification and why does it matter in Finance?",
        "answers": ["Organising files into folders for easy access", "Labelling data by sensitivity to ensure it is handled and protected appropriately", "Encrypting all company spreadsheets automatically", "Backing up financial records to the cloud"],
        "correct": 1,
        "explanation": "Data classification helps Finance teams understand which data (e.g. payroll, account numbers) is sensitive and requires stricter access controls and handling procedures.",
    },
    {
        "department": "Finance", "difficulty": "hard", "image": "",
        "question": "What regulatory framework governs how personal financial data must be handled in the UK?",
        "answers": ["ISO 27001", "PCI DSS", "UK GDPR", "SOX"],
        "correct": 2,
        "explanation": "UK GDPR (General Data Protection Regulation) sets out how personal data, including financial data, must be collected, stored, and processed. Violations can result in significant fines.",
    },
    {
        "department": "Finance", "difficulty": "hard", "image": "",
        "question": "An attacker gains access to your email and monitors it silently for weeks before acting. What type of attack is this?",
        "answers": ["Ransomware", "Denial of Service", "Business Email Compromise (BEC)", "SQL Injection"],
        "correct": 2,
        "explanation": "BEC attackers often lurk in email accounts for extended periods, learning communication patterns and waiting for the right moment to redirect payments or extract data.",
    },
    {
        "department": "Finance", "difficulty": "easy", "image": "",
        "question": "You are working from a coffee shop and need to access financial systems. What should you do?",
        "answers": ["Connect directly to the public Wi-Fi and log in as normal", "Wait until you're on a trusted network or use a company VPN", "Use your personal hotspot only if the public Wi-Fi seems slow", "Access the system quickly to minimise exposure time"],
        "correct": 1,
        "explanation": "Public Wi-Fi is not secure. Always use a company-approved VPN when accessing sensitive systems remotely to encrypt your connection.",
    },
    {
        "department": "Finance", "difficulty": "medium", "image": "",
        "question": "What should you do if you accidentally send a financial document to the wrong person?",
        "answers": ["Send a follow-up email asking them to delete it and do nothing else", "Ignore it as it was an honest mistake", "Report it to your manager and the IT/security team immediately", "Ask the recipient to send it back"],
        "correct": 2,
        "explanation": "Accidental data disclosure is a reportable incident under UK GDPR. Prompt reporting gives the organisation the best chance to contain the damage and meet its legal obligations.",
    },
    {
        "department": "Finance", "difficulty": "hard", "image": "",
        "question": "What is the main purpose of segregation of duties in Finance?",
        "answers": ["To ensure employees don't work overtime", "To prevent any single person from having enough control to commit and conceal fraud", "To divide financial reports between departments", "To speed up payment approvals"],
        "correct": 1,
        "explanation": "Segregation of duties is a key internal control that splits responsibilities (e.g. approving vs. processing payments) so no single individual can both execute and conceal a fraudulent transaction.",
    },

    # --- IT situational ---
    {
        "department": "IT", "difficulty": "easy", "image": "",
        "question": "You find a USB stick in the car park with the company logo on it. What should you do?",
        "answers": ["Plug it in to see who it belongs to", "Take it home for personal use", "Hand it in to IT security without plugging it in", "Leave it where you found it"],
        "correct": 2,
        "explanation": "Unknown USB drives are a classic attack vector — they can automatically run malware the moment they are plugged in. Hand it to IT security so they can inspect it safely.",
    },
    {
        "department": "IT", "difficulty": "easy", "image": "",
        "question": "You receive an unexpected email with an attachment from an unknown sender. What should you do?",
        "answers": ["Open the attachment to see if it is relevant to your work", "Forward it to colleagues to check if they got it too", "Delete it and report it to IT security", "Reply asking the sender who they are"],
        "correct": 2,
        "explanation": "Unexpected attachments from unknown senders are a primary malware delivery method. Delete without opening and report it so IT can check whether others received the same email.",
    },
    {
        "department": "IT", "difficulty": "easy", "image": "",
        "question": "You notice someone looking over your shoulder while you type your password. What should you do?",
        "answers": ["Finish what you are doing and mention it to a colleague later", "Change your password as soon as possible and report the incident", "Assume it was accidental and ignore it", "Ask the person to step back and continue working"],
        "correct": 1,
        "explanation": "Shoulder surfing can compromise your credentials. Change your password immediately in case it was observed, and report the incident so it can be investigated.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "",
        "question": "You are leaving your desk for 30 minutes. What should you do with your computer?",
        "answers": ["Leave it open — you will be back soon", "Log out fully and shut it down", "Lock the screen so it requires a password to unlock", "Put a sticky note on the screen saying you will be back"],
        "correct": 2,
        "explanation": "Locking your screen (Win+L on Windows) prevents unauthorised access while you're away without the overhead of a full shutdown. It is the standard best practice for short absences.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "",
        "question": "A colleague asks for your login credentials because they are locked out and need urgent access. What do you do?",
        "answers": ["Share your credentials since you trust them", "Give them your password but make them promise not to tell anyone", "Refuse and direct them to IT support to regain access", "Write your password on a note and leave it on their desk"],
        "correct": 2,
        "explanation": "Sharing credentials violates the principle of individual accountability and can make you liable for any actions taken under your account. IT support exists to handle lockouts securely.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "",
        "question": "You see something suspicious on the network — traffic to an unknown external server at unusual hours. What should you do?",
        "answers": ["Investigate it yourself to avoid bothering the security team", "Ignore it as it is probably a background update", "Report it to the security team immediately with as much detail as possible", "Restart the affected machine to stop the traffic"],
        "correct": 2,
        "explanation": "Unusual outbound traffic could indicate malware, a data breach, or an insider threat. Always report it promptly — early reporting is critical for containment. Do not attempt to investigate or remediate yourself.",
    },
    {
        "department": "IT", "difficulty": "medium", "image": "",
        "question": "A website you visit shows a browser warning saying the certificate is invalid. What should you do?",
        "answers": ["Click 'Proceed anyway' — the warning is usually just a technical glitch", "Bookmark the page and try again later", "Close the browser tab and report it to IT", "Refresh the page until the warning goes away"],
        "correct": 2,
        "explanation": "An invalid certificate warning may mean the connection is being intercepted (MITM attack) or the site is fraudulent. Do not proceed, and report it to IT so they can investigate.",
    },
    {
        "department": "IT", "difficulty": "hard", "image": "",
        "question": "You receive a phone call from someone claiming to be from Microsoft saying your computer is infected and they need remote access. What should you do?",
        "answers": ["Allow remote access so they can fix the issue", "Give them your IP address so they can diagnose remotely", "Hang up immediately — this is a well-known tech support scam", "Ask them to send a confirmation email first"],
        "correct": 2,
        "explanation": "Microsoft and other legitimate companies do not make unsolicited calls about your computer. This is a tech support scam designed to gain remote access or extract payment. Hang up and report it.",
    },
    {
        "department": "IT", "difficulty": "hard", "image": "",
        "question": "What is the primary risk of using the same password across multiple work systems?",
        "answers": ["It slows down login times", "A single breach on any one system exposes all others", "It violates copyright law", "Passwords expire faster when reused"],
        "correct": 1,
        "explanation": "Credential stuffing attacks take leaked username/password pairs and try them across other services. If you reuse passwords, one breached site can cascade into many compromised accounts.",
    },
    {
        "department": "IT", "difficulty": "hard", "image": "",
        "question": "What should you do if you suspect your work device has been infected with malware?",
        "answers": ["Run an antivirus scan and keep working if it finds nothing", "Disconnect from the network immediately and contact IT security", "Restart the device and see if the problem goes away", "Delete suspicious files yourself to clean the system"],
        "correct": 1,
        "explanation": "Disconnecting from the network prevents the malware from spreading or communicating with an attacker. IT security must then assess the device — do not attempt self-remediation as you may destroy forensic evidence.",
    },

    # --- Finance situational ---
    {
        "department": "Finance", "difficulty": "easy", "image": "",
        "question": "You find printed payroll documents left unattended at a shared printer. What should you do?",
        "answers": ["Leave them — the owner will collect them", "Take them to your desk and email the owner", "Return them to the owner directly or lock them away and notify the owner", "Put them in the recycling bin to keep the workspace tidy"],
        "correct": 2,
        "explanation": "Payroll data is highly sensitive personal information. Leaving it unattended risks a data breach. Secure the documents and notify the owner immediately — do not leave them where others can see them.",
    },
    {
        "department": "Finance", "difficulty": "easy", "image": "",
        "question": "A colleague asks you for another employee's salary details. What do you do?",
        "answers": ["Share it if you trust the colleague", "Check your email to see if there is an authorisation from management", "Decline and direct them to HR, who manages that information", "Share only the pay band, not the exact figure"],
        "correct": 2,
        "explanation": "Salary data is personal data under UK GDPR. It should only be disclosed through authorised HR processes. Sharing it informally — even to a trusted colleague — is a data breach.",
    },
    {
        "department": "Finance", "difficulty": "medium", "image": "",
        "question": "You receive an invoice from a known vendor but the bank details are different from usual. What is the first thing you do?",
        "answers": ["Process it — the invoice looks genuine", "Call the vendor on a number you already have on file", "Email the vendor asking them to confirm", "Ask your manager to approve it as normal"],
        "correct": 1,
        "explanation": "Fraudsters often intercept emails and swap bank details — a technique called invoice redirect fraud. Always verify changes by calling a number you already hold for that vendor, never a number provided in the suspicious email or invoice.",
    },
    {
        "department": "Finance", "difficulty": "medium", "image": "",
        "question": "You notice a transaction in the system that you do not recognise and did not authorise. What should you do?",
        "answers": ["Reverse the transaction yourself to fix it quickly", "Wait to see if a colleague claims it before escalating", "Report it to your manager and the security team right away", "Document it in a personal log and monitor for more"],
        "correct": 2,
        "explanation": "Unrecognised transactions could indicate fraud, an insider threat, or a system compromise. Immediate reporting gives the organisation the best chance to investigate and limit damage.",
    },
    {
        "department": "Finance", "difficulty": "medium", "image": "",
        "question": "Someone calls claiming to be from your bank's fraud team asking you to confirm account numbers to stop a suspicious transaction. What do you do?",
        "answers": ["Confirm the details — stopping fraud is urgent", "Ask for their employee ID and then confirm", "Hang up and call the bank back on their official number", "Give partial details to verify they are genuine first"],
        "correct": 2,
        "explanation": "Fraudsters impersonate bank fraud teams to extract account details — a technique called vishing. Always hang up and call back using the number on the bank's official website or your contract, never a number the caller gives you.",
    },
    {
        "department": "Finance", "difficulty": "hard", "image": "",
        "question": "A client asks you to process a large cash payment split into several smaller transactions to avoid reporting thresholds. What should you do?",
        "answers": ["Process them — it is the client's money and their choice", "Process them but make a private note just in case", "Refuse and file a Suspicious Activity Report (SAR) with your MLRO", "Ask the client to provide a reason in writing before processing"],
        "correct": 2,
        "explanation": "Structuring transactions to stay below reporting thresholds is a money laundering technique known as 'smurfing'. You are legally required to report this to your Money Laundering Reporting Officer (MLRO) via a SAR.",
    },
    {
        "department": "Finance", "difficulty": "hard", "image": "",
        "question": "Your company experiences a ransomware attack and financial data is encrypted. Attackers demand payment to restore access. What should the organisation do first?",
        "answers": ["Pay the ransom immediately to restore operations", "Disconnect affected systems and contact IT security and management", "Try to negotiate a lower ransom amount", "Restore from backup without telling anyone to avoid reputational damage"],
        "correct": 1,
        "explanation": "The first step is containment — disconnect affected systems to stop the spread. Paying the ransom is not recommended (it funds criminals and doesn't guarantee recovery). The incident must be reported internally and potentially to the ICO under UK GDPR.",
    },
    {
        "department": "Finance", "difficulty": "easy", "image": "",
        "question": "What does a clean desk policy require you to do at the end of the working day?",
        "answers": ["Turn off your monitor", "Clear your desk of all sensitive documents and lock them away", "Log out of your email", "Shred all documents regardless of sensitivity"],
        "correct": 1,
        "explanation": "A clean desk policy ensures sensitive documents, notes, and storage devices are not left visible when you are away from your desk. This reduces the risk of physical data theft or accidental disclosure.",
    },
]


class Command(BaseCommand):
    help = 'Seed the questions table with the initial 20 questions'

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0

        for data in QUESTIONS:
            _, created = Question.objects.update_or_create(
                question=data['question'],
                defaults={k: v for k, v in data.items() if k != 'question'},
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(self.style.SUCCESS(
            f'Done: {created_count} created, {updated_count} updated.'
        ))

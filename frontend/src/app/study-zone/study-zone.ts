import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface Topic {
  id: string;
  icon: string;
  title: string;
  tag: string;
  tagColor: string;
  summary: string;
  sections: Section[];
}

interface Section {
  heading: string;
  body: string;
  bullets?: string[];
}

@Component({
  selector: 'app-study-zone',
  imports: [],
  templateUrl: './study-zone.html',
  styleUrl: './study-zone.css',
})
export class StudyZone implements OnInit {
  selected: Topic | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const topicId = this.route.snapshot.queryParamMap.get('topic');
    if (!topicId) return;

    const topic = this.topics.find((t) => t.id === topicId);
    if (topic) {
      this.open(topic);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  open(topic: Topic) {
    this.selected = topic;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  close() {
    this.selected = null;
  }

  topics: Topic[] = [
    {
      id: 'phishing',
      icon: '🎣',
      title: 'Phishing',
      tag: 'Social',
      tagColor: 'red',
      summary: 'Deceptive emails and messages designed to steal credentials or install malware.',
      sections: [
        {
          heading: 'What is phishing?',
          body: 'Phishing is a cyberattack where the attacker disguises themselves as a trusted entity — a bank, a colleague, or a well-known service — to trick the victim into revealing sensitive information such as passwords, credit card numbers, or clicking a malicious link.',
        },
        {
          heading: 'Common types',
          body: '',
          bullets: [
            'Spear phishing — targeted attack on a specific individual using personal details to appear convincing.',
            'Whaling — spear phishing aimed at senior executives or high-value targets.',
            'Smishing — phishing via SMS text messages.',
            'Vishing — phishing over voice calls, often impersonating IT support or banks.',
            'Clone phishing — a legitimate email is copied and re-sent with a malicious link substituted in.',
          ],
        },
        {
          heading: 'Red flags to watch for',
          body: '',
          bullets: [
            'Urgent or threatening language ("Your account will be closed in 24 hours").',
            'Sender address that almost matches a real domain (e.g. support@micros0ft.com).',
            'Links that don\'t match the displayed text — hover before clicking.',
            'Unexpected attachments, especially .zip, .exe, or Office files asking to enable macros.',
            'Requests to bypass normal procedures or approvals.',
          ],
        },
        {
          heading: 'How to protect yourself',
          body: 'Never click links in unsolicited emails — navigate to the site directly. Verify unexpected requests through a separate channel. Report suspicious emails to your IT team rather than just deleting them.',
        },
      ],
    },
    {
      id: 'social-engineering',
      icon: '🎭',
      title: 'Social Engineering',
      tag: 'Human',
      tagColor: 'orange',
      summary: 'Manipulating people into breaking security procedures through psychological pressure.',
      sections: [
        {
          heading: 'What is social engineering?',
          body: 'Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate trust, authority, fear, or urgency to convince people to hand over information, grant access, or take actions they otherwise wouldn\'t.',
        },
        {
          heading: 'Common techniques',
          body: '',
          bullets: [
            'Pretexting — inventing a fabricated scenario (e.g. pretending to be an auditor or new IT contractor) to extract information.',
            'Baiting — leaving infected USB drives in company car parks or lobbies, hoping an employee will plug one in.',
            'Quid pro quo — offering something in exchange for information, such as fake IT help.',
            'Tailgating — physically following an authorised person through a secure door without badging in.',
            'Authority impersonation — pretending to be the CEO, a regulator, or law enforcement to pressure compliance.',
          ],
        },
        {
          heading: 'Why it works',
          body: 'People are naturally inclined to be helpful, comply with authority, and avoid conflict. Attackers exploit these tendencies by creating time pressure, posing as figures of authority, or appealing to a desire to resolve a problem quickly.',
        },
        {
          heading: 'Defence',
          body: 'Always verify identity independently — a phone call from "IT" asking for your password is not legitimate. Follow procedures even under pressure. If something feels off, it probably is — trust your instincts and escalate.',
        },
      ],
    },
    {
      id: 'physical-access',
      icon: '🚪',
      title: 'Physical Access Control',
      tag: 'Physical',
      tagColor: 'blue',
      summary: 'Attacks that bypass security through physical presence rather than digital means.',
      sections: [
        {
          heading: 'Why physical security matters',
          body: 'Even the most hardened digital defences can be bypassed if an attacker gains physical access to a machine, server room, or restricted area. Physical and cyber security are two sides of the same coin.',
        },
        {
          heading: 'Common physical attack vectors',
          body: '',
          bullets: [
            'Tailgating / piggybacking — following an authorised employee through a secured door without authenticating.',
            'Shoulder surfing — observing someone\'s screen or keyboard to capture passwords or sensitive data.',
            'Dumpster diving — searching discarded documents and hardware for sensitive information.',
            'Rogue devices — plugging in malicious hardware (USB keyloggers, rogue Wi-Fi access points) directly into a machine.',
            'Unlocked workstations — accessing an unattended, logged-in machine while the user is away.',
          ],
        },
        {
          heading: 'Best practices',
          body: '',
          bullets: [
            'Always badge in individually — never hold the door for someone you don\'t recognise.',
            'Lock your screen when stepping away (Windows + L).',
            'Never plug in unknown USB devices.',
            'Shred sensitive documents before disposal.',
            'Challenge unfamiliar people in secure areas politely but firmly.',
          ],
        },
      ],
    },
    {
      id: 'ransomware',
      icon: '🔒',
      title: 'Ransomware',
      tag: 'Malware',
      tagColor: 'red',
      summary: 'Malware that encrypts your files and demands payment to restore access.',
      sections: [
        {
          heading: 'How ransomware works',
          body: 'Ransomware is malicious software that encrypts files on the victim\'s device or network, making them inaccessible. The attacker then demands a ransom — usually in cryptocurrency — in exchange for the decryption key. Payment does not guarantee recovery.',
        },
        {
          heading: 'How it spreads',
          body: '',
          bullets: [
            'Phishing emails with malicious attachments or links.',
            'Exploiting unpatched vulnerabilities in software or operating systems.',
            'Remote Desktop Protocol (RDP) exposed to the internet with weak credentials.',
            'Drive-by downloads from compromised or malicious websites.',
            'Supply chain compromise — infecting legitimate software updates.',
          ],
        },
        {
          heading: 'Real-world impact',
          body: 'Ransomware attacks have shut down hospitals, disrupted fuel pipelines, and cost organisations hundreds of millions. The average ransomware attack results in days or weeks of downtime even if a ransom is paid.',
        },
        {
          heading: 'How to protect yourself',
          body: '',
          bullets: [
            'Never open attachments or click links from unexpected emails.',
            'Keep software and operating systems patched and up to date.',
            'Back up data regularly and test that backups can actually be restored.',
            'Report any suspicious system behaviour (files you didn\'t create, unexpected encryption prompts) to IT immediately.',
          ],
        },
      ],
    },
    {
      id: 'password-attacks',
      icon: '🔑',
      title: 'Password Attacks',
      tag: 'Credential',
      tagColor: 'yellow',
      summary: 'Techniques used to crack, guess, or steal passwords to gain unauthorised access.',
      sections: [
        {
          heading: 'Types of password attacks',
          body: '',
          bullets: [
            'Brute force — systematically trying every possible combination until one works.',
            'Dictionary attack — using a list of common words and passwords rather than random combinations.',
            'Credential stuffing — using username/password pairs leaked from other breaches, relying on people reusing passwords.',
            'Password spraying — trying a small number of common passwords against many accounts to avoid lockout.',
            'Keylogging — malware that records keystrokes to capture passwords as they are typed.',
          ],
        },
        {
          heading: 'Why weak passwords are dangerous',
          body: 'Simple or reused passwords can be cracked in seconds with modern hardware. A leaked password from one service immediately puts every other account that uses the same password at risk.',
        },
        {
          heading: 'Best practices',
          body: '',
          bullets: [
            'Use a unique, long password for every account.',
            'Use a password manager — you only need to remember one master password.',
            'Enable multi-factor authentication (MFA) wherever possible.',
            'Never share passwords, even with IT support.',
            'Change passwords immediately if you suspect a breach.',
          ],
        },
      ],
    },
    {
      id: 'insider-threats',
      icon: '🕵️',
      title: 'Insider Threats',
      tag: 'Internal',
      tagColor: 'purple',
      summary: 'Security risks originating from within the organisation — employees, contractors, or partners.',
      sections: [
        {
          heading: 'What is an insider threat?',
          body: 'An insider threat is a security risk that comes from someone within the organisation — an employee, former employee, contractor, or partner — who has inside knowledge of systems, processes, or data. Insider threats can be malicious (intentional) or accidental (negligent).',
        },
        {
          heading: 'Types of insider threats',
          body: '',
          bullets: [
            'Malicious insider — a disgruntled or bribed employee who intentionally steals or leaks data.',
            'Negligent insider — an employee who accidentally exposes data through careless behaviour (e.g. emailing the wrong person, losing a laptop).',
            'Compromised insider — a legitimate user whose account has been taken over by an external attacker.',
          ],
        },
        {
          heading: 'Warning signs',
          body: '',
          bullets: [
            'Accessing systems or data outside normal working hours or outside their role.',
            'Downloading or copying large volumes of data.',
            'Expressing dissatisfaction or resentment towards the organisation.',
            'Attempting to access restricted areas or systems they have no reason to use.',
          ],
        },
        {
          heading: 'How organisations defend against this',
          body: 'The principle of least privilege limits the damage any one person can do. Audit logs track who accessed what. Regular access reviews remove permissions that are no longer needed. A culture of reporting — where employees feel safe flagging concerns — is one of the most effective defences.',
        },
      ],
    },
    {
      id: 'man-in-the-middle',
      icon: '🕸️',
      title: 'Man-in-the-Middle',
      tag: 'Network',
      tagColor: 'blue',
      summary: 'Intercepting communications between two parties to eavesdrop or alter data.',
      sections: [
        {
          heading: 'How MITM attacks work',
          body: 'In a man-in-the-middle attack, the attacker secretly positions themselves between two communicating parties — intercepting, and potentially altering, the data being exchanged. Neither party realises a third party is present.',
        },
        {
          heading: 'Common MITM techniques',
          body: '',
          bullets: [
            'Evil twin Wi-Fi — setting up a rogue access point with the same name as a legitimate one to intercept traffic.',
            'ARP spoofing — sending fake ARP messages on a local network to redirect traffic through the attacker\'s machine.',
            'SSL stripping — downgrading an HTTPS connection to HTTP so traffic can be read in plaintext.',
            'DNS spoofing — corrupting DNS cache to redirect users to malicious sites.',
          ],
        },
        {
          heading: 'How to protect yourself',
          body: '',
          bullets: [
            'Only use trusted, password-protected Wi-Fi networks.',
            'Use a VPN on public networks.',
            'Always check for HTTPS and a valid certificate before entering credentials.',
            'Be suspicious if your browser warns about an invalid certificate — do not proceed.',
          ],
        },
      ],
    },
    {
      id: 'removable-media',
      icon: '💾',
      title: 'Removable Media',
      tag: 'Physical',
      tagColor: 'blue',
      summary: 'USB drives and external devices used as vectors to introduce malware or exfiltrate data.',
      sections: [
        {
          heading: 'The threat',
          body: 'Removable media such as USB drives, external hard drives, and SD cards can carry malware onto a network that is otherwise well-defended. They can also be used to silently copy and remove sensitive data. Attacks using USB devices can bypass network-based security controls entirely.',
        },
        {
          heading: 'Real attacks',
          body: 'The Stuxnet worm — one of the most sophisticated cyberweapons ever discovered — was delivered via USB drives into an air-gapped Iranian nuclear facility. USB baiting attacks, where drives are deliberately left in car parks or receptions, have a surprisingly high pick-up and plug-in rate.',
        },
        {
          heading: 'Best practices',
          body: '',
          bullets: [
            'Never plug in a USB drive you found or were given unexpectedly.',
            'Only use company-approved, encrypted removable media.',
            'Report any device you find on company premises to IT security.',
            'Be aware that charging cables can also carry malware (O.MG cable attacks).',
          ],
        },
      ],
    },
  ];
}

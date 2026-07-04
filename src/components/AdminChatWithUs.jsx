import React from 'react'

const AdminChatWithUs = () => {
  return (
   <body class="bg-background text-on-surface font-body-md overflow-hidden h-screen flex flex-col">
{/* <!-- Top Navigation Bar --> */}
<header class="bg-surface-white w-full h-16 border-b border-outline-variant flex justify-between items-center px-gutter z-50">
<div class="flex items-center gap-8">
<h1 class="font-headline-sm text-headline-sm font-bold text-primary">FinSecure Admin</h1>
<nav class="hidden md:flex items-center gap-6">
<a class="font-nav-link text-nav-link text-on-surface-variant hover:text-primary transition-colors" href="#">Dashboard</a>
<a class="font-nav-link text-nav-link text-on-surface-variant hover:text-primary transition-colors" href="#">Accounts</a>
<a class="font-nav-link text-nav-link text-on-surface-variant hover:text-primary transition-colors" href="#">Transactions</a>
<a class="font-nav-link text-nav-link text-primary border-b-2 border-primary pb-1" href="#">Support</a>
<a class="font-nav-link text-nav-link text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
</nav>
</div>
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">settings</span>
</button>
<div class="h-8 w-[1px] bg-outline-variant mx-2"></div>
<div class="flex items-center gap-3 cursor-pointer group">
<div class="text-right">
<p class="text-label-md font-bold text-on-surface">Alex Rivera</p>
<p class="text-[11px] text-on-surface-variant">Tier 2 Admin</p>
</div>
<img class="w-10 h-10 rounded-full border border-outline-variant object-cover" data-alt="A professional headshot of a Hispanic male bank administrator in a crisp white shirt and navy blazer, soft office background, high-end corporate photography style, clean lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-yAcLlGOfIQAZZ8kNR8YmfT8ktBd5jmyb8SwJeFz-yVcuwMEUG5VMKfUe79kx3AMX432j9rHABjkRcH1qPzeHvuTbocrDYVSLYW4JSNvmTriaA9-Lsm852AxQc0VxoOogL8OirMIRRddPQtfPdCJESeeUtWYsxchJKP-3pCByc4EDigE6d8V4X2-DJ-dP7WcIKQSHQmpFCJQdJjaQN_1BKxEselwAnJe8h2PR9T0XXz5P1AZZ2VPulMotJXf2eBHl6XntN17t-nw"/>
</div>
</div>
</header>
{/* <!-- Main Dashboard Layout (3-Column) --> */}
<main class="flex-1 flex overflow-hidden">
{/* <!-- Column 1: Conversations List --> */}
<aside class="w-80 bg-surface-white border-r border-outline-variant flex flex-col">
{/* <!-- Search & Filter --> */}
<div class="p-4 border-b border-outline-variant space-y-4">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary transition-all" placeholder="Search conversations..." type="text"/>
</div>
<div class="flex gap-2">
<button class="flex-1 py-1.5 px-3 bg-primary text-surface-white text-label-md rounded-lg font-bold">Active</button>
<button class="flex-1 py-1.5 px-3 bg-surface-container-low text-on-surface-variant text-label-md rounded-lg font-bold hover:bg-surface-container-high">Pending</button>
<button class="flex-1 py-1.5 px-3 bg-surface-container-low text-on-surface-variant text-label-md rounded-lg font-bold hover:bg-surface-container-high">Closed</button>
</div>
</div>
{/* <!-- List Area --> */}
<div class="flex-1 overflow-y-auto">
{/* <!-- Chat Item Active --> */}
<div class="p-4 bg-surface-container-low border-l-4 border-primary flex gap-3 cursor-pointer">
<div class="relative h-fit">
<img class="w-12 h-12 rounded-full object-cover" data-alt="Close-up portrait of a mature woman with glasses, smiling warmly, professional studio lighting, neutral grey background, high resolution photography for banking profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLgnIIrdBuYJcNHx1SnF8kDl8pxeZyKpoejz9Hc-RhyKzHMDYUVYQLSrL67QpShJ1VoStcrlZULxrWipf3EmX9XBnsPC49OScHppqIQN-sGCILv__Z_yD5M7gepnkbSi_feUYqoot6K8jjY6bog5CuUYMxg6G_LlW-ZiQTYnAF9gQ5MrA690Jdz41hbUkx3r6o53F5RGXi_8diy-sMJ1WAK8xzK5C16FDQH6fIXCLxD6A79jK1mnfYHIg0hBuEJF6Dpa3F-k3y9fA"/>
<div class="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-surface-white"></div>
</div>
<div class="flex-1 overflow-hidden">
<div class="flex justify-between items-center mb-0.5">
<span class="font-bold text-on-surface truncate">Eleanor Vance</span>
<span class="text-[11px] text-outline">2m ago</span>
</div>
<p class="text-label-md text-primary font-semibold truncate">I'm having trouble with my transfer...</p>
<div class="mt-2 flex items-center gap-2">
<span class="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded uppercase tracking-wider">Priority</span>
<span class="text-[10px] text-on-surface-variant">ID: #49201</span>
</div>
</div>
</div>
{/* <!-- Chat Item 2 --> */}
<div class="p-4 border-b border-outline-variant flex gap-3 cursor-pointer hover:bg-surface transition-colors">
<div class="relative h-fit">
<img class="w-12 h-12 rounded-full object-cover" data-alt="Portrait of a young entrepreneur in a modern office, natural daylight, soft bokeh background, wearing a casual sweater, clean corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrAEdNe8P-4G_N1HzV5r3UUeHyUet2ugRjnOIBRkBFChmmZcga2ondyV3S_P6Y9Qo3iko9MYoGFcx77q1CHCQ9X_xO2g8BkLuTJYZIhHcBONrS2KfwokSBGZjJH_zZHNJP4hLi_lnrmMLnbHmScVm25x_dIv0zLMvUtSg49Jra-YuBT1-sb_Ud0iud74cpwMjFdmw3huloYKkfdqliJ2uO6LgqPe5w2bGOvB-czANih10-vXnjkmTEvbQHXttU52qaVBQ6BXilsv4"/>
<div class="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-surface-white"></div>
</div>
<div class="flex-1 overflow-hidden">
<div class="flex justify-between items-center mb-0.5">
<span class="font-bold text-on-surface truncate">Marcus Chen</span>
<span class="text-[11px] text-outline">15m ago</span>
</div>
<p class="text-label-md text-on-surface-variant truncate">Thank you for the update on my loan.</p>
<div class="mt-2">
<span class="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">Standard</span>
</div>
</div>
</div>
{/* <!-- Chat Item 3 --> */}
<div class="p-4 border-b border-outline-variant flex gap-3 cursor-pointer hover:bg-surface transition-colors opacity-80">
<div class="relative h-fit">
<img class="w-12 h-12 rounded-full object-cover" data-alt="Corporate headshot of a middle-aged businessman in a professional setting, blurred trading screens in background, sharp focus, professional lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRe6P-vgjqOeUgSXdgCXKobjzg2gOQyUdw1TfUaGHSiXU2f7pNgRH6TDFKO5Ix38qsHGgyGeLxJuszeCfoOdBTg2lZzHUtQlXwwyDXtaNMXr16EqzDrEWoTgnP6G6Xm2m7tcsyG6M8-nm0j1NF5Hq5mH1KtbsHV_7HdZ0YFQkg056Bx54sNbJoXChTubmWBeCqc8WIXwlVQSy_G_MFEbaV6pAqcb0b_J-7CT18Injx3ObZJcSHoSX_gsNyCD_bW7yenrd2e2qByBs"/>
</div>
<div class="flex-1 overflow-hidden">
<div class="flex justify-between items-center mb-0.5">
<span class="font-bold text-on-surface truncate">Robert Stirling</span>
<span class="text-[11px] text-outline">1h ago</span>
</div>
<p class="text-label-md text-on-surface-variant truncate">Is the global wire desk open now?</p>
<div class="mt-2">
<span class="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded uppercase tracking-wider">Urgent</span>
</div>
</div>
</div>
{/* <!-- Repeat for density --> */}
<div class="p-4 border-b border-outline-variant flex gap-3 cursor-pointer hover:bg-surface transition-colors">
<div class="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-bold">JD</div>
<div class="flex-1 overflow-hidden">
<div class="flex justify-between items-center mb-0.5">
<span class="font-bold text-on-surface truncate">Janet Doe</span>
<span class="text-[11px] text-outline">4h ago</span>
</div>
<p class="text-label-md text-on-surface-variant truncate">The app is crashing when I scan...</p>
</div>
</div>
</div>
</aside>
{/* <!-- Column 2: Chat Window --> */}
<section class="flex-1 bg-surface flex flex-col shadow-inner relative">
{/* <!-- Header --> */}
<div class="h-16 bg-surface-white border-b border-outline-variant px-6 flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="relative">
<img class="w-10 h-10 rounded-full object-cover" data-alt="Detailed portrait of Eleanor Vance, smiling, warm banking executive style, high resolution, soft lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQJPXxAZ2xL8ugIPIYCLmEvCQZSJsFTlLEDWLI2kmNzz2xKkGlhhV_k0n_WevGvcN0xevOqrGXqHrTASzO0ai0237qF3_3h_xMWtkt53BMh7pDUceFiJOm5HBWunj8kqBsxQdNLU7DEN6E2g9BkwP1EMufXHOv7pvncnxBpFriTaHkv8HKrwo3rfe5eDLejQXInTk5Zl339o09ZlxHZ1XQaGhpv-v69bQKvm-OgI2jLxeIKfkQrqs8E3UqUZLAXZQ4fmwqEvqJNZU"/>
<div class="absolute -bottom-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-surface-white"></div>
</div>
<div>
<h2 class="font-bold text-on-surface leading-tight">Eleanor Vance</h2>
<div class="flex items-center gap-1.5">
<div class="w-1.5 h-1.5 bg-secondary rounded-full"></div>
<span class="text-[11px] text-secondary font-bold uppercase tracking-tight">Active Session • 14:02 elapsed</span>
</div>
</div>
</div>
<div class="flex items-center gap-3">
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
<span class="material-symbols-outlined">call</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
<span class="material-symbols-outlined">videocam</span>
</button>
<div class="h-6 w-[1px] bg-outline-variant mx-1"></div>
<button class="px-4 py-2 border border-error text-error text-label-md font-bold rounded-lg hover:bg-error-container/20 transition-all active:scale-95">
                        End Session
                    </button>
</div>
</div>
{/* <!-- Messages Area --> */}
<div class="flex-1 overflow-y-auto p-6 space-y-6">
{/* <!-- System Message --> */}
<div class="flex justify-center">
<span class="px-4 py-1 bg-surface-container-highest text-on-surface-variant text-[11px] font-bold rounded-full uppercase">Today, 09:41 AM</span>
</div>
{/* <!-- User Message --> */}
<div class="flex items-end gap-3 max-w-[70%]">
<img class="w-8 h-8 rounded-full mb-1" data-alt="Eleanor Vance avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDslnxbCcnPlFvVfY0mcbhrLdMnlQdqqHe_qAF01ezJ3hobCs2pTRdTj_zgj8fE6-vnjvMF5jkwsaTUvJvvJU7sZmWdy7Esl0c4Km_Prm1tVo1ztdile6oYsTamlnKxl8rnrqO-51D91gHpKvvS2czf4001wS-peYRkf4HHyzUHRpUymT0LJz2s77_aV_TGdBNl0kZYf9Ah8H8wgt2d5jc3vvYJMZCJ3K7_pUXdvWeQr0gcOgvo9udq1HeNrcxYwGFEuBsZkEyUWcQ"/>
<div class="chat-bubble-user bg-surface-container-low p-4 rounded-xl rounded-bl-none shadow-sm border border-outline-variant/30">
<p class="text-body-md text-on-surface">Hello, I'm trying to initiate a wire transfer to a new vendor in France, but I keep getting a 'Transaction Limit Exceeded' error even though my daily limit is $50k. The amount is only $12k.</p>
<span class="block text-right text-[10px] text-outline mt-1">09:42 AM</span>
</div>
</div>
{/* <!-- Admin Message --> */}
<div class="flex items-end gap-3 max-w-[70%] ml-auto flex-row-reverse">
<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-surface-white text-[10px] font-bold mb-1">AR</div>
<div class="bg-primary p-4 rounded-xl rounded-br-none shadow-md">
<p class="text-body-md text-surface-white">Good morning, Ms. Vance. I'm Alex from the Priority Support Desk. I'll be happy to look into this for you. Could you please confirm the last 4 digits of the account you're sending from?</p>
<span class="block text-right text-[10px] text-primary-fixed-dim mt-1">09:43 AM</span>
</div>
</div>
{/* <!-- User Message --> */}
<div class="flex items-end gap-3 max-w-[70%]">
<img class="w-8 h-8 rounded-full mb-1" data-alt="Eleanor Vance avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD3vMd1Y_K7drViicbheEdkbpAcJ_MzabS5WXuplmNPVU_dF8v3D4KoNHs-uUnaJg216NfB7YLwZKlwssYxYKV89HCyeT5-VWN0BT1m_z4dcq5CBHrXh545Kd8C4z2Rcozn11tuT2wBfgyd3agg16uQbdpJ3WQgUIfhgxVvsOiv61p97SNWjbw0JFXSxJOLPCnNQh9zzOW3W7ce0oPWe7zB35dTOs_UXTunqGAqj5vE376P3GOva8iG-aUn-UByz0bWk4pXHsPptY"/>
<div class="chat-bubble-user bg-surface-container-low p-4 rounded-xl rounded-bl-none shadow-sm border border-outline-variant/30">
<p class="text-body-md text-on-surface">Sure, it's account ending in 8842. I need this to go out by noon EST for the vendor's payment window.</p>
<span class="block text-right text-[10px] text-outline mt-1">09:44 AM</span>
</div>
</div>
{/* <!-- Typing Indicator (Simulated) --> */}
<div class="flex items-end gap-3 ml-auto flex-row-reverse">
<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-surface-white text-[10px] font-bold mb-1">AR</div>
<div class="bg-surface-container-highest px-4 py-3 rounded-xl rounded-br-none italic text-on-surface-variant text-[12px] flex items-center gap-2">
<span>Alex is typing</span>
<div class="flex gap-1">
<span class="w-1 h-1 bg-outline rounded-full animate-bounce"></span>
<span class="w-1 h-1 bg-outline rounded-full animate-bounce [animation-delay:0.2s]"></span>
<span class="w-1 h-1 bg-outline rounded-full animate-bounce [animation-delay:0.4s]"></span>
</div>
</div>
</div>
</div>
{/* <!-- Footer / Input --> */}
<div class="p-6 bg-surface-white border-t border-outline-variant space-y-4">
{/* <!-- Quick Shortcuts --> */}
<div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
<button class="whitespace-nowrap px-3 py-1 bg-surface-container text-primary text-[12px] font-bold rounded-lg border border-primary/20 hover:bg-primary-container hover:text-surface-white transition-all">Verify Identity</button>
<button class="whitespace-nowrap px-3 py-1 bg-surface-container text-primary text-[12px] font-bold rounded-lg border border-primary/20 hover:bg-primary-container hover:text-surface-white transition-all">Reset Transfer Limit</button>
<button class="whitespace-nowrap px-3 py-1 bg-surface-container text-primary text-[12px] font-bold rounded-lg border border-primary/20 hover:bg-primary-container hover:text-surface-white transition-all">Escalate to Tech</button>
<button class="whitespace-nowrap px-3 py-1 bg-surface-container text-primary text-[12px] font-bold rounded-lg border border-primary/20 hover:bg-primary-container hover:text-surface-white transition-all">Request Document</button>
</div>
{/* <!-- Input Area --> */}
<div class="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
<textarea class="w-full min-h-[100px] border-none focus:ring-0 resize-none text-body-md bg-transparent p-2" id="chat-input" placeholder="Type your response here..."></textarea>
<div class="flex items-center justify-between border-t border-outline-variant/30 pt-2 px-2">
<div class="flex items-center gap-1">
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors" title="Attach Files">
<span class="material-symbols-outlined">attach_file</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors" title="Canned Responses">
<span class="material-symbols-outlined">auto_awesome</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors" title="Emoji">
<span class="material-symbols-outlined">mood</span>
</button>
</div>
<button class="bg-primary text-surface-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-md">
<span>Send</span>
<span class="material-symbols-outlined text-[18px]">send</span>
</button>
</div>
</div>
</div>
</section>
{/* <!-- Column 3: User Context --> */}
<aside class="w-80 bg-surface-white border-l border-outline-variant flex flex-col p-6 space-y-8 overflow-y-auto">
{/* <!-- Profile Overview --> */}
<div class="text-center space-y-3">
<img class="w-24 h-24 rounded-full mx-auto border-2 border-primary/20 p-1" data-alt="Eleanor Vance detailed portrait, banking client photo, clear focus, professional aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrRIhXx7b3slEzMMZZ_QfBIZBXR0GiotPDB8zi4QYC7m84LVpsYSs4jKluJJ7yiQiVFzGDKTQZQGk4T99rY764iNQzmNjfxM_7FWF9gM9UCZD3CFszLCJ869wRzTnP-iTYttPhqDgY5J_IGWE6VgK22GD9Aa7ukVX3MK3bEkC4gj3V7xkptlyIXK4wxbk7SeJ7EAopLwcOTj17ufh6ppGzNaURnRG7TAYfLVNvWUrgzLNWY_NqbGUK8oL1GvfBSYsF5pwcVPVkY5k"/>
<div>
<h3 class="font-headline-sm text-[20px] font-bold text-on-surface">Eleanor Vance</h3>
<p class="text-label-md text-on-surface-variant">Member since Oct 2018</p>
</div>
<div class="flex justify-center gap-2">
<span class="px-3 py-1 bg-secondary-container text-on-secondary-container text-[11px] font-bold rounded-full uppercase tracking-wider">Platinum Tier</span>
<span class="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[11px] font-bold rounded-full uppercase tracking-wider">Verified</span>
</div>
</div>
{/* <!-- Details List --> */}
<div class="space-y-4">
<h4 class="text-label-md font-bold text-primary uppercase tracking-widest border-b border-outline-variant pb-2">User Information</h4>
<div class="space-y-3">
<div class="flex justify-between items-center">
<span class="text-on-surface-variant text-[13px]">Account ID</span>
<span class="font-mono text-[13px] font-bold">FIN-8829-X</span>
</div>
<div class="flex justify-between items-center">
<span class="text-on-surface-variant text-[13px]">Main Balance</span>
<span class="font-bold text-secondary">$142,502.20</span>
</div>
<div class="flex justify-between items-center">
<span class="text-on-surface-variant text-[13px]">Location</span>
<span class="text-[13px]">London, UK</span>
</div>
<div class="flex justify-between items-center">
<span class="text-on-surface-variant text-[13px]">Risk Score</span>
<div class="flex gap-1">
<div class="w-2 h-2 rounded-full bg-secondary"></div>
<div class="w-2 h-2 rounded-full bg-secondary"></div>
<div class="w-2 h-2 rounded-full bg-outline-variant"></div>
<div class="w-2 h-2 rounded-full bg-outline-variant"></div>
<div class="w-2 h-2 rounded-full bg-outline-variant"></div>
</div>
</div>
</div>
</div>
{/* <!-- Recent Activity --> */}
<div class="space-y-4">
<h4 class="text-label-md font-bold text-primary uppercase tracking-widest border-b border-outline-variant pb-2">Recent Activity</h4>
<div class="space-y-4">
<div class="flex gap-3">
<div class="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"></div>
<div>
<p class="text-[13px] font-bold">Logged in (Web)</p>
<p class="text-[11px] text-on-surface-variant">Today, 09:38 AM</p>
</div>
</div>
<div class="flex gap-3">
<div class="mt-1 w-2 h-2 rounded-full bg-error shrink-0"></div>
<div>
<p class="text-[13px] font-bold">Failed Transfer ($12,000)</p>
<p class="text-[11px] text-on-surface-variant">Today, 09:40 AM</p>
</div>
</div>
<div class="flex gap-3">
<div class="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"></div>
<div>
<p class="text-[13px] font-bold">Card Swiped (Tesco)</p>
<p class="text-[11px] text-on-surface-variant">Yesterday, 18:22 PM</p>
</div>
</div>
</div>
</div>
{/* <!-- Quick Actions --> */}
<div class="pt-4 space-y-3">
<button class="w-full py-3 bg-surface-container-low border border-outline-variant text-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[20px]">person</span>
                    View Full Profile
                </button>
<button class="w-full py-3 bg-surface-container-low border border-outline-variant text-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                    Audit Ledger
                </button>
</div>
</aside>
</main>
{/* <!-- Internal Footer --> */}
<footer class="bg-deep-teal h-10 w-full px-gutter flex justify-between items-center z-50">
<p class="text-surface-white text-[11px] opacity-70">© 2024 FinSecure Banking Systems. Internal Use Only.</p>
<div class="flex items-center gap-6">
<a class="text-surface-white text-[11px] opacity-70 hover:opacity-100 transition-opacity" href="#">System Status: <span class="text-secondary font-bold">Operational</span></a>
<a class="text-surface-white text-[11px] opacity-70 hover:opacity-100 transition-opacity" href="#">Security Policy</a>
<a class="text-surface-white text-[11px] opacity-70 hover:opacity-100 transition-opacity" href="#">Help Desk</a>
</div>
</footer>

</body>
  )
}



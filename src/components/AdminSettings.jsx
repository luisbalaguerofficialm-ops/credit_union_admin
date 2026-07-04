import React from 'react'

const AdminSettings = () => {
  return (
   <body class="flex min-h-screen">

{/* <!-- Main Content Area --> */}
<main class="flex-1 flex flex-col min-h-screen">
{/* <!-- TopNavBar --> */}
<header class="bg-surface-white dark:bg-inverse-surface border-b border-outline-variant dark:border-outline w-full h-16 flex justify-between items-center px-gutter sticky top-0 z-40 flat no shadows">
<div class="flex items-center gap-4">
<span class="text-headline-sm font-headline-sm text-primary dark:text-inverse-primary">Trust &amp; Growth Admin</span>
</div>
<div class="flex items-center gap-6">
<div class="relative">
<span class="absolute inset-y-0 left-0 pl-3 flex items-center text-outline">
<span class="material-symbols-outlined text-[20px]">search</span>
</span>
<input class="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-body-md focus:ring-1 focus:ring-primary w-64" placeholder="Search settings..." type="text"/>
</div>
<div class="flex items-center gap-4">
<button class="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200 cursor-pointer">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200 cursor-pointer">
<span class="material-symbols-outlined">help</span>
</button>
<button class="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200 cursor-pointer">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="h-8 w-px bg-outline-variant mx-2"></div>
<button class="text-body-md font-body-md text-primary hover:underline cursor-pointer">Sign Out</button>
</div>
</div>
</header>
{/* <!-- Canvas Container --> */}
<div class="p-gutter max-w-container-max mx-auto w-full space-y-gutter">
{/* <!-- Page Header --> */}
<div class="flex justify-between items-end pb-4 border-b border-outline-variant">
<div>
<h2 class="text-headline-md font-headline-md text-on-surface">System Settings</h2>
<p class="text-body-md font-body-md text-on-surface-variant">Manage global branch configurations, security protocols, and automated communications.</p>
</div>
<div class="flex gap-3">
<button class="px-6 py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-surface-container-low transition-colors">Discard Changes</button>
<button class="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary-container transition-colors">Save All Changes</button>
</div>
</div>
{/* <!-- Settings Grid --> */}
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
{/* <!-- Section: General Settings --> */}
<section class="settings-card rounded-xl p-8 flex flex-col h-full">
<div class="flex justify-between items-center mb-8">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-[32px]">apartment</span>
<h3 class="text-headline-sm font-headline-sm text-on-surface">General Settings</h3>
</div>
<button class="text-primary font-label-md flex items-center gap-1 hover:underline">
<span class="material-symbols-outlined text-[18px]">edit</span> Edit
                        </button>
</div>
<div class="space-y-6 flex-1">
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">Branch Name</label>
<input class="form-input bg-surface-container-lowest" readonly="" type="text" value="Trust &amp; Growth Regional Branch 04"/>
</div>
<div class="grid grid-cols-2 gap-4">
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">Regional Code</label>
<input class="form-input bg-surface-container-lowest" readonly="" type="text" value="RG-04-NORTH"/>
</div>
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">Entity ID</label>
<input class="form-input bg-surface-container-lowest" readonly="" type="text" value="CU-88294-X"/>
</div>
</div>
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">Primary Contact Email</label>
<input class="form-input bg-surface-container-lowest" readonly="" type="email" value="admin.branch04@tgcu.example.com"/>
</div>
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">Support Phone Line</label>
<input class="form-input bg-surface-container-lowest" readonly="" type="tel" value="+1 (555) 012-3456"/>
</div>
</div>
</section>
{/* <!-- Section: Communication Preferences --> */}
<section class="settings-card rounded-xl p-8 flex flex-col h-full">
<div class="flex justify-between items-center mb-8">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-[32px]">hub</span>
<h3 class="text-headline-sm font-headline-sm text-on-surface">Communication</h3>
</div>
<button class="text-primary font-label-md flex items-center gap-1 hover:underline">
<span class="material-symbols-outlined text-[18px]">edit</span> Edit
                        </button>
</div>
<div class="space-y-6 flex-1">
<div class="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
<div class="flex items-center justify-between mb-2">
<label class="text-body-md font-bold text-on-surface">System Alert Emails</label>
<span class="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold rounded">Active</span>
</div>
<p class="text-label-md text-on-surface-variant mb-4">Route critical infrastructure alerts to the engineering distribution list.</p>
<input class="form-input bg-surface-white" readonly="" type="text" value="ops-alerts@tgcu.example.com"/>
</div>
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">SMS Notification Gateway</label>
<select class="form-input bg-surface-container-lowest" disabled="">
<option>Twilio Global API (Default)</option>
<option>MessageBird Regional</option>
<option>Internal Relay</option>
</select>
</div>
<div class="pt-4 space-y-4">
<div class="flex items-center justify-between">
<span class="text-body-md text-on-surface">Weekly Performance Summaries</span>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" disabled="" type="checkbox"/>
<div class="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div class="flex items-center justify-between">
<span class="text-body-md text-on-surface">Client Transaction Push Alerts</span>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" disabled="" type="checkbox"/>
<div class="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>
</section>
{/* <!-- Section: Security & Compliance --> */}
<section class="settings-card rounded-xl p-8 lg:col-span-2">
<div class="flex justify-between items-center mb-8">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-[32px]">gpp_good</span>
<h3 class="text-headline-sm font-headline-sm text-on-surface">Security &amp; Compliance</h3>
</div>
<button class="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">verified_user</span> Manage Security Protocol
                        </button>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* <!-- Admin Access --> */}
<div class="space-y-4 border-r border-outline-variant/30 pr-8">
<h4 class="text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Access Control</h4>
<div class="space-y-4">
<div class="flex flex-col gap-1">
<span class="text-body-md font-bold text-on-surface">2FA Enforcement</span>
<p class="text-label-md text-on-surface-variant">Mandatory for all admin-level accounts across all devices.</p>
<span class="mt-2 text-primary font-bold flex items-center gap-1 text-label-md">
<span class="material-symbols-outlined text-[16px]">lock</span> Hardware Token Required
                                    </span>
</div>
<div class="flex flex-col gap-1">
<span class="text-body-md font-bold text-on-surface">Session Timeout</span>
<p class="text-label-md text-on-surface-variant">Automatic logout after period of inactivity.</p>
<div class="mt-2 font-bold text-primary">15 Minutes</div>
</div>
</div>
</div>
{/* <!-- Password Policy --> */}
<div class="space-y-4 border-r border-outline-variant/30 pr-8">
<h4 class="text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Password Complexity</h4>
<ul class="space-y-3">
<li class="flex items-center gap-2 text-label-md text-on-surface">
<span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                                    Minimum 14 characters
                                </li>
<li class="flex items-center gap-2 text-label-md text-on-surface">
<span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                                    Special characters &amp; symbols
                                </li>
<li class="flex items-center gap-2 text-label-md text-on-surface">
<span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                                    Rotate every 60 days
                                </li>
<li class="flex items-center gap-2 text-label-md text-on-surface">
<span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                                    No reuse of last 10 passwords
                                </li>
</ul>
</div>
{/* <!-- Audit & Logging --> */}
<div class="space-y-4">
<h4 class="text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Audit &amp; Data</h4>
<div class="p-4 bg-surface-container rounded-lg">
<span class="text-label-md font-bold text-on-surface block mb-1">Logging Level</span>
<p class="text-label-md text-on-surface-variant mb-4">Current state: Full Verbose Forensic Logging.</p>
<button class="text-primary font-label-md hover:underline flex items-center gap-1">
                                    View Audit Logs <span class="material-symbols-outlined text-[16px]">open_in_new</span>
</button>
</div>
<div class="p-4 border border-error/20 bg-error-container/10 rounded-lg">
<span class="text-label-md font-bold text-error block mb-1">Data Retention</span>
<p class="text-label-md text-on-surface-variant">Financial records are retained for 7 years as per regulation.</p>
</div>
</div>
</div>
</section>
</div>
</div>
{/* <!-- Footer --> */}
<footer class="bg-deep-teal text-surface-white w-full mt-auto">
<div class="flex justify-between items-center px-gutter py-section-padding-sm w-full">
<div class="space-y-1">
<div class="text-body-md font-bold text-surface-white">Trust &amp; Growth Credit Union</div>
<p class="text-label-md font-label-md text-surface-variant/80">© 2024 Trust &amp; Growth Credit Union. Secure Administrative Environment.</p>
</div>
<div class="flex gap-8">
<a class="text-label-md font-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="#">Privacy Policy</a>
<a class="text-label-md font-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="#">Audit Terms</a>
<a class="text-label-md font-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="#">System Status</a>
</div>
</div>
</footer>
</main>

</body>
  )
}



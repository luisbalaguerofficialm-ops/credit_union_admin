import React from 'react'

const AdminProfile = () => {
  return (
   <body class="bg-background font-body-md text-on-surface">
{/* <!-- TopNavBar --> */}
{/* <header class="bg-surface-white dark:bg-inverse-surface border-b border-outline-variant dark:border-outline w-full h-16 flex justify-between items-center px-gutter sticky top-0 z-50">
<div class="flex items-center gap-8">
<h1 class="text-headline-sm font-headline-sm text-primary dark:text-inverse-primary">Trust &amp; Growth Admin</h1>
<div class="hidden md:flex items-center gap-6">
<span class="text-on-surface-variant cursor-pointer hover:bg-surface-container-low transition-colors duration-200 px-3 py-2 rounded">Dashboard</span>
<span class="text-on-surface-variant cursor-pointer hover:bg-surface-container-low transition-colors duration-200 px-3 py-2 rounded">Users</span>
<span class="text-primary font-bold border-b-2 border-primary px-3 py-2">Profile</span>
</div>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary cursor-pointer active:opacity-80">notifications</span>
<span class="material-symbols-outlined text-primary cursor-pointer active:opacity-80">help</span>
<span class="material-symbols-outlined text-primary cursor-pointer active:opacity-80">settings</span>
</div>
<div class="h-8 w-[1px] bg-outline-variant mx-2"></div>
<button class="text-label-md font-label-md text-primary hover:underline transition-all">Sign Out</button>
</div>
</header> */}
<div class="flex min-h-screen">
{/* <!-- SideNavBar (Hidden on Mobile) --> */}
<aside class="hidden lg:flex w-64 flex-col h-screen fixed left-0 top-16 bg-deep-teal dark:bg-on-surface py-6 px-4 gap-2 shadow-md">
<div class="mb-6 px-2">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-white flex items-center justify-center">
<span class="material-symbols-outlined text-deep-teal">account_balance</span>
</div>
<div>
<p class="text-label-md font-label-md text-surface-white">CU Admin Console</p>
<p class="text-[10px] text-surface-variant uppercase tracking-wider">Regional Branch 04</p>
</div>
</div>
</div>
<nav class="flex flex-col gap-1">
<div class="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-surface-white hover:bg-primary/50 transition-all duration-200 cursor-pointer rounded-lg">
<span class="material-symbols-outlined">dashboard</span>
<span class="text-label-md font-label-md">Dashboard</span>
</div>
<div class="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-surface-white hover:bg-primary/50 transition-all duration-200 cursor-pointer rounded-lg">
<span class="material-symbols-outlined">group</span>
<span class="text-label-md font-label-md">Users</span>
</div>
<div class="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-surface-white hover:bg-primary/50 transition-all duration-200 cursor-pointer rounded-lg">
<span class="material-symbols-outlined">receipt_long</span>
<span class="text-label-md font-label-md">Transactions</span>
</div>
<div class="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-surface-white hover:bg-primary/50 transition-all duration-200 cursor-pointer rounded-lg">
<span class="material-symbols-outlined">account_balance</span>
<span class="text-label-md font-label-md">Loans</span>
</div>
<div class="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-surface-white hover:bg-primary/50 transition-all duration-200 cursor-pointer rounded-lg">
<span class="material-symbols-outlined">assessment</span>
<span class="text-label-md font-label-md">Reports</span>
</div>
<div class="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg cursor-pointer">
<span class="material-symbols-outlined">settings_applications</span>
<span class="text-label-md font-label-md">System Settings</span>
</div>
</nav>
<div class="mt-auto pt-6 border-t border-surface-variant/20 flex flex-col gap-1">
<button class="w-full py-3 bg-secondary-fixed text-on-secondary-fixed text-label-md font-bold rounded-lg mb-4 hover:opacity-90 active:scale-95 transition-all">
                    New Support Ticket
                </button>
<div class="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-surface-white cursor-pointer transition-colors">
<span class="material-symbols-outlined">security</span>
<span class="text-label-md font-label-md">Security Logs</span>
</div>
<div class="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-surface-white cursor-pointer transition-colors">
<span class="material-symbols-outlined">contact_support</span>
<span class="text-label-md font-label-md">Help Center</span>
</div>
</div>
</aside>
{/* <!-- Main Content Canvas --> */}
<main class="flex-1 lg:ml-64 p-6 lg:p-10 max-w-7xl mx-auto">
{/* <!-- Profile Header Card --> */}
<section class="bg-surface-white rounded-xl border border-outline-variant p-8 mb-8 shadow-sm">
<div class="flex flex-col md:flex-row items-center md:items-start gap-8">
<div class="relative group">
<div class="w-32 h-32 rounded-full border-4 border-surface-container overflow-hidden bg-surface-container-low flex items-center justify-center">
<img class="w-full h-full object-cover" data-alt="A professional headshot of a senior male system administrator in his late 40s wearing a clean, dark navy blazer over a crisp white shirt. He has a friendly but authoritative expression, with short salt-and-pepper hair and glasses. The background is a soft-focus modern corporate office with teal and white accents, reflecting a secure and stable banking environment. High-key natural lighting creates a bright, trustworthy aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxb5Dw35T-yM652hBX0AMI0wZ8BhafONBlq-EdogXTpqjbGrP9vHNDv2MVQVni1pc6oLrU3iTt3jGHAYXyurjXbwxiZ1stORXmPJWKUylRoN06uwrZLN2H1MxXKINaAFuPy_UyHKsFBu3XPcbLtukAIx1DLBcYOFZn8OC2Ooohe2iSTfULcjfzaghIQRHaLOXygwx_3Zg5uCwo79Zco4do-OVZfZQHdzVv8yZJydn7Pv-evYXATfvbGq_jprVbw9xLB1nPvMd_tVo"/>
</div>
<button class="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">
<span class="material-symbols-outlined text-[20px]">photo_camera</span>
</button>
</div>
<div class="flex-1 text-center md:text-left">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 class="text-headline-md font-headline-md text-on-surface">Marcus Sterling</h2>
<p class="text-body-lg text-primary font-medium">Senior System Administrator</p>
<div class="flex items-center justify-center md:justify-start gap-3 mt-2">
<span class="bg-surface-container text-primary text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Admin ID: TG-88402</span>
<span class="bg-secondary-container text-on-secondary-container text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
</div>
</div>
<button class="bg-primary text-on-primary font-label-md px-6 py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">edit</span>
                                Change Photo
                            </button>
</div>
</div>
</div>
</section>
{/* <!-- Grid Layout for Settings --> */}
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
{/* <!-- Login Information & Notification Settings (Column 1) --> */}
<div class="flex flex-col gap-8">
{/* <!-- Login Information --> */}
<section class="bg-surface-white rounded-xl border border-outline-variant p-6 shadow-sm">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-primary">key</span>
<h3 class="text-headline-sm font-headline-sm">Login Information</h3>
</div>
<div class="space-y-6">
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">Email Address</label>
<div class="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
<span class="text-body-md font-medium">m.sterling@trustgrowth.cu</span>
<span class="material-symbols-outlined text-outline cursor-pointer hover:text-primary">edit</span>
</div>
</div>
<div>
<label class="block text-label-md font-label-md text-on-surface-variant mb-2">Security Level</label>
<div class="flex items-center gap-2 text-primary font-bold">
<span class="material-symbols-outlined">verified_user</span>
<span>Level 4 - Tier 1 Administrative Access</span>
</div>
</div>
<button class="w-full py-3 bg-surface-container-high text-primary font-bold rounded-lg border border-primary/20 hover:bg-primary hover:text-on-primary transition-all duration-300">
                                Change Password
                            </button>
</div>
</section>
{/* <!-- Notification Settings --> */}
<section class="bg-surface-white rounded-xl border border-outline-variant p-6 shadow-sm">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-primary">notifications_active</span>
<h3 class="text-headline-sm font-headline-sm">Notification Settings</h3>
</div>
<div class="space-y-5">
<div class="flex items-center justify-between">
<div>
<p class="font-bold text-on-surface">Security Alerts</p>
<p class="text-label-md text-on-surface-variant">Notify me of failed login attempts</p>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div class="flex items-center justify-between">
<div>
<p class="font-bold text-on-surface">Transaction Monitoring</p>
<p class="text-label-md text-on-surface-variant">Alert for high-value loan approvals</p>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div class="flex items-center justify-between">
<div>
<p class="font-bold text-on-surface">System Health</p>
<p class="text-label-md text-on-surface-variant">Infrastructure performance updates</p>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</section>
</div>
{/* <!-- Activity Log (Column 2) --> */}
<section class="bg-surface-white rounded-xl border border-outline-variant p-6 shadow-sm h-full flex flex-col">
<div class="flex items-center justify-between mb-6">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">history</span>
<h3 class="text-headline-sm font-headline-sm">Activity Log</h3>
</div>
<button class="text-label-md text-primary font-bold hover:underline">View All</button>
</div>
<div class="flex-1 relative">
{/* <!-- Vertical Line for Timeline --> */}
<div class="absolute left-[21px] top-4 bottom-4 w-[2px] bg-surface-container"></div>
<div class="space-y-8 relative">
<div class="flex gap-4">
<div class="z-10 w-11 h-11 rounded-full bg-primary-container flex items-center justify-center border-4 border-surface-white">
<span class="material-symbols-outlined text-on-primary-container text-[18px]">lock_reset</span>
</div>
<div class="flex-1">
<p class="text-body-md font-bold">Admin Password Reset Initiated</p>
<p class="text-label-md text-on-surface-variant">User ID: TG-4421 (Branch 02)</p>
<p class="text-[12px] text-outline mt-1 italic">Today, 09:14 AM</p>
</div>
</div>
<div class="flex gap-4">
<div class="z-10 w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface-white">
<span class="material-symbols-outlined text-on-secondary-container text-[18px]">verified</span>
</div>
<div class="flex-1">
<p class="text-body-md font-bold">High-Value Loan Approval Override</p>
<p class="text-label-md text-on-surface-variant">Transaction ID: #TXN-901-2248</p>
<p class="text-[12px] text-outline mt-1 italic">Yesterday, 04:32 PM</p>
</div>
</div>
<div class="flex gap-4">
<div class="z-10 w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center border-4 border-surface-white">
<span class="material-symbols-outlined text-primary text-[18px]">update</span>
</div>
<div class="flex-1">
<p class="text-body-md font-bold">System Configuration Updated</p>
<p class="text-label-md text-on-surface-variant">Updated security protocols for API endpoint v2.4</p>
<p class="text-[12px] text-outline mt-1 italic">Oct 14, 11:05 AM</p>
</div>
</div>
<div class="flex gap-4">
<div class="z-10 w-11 h-11 rounded-full bg-error-container flex items-center justify-center border-4 border-surface-white">
<span class="material-symbols-outlined text-on-error-container text-[18px]">warning</span>
</div>
<div class="flex-1">
<p class="text-body-md font-bold">Access Denied Incident Review</p>
<p class="text-label-md text-on-surface-variant">Reviewed brute force attempt on Node server #04</p>
<p class="text-[12px] text-outline mt-1 italic">Oct 13, 08:45 PM</p>
</div>
</div>
<div class="flex gap-4">
<div class="z-10 w-11 h-11 rounded-full bg-primary-container flex items-center justify-center border-4 border-surface-white">
<span class="material-symbols-outlined text-on-primary-container text-[18px]">group_add</span>
</div>
<div class="flex-1">
<p class="text-body-md font-bold">New Auditor Account Created</p>
<p class="text-label-md text-on-surface-variant">Profile set for External Audit Team B</p>
<p class="text-[12px] text-outline mt-1 italic">Oct 12, 02:22 PM</p>
</div>
</div>
</div>
</div>
</section>
</div>
</main>
</div>
{/* <!-- Footer --> */}
<footer class="bg-deep-teal dark:bg-on-surface w-full mt-auto flex flex-col md:flex-row justify-between items-center px-gutter py-6 text-surface-white border-t border-deep-teal/20">
<div class="flex flex-col gap-1 mb-4 md:mb-0">
<p class="text-body-md font-bold text-surface-white uppercase tracking-wider">Trust &amp; Growth Credit Union</p>
<p class="text-label-md opacity-70">© 2024. Secure Administrative Environment.</p>
</div>
<div class="flex gap-6">
<span class="text-label-md font-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer">Privacy Policy</span>
<span class="text-label-md font-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer">Audit Terms</span>
<span class="text-label-md font-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer">System Status</span>
</div>
</footer>

</body>
  )
}



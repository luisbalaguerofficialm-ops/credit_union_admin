import React from 'react'

const UserProfile = () => {
  return (
    <body class="bg-background text-on-background">

{/* <header class="fixed top-0 right-0 h-16 bg-surface dark:bg-on-surface border-b border-outline-variant dark:border-outline z-40 flex justify-between items-center px-gutter w-full">
<div class="flex items-center gap-4">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="pl-10 pr-4 py-1.5 rounded-lg border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-primary transition-all w-64 text-sm" placeholder="Search members..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="relative scale-95 active:scale-90 transition-all text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<button class="scale-95 active:scale-90 transition-all text-on-surface-variant hover:text-primary">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="h-8 w-px bg-outline-variant mx-2"></div>
<div class="flex items-center gap-3">
<span class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed leading-none">CU Portal</span>
</div>
</div>
</header> */}
{/* <!-- Main Content Area --> */}
<main class="pt-16 min-h-screen flex flex-col">
<div class="p-gutter max-w-7xl mx-auto w-full">
{/* <!-- Breadcrumbs & Actions --> */}
<div class="flex justify-between items-center mb-6">
<nav class="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<a class="hover:text-primary" href="#">Dashboard</a>
<span class="material-symbols-outlined text-sm">chevron_right</span>
<a class="hover:text-primary" href="#">Users</a>
<span class="material-symbols-outlined text-sm">chevron_right</span>
<span class="text-primary font-bold">Member Profile</span>
</nav>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 border border-outline rounded text-primary font-label-md hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-sm">print</span>
                        Print Statement
                    </button>
<button class="flex items-center gap-2 px-4 py-2 bg-primary-container text-white rounded font-label-md hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined text-sm">edit</span>
                        Modify Record
                    </button>
</div>
</div>
{/* <!-- Profile Header Card --> */}
<div class="bg-surface-white border border-outline-variant rounded-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
<div class="flex items-center gap-6">
<div class="w-20 h-20 rounded-full border-4 border-surface-container-high overflow-hidden flex-shrink-0 bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A professional studio portrait of a middle-aged man with a friendly expression, wearing a navy blue blazer. The background is a soft, out-of-focus modern office setting with warm daylight. High-density professional aesthetic, corporate style with a clean white-space driven layout." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM000shm0m9lxurIbV9mjD4y9S-RUYlYR8_anamOmHM1JAZ4P1E9SWsaq85pugnz9Lx-QoFOVl0zMUXajdtza8IFlqo__qEFe5diNRAqYOhU4YlvaX2WJexmkoPRWrxemwUVMp48GRA7lYcrXk2VoqcQfyWHOQr8iCSG6FuxdJyaRZn9H2_YNQ_IR3iMItAL8jDPbP0KLptmG0bSo9N9VHolKyMeqVBpcEd17yPIepce2lcKqrTvXYgw5YBZtAVhl5GiJAcHen5jI"/>
</div>
<div>
<h2 class="font-headline-sm text-headline-sm text-primary">Jonathan R. Sterling</h2>
<div class="flex items-center gap-4 mt-1 text-on-surface-variant">
<span class="flex items-center gap-1 font-body-md text-body-md">
<span class="material-symbols-outlined text-sm">fingerprint</span>
                                ID: 4882-9012-CX
                            </span>
<span class="w-1 h-1 bg-outline rounded-full"></span>
<span class="flex items-center gap-1 font-body-md text-body-md">
<span class="material-symbols-outlined text-sm">calendar_today</span>
                                Member since 2014
                            </span>
</div>
</div>
</div>
<div class="mt-4 md:mt-0 flex flex-col items-end gap-2">
<span class="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
<span class="w-2 h-2 bg-secondary rounded-full"></span>
                        Active Status
                    </span>
<p class="text-xs text-on-surface-variant">Last active: 2 hours ago via Web Portal</p>
</div>
</div>
{/* <!-- Grid Layout for Details --> */}
<div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
{/* <!-- Left Column: Personal Details --> */}
<div class="lg:col-span-1 space-y-gutter">
<section class="bg-surface-white border border-outline-variant rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
<div class="flex items-center justify-between mb-4">
<h3 class="font-headline-sm text-lg text-primary flex items-center gap-2">
<span class="material-symbols-outlined">person_outline</span>
                                Personal Details
                            </h3>
</div>
<div class="space-y-4">
<div>
<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-tight mb-1">Full Name</label>
<p class="text-on-surface font-body-md">Jonathan Reed Sterling</p>
</div>
<div>
<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-tight mb-1">Email Address</label>
<p class="text-on-surface font-body-md">j.sterling@example.com</p>
</div>
<div>
<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-tight mb-1">Primary Phone</label>
<p class="text-on-surface font-body-md">+1 (555) 902-4412</p>
</div>
<div>
<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-tight mb-1">Home Address</label>
<p class="text-on-surface font-body-md leading-relaxed">
                                    1280 Corporate Way, Suite 400<br/>
                                    Charlotte, NC 28202
                                </p>
</div>
<div class="pt-2">
<button class="text-primary font-label-md flex items-center gap-1 hover:underline">
<span class="material-symbols-outlined text-sm">history</span>
                                    View Address History
                                </button>
</div>
</div>
</section>
{/* <!-- Security Controls --> */}
<section class="bg-surface-white border border-outline-variant rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
<h3 class="font-headline-sm text-lg text-primary mb-4 flex items-center gap-2">
<span class="material-symbols-outlined">security</span>
                            Security Controls
                        </h3>
<div class="grid grid-cols-1 gap-3">
<button class="w-full flex justify-between items-center px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-high transition-colors text-sm font-semibold">
                                Reset Password
                                <span class="material-symbols-outlined text-on-surface-variant">lock_reset</span>
</button>
<button class="w-full flex justify-between items-center px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-high transition-colors text-sm font-semibold">
                                Multi-Factor Auth Settings
                                <span class="material-symbols-outlined text-on-surface-variant">verified_user</span>
</button>
<button class="w-full flex justify-between items-center px-4 py-3 bg-error-container text-on-error-container border border-error/20 rounded-lg hover:bg-error/10 transition-colors text-sm font-bold">
                                Freeze All Accounts
                                <span class="material-symbols-outlined">ac_unit</span>
</button>
</div>
</section>
</div>
{/* <!-- Right Column: Account Overview & Transactions --> */}
<div class="lg:col-span-2 space-y-gutter">
{/* <!-- Account Overview (Bento Style) --> */}
<section class="bg-surface-white border border-outline-variant rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
<div class="flex items-center justify-between mb-6">
<h3 class="font-headline-sm text-lg text-primary flex items-center gap-2">
<span class="material-symbols-outlined">account_balance_wallet</span>
                                Account Overview
                            </h3>
<button class="text-primary font-label-md flex items-center gap-1">
                                Open New Account
                                <span class="material-symbols-outlined text-sm">add_circle</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
{/* <!-- Savings Card --> */}
<div class="p-5 border border-outline-variant rounded-lg bg-sky-tint relative overflow-hidden">
<div class="absolute top-0 right-0 p-4 opacity-10">
<span class="material-symbols-outlined text-5xl">savings</span>
</div>
<p class="text-xs font-bold text-on-surface-variant uppercase mb-1">Primary Savings</p>
<p class="text-xs text-outline mb-4">Acc: ****9012</p>
<p class="text-2xl font-bold text-primary">$42,105.82</p>
<p class="text-xs text-secondary font-semibold mt-2 flex items-center gap-1">
<span class="material-symbols-outlined text-xs">trending_up</span>
                                    2.4% APY
                                </p>
</div>
{/* <!-- Checking Card --> */}
<div class="p-5 border border-outline-variant rounded-lg bg-sky-tint relative overflow-hidden">
<div class="absolute top-0 right-0 p-4 opacity-10">
<span class="material-symbols-outlined text-5xl">payments</span>
</div>
<p class="text-xs font-bold text-on-surface-variant uppercase mb-1">Premium Checking</p>
<p class="text-xs text-outline mb-4">Acc: ****4421</p>
<p class="text-2xl font-bold text-primary">$8,241.19</p>
<p class="text-xs text-on-surface-variant mt-2">Available: $8,100.00</p>
</div>
{/* <!-- Loan Card --> */}
<div class="p-5 border border-outline-variant rounded-lg bg-surface-container-low relative overflow-hidden">
<p class="text-xs font-bold text-on-surface-variant uppercase mb-1">Auto Loan (2022 Tesla)</p>
<p class="text-xs text-outline mb-4">Acc: ****1182</p>
<div class="flex justify-between items-end">
<p class="text-2xl font-bold text-primary">$32,840.00</p>
<p class="text-xs text-error font-bold mb-1">Due: Oct 15</p>
</div>
<div class="w-full bg-outline-variant h-1.5 rounded-full mt-3 overflow-hidden">
<div class="bg-primary h-full w-[65%]"></div>
</div>
</div>
{/* <!-- Credit Card --> */}
<div class="p-5 border border-outline-variant rounded-lg bg-deep-teal relative overflow-hidden">
<p class="text-xs font-bold text-surface-container-lowest opacity-70 uppercase mb-1">Gold Rewards Visa</p>
<p class="text-xs text-white/40 mb-4">Acc: ****8822</p>
<p class="text-2xl font-bold text-white">$1,202.45</p>
<p class="text-xs text-secondary-fixed font-semibold mt-2">Limit: $15,000.00</p>
</div>
</div>
</section>
{/* <!-- Transaction History --> */}
<section class="bg-surface-white border border-outline-variant rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
<div class="p-6 border-b border-outline-variant flex items-center justify-between">
<h3 class="font-headline-sm text-lg text-primary flex items-center gap-2">
<span class="material-symbols-outlined">receipt_long</span>
                                Recent Transactions
                            </h3>
<div class="flex gap-2">
<select class="text-xs border-outline-variant rounded-md py-1 pr-8 bg-surface-container-low">
<option>Last 30 Days</option>
<option>Last 90 Days</option>
</select>
<button class="p-1 hover:bg-surface-container rounded transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">filter_list</span>
</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container-low border-b border-outline-variant">
<tr>
<th class="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Date</th>
<th class="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Description</th>
<th class="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category</th>
<th class="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
<th class="px-6 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<tr class="hover:bg-sky-tint transition-colors cursor-pointer">
<td class="px-6 py-4 text-sm text-on-surface">Sep 24, 2024</td>
<td class="px-6 py-4 text-sm font-semibold text-on-surface">Apple Store - Online</td>
<td class="px-6 py-4">
<span class="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded text-[10px] font-bold">ELECTRONICS</span>
</td>
<td class="px-6 py-4 text-sm font-bold text-on-surface text-right">-$1,299.00</td>
<td class="px-6 py-4">
<span class="flex items-center gap-1 text-xs text-secondary font-bold">
<span class="material-symbols-outlined text-xs">check_circle</span>
                                                Cleared
                                            </span>
</td>
</tr>
<tr class="hover:bg-sky-tint transition-colors cursor-pointer">
<td class="px-6 py-4 text-sm text-on-surface">Sep 22, 2024</td>
<td class="px-6 py-4 text-sm font-semibold text-on-surface">Payroll Deposit - ACME Corp</td>
<td class="px-6 py-4">
<span class="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded text-[10px] font-bold">INCOME</span>
</td>
<td class="px-6 py-4 text-sm font-bold text-secondary text-right">+$4,450.00</td>
<td class="px-6 py-4">
<span class="flex items-center gap-1 text-xs text-secondary font-bold">
<span class="material-symbols-outlined text-xs">check_circle</span>
                                                Cleared
                                            </span>
</td>
</tr>
<tr class="hover:bg-sky-tint transition-colors cursor-pointer">
<td class="px-6 py-4 text-sm text-on-surface">Sep 21, 2024</td>
<td class="px-6 py-4 text-sm font-semibold text-on-surface">Whole Foods Market</td>
<td class="px-6 py-4">
<span class="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded text-[10px] font-bold">GROCERIES</span>
</td>
<td class="px-6 py-4 text-sm font-bold text-on-surface text-right">-$156.42</td>
<td class="px-6 py-4">
<span class="flex items-center gap-1 text-xs text-primary font-bold">
<span class="material-symbols-outlined text-xs">schedule</span>
                                                Pending
                                            </span>
</td>
</tr>
<tr class="hover:bg-sky-tint transition-colors cursor-pointer">
<td class="px-6 py-4 text-sm text-on-surface">Sep 20, 2024</td>
<td class="px-6 py-4 text-sm font-semibold text-on-surface">Shell Oil - Charlotte</td>
<td class="px-6 py-4">
<span class="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded text-[10px] font-bold">TRANSPORT</span>
</td>
<td class="px-6 py-4 text-sm font-bold text-on-surface text-right">-$68.20</td>
<td class="px-6 py-4">
<span class="flex items-center gap-1 text-xs text-secondary font-bold">
<span class="material-symbols-outlined text-xs">check_circle</span>
                                                Cleared
                                            </span>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 bg-surface-container-low border-t border-outline-variant text-center">
<button class="text-primary font-bold text-xs uppercase tracking-widest hover:opacity-80">View Full Transaction Audit Trail</button>
</div>
</section>
</div>
</div>
{/* <!-- Spacing for Vertical Rhythm --> */}
<div class="h-12"></div>
</div>
{/* <!-- Footer --> */}
<footer class="mt-auto bg-deep-teal dark:bg-inverse-surface border-t border-white/10 w-full">
<div class="flex flex-row justify-between items-center py-6 px-gutter">
<div class="flex flex-col gap-1">
<p class="font-label-md text-label-md text-on-primary-fixed opacity-60">© 2024 Secure Credit Union. All rights reserved.</p>
</div>
<div class="flex items-center gap-8">
<a class="font-label-md text-label-md text-surface-container-lowest transition-opacity duration-150 hover:underline hover:text-secondary-fixed-dim" href="#">Privacy Policy</a>
<a class="font-label-md text-label-md text-surface-container-lowest transition-opacity duration-150 hover:underline hover:text-secondary-fixed-dim" href="#">Terms of Service</a>
<a class="font-label-md text-label-md text-surface-container-lowest transition-opacity duration-150 hover:underline hover:text-secondary-fixed-dim" href="#">Security Disclosure</a>
<a class="font-label-md text-label-md text-surface-container-lowest transition-opacity duration-150 hover:underline hover:text-secondary-fixed-dim" href="#">Support</a>
</div>
</div>
</footer>
</main>

</body>
  )
}



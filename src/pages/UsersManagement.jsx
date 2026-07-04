import React from 'react'

const UsersManagement = () => {
  return (
   <body class="bg-background text-on-surface flex min-h-screen">


{/* <!-- Main Content Area --> */}
<main class="flex-1 flex flex-col min-h-screen">
{/* <!-- TopNavBar (Shared Component) --> */}
{/* <header class="w-full h-16 bg-surface-white dark:bg-inverse-surface border-b border-outline-variant dark:border-outline flex justify-between items-center px-gutter sticky top-0 z-40">
<div class="flex items-center gap-8">
<h2 class="text-headline-sm font-headline-sm text-primary dark:text-inverse-primary">Trust &amp; Growth Admin</h2>
<div class="relative w-96">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-primary" placeholder="Global search for members or transactions..." type="text">
</div>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-2">
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200 cursor-pointer rounded-full">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200 cursor-pointer rounded-full">
<span class="material-symbols-outlined">help</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200 cursor-pointer rounded-full">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
<div class="h-8 w-[1px] bg-outline-variant"></div>
<div class="flex items-center gap-3">
<div class="text-right">
<p class="text-label-md font-bold text-on-surface">Admin User</p>
<button class="text-[12px] text-primary font-medium hover:underline">Sign Out</button>
</div>
<div class="w-10 h-10 rounded-full border-2 border-primary-fixed overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A professional headshot of a middle-aged male administrator with a confident smile, wearing a sharp charcoal suit and a light blue tie. The lighting is bright and clean, characteristic of a high-end corporate office setting with soft-focus architectural elements in the background. The overall aesthetic is professional, secure, and trustworthy, adhering to a minimalist light-mode color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh1tz2s5Imc3ui8546aCHDydpBJzAILmqGvBhQmgwobqKiY9VCNdQ3xIyuD3GXIlvD00ZuZYZL8RK68mrOCi2zHoFY0ePxWs1ft1VRMK9D3QCu6lbtmOMJ_SgZhouwSm_-jApuT5DRqGesZfTE7vw_o7lKUpoyAaeYwoLs6ByLhMPjT8Vqsa-oqXwfe2WtH6k2gRRJP_xai3i3jYtDJj5TPUByjTM_jEz-E5ptwlY9ZBxB2ashd_oZuIuxOUMlPa1IRN97DCWhUAo">
</div>
</div>
</div>
</header> */}
{/* <!-- Canvas Content --> */}
<section class="p-gutter max-w-container-max mx-auto w-full flex-1">
{/* <!-- Page Header --> */}
<div class="flex justify-between items-end mb-10">
<div>
<nav class="flex items-center gap-2 text-on-surface-variant text-label-md mb-2">
<span class="">Admin</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
<span class="text-primary font-bold">User Management</span>
</nav>
<h1 class="text-display-lg font-display-lg text-on-surface">User Management</h1>
<p class="text-body-lg text-on-surface-variant mt-1">Manage institutional access for <span class="font-bold text-primary">12,482 total members</span></p>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 bg-surface-white border border-outline-variant px-4 py-2.5 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-all">
<span class="material-symbols-outlined">download</span>
                        Export List
                    </button>
<button class="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg text-label-md font-bold hover:bg-primary-container transition-all shadow-sm">
<span class="material-symbols-outlined">person_add</span>
                        Onboard New Member
                    </button>
</div>
</div>
{/* <!-- Table Controls & Filters --> */}
<div class="bg-surface-white rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-gutter">
<div class="p-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
{/* <!-- Filters --> */}
<div class="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
<button class="px-4 py-2 rounded-md text-label-md font-bold bg-white text-primary shadow-sm">All Users</button>
<button class="px-4 py-2 rounded-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-colors">Active</button>
<button class="px-4 py-2 rounded-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-colors">Pending</button>
<button class="px-4 py-2 rounded-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-colors">Suspended</button>
<button class="px-4 py-2 rounded-md text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-colors">Flagged</button>
</div>
{/* <!-- Detailed Search --> */}
<div class="flex items-center gap-3">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">filter_list</span>
<select class="bg-white border border-outline-variant rounded-lg pl-10 pr-8 py-2 text-body-md focus:ring-primary appearance-none cursor-pointer">
<option>Filter by Account Type</option>
<option>Personal Savings</option>
<option>Business Growth</option>
<option>Premium Wealth</option>
</select>
</div>
<div class="relative group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
{/* <input class="border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-body-md w-64 focus:ring-2 focus:ring-primary focus:w-80 transition-all" placeholder="Search by name, ID or email..." type="text"> */}
</div>
</div>
</div>
{/* <!-- Main Data Table --> */}
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container-lowest">
<tr>
<th class="px-6 py-4 text-label-md text-on-surface-variant font-bold border-b border-outline-variant w-1/3">
<div class="flex items-center gap-1 cursor-pointer">Member Name <span class="material-symbols-outlined text-[16px]">arrow_downward</span></div>
</th>
<th class="px-6 py-4 text-label-md text-on-surface-variant font-bold border-b border-outline-variant">Account Type</th>

<th class="px-6 py-4 text-label-md text-on-surface-variant font-bold border-b border-outline-variant">Status</th>
<th class="px-6 py-4 text-label-md text-on-surface-variant font-bold border-b border-outline-variant">Last Login</th>
<th class="px-6 py-4 text-label-md text-on-surface-variant font-bold border-b border-outline-variant text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
{/* <!-- Row 1 --> */}
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
{/* <img class="w-full h-full object-cover" data-alt="A portrait of a young professional woman with glasses, radiating competence and friendliness. She is positioned against a clean, softly lit corporate background with a minimalist aesthetic. The lighting is warm and natural, reinforcing a sense of security and reliability. The color palette features whites, teals, and soft greys to match a modern banking UI design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzxKafB_gvoxNj3qVwgCMI-zOqa4sIyVcGKlOwfW_jXJRihrfBw2ekxCh_WEKPUTMCn_bnpNFOAPnNAjCJFdaTJKOkFFZegEZwBuIF43D-gxNL7Ykw1zhWTLy2kYUvHzvquZqh2B67b_RHLLzqFPFZSJOgAW21SAFT9q9dhUNWcPXx-Q_p-IsTMhvlTuj755A2--YQMFefG6fFprTnhCrbKdykw7tJsdRybJOvtO-yC6GN9T_Ib0sEyE57KNARRPYMhiRMK7bqWZc"> */}
</div>
<div>
<p class="text-body-md font-bold text-on-surface">Elena Rodriguez</p>
<p class="text-[12px] text-on-surface-variant">elena.r@corporate.com</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-body-md text-on-surface">Business Growth</td>

<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-secondary-container text-on-secondary-fixed-variant">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                        Active
                                    </span>
</td>
<td class="px-6 py-4 text-body-md text-on-surface-variant">2 hours ago</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2">
<button class="text-label-md font-bold text-primary hover:bg-primary-fixed px-3 py-1.5 rounded transition-all">View Profile</button>
<button class="p-2 text-outline hover:text-on-surface transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</td>
</tr>
{/* <!-- Row 2 --> */}
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
<img/>
</div>
<div>


</div>
</div>
</td>
<td class="px-6 py-4 text-body-md text-on-surface">Premium Wealth</td>

<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-secondary-container text-on-secondary-fixed-variant">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                        Active
                                    </span>
</td>
<td class="px-6 py-4 text-body-md text-on-surface-variant">Yesterday, 4:30 PM</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2">
<button class="text-label-md font-bold text-primary hover:bg-primary-fixed px-3 py-1.5 rounded transition-all">View Profile</button>
<button class="p-2 text-outline hover:text-on-surface transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</td>
</tr>
{/* <!-- Row 3 --> */}
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
<img/>
</div>
<div>
<p class="text-body-md font-bold text-on-surface">Jordan Wei</p>
<p class="text-[12px] text-on-surface-variant">jordan.wei@startup.io</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-body-md text-on-surface">Personal Savings</td>

<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-surface-container-highest text-primary">
<span class="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim animate-pulse"></span>
                                        Pending
                                    </span>
</td>
<td class="px-6 py-4 text-body-md text-on-surface-variant">Not Logged In</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2">
<button class="text-label-md font-bold text-primary hover:bg-primary-fixed px-3 py-1.5 rounded transition-all">Review App</button>
<button class="p-2 text-outline hover:text-on-surface transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</td>
</tr>

</tbody>
</table>
</div>
{/* <!-- Pagination --> */}
<div class="px-6 py-4 bg-surface-container-lowest flex items-center justify-between border-t border-outline-variant">
<p class="text-label-md text-on-surface-variant">Showing <span class="font-bold text-on-surface">1 - 25</span> of <span class="font-bold text-on-surface">12,482</span> members</p>
<div class="flex items-center gap-2">
<button class="p-2 rounded-lg border border-outline-variant text-outline hover:bg-surface-container-low disabled:opacity-50" disabled="">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="w-8 h-8 rounded-lg bg-primary text-white text-label-md font-bold">1</button>
<button class="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-label-md font-bold transition-colors">2</button>
<button class="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-label-md font-bold transition-colors">3</button>
<span class="text-outline">...</span>
<button class="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-label-md font-bold transition-colors">499</button>
<button class="p-2 rounded-lg border border-outline-variant text-outline hover:bg-surface-container-low">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
{/* <!-- Dashboard Bento Micro-Widgets --> */}
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<div class="bg-primary-container p-6 rounded-xl text-on-primary-container shadow-sm flex items-center justify-between">
<div>
<p class="text-label-md font-bold opacity-80">Pending Approvals</p>
<h3 class="text-headline-md font-bold">142</h3>
<p class="text-[12px] mt-2">+12 since yesterday</p>
</div>
<span class="material-symbols-outlined text-[48px] opacity-20">hourglass_empty</span>
</div>
<div class="bg-surface-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
<div>
<p class="text-label-md font-bold text-on-surface-variant">Growth Rate</p>
<h3 class="text-headline-md font-bold text-secondary">+4.2%</h3>
<p class="text-[12px] text-on-surface-variant mt-2">New accounts this month</p>
</div>
<span class="material-symbols-outlined text-[48px] text-secondary opacity-20">trending_up</span>
</div>
<div class="bg-deep-teal p-6 rounded-xl text-white shadow-sm flex items-center justify-between">
<div>
<p class="text-label-md font-bold opacity-70">Security Status</p>
<h3 class="text-headline-md font-bold flex items-center gap-2">Secure <span class="w-3 h-3 bg-secondary rounded-full"></span></h3>
<p class="text-[12px] mt-2">Last audit: 45 min ago</p>
</div>
<span class="material-symbols-outlined text-[48px] opacity-20">verified_user</span>
</div>
</div>
</section>
{/* <!-- Footer (Shared Component) --> */}
<footer class="w-full mt-auto bg-deep-teal dark:bg-on-surface flex justify-between items-center px-gutter py-section-padding-sm text-surface-white border-t border-deep-teal/20">
<div>
<p class="text-label-md font-label-md opacity-80">© 2024 Trust &amp; Growth Credit Union. Secure Administrative Environment.</p>
</div>
<div class="flex items-center gap-6">
<a class="text-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="#">Privacy Policy</a>
<a class="text-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="#">Audit Terms</a>
<a class="text-label-md text-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="#">System Status</a>
</div>
</footer>
</main>



</body>
  )
}



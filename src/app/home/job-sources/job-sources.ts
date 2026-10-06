import { Component } from '@angular/core';

@Component({
  selector: 'app-job-sources',
  imports: [],
  template: `
    <section class="py-12 px-6 max-w-7xl mx-auto border-b border-[#201A23]/10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- LEFT: Globe-like constellation design with hanging sources -->
        <div class="lg:col-span-6 relative flex items-center justify-center min-h-[300px]">
          <!-- Pulsing Central Globe -->
          <div
            class="absolute w-40 h-40 rounded-full bg-[#201A23]/5 border-2 border-dashed border-[#201A23]/30 animate-[spin_25s_linear_infinite] flex items-center justify-center"
          >
            <div
              class="w-28 h-28 rounded-full bg-[#201A23]/10 border border-[#201A23]/20 flex items-center justify-center"
            >
              <div
                class="w-12 h-12 rounded-full bg-[#201A23] text-[#D7D6D6] flex items-center justify-center font-bold text-xs shadow-lg animate-pulse"
              >
                GLOBE
              </div>
            </div>
          </div>

          <!-- Hanging Source Node 1: Remote OK -->
          <div
            class="absolute top-4 left-6 bg-[#201A23] text-[#D7D6D6] px-4 py-2 rounded-none text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <span class="text-[10px] text-[#A36B4E] block">NODE 01</span>
            Remote OK
          </div>

          <!-- Hanging Source Node 2: We Work Remotely -->
          <div
            class="absolute top-10 right-8 bg-[#201A23] text-[#D7D6D6] px-4 py-2 rounded-none text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <span class="text-[10px] text-[#A36B4E] block">NODE 02</span>
            We Work Remotely
          </div>

          <!-- Hanging Source Node 3: Arbeitnow -->
          <div
            class="absolute bottom-6 left-12 bg-[#201A23] text-[#D7D6D6] px-4 py-2 rounded-none text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <span class="text-[10px] text-[#A36B4E] block">NODE 03</span>
            Arbeitnow
          </div>

          <!-- Hanging Source Node 4: Remotive -->
          <div
            class="absolute bottom-10 right-14 bg-[#201A23] text-[#D7D6D6] px-4 py-2 rounded-none text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <span class="text-[10px] text-[#A36B4E] block">NODE 04</span>
            Remotive
          </div>

          <div
            class="absolute bottom-1 right-[250px] bg-[#201A23] text-[#D7D6D6] px-4 py-2 rounded-none text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <span class="text-[10px] text-[#A36B4E] block">NODE 05</span>
            Hamalayas
          </div>

          <!-- Connecting SVG lines simulation -->
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none opacity-25"
            stroke="#201A23"
            stroke-width="1"
            stroke-dasharray="4 4"
          >
            <line x1="120" y1="50" x2="200" y2="150" />
            <line x1="380" y1="60" x2="280" y2="150" />
            <line x1="140" y1="260" x2="220" y2="170" />
            <line x1="360" y1="250" x2="260" y2="170" />
          </svg>
        </div>

        <!-- RIGHT: Attribution & Context Text -->
        <div class="lg:col-span-6 space-y-6">
          <div
            class="inline-block text-[11px] font-mono tracking-widest text-[#201A23] uppercase bg-[#201A23]/10 px-3 py-1"
          >
            [ VERIFIED_AGGREGATION_SOURCES ]
          </div>
          <h2 class="text-3xl md:text-4xl font-black font-['Syne'] text-[#201A23] leading-tight">
            Synchronized across premier global nodes.
          </h2>
          <p class="text-sm text-[#201A23]/80 leading-relaxed">
            All career listings, telemetry signals, and compensation brackets are fully attributed
            and ingested in real time from premier open engineering registries including Remote OK,
            We Work Remotely, Arbeitnow, and Remotive. We maintain strict compliance with creator
            attribution and API syndication standards.
          </p>
          <div class="flex items-center gap-4 text-xs font-mono text-[#201A23]/70 pt-2">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              FULL_SYNC_ACTIVE
            </span>
            <span>•</span>
            <span>ATTRIBUTION_VERIFIED_&#x2713;</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class JobSources {}

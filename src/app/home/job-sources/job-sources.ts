import { Component } from '@angular/core';

@Component({
  selector: 'app-job-sources',
  imports: [],
  template: `
    <section class="py-12 px-6 max-w-7xl mx-auto border-b border-[#201A23]/10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- LEFT: Evenly spaced nodes around the central globe -->
        <div
          class="lg:col-span-6 relative flex items-center justify-center min-h-[340px] md:min-h-[380px] w-full max-w-md mx-auto"
        >
          <!-- Pulsing Central Globe -->
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#201A23]/5 border-2 border-dashed border-[#201A23]/30 animate-[spin_25s_linear_infinite] flex items-center justify-center"
          >
            <div
              class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#201A23]/10 border border-[#201A23]/20 flex items-center justify-center"
            >
              <div
                class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#201A23] text-[#D7D6D6] flex items-center justify-center font-bold text-[10px] md:text-xs shadow-lg animate-pulse"
              >
                GLOBE
              </div>
            </div>
          </div>

          <!-- Node 1: Top Center (0°) -->
          <div
            class="absolute top-2 left-1/2 -translate-x-1/2 bg-[#201A23] text-[#D7D6D6] px-3 py-1.5 md:px-4 md:py-2 rounded-none text-[10px] md:text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300 whitespace-nowrap"
          >
            <span class="text-[9px] text-[#A36B4E] block">SOURCE 01</span>
            Remote OK
          </div>

          <!-- Node 2: Top Right / Upper Right (72°) -->
          <div
            class="absolute top-12 right-2 md:top-14 md:right-4 bg-[#201A23] text-[#D7D6D6] px-3 py-1.5 md:px-4 md:py-2 rounded-none text-[10px] md:text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300 whitespace-nowrap"
          >
            <span class="text-[9px] text-[#A36B4E] block">SOURCE 02</span>
            Himalayas
          </div>

          <!-- Node 3: Bottom Right / Lower Right (144°) -->
          <div
            class="absolute bottom-12 right-2 md:bottom-14 md:right-4 bg-[#201A23] text-[#D7D6D6] px-3 py-1.5 md:px-4 md:py-2 rounded-none text-[10px] md:text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300 whitespace-nowrap"
          >
            <span class="text-[9px] text-[#A36B4E] block">SOURCE 03</span>
            Remotive
          </div>

          <!-- Node 4: Bottom Left / Lower Left (216°) -->
          <div
            class="absolute bottom-12 left-2 md:bottom-14 md:left-4 bg-[#201A23] text-[#D7D6D6] px-3 py-1.5 md:px-4 md:py-2 rounded-none text-[10px] md:text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300 whitespace-nowrap"
          >
            <span class="text-[9px] text-[#A36B4E] block">SOURCE 04</span>
            WeWorkRemotely
          </div>

          <!-- Node 5: Top Left / Upper Left (288°) -->
          <div
            class="absolute top-12 left-2 md:top-14 md:left-4 bg-[#201A23] text-[#D7D6D6] px-3 py-1.5 md:px-4 md:py-2 rounded-none text-[10px] md:text-xs font-mono border-l-2 border-[#A36B4E] shadow-xl transform hover:-translate-y-1 transition duration-300 whitespace-nowrap"
          >
            <span class="text-[9px] text-[#A36B4E] block">SOURCE 05</span>
            Arbeitnow
          </div>

          <!-- Connecting SVG lines simulation -->
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            stroke="#201A23"
            stroke-width="1"
            stroke-dasharray="3 3"
          >
            <line x1="50%" y1="25%" x2="50%" y2="45%" />
            <line x1="80%" y1="35%" x2="58%" y2="48%" />
            <line x1="80%" y1="70%" x2="58%" y2="55%" />
            <line x1="20%" y1="70%" x2="42%" y2="55%" />
            <line x1="20%" y1="35%" x2="42%" y2="48%" />
          </svg>
        </div>

        <!-- RIGHT: Attribution & Context Text -->
        <div class="lg:col-span-6 space-y-6">
          <h2 class="text-3xl md:text-4xl font-black font-['Syne'] text-[#201A23] leading-tight">
            Synchronized across premier global sources.
          </h2>
          <p class="text-sm text-[#201A23]/80 leading-relaxed">
            All career listings, telemetry signals, and compensation brackets are fully attributed
            and ingested in real time from premier open engineering registries including Remote OK,
            Himalayas, Remotive, WeWorkRemotely, and Arbeitnow. We maintain strict compliance with
            creator attribution and API syndication standards.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class JobSources {}

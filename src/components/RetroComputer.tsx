import { m } from 'framer-motion'
import CodeScreen from './CodeScreen'
import { useTilt } from '../hooks/useTilt'

function PlasticOverlay({ className }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-20 ${className ?? ''}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '120px 120px',
        mixBlendMode: 'multiply',
      }}
    />
  )
}

export default function RetroComputer() {
  const tilt = useTilt(5)

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center select-none">
      {/* Floor shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/25 blur-2xl rounded-full" />

      <m.div
        {...tilt}
        style={{ ...tilt.style, perspective: 900, transformStyle: 'preserve-3d' }}
        className="relative z-10 origin-center will-change-transform"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
      >
        {/* === MONITOR === */}
        <div className="relative mx-auto w-full max-w-[300px]" style={{ transform: 'translateZ(10px)' }}>
          {/* Contact shadow */}
          <div className="absolute -bottom-1 left-[8%] w-[84%] h-3 bg-black/15 blur-md rounded-full" />

          {/* Outer shell - 4 stop gradient for plastic realism */}
          <div className="relative rounded-[22px] shadow-[0_14px_55px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.35)] bg-gradient-to-b from-[#EDE3D0] via-[#E0D4BE] via-[#D6C8B0] to-[#C8B89E] p-[4px]">
            <PlasticOverlay className="rounded-[22px]" />

            {/* Inner bezel - thick bevel */}
            <div className="relative rounded-[17px] bg-gradient-to-b from-[#D0C0A8] via-[#C4B49C] via-[#BEAE96] to-[#B4A48C] p-[3px] shadow-[inset_0_4px_10px_rgba(0,0,0,0.25),inset_0_-1px_0_rgba(255,255,255,0.2)]">
              <PlasticOverlay className="rounded-[17px]" />

              {/* Front panel */}
              <div className="relative rounded-[14px] bg-gradient-to-b from-[#E8DCC8] via-[#E0D4BE] via-[#DACCB6] to-[#D0C2AC] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.06)]">
                <PlasticOverlay className="rounded-[14px]" />

                {/* Screen outer bezel */}
                <div className="relative rounded-[11px] bg-gradient-to-b from-[#C0B098] to-[#B0A088] p-[2px] shadow-[inset_0_3px_8px_rgba(0,0,0,0.3),inset_0_-1px_0_rgba(255,255,255,0.15)]">
                  {/* Screen inner shadow rim */}
                  <div className="rounded-[8px] bg-gradient-to-b from-[#A89884] to-[#A0907C] p-[1px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]">
                    {/* CRT tube */}
                    <div className="rounded-[6px] bg-[#0a0a0a] overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.3)]">
                      <div className="aspect-[4/3] w-full relative">
                        <CodeScreen />
                        {/* CRT glare (angled) */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/8 via-transparent via-[40%] to-transparent" />
                        {/* Scanline overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.1]"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 3px)',
                            backgroundSize: '100% 3px',
                          }}
                        />
                        {/* CRT curvature shadow */}
                        <div className="absolute inset-0 pointer-events-none rounded-[6px] shadow-[inset_0_0_40px_rgba(0,0,0,0.35),inset_0_0_80px_rgba(0,0,0,0.15)]" />
                        {/* Subtle CRT glow */}
                        <div className="absolute inset-0 pointer-events-none rounded-[6px] bg-gradient-to-b from-transparent via-transparent to-[rgba(74,222,128,0.03)]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom monitor section */}
                <div className="flex items-start justify-between mt-3">
                  {/* Left: Commodore branding */}
                  <div className="flex-1 flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-1.5">
                      {/* Commodore logo - more detailed */}
                      <svg width="20" height="13" viewBox="0 0 20 13" fill="none">
                        <defs>
                          <linearGradient id="cLogo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C86A4A"/>
                            <stop offset="100%" stopColor="#A84A2E"/>
                          </linearGradient>
                        </defs>
                        <rect x="0.5" y="0.5" width="19" height="12" rx="1.5" fill="url(#cLogo)" stroke="#8A3A1E" strokeWidth="0.5"/>
                        <rect x="3" y="2" width="14" height="9" rx="0.5" fill="#2A1A0E" opacity="0.3"/>
                        <text x="10" y="9" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif">C</text>
                      </svg>
                      <span className="text-[9px] font-bold tracking-tight text-[#7A6856] drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]" style={{ fontFamily: 'Arial, sans-serif' }}>
                        commodore
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#8A7866] drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]" style={{ fontFamily: '"Courier New", monospace' }}>
                      1960
                    </span>
                  </div>

                  {/* Right: Control panel */}
                  <div className="flex-shrink-0">
                    <div className="rounded-[7px] bg-gradient-to-b from-[#C8B8A2] via-[#BEAE98] to-[#B0A088] p-2.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),inset_0_-1px_0_rgba(255,255,255,0.15)] min-w-[72px] relative overflow-hidden">
                      <PlasticOverlay />
                      {/* Power LED */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="relative flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#3a3a3a] flex items-center justify-center p-0.5">
                            <m.div
                              className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"
                              animate={{ boxShadow: ['0 0 4px #4ade80', '0 0 12px #4ade80', '0 0 4px #4ade80'] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            />
                          </div>
                        </div>
                        {/* Power button */}
                        <div className="w-7 h-[6px] rounded-[2px] bg-gradient-to-b from-[#C86A4A] to-[#A84A2E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
                      </div>
                      {/* Brightness slider */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-9 h-[3px] rounded-full bg-[#8A7A6A] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
                        <div className="w-[4px] h-3 rounded-[1px] bg-gradient-to-b from-[#E8DCC8] to-[#D0C0AA] shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
                      </div>
                      {/* Floppy slot */}
                      <div className="rounded-[2px] bg-[#1a1a1a] h-[4px] w-full mb-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]" />
                      <div className="rounded-[1px] bg-gradient-to-b from-[#8A7A6A] to-[#7A6A5A] h-[6px] w-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />
                    </div>
                  </div>
                </div>

                {/* Vents */}
                <div className="flex justify-center gap-1.5 mt-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <m.div
                      key={i}
                      className="w-[5px] h-[2px] rounded-full bg-gradient-to-r from-[#B8A892] to-[#A89884] shadow-[inset_0_1px_0_rgba(0,0,0,0.1)]"
                      animate={{ opacity: [0.5, 0.9, 0.5] }}
                      transition={{ repeat: Infinity, duration: 3 + i * 0.15, ease: 'easeInOut', delay: i * 0.08 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Monitor stand/neck riser */}
          <div className="mx-auto w-20 relative" style={{ transform: 'translateZ(5px)' }}>
            <div className="h-6 w-full bg-gradient-to-b from-[#C8B8A2] via-[#BEAE98] to-[#B4A48C] rounded-b-full shadow-[inset_0_-3px_6px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]" />
            {/* Stand base */}
            <div className="h-[4px] w-28 -ml-4 rounded-full bg-gradient-to-r from-[#B8A892] via-[#C4B49C] to-[#B0A088] shadow-[0_3px_10px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)]" />
            {/* Stand shadow gap */}
            <div className="h-[2px] w-24 -ml-2 mx-auto bg-black/5 blur-sm rounded-full" />
          </div>
        </div>



        {/* === KEYBOARD === */}
        <m.div
          className="mx-auto mt-1.5 w-full max-w-[300px] relative"
          style={{ transform: 'translateZ(6px)' }}
          animate={{ y: [0, -1, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.6 }}
        >
          {/* Contact shadow */}
          <div className="absolute -bottom-1.5 left-[4%] w-[92%] h-3 bg-black/15 blur-md rounded-full" />

          {/* Keyboard outer shell */}
          <div className="relative rounded-[9px] bg-gradient-to-b from-[#EDE3D0] via-[#E0D4BE] to-[#D0C2AC] shadow-[0_8px_25px_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.35)] p-[3px]">
            <PlasticOverlay className="rounded-[9px]" />

            <div className="relative rounded-[7px] bg-gradient-to-b from-[#C8B8A2] via-[#BEAE98] to-[#B4A48C] p-2.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]">
              <PlasticOverlay className="rounded-[7px]" />

              {/* Cable port */}
              <div className="absolute -top-1 right-10 w-[5px] h-3 rounded-full bg-gradient-to-b from-[#8A7A6A] to-[#6A5A4A] shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]" />

              {/* Function key row (F1-F10) */}
              <div className="flex justify-center gap-[3px] mb-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <m.div
                    key={i}
                    className="relative rounded-[2px] bg-gradient-to-b from-[#D4C4B2] via-[#C8B8A2] to-[#BEAE98] shadow-[0_1px_2px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.4)]"
                    style={{ width: '18px', height: '7px' }}
                    whileHover={{ y: -0.5 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="absolute bottom-[1px] left-[3px] right-[3px] h-[1px] rounded-full bg-black/5" />
                  </m.div>
                ))}
              </div>

              {/* Main key rows 12x4 */}
              <div className="flex flex-col gap-[3px]">
                {Array.from({ length: 4 }).map((_, row) => (
                  <div key={row} className="flex justify-center gap-[3px]">
                    {Array.from({ length: 12 }).map((_, col) => {
                      const isSpaceRow = row === 3
                      const isWide = isSpaceRow && col >= 4 && col <= 7
                      const w = isWide ? '44px' : '15px'
                      return (
                        <m.div
                          key={col}
                          className="relative rounded-[2px] bg-gradient-to-b from-[#E0D4BE] via-[#D4C4B2] to-[#C8B8A2] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.45)]"
                          style={{ width: w, height: '11px' }}
                          whileHover={{ y: -0.8 }}
                          transition={{ duration: 0.1 }}
                        >
                          {/* Key top bevel */}
                          <div className="absolute top-[1.5px] left-[2px] right-[2px] h-[4px] rounded-[1px] bg-white/10" />
                          {/* Key bottom shadow */}
                          <div className="absolute bottom-[0.5px] left-[2px] right-[2px] h-[1.5px] rounded-full bg-black/5" />
                          {/* Key label (some keys) */}
                          {row === 0 && col === 0 && (
                            <span className="absolute inset-0 flex items-center justify-center text-[4px] text-[#7A6A5A] font-medium mt-[1px]" style={{ fontFamily: 'Arial, sans-serif' }}>Esc</span>
                          )}
                          {row === 0 && col === 11 && (
                            <span className="absolute inset-0 flex items-center justify-center text-[5px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>\u2326</span>
                          )}
                          {row === 1 && col === 0 && (
                            <span className="absolute inset-0 flex items-center justify-center text-[5px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>\u21E4</span>
                          )}
                          {row === 2 && col === 0 && (
                            <span className="absolute inset-0 flex items-center justify-center text-[5px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>\u21E7</span>
                          )}
                          {row === 2 && col === 11 && (
                            <span className="absolute inset-0 flex items-center justify-center text-[4px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Enter</span>
                          )}
                        </m.div>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom row - spacebar + mods */}
              <div className="flex justify-center mt-[3px] gap-[3px]">
                <m.div
                  className="relative rounded-[2px] bg-gradient-to-b from-[#C8B8A2] to-[#BEAE98] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]"
                  style={{ width: '24px', height: '11px' }}
                  whileHover={{ y: -0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[5px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Ctrl</span>
                </m.div>
                <m.div
                  className="relative rounded-[2px] bg-gradient-to-b from-[#E0D4BE] via-[#D4C4B2] to-[#C8B8A2] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.45)]"
                  style={{ width: '24px', height: '11px' }}
                  whileHover={{ y: -0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[5px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Alt</span>
                </m.div>
                <m.div
                  className="relative rounded-[2px] bg-gradient-to-b from-[#E0D4BE] via-[#D4C4B2] to-[#C8B8A2] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.45)]"
                  style={{ width: '52px', height: '11px' }}
                  whileHover={{ y: -0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="absolute top-[1.5px] left-[2px] right-[2px] h-[4px] rounded-[1px] bg-white/10" />
                </m.div>
                <m.div
                  className="relative rounded-[2px] bg-gradient-to-b from-[#E0D4BE] via-[#D4C4B2] to-[#C8B8A2] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.45)]"
                  style={{ width: '24px', height: '11px' }}
                  whileHover={{ y: -0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[5px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Alt</span>
                </m.div>
                <m.div
                  className="relative rounded-[2px] bg-gradient-to-b from-[#C8B8A2] to-[#BEAE98] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]"
                  style={{ width: '24px', height: '11px' }}
                  whileHover={{ y: -0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[4px] text-[#7A6A5A] font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Ctrl</span>
                </m.div>
              </div>
            </div>
          </div>
        </m.div>
      </m.div>

      <style>{`
        @keyframes vibrate {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          15% { transform: translate(0.3px, -0.2px) rotate(0.02deg); }
          30% { transform: translate(-0.2px, 0.3px) rotate(-0.01deg); }
          50% { transform: translate(0.2px, -0.1px) rotate(0.01deg); }
          70% { transform: translate(-0.3px, 0.2px) rotate(-0.02deg); }
          85% { transform: translate(0.1px, -0.3px) rotate(0.01deg); }
        }
      `}</style>
    </div>
  )
}

import CodeScreen from './CodeScreen'

export default function RetroComputer() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center select-none">
      {/* Idle vibration animation */}
      <div className="animate-[vibrate_3s_ease-in-out_infinite] origin-center will-change-transform">
        {/* === MONITOR === */}
        <div className="relative mx-auto" style={{ width: 'min(42vw, 480px)' }}>
          {/* Outer shell */}
          <div className="relative rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)] bg-gradient-to-b from-[#E8DCC8] to-[#D8CAB4] p-[3px]">
            {/* Inner bezel */}
            <div className="rounded-[15px] bg-gradient-to-b from-[#D4C4B2] to-[#C8B8A4] p-[2px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)]">
              {/* Front panel */}
              <div className="rounded-[13px] bg-gradient-to-b from-[#E3D5C5] to-[#DBCDBD] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                {/* Screen bezel */}
                <div className="rounded-[10px] bg-[#B8A892] p-[3px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                  {/* Inner shadow rim */}
                  <div className="rounded-[8px] bg-[#A89884] p-[2px]">
                    {/* CRT tube */}
                    <div className="rounded-[6px] bg-[#1a1a1a] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                      {/* Code screen */}
                      <div className="aspect-[16/10] w-full relative">
                        <CodeScreen />
                        {/* CRT glare */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-transparent" />
                        {/* Scanline overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.07]"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)',
                            backgroundSize: '100% 3px',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom section with control panel + vents */}
                <div className="flex items-start justify-between mt-4">
                  {/* Left: Label area */}
                  <div className="flex-1">
                    <div className="w-24 h-[3px] rounded bg-[#B8A892]/60 mx-auto mt-1" />
                  </div>

                  {/* Right: Control panel */}
                  <div className="flex-shrink-0">
                    <div className="rounded-[6px] bg-gradient-to-b from-[#D4C4B2] to-[#C8B8A4] p-2.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)] min-w-[70px]">
                      {/* Power LED */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="relative">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
                        </div>
                        <div className="w-6 h-[5px] rounded-[2px] bg-gradient-to-b from-[#B85C3A] to-[#9A4A2E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
                      </div>
                      {/* Slider */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-8 h-[3px] rounded bg-[#A89884]" />
                        <div className="w-[4px] h-2.5 rounded-[1px] bg-[#E3D5C5] shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
                      </div>
                      {/* Floppy slot */}
                      <div className="rounded-[2px] bg-[#1a1a1a] h-[3px] w-full mb-1" />
                      <div className="rounded-[1px] bg-[#A89884] h-[5px] w-full" />
                    </div>
                  </div>
                </div>

                {/* Vents */}
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-[6px] h-[2px] rounded bg-[#C8B8A4]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stand */}
          <div className="mx-auto w-16">
            <div className="h-4 w-full bg-gradient-to-b from-[#D4C4B2] to-[#C8B8A4] rounded-b-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]" />
            <div className="h-[3px] w-24 -ml-4 rounded-full bg-[#B8A892] shadow-[0_2px_6px_rgba(0,0,0,0.15)]" />
          </div>
        </div>

        {/* === KEYBOARD === */}
        <div className="mx-auto mt-3 rounded-[8px] bg-gradient-to-b from-[#E3D5C5] to-[#D8CAB4] shadow-[0_4px_12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] p-[3px]" style={{ width: 'min(38vw, 430px)' }}>
          <div className="rounded-[6px] bg-gradient-to-b from-[#D4C4B2] to-[#C8B8A4] p-2 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
            {/* Cable */}
            <div className="absolute -top-1 right-8 w-[3px] h-3 rounded-full bg-[#A89884]" />

            {/* Keys 12x5 */}
            <div className="flex flex-col gap-[3px]">
              {Array.from({ length: 5 }).map((_, row) => (
                <div key={row} className="flex justify-center gap-[3px]">
                  {Array.from({ length: 12 }).map((_, col) => {
                    const isWide = row === 4 && col < 2
                    const isSpecial = row === 0 && col < 3
                    return (
                      <div
                        key={col}
                        className="rounded-[2px] bg-gradient-to-b from-[#D4C4B2] to-[#C8B8A4] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4)]"
                        style={{
                          width: isWide ? '18px' : '14px',
                          height: '10px',
                          backgroundColor: isSpecial ? '#C0B0A0' : undefined,
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Spacebar row */}
            <div className="flex justify-center mt-[3px]">
              <div className="rounded-[2px] bg-gradient-to-b from-[#D4C4B2] to-[#C8B8A4] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4)]" style={{ width: '80px', height: '10px' }} />
            </div>
          </div>
        </div>
      </div>

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

import React from 'react'

const page = () => {
  return (
    <div className="scroll-smooth scrollbar-hide w-full h-screen flex flex-col items-center justify-center gap-4">
      <div className=" ">
        <span className="flex flex-col hidden gap-1">
          <p className="text-sm  font-medium tracking-tight text-black">
            Signed in as:
          </p>

          <p className="geist text-sm font-medium tracking-tight text-[#999]">
            bashh0409@gmail.com
          </p>
        </span>
      </div>

      <p className="mon geist  max-w-xs text-center  overflow-hidden text-xl font-semibold tracking-tighter text-black mb-2 ">
        Mabz Loans Legal Disclaimer
      </p>

      <p className="geist  max-w-xs text-center  overflow-hidden text-[13px] font-semibold leading-3 tracking-tight text-[#999]">

      </p>
      <a
        href="/profile"
        className="w-fit  geist capitalize max-h-7 rounded-3xl border border-black/10 bg-black/[0.03] px-2 py-1 text-sm font-medium leading-4 tracking-tight text-[#333] [overflow-wrap:anywhere]"
      >
        close
      </a>
    </div>
  );
}

export default page
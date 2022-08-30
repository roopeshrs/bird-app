import React from "react";
function SideBarRow({title, icon, active}) {
  return (
    <div className={`p-[15px] flex text-[#000] text-sm font-semibold cursor-pointer hover:bg-[#e0f2fe] ${active && "bg-[#e0f2fe]"}`}>
        <div className="mr-[12px] text-[#0369a1]">{icon}</div>
        <div>{title}</div>
    </div>
  );
}

export default SideBarRow;
import React, { Dispatch, SetStateAction } from 'react'

function CategoryBox({ label, Icon, selected, setOption } : {label: string, Icon: React.ElementType, selected?: boolean, setOption: Dispatch<SetStateAction<string>>}) {
    return (
        <div 
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? "text-neutral-800" : "text-neutral-500"}`}
            onClick={() => setOption(label)}
        >
            <Icon size={26} />
            <div className='"font-medium text-sm'>{label}</div>
        </div>
    )
}

export default CategoryBox
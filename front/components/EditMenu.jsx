'use client';
import {useState, useEffect } from 'react';

const bg_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
</svg>

const EditMenu = (props) => {
    
    const getMenuButton= (b,k) => {
        switch (b) {
            case 'BG':
                return <button key={k} className='edit_btn w-10 ' onClick={() => props.bgMenuVisibility()}>
                        {bg_icon}
                    </button>;

            case 'add':
                return <p key={k} className="self-center pl-2 mr-2"> Add:</p>;

            case 'T0':
            case 'T1':
            case 't':
                return <button key={k} className='edit_btn w-10 ' onClick={() => props.addText(b)}>
                            {b}
                        </button>;
            

            default:
                return null;
            
    }}
    
  return (
    <>
    {props.menuType=="corner" ? (
        <div className='absolute top-0 right-0 z-5 flex justify-center flex-row rounded-bl-lg overflow-hidden h-10 w-fit border-2 border-slate-300 bg-slate-300'>
            {props.menuButtons.map((btn, index) => (
                getMenuButton(btn,`menubtn-${index}`)
            ))}
        </div>
    ) : (
        <div>EditMenu</div>
    )}

    </>
    
  )
}

export default EditMenu

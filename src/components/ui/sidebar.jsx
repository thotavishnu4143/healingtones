import React, { createContext, useContext, useState } from 'react'

const SidebarCtx = createContext()

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true)
  return <SidebarCtx.Provider value={{ open, setOpen }}>{children}</SidebarCtx.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarCtx)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}

export function Sidebar({ className = '', children }) {
  const { open } = useSidebar()
  return <aside className={`w-72 shrink-0 ${open ? 'block' : 'hidden'} ${className}`}>{children}</aside>
}

export function SidebarHeader({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarContent({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarFooter({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarGroup({ children }) {
  return <div>{children}</div>
}

export function SidebarGroupLabel({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarGroupContent({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenu({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenuItem({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenuButton({ className = '', asChild = false, children }) {
  const Component = asChild ? React.Fragment : 'button'
  return asChild ? <div className={className}>{children}</div> : <Component className={className}>{children}</Component>
}

export function SidebarTrigger({ className = '' }) {
  const { open, setOpen } = useSidebar()
  return (
    <button className={className} onClick={() => setOpen(!open)}>
      {/* Simple hamburger */}
      <span className="block w-6 h-[2px] bg-purple-600 mb-1"></span>
      <span className="block w-6 h-[2px] bg-purple-600 mb-1"></span>
      <span className="block w-6 h-[2px] bg-purple-600"></span>
    </button>
    
  )
}




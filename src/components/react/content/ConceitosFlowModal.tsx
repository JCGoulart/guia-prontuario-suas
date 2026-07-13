import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import ConceitosFlowDiagram from './ConceitosFlowDiagram'

const SVG = {
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
}

export default function ConceitosFlowModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    (window as unknown as Record<string, () => void>).openConceitosFlowModal = () => setIsOpen(true)
    return () => { delete (window as unknown as Record<string, () => void>).openConceitosFlowModal }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleClose(); return }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => { setIsOpen(false); setIsClosing(false) }, 250)
  }, [])

  if (!mounted) return null
  if (!isOpen && !isClosing) return null

  const content = (
    <div
      className={cn(
        'fixed inset-0 z-[210] flex items-center justify-center p-2',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      role="presentation"
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="conceitos-modal-title"
        className={cn(
          'relative w-[98vw] h-[94vh] overflow-hidden',
          'bg-white dark:bg-slate-900',
          'rounded-2xl shadow-2xl',
          'border border-slate-200 dark:border-slate-700',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
          isOpen && !isClosing ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          'transition-all duration-300',
        )}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-institucional-blue via-blue-500/70 to-institucional-green pointer-events-none z-10" aria-hidden="true" />

        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-institucional-blue to-institucional-blue/80 text-white"
              dangerouslySetInnerHTML={{ __html: SVG.book }}
            />
            <div>
              <h2 id="conceitos-modal-title" className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Conceitos Gerais — SUAS
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Clique em cada conceito para ver a descrição completa
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Fechar"
            className={cn(
              'p-2.5 rounded-full',
              'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200',
              'bg-slate-100 dark:bg-slate-800',
              'hover:bg-slate-200 dark:hover:bg-slate-700',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institucional-blue focus-visible:ring-offset-2',
            )}
            dangerouslySetInnerHTML={{ __html: SVG.x }}
          />
        </div>

        <div className="w-full h-full pt-14">
          <ConceitosFlowDiagram />
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(content, document.body)
}

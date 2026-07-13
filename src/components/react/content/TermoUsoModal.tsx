import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { TERMO_CONTEUDO } from '@/data/termo'

export default function TermoUsoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Expose global function to open modal
  useEffect(() => {
    ;(window as any).openTermoModal = () => setIsOpen(true)
    return () => {
      delete (window as any).openTermoModal
    }
  }, [])

  // Focus trap & Escape
  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
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
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 250)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleClose}
        aria-hidden="true"
      />
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="termo-title"
        className={cn(
          'relative w-full max-w-2xl max-h-[85vh] overflow-y-auto styled-scrollbar',
          'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900',
          'rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
          isOpen && !isClosing
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4',
          'transition-all duration-300',
        )}
      >
        {/* Header */}
        <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-amber-500 via-amber-500/70 to-amber-400 pointer-events-none" aria-hidden="true" />
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 z-10 p-2.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
            dangerouslySetInnerHTML={{
              __html: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
            }}
          />
          <div className="flex items-start gap-4 pr-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white"
              dangerouslySetInnerHTML={{
                __html: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
              }}
            />
            <div>
              <h2 id="termo-title" className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                Termo de Responsabilidade
              </h2>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                Prontuário Eletrônico do SUAS
              </p>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="px-4 py-5 sm:p-6">
          <div className="prose prose-sm max-w-none text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
            {TERMO_CONTEUDO}
          </div>
        </div>
        {/* Footer */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:from-amber-500/95 hover:to-amber-400/80 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

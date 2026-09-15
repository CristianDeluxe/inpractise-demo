import { useRouterState } from '@tanstack/react-router'

/**
 * The bubble is a shortcut to Ask, so it stays out of the way on the Ask page
 * itself: two mounted sessions would each hold their own answer and each debit
 * the allowance separately.
 */
export function useAskBubbleHidden(): boolean {
  return useRouterState({
    select: (state) => state.location.pathname.startsWith('/app/ask'),
  })
}

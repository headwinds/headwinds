import { useCallback, useRef } from "react";
import { getScoutDomain } from "@/utils/network-util";

interface FilterEvent {
  page: string;
  filter: string;
  timestamp: number;
}

/**
 * Shared hook for tracking filter pill selections.
 * Batches events and sends them to the Scout metrics API.
 */
export function useFilterMetrics(page: string) {
  const queue = useRef<FilterEvent[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(() => {
    if (queue.current.length === 0) return;
    const events = [...queue.current];
    queue.current = [];

    // Fire-and-forget — don't block UI on metrics
    fetch(`${getScoutDomain()}/api/metrics/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events }),
    }).catch(() => {
      // Silently ignore metrics failures
    });
  }, []);

  const track = useCallback(
    (filter: string) => {
      queue.current.push({ page, filter, timestamp: Date.now() });

      // Debounce: flush after 2s of inactivity
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flush, 2000);
    },
    [page, flush]
  );

  return { track };
}

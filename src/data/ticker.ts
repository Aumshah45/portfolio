export interface TickerEntry {
  symbol: string;
  quote: string;
  direction: 'up' | 'down' | 'flat';
}

export const ticker: TickerEntry[] = [
  { symbol: 'AUM/SHAH', quote: '▲ open to offers', direction: 'up' },
  { symbol: 'CPLT', quote: '▲ 30+ squads', direction: 'up' },
  { symbol: 'CLMS', quote: '▼ 15d to 3-4d', direction: 'up' },
  { symbol: 'DOCS', quote: '▲ 85% automated', direction: 'up' },
  { symbol: 'NMRA', quote: '▲ HTTP + MCP', direction: 'up' },
  { symbol: 'PAPER', quote: '▲ IEEE ICCCNT', direction: 'up' },
  { symbol: 'CHESS', quote: '▲ the long game', direction: 'up' },
  { symbol: 'CRICKET', quote: 'test-match purist', direction: 'down' },
  { symbol: 'CINEMA', quote: '▲ second viewings', direction: 'up' },
];

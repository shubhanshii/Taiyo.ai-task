import React from 'react';
import Charts from './Charts';
import Maps from './Maps';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ChartsMaps = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-6 md:gap-10 text-black text-base md:text-lg">
        <Charts />
        <Maps />
      </div>
    </QueryClientProvider>
  );
};

export default ChartsMaps;

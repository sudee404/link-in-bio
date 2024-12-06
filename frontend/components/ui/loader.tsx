// components/Loader.js
import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
    </div>
  );
};

export default Loader;

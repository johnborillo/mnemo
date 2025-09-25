'use client';

import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

export default function FlowbiteSetup() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return null;
}

'use client';

import { AppPreloader, LiquidityForm } from '@/widgets';
import { Suspense } from 'react';
import { css } from '~/styled-system/css';
import { vstack } from '~/styled-system/patterns';

export default function NewLiquidity() {
  return (
    <Suspense
    fallback={
      <div style={{ width: '100vw', height: '100vh' }}>
        <AppPreloader />
      </div>
    }
    >
      <div
      className={vstack({
        maxW: 480,
        margin: '0 auto',
        px: 8,
        py: 8,
        border: "1px solid rgba(255, 255, 255, 0.14)",
        backgroundColor:
          "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
        backdropFilter: "blur(70px)",
        borderRadius: "3xl",
        color: "white",
        gap: 4,
      })}
    >
        <h1
          className={css({
            textStyle: 'h2',
          })}
        >
          Add Liquidity
        </h1>
        <LiquidityForm />
      </div>
    </Suspense>
  );
}

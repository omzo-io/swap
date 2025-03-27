'use client';

import { SwapForm } from '@/widgets';
import { css, cx } from '~/styled-system/css';
import { center } from '~/styled-system/patterns';

export default function SwapPage() {
  return (
    <main
      className={cx(
        center(),
        css({
          flexGrow: 1,
          flexDirection: 'column',
          gap: 14,
        }),
      )}
    >
      <div>
        <p className={css({
          fontSize: '40px',
          lineHeight: '30px',
          // textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.23em',
        })}
        >
          <span className={css({
            fontWeight: 'semibold',
          })}
          >Runes</span> create the market
        </p>
        <p className={css({
          fontSize: '40px',
          lineHeight: '30px',
          // textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        })}
        >
          <span className={css({
            fontWeight: 'semibold',
          })}
          >Omzo</span> captures the upside
        </p>
      </div>
      <SwapForm />
    </main>
  );
}

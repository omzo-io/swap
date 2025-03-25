import { LiquidityForm } from '@/widgets/liquidity-form';
import { css } from '~/styled-system/css';
import { vstack } from '~/styled-system/patterns';

export default function NewLiquidity() {
  return (
    <div
      className={vstack({
        maxW: 480,
        margin: '0 auto',
        px: 8,
        py: 8,
        backgroundColor: 'neutral.100',
        borderRadius: 'xl',
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
  );
}

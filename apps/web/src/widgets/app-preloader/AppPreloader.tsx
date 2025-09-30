'use client';

import { Box } from '~/styled-system/jsx';
import './style.css';
import { FC } from 'react';
import { CssProperties } from '~/styled-system/types';

export const AppPreloader: FC<{ position?: CssProperties['position'] }> = ({
  position,
}) => {
  return (
    <Box
      position={position || 'fixed'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="bg.default"
      aria-label="Loading"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={2}
      >
        {/* <div
          className={css({
            animationName: 'fadeIn',
          })}
        > */}
        <Box>
          <Box
            display="flex"
            css={{
              maskImage: 'url(/images/Logo.svg)',
              maskRepeat: 'no-repeat',
            }}
          >
            <div className="loader">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index.toString()} className="loaderBlock" />
              ))}
            </div>
            <div className="loader">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index.toString()} className="loaderBlock" />
              ))}
            </div>
            <div className="loader">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index.toString()} className="loaderBlock" />
              ))}
            </div>
            <div className="loader">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index.toString()} className="loaderBlock" />
              ))}
            </div>
            <div className="loader">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index.toString()} className="loaderBlock" />
              ))}
            </div>
          </Box>
        </Box>
        {/* </div> */}
      </Box>
    </Box>
  );
};
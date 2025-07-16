import { useState } from 'react';
import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { Twitter, CheckCircle, AlertCircle } from 'lucide-react';

interface TwitterFollowCardProps {
  walletAddress: string | null;
  onFollowVerified?: () => void;
}

export const TwitterFollowCard = ({ walletAddress, onFollowVerified }: TwitterFollowCardProps) => {
  const [twitterUsername, setTwitterUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress || !twitterUsername.trim()) {
      setErrorMessage('Please enter a valid Twitter username');
      setVerificationStatus('error');
      return;
    }

    setIsSubmitting(true);
    setVerificationStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/events/twitter-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          twitter_username: twitterUsername.trim().replace('@', ''),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setVerificationStatus('success');
        onFollowVerified?.();
        // Clear the form after successful submission
        setTimeout(() => {
          setTwitterUsername('');
          setVerificationStatus('idle');
        }, 3000);
      } else {
        setErrorMessage(data.error || 'Failed to verify Twitter follow');
        setVerificationStatus('error');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setVerificationStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!walletAddress) {
    return null;
  }

  return (
    <div className={css({
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '500px',
      margin: '0 auto',
    })}>
      <VStack gap="24px" className={css({
        p: 3,
      })}>
        <HStack gap="12px" alignItems="center">
          <div className={css({
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(29, 161, 242, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}>
            <Twitter className={css({ color: 'blue.400', width: '24px', height: '24px' })} />
          </div>
          <VStack gap="4px" alignItems="flex-start">
            <h2 className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            })}>
              Follow on Twitter
            </h2>
            <p className={css({
              fontSize: '14px',
              color: 'gray.400',
              margin: 0,
            })}>
              Connect your Twitter account to earn points
            </p>
          </VStack>
        </HStack>

        <form onSubmit={handleSubmit} className={css({ width: '100%' })}>
          <VStack gap="16px">
            <div className={css({
              width: '100%',
            })}>
              <label className={css({
                display: 'block',
                fontSize: '14px',
                color: 'gray.300',
                marginBottom: '8px',
                fontWeight: 'medium',
              })}>
                Twitter Username
              </label>
              <input
                type="text"
                value={twitterUsername}
                onChange={(e) => setTwitterUsername(e.target.value)}
                placeholder="@yourusername"
                className={css({
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  '&:focus': {
                    borderColor: 'blue.400',
                  },
                  '&::placeholder': {
                    color: 'gray.500',
                  },
                })}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={css({
                width: '100%',
                padding: '12px 24px',
                backgroundColor: 'blue.500',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: 'blue.600',
                },
                '&:disabled': {
                  backgroundColor: 'gray.600',
                  cursor: 'not-allowed',
                },
              })}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Follow'}
            </button>
          </VStack>
        </form>

        {/* Status Messages */}
        {verificationStatus === 'success' && (
          <HStack gap="8px" alignItems="center" className={css({
            padding: '12px 16px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '8px',
            color: 'green.400',
          })}>
            <CheckCircle className={css({ width: '16px', height: '16px' })} />
            <span>Twitter follow verified successfully!</span>
          </HStack>
        )}

        {verificationStatus === 'error' && (
          <HStack gap="8px" alignItems="center" className={css({
            padding: '12px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: 'red.400',
          })}>
            <AlertCircle className={css({ width: '16px', height: '16px' })} />
            <span>{errorMessage}</span>
          </HStack>
        )}

        <div className={css({
          fontSize: '12px',
          color: 'gray.500',
          textAlign: 'center',
          lineHeight: '1.4',
        })}>
          Make sure you're following the official account before submitting your username.
          Verification may take a few moments.
        </div>
      </VStack>
    </div>
  );
};
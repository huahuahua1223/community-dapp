'use client'
import { getUserProfile } from '@/contracts/query'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import LandingView from '@/components/landing/LandingView'

export default function Home() {
  const account = useCurrentAccount();
  const [userObjects, setUserObjects] = useState<CategorizedObjects | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (account?.address) {
        try {
          const profile = await getUserProfile(account.address);
          setUserObjects(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    }

    fetchUserProfile();
  }, [account]);

  return (
    <div className="min-h-screen bg-[#302F2F] md:bg-white w-full overflow-x-hidden">
      <LandingView userObjects={userObjects} />
    </div>
  );
}

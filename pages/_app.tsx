import jsCookie from 'js-cookie';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { SessionProvider } from '../src/context/SessionProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<{ name: string | undefined, email: string | undefined, id: string | undefined, role: string | undefined, access: string | undefined }>()
  useEffect(() => {
    setUser({
      name: jsCookie.get("name"),
      id: jsCookie.get("id"),
      email: jsCookie.get("email"),
      role: jsCookie.get("role"),
      access: jsCookie.get("access")
    })
  }, [user?.id])
  return (
    <SessionProvider value={{ name: user?.name, id: user?.id, email: user?.email, role: user?.role, access: user?.access }}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp

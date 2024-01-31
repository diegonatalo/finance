import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: 'w-full h-full flex justify-center items-center',
          card: 'bg-zinc-900',
          headerTitle: 'text-zinc-100',
          headerSubtitle: 'text-zinc-200',
          socialButtonsBlockButton__google:
            'text-zinc-300 border-zinc-700 bg-zinc-800',
          dividerLine: 'bg-zinc-700',
          dividerText: 'text-zinc-200',
          formFieldLabel: 'text-zinc-200',
          formFieldInput: 'bg-zinc-800 border-zinc-700 text-zinc-300',
          formButtonPrimary: 'bg-emerald-500 hover:bg-emerald-600',
          footerActionText: 'text-zinc-200',
          footerActionLink: 'text-sky-500'
        }
      }}
    />
  )
}

// The real root layout is app/[locale]/layout.tsx; this one only exists for the global 404.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

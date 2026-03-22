interface FocusLayoutProps {
  children: React.ReactNode;
}

export default function FocusLayout({ children }: FocusLayoutProps) {
  return <div className="min-h-screen w-full">{children}</div>;
}

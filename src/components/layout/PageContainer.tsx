interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`mx-auto max-w-6xl px-6 py-16 ${className}`.trim()}>
      {children}
    </div>
  );
}

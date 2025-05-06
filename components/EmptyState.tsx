// components/EmptyState.tsx
export default function EmptyState({
    title,
    description,
    icon,
    action,
  }: {
    title: string;
    description: string;
    icon: string;
    action?: React.ReactNode;
  }) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-1 text-sm opacity-80">{description}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }
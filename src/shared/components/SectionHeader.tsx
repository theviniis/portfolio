interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}

interface SectionTitleProps {
  title: string;
  className?: string;
}

export const SectionTitle = ({ title, className = '' }: SectionTitleProps) => {
  return (
    <h3 className={`text-base font-semibold text-gray-800 ${className}`}>
      {title}
    </h3>
  );
};


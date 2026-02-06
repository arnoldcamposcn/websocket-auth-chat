interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  className = '' 
}: PageHeaderProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      )}
    </div>
  );
};


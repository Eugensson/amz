export const SeparatorWithOr = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="h-5 border-b my-4 text-center w-full">
      <span className="bg-background absolute left-1/2 -translate-x-1/2 mt-2 text-sm text-muted-foreground px-1">
        {children ?? "or"}
      </span>
    </div>
  );
};
